// Import semua modul JavaScript yang sudah kita pecah
import { state, getInitialState, constants } from './state.js?v=4';
import { audio } from './audio.js?v=4';
import { ui } from './ui.js?v=4';
import { logic } from './logic.js?v=4';

// Jadikan objek GAME bersifat GLOBAL agar tombol onclick di HTML (contoh: onclick="GAME.logic.sleep(1)") tetap berfungsi!
window.GAME = window.GAME || {};
Object.assign(window.GAME, {
    state,
    getInitialState,
    constants,
    clamp: (val, min, max) => Math.min(Math.max(val, min), max),
    audio,
    ui,
    logic
});

// Import auto-generated story index and attach to GAME.logic
import * as stories from './story_index.js';
Object.assign(window.GAME.logic, stories);

// Fungsi untuk menarik HTML part dan memasukkannya ke index
async function loadHTMLPart(path, containerId) {
    try {
        const cacheBuster = new Date().getTime();
        const response = await fetch(`${path}?v=${cacheBuster}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        
        // Inisialisasi HLS.js untuk elemen video m3u8 yang baru dimuat
        const videos = document.getElementById(containerId).querySelectorAll("video");
        videos.forEach(video => {
            const source = video.querySelector("source");
            if (source && source.src.includes(".m3u8")) {
                if (window.Hls && Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(source.src);
                    hls.attachMedia(video);
                    // Handle autoplay issues
                    hls.on(Hls.Events.MANIFEST_PARSED, function() {
                        if (video.hasAttribute('autoplay')) {
                            video.play().catch(e => console.log("Autoplay prevented:", e));
                        }
                    });
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    // Fallback untuk Safari yang support m3u8 secara bawaan
                    video.src = source.src;
                }
            }
        });
    } catch (e) {
        console.error(`Gagal memuat ${path}:`, e);
    }
}

// Fungsi utama yang dipanggil saat web pertama kali dibuka
async function initGame() {
    // Memuat seluruh file HTML Scenes secara bersamaan (paralel)
    await Promise.all([
        loadHTMLPart('scenes/intro.html', 'scene-intro'),
        loadHTMLPart('scenes/input.html', 'scene-input'),
        loadHTMLPart('scenes/story.html', 'scene-story'),
        loadHTMLPart('scenes/maingame.html', 'scene-maingame'),
        loadHTMLPart('scenes/gameover.html', 'scene-gameover'),
        loadHTMLPart('scenes/modals.html', 'modals-container')
    ]);

    // Preload important images
    const imagesToPreload = [
        'assets/images/apartment-day-bg.webp',
        'assets/images/apartment-night-bg.webp',
        'assets/images/taman-kota.webp',
    ];
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Setelah semua HTML masuk, inisialisasi Audio dan Script bawaan
    GAME.audio.init();

    // Add touch listener to start audio context
    document.body.addEventListener('click', function unlockAudio() {
        if (!GAME.audio.bgm) return;
        const activeScene = document.querySelector('.scene.active');
        if (activeScene) {
            GAME.ui.updateSceneAudio(activeScene.id);
        } else {
            GAME.audio.fadeInAndPlay(GAME.audio.bgm);
        }
        document.body.removeEventListener('click', unlockAudio);
    }, { once: true });

    // Pindahkan logika event listener touch/swipe (yang ada di bagian paling bawah file HTML asli Anda) ke sini:
    setupEventListeners();
}

function setupEventListeners() {
    // 1. Cek Autosave atau Manual Save
    const continueButton = document.getElementById('continue-button');
    const newGameButton = document.getElementById('new-game-button');
    const latestSaveSlot = GAME.logic.getLatestSaveSlot();

    if (latestSaveSlot !== null && continueButton) {
        continueButton.classList.remove('hidden');
    } else if (newGameButton) {
        newGameButton.classList.add('highlight-blue');
    }

    // 2. Event listener untuk touch / swipe
    const gameContainer = document.getElementById('game-container');
    let touchStartX = 0;
    let touchStartY = 0;
    let isMapPanning = false;
    let justPanned = false; // Flag to prevent swipe triggers right after panning
    
    gameContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        justPanned = false;
    }, { passive: true });

    gameContainer.addEventListener('touchend', (e) => {
        if (e.target.tagName.toLowerCase() === 'input') return;
        if (justPanned) return; // Don't trigger swipe menus if we were panning

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        const isHorizontal = Math.abs(diffX) > Math.abs(diffY);

        const modalSaveLoad = document.getElementById('modal-saveload');
        const modalPhone = document.getElementById('modal-phone');
        const modalPhoneMessage = document.getElementById('modal-phone-message');
        const modalPhoneInventory = document.getElementById('modal-phone-inventory');
        const modalPhonePinjol = document.getElementById('modal-phone-pinjol');
        const modalOption = document.getElementById('modal-option');
        const modalConfirm = document.getElementById('modal-confirm-overwrite');

        const isPhoneOpen = modalPhone && !modalPhone.classList.contains('hidden');
        const isAppOpen = (modalPhoneMessage && !modalPhoneMessage.classList.contains('hidden')) || 
                          (modalPhoneInventory && !modalPhoneInventory.classList.contains('hidden')) || 
                          (modalPhonePinjol && !modalPhonePinjol.classList.contains('hidden'));

        const viewMinimarket = document.getElementById("view-minimarket");
        const isMinimarketOpen = viewMinimarket && !viewMinimarket.classList.contains("hidden");
        const viewJobs = document.getElementById("view-jobs");
        const isJobsOpen = viewJobs && !viewJobs.classList.contains("hidden");

        if (isHorizontal && diffX < -40) {
            // Priority 1: Phone Apps
            if (isAppOpen) {
                if (!modalPhoneMessage.classList.contains('hidden')) GAME.ui.toggleModal('modal-phone-message');
                if (!modalPhoneInventory.classList.contains('hidden')) GAME.ui.toggleModal('modal-phone-inventory');
                if (!modalPhonePinjol.classList.contains('hidden')) GAME.ui.toggleModal('modal-phone-pinjol');
                GAME.ui.toggleModal('modal-phone');
                return;
            }
            if (isPhoneOpen) return;

            if (modalConfirm && !modalConfirm.classList.contains('hidden')) {
                GAME.ui.toggleModal('modal-confirm-overwrite');
            } else if (modalSaveLoad && !modalSaveLoad.classList.contains('hidden')) {
                GAME.logic.closeSaveLoadMenu();
            } else if (modalOption && !modalOption.classList.contains('hidden')) {
                GAME.ui.toggleModal('modal-option');
            } else {
                if (isJobsOpen) {
                    GAME.ui.swipeJobLeft();
                } else if (isMinimarketOpen) {
                    GAME.logic.closeMinimarket();
                } else {
                    const view = GAME.state.currentView;
                    if (view === 'view-kasur' || view === 'view-bathroom') {
                        GAME.ui.changeView('view-apartment', false);
                    } else if (view === 'view-kitchen') {
                        GAME.logic.closeInventory();
                    } else if (view === 'view-story-location') {
                        GAME.ui.changeView('view-city');
                    } else if (view === 'view-saham') {
                        GAME.logic.closeSahamApp();
                    } else if (view === 'view-saham-detail') {
                        GAME.ui.changeView('view-saham', false);
                    }
                }
            }
        } else if (isHorizontal && diffX > 40) {
            if (isAppOpen) return;
            if (isPhoneOpen) return;
            if (isJobsOpen) {
                GAME.ui.swipeJobRight();
            }
        }

        if (!isHorizontal && diffY > 40) {
            if (isPhoneOpen) {
                const scrollArea = modalPhone.querySelector('.overflow-y-auto');
                let isAtTop = true;
                if (scrollArea && scrollArea.contains(e.target)) {
                    isAtTop = scrollArea.scrollTop <= 0;
                }
                if (isAtTop) {
                    GAME.ui.toggleModal('modal-phone');
                }
            } else if (GAME.state.currentView === 'view-apartment') {
                const viewApt = document.getElementById('view-apartment');
                const scrollableArea = viewApt.querySelector('.glass-panel-main');
                let isAtTop = true;
                if (scrollableArea && scrollableArea.contains(e.target)) {
                    isAtTop = scrollableArea.scrollTop <= 0;
                }
                if (!viewApt.classList.contains('minimized') && isAtTop) {
                    GAME.logic.toggleApartmentView(); 
                }
            }
        }

        if (!isHorizontal && diffY < -40) {
            if (!isPhoneOpen && GAME.state.currentView === 'view-apartment') {
                const viewApt = document.getElementById('view-apartment');
                if (viewApt.classList.contains('minimized')) {
                    GAME.logic.toggleApartmentView(); 
                }
            }
        }
    });

    // 3. Event listener untuk Pannable Background
    const pannableLayer = document.getElementById('pannable-layer');
    let panStartX = 0;
    let panStartY = 0;

    const startPan = (clientX, clientY, targetElem) => {
        const currentView = GAME.state.currentView;
        
        // Cek apakah klik terjadi di area yang interaktif (tombol, slider, form, map-label)
        if (targetElem && targetElem.closest('button, input, select, textarea, .map-label, #door-exit-area')) {
            return; // Biarkan elemen asli menangani klik/sentuhannya
        }
        
        // Nonaktifkan geser jika ada modal/panel yang terbuka
        const modalPhone = document.getElementById('modal-phone');
        const modalOption = document.getElementById('modal-option');
        const modalSaveLoad = document.getElementById('modal-saveload');
        
        // 1. Cek Modal Terbuka
        if (modalPhone && !modalPhone.classList.contains('hidden')) return;
        if (modalOption && !modalOption.classList.contains('hidden')) return;
        if (modalSaveLoad && !modalSaveLoad.classList.contains('hidden')) return;

        // Cek Panel Tambahan
        const viewJobs = document.getElementById("view-jobs");
        if (viewJobs && !viewJobs.classList.contains("hidden")) return;
        const viewMinimarket = document.getElementById("view-minimarket");
        if (viewMinimarket && !viewMinimarket.classList.contains("hidden")) return;

        // 2. Cek Panel Terbuka
        // Jika sedang berada di dalam menu spesifik (Kasur, Dapur, Mandi, Minimarket, dll), matikan fitur geser latar
        if (currentView !== 'view-apartment') {
            return;
        }

        // (Opsional) Jika di apartemen, kita bisa membuat geser latar hanya aktif jika panel utama (Ruangan) di-minimize.
        // Jika Anda ingin geser latar tetap bisa dilakukan (di area kosong) meskipun panel Ruangan tidak di-minimize,
        // bagian ini bisa dihapus/dikomentari.
        if (currentView === 'view-apartment') {
            const viewApt = document.getElementById('view-apartment');
            if (viewApt && !viewApt.classList.contains('minimized')) {
                return; // Drag tidak aktif jika panel apartemen sedang terbuka/tidak di-minimize
            }
        }
        
        isMapPanning = true;
        panStartX = clientX;
        panStartY = clientY;
        pannableLayer.classList.remove('transition-transform', 'duration-300', 'ease-out');
    };

    const movePan = (clientX, clientY) => {
        if (!isMapPanning) return;
        
        if (GAME.logic.storyState && GAME.logic.storyState.sequence) {
            return; // Drag tidak aktif saat ada cerita berjalan 
        }
        if (GAME.state.storyPhase === 2) {
            return; // Drag tidak aktif saat interactive scene awal bersama Chloe
        }

        const resistance = 0.6; // Tambah berat gesekan
        const deltaX = (clientX - panStartX) * resistance;
        const deltaY = (clientY - panStartY) * resistance;
        
        // Ukuran safe zone adalah 100vw x 100vh.
        // Pannable area adalah 3440 / 877.42 kali lebar safe zone
        const viewHeight = window.innerHeight;
        const viewWidth = window.innerWidth;
        
        const panAreaWidth = viewWidth * (3440 / 877.42);
        const panAreaHeight = viewHeight * (1920 / 1559.99);
        
        const maxPanX = Math.max(0, (panAreaWidth - viewWidth) / 2);
        const maxPanY = Math.max(0, (panAreaHeight - viewHeight) / 2);
        
        // Clamp pergeseran
        const clampX = GAME.clamp(deltaX, -maxPanX, maxPanX);
        const clampY = GAME.clamp(deltaY, -maxPanY, maxPanY);
        
        if (Math.abs(clampX) > 5 || Math.abs(clampY) > 5) {
            justPanned = true; 
        }
        
        // Mulai dari -50% (karena diposisikan di tengah)
        pannableLayer.style.transform = `translate(calc(-50% + ${clampX}px), calc(-50% + ${clampY}px))`;
    };

    const endPan = () => {
        if (!isMapPanning) return;
        isMapPanning = false;
        pannableLayer.classList.add('transition-transform', 'duration-300', 'ease-out');
        pannableLayer.style.transform = `translate(-50%, -50%)`;
    };

    if (pannableLayer) {
        // Mouse Support
        pannableLayer.addEventListener('mousedown', (e) => startPan(e.clientX, e.clientY, e.target));
        document.addEventListener('mousemove', (e) => movePan(e.clientX, e.clientY));
        document.addEventListener('mouseup', endPan);
        
        // Touch Support
        pannableLayer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                startPan(e.touches[0].clientX, e.touches[0].clientY, e.target);
            }
        }, { passive: true });
        document.addEventListener('touchmove', (e) => {
            if (isMapPanning) {
                // Hindari scroll browser default saat geser peta
                if (e.cancelable) e.preventDefault();
                movePan(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: false });
        document.addEventListener('touchend', endPan);
    }
}

// Eksekusi fungsi initGame() ketika seluruh dokumen awal siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}