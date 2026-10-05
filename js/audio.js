export const audio = {
  bgm: null,
  bgmBar: null,
  bgmTaman: null,
  tap: null,
  voice: null,
  sfxMinimarket: null,
  sfxKeluar: null,
  sfxPesan: null,
  dialogueSfx: null,
  bgmPhase00: null,
  sfxCityPark: null,
  sfxChaotic: null,
  sfxSwosh: null,
  sfxPhoneVibrate: null,
  sfxPopUp: null,
  sfxMoney: null,
  sfxDrink: null,
  sfxEat: null,
  dynamicSFX: {},

  currentBGM: null,
  isMusicMuted: false,
  isSfxMuted: false,
  isVoiceDialogueMuted: false,
  isVoiceWinSceneMuted: false,

  totalFilesToLoad: 14,
  filesLoaded: 0,

  onFileLoaded() {
    this.filesLoaded++;
    const percent = Math.floor((this.filesLoaded / this.totalFilesToLoad) * 100);
    if (window.updateLoadingBar) {
      window.updateLoadingBar(percent);
    }
    
    if (this.filesLoaded >= this.totalFilesToLoad) {
      if (window.completeLoading) {
        window.completeLoading();
      }
    }
  },

  createHowl(src, volume, loop = false) {
    return new Howl({
      src: [src],
      volume: volume,
      loop: loop,
      preload: true,
      onload: () => this.onFileLoaded(),
      onloaderror: () => {
        console.warn(`Failed to load audio: ${src}`);
        this.onFileLoaded(); // Increment anyway to unblock UI
      }
    });
  },

  init() {
    // Check if Howl is defined
    if (typeof Howl === 'undefined') {
        console.error("Howler.js is not loaded! Audio will not work.");
        return;
    }

    // BGMs
    this.bgm = this.createHowl("assets/sounds/main_bgm.ogg", 0.35, true);
    this.bgmBar = this.createHowl("assets/sounds/bgm_bar.ogg", 0.3, true);
    this.bgmTaman = this.createHowl("assets/sounds/bgm_taman_kota.ogg", 0.3, true);
    this.bgmPhase00 = this.createHowl("assets/sounds/Phase00Game_bgm.ogg", 0.5, true);

    // SFXs
    this.tap = this.createHowl("assets/sounds/tap.ogg", 1.0);
    this.sfxMinimarket = this.createHowl("assets/sounds/MinMar_sfx.ogg", 0.7);
    this.sfxKeluar = this.createHowl("assets/sounds/sfx_keluar_gedung.ogg", 0.7);
    this.sfxPesan = this.createHowl("assets/sounds/sfx_pesan.ogg", 0.8);
    this.dialogueSfx = this.createHowl("assets/sounds/Dialogue_sfx.ogg", 0.3, true);
    this.sfxCityPark = this.createHowl("assets/sounds/CityPark_sfx.ogg", 0.2, true);
    this.sfxChaotic = this.createHowl("assets/sounds/Chaotic_sfx.ogg", 0.4, true);
    this.sfxSwosh = this.createHowl("assets/sounds/Swosh_sfx.ogg", 0.6);
    this.sfxPhoneVibrate = this.createHowl("assets/sounds/PhoneVibrate_sfx.ogg", 1.0);
    this.sfxPopUp = this.createHowl("assets/sounds/PopUp_sfx.ogg", 0.8);
    this.sfxMoney = this.createHowl("assets/sounds/Money_sfx.ogg", 1.0);
    this.sfxDrink = this.createHowl("assets/sounds/Drink_sfx.ogg", 1.0);
    this.sfxEat = this.createHowl("assets/sounds/Eat_sfx.ogg", 1.0);

    document.body.addEventListener(
      "click",
      (e) => {
        if (
          e.target.closest(
            "button, .map-label, input[type=range], .story-choice-btn",
          )
        ) {
          this.playTap();
        }
      },
      true,
    );
  },

  playTap() {
    if (this.tap && !this.isSfxMuted) this.tap.play();
  },

  playVoiceDialogue(src) {
    if (this.isVoiceDialogueMuted) return;
    new Howl({ src: [src], volume: 0.8, autoplay: true });
  },

  playVoiceWinScene(src) {
    if (this.isVoiceWinSceneMuted) return;
    new Howl({ src: [src], volume: 0.8, autoplay: true });
  },

  playBGM(bgmType) {
    if (window.GAME && window.GAME.state) {
        window.GAME.state.currentBGMKey = bgmType;
    }

    let newBgm = null;
    let targetVol = 0.35;
    
    if (bgmType === "main") { newBgm = this.bgm; targetVol = 0.35; }
    else if (bgmType === "bar") { newBgm = this.bgmBar; targetVol = 0.3; }
    else if (bgmType === "taman") { newBgm = this.bgmTaman; targetVol = 0.3; }
    else if (bgmType === "phase00") { newBgm = this.bgmPhase00; targetVol = 0.5; }
    
    if (this.currentBGM === newBgm) {
      if (this.currentBGM && !this.currentBGM.playing()) {
        const id = this.currentBGM.play();
        this.currentBGM.fade(0, targetVol, 1000, id);
      }
      return;
    }
    
    if (this.currentBGM) {
      if (this.currentBGM.playing()) {
         const oldBgm = this.currentBGM;
         oldBgm.fade(oldBgm.volume(), 0, 800);
         setTimeout(() => {
             if (this.currentBGM !== oldBgm) {
                 oldBgm.stop();
             }
         }, 850);
      }
    }
    
    this.currentBGM = newBgm;
    if (this.currentBGM) {
      const id = this.currentBGM.play();
      this.currentBGM.fade(0, targetVol, 1000, id);
    }
  },

  stopAllBGM() {
    if (window.GAME && window.GAME.state) {
        window.GAME.state.currentBGMKey = "NONE";
    }
    const allBgms = [this.bgm, this.bgmBar, this.bgmTaman, this.bgmPhase00];
    allBgms.forEach(audio => {
      if (audio && audio.playing()) {
        audio.fade(audio.volume(), 0, 800);
        setTimeout(() => {
            if (this.currentBGM !== audio) {
                audio.stop();
            }
        }, 850);
      }
    });
    this.currentBGM = null;
  },

  playSFX(type) {
    if (this.isSfxMuted) return;
    let sfx = null;
    if (type === "minimarket") sfx = this.sfxMinimarket;
    else if (type === "keluar") sfx = this.sfxKeluar;
    else if (type === "pesan") sfx = this.sfxPesan;
    else if (type === "swosh") sfx = this.sfxSwosh;
    else if (type === "popup") sfx = this.sfxPopUp;
    else if (type === "citypark") sfx = this.sfxCityPark;
    else if (type === "chaotic") sfx = this.sfxChaotic;
    else if (type === "phonevibrate") {
      sfx = this.sfxPhoneVibrate;
      if (sfx && sfx.playing()) return; 
    }
    else if (type === "money") sfx = this.sfxMoney;
    else if (type === "drink") sfx = this.sfxDrink;
    else if (type === "eat") sfx = this.sfxEat;

    if (sfx) {
      // For looping SFXs, restart them softly, else just play
      if (sfx.loop()) {
         if (!sfx.playing()) {
             sfx.volume(sfx._volume); // ensure volume is restored
             sfx.play();
         }
      } else {
         sfx.play();
      }
    }
  },

  stopSFX(type) {
    let sfx = null;
    if (type === "citypark") sfx = this.sfxCityPark;
    else if (type === "chaotic") sfx = this.sfxChaotic;

    if (sfx && sfx.playing()) {
      sfx.fade(sfx.volume(), 0, 800);
      sfx.once('fade', () => {
         sfx.stop();
         sfx.volume(sfx._volume); // Reset internal volume for next time
      });
    }
  },

  playDynamicSFX(src, loop = false) {
    if (this.isSfxMuted) return;
    if (this.dynamicSFX[src]) {
        this.dynamicSFX[src].stop();
    }
    this.dynamicSFX[src] = new Howl({ src: [src], volume: 0.8, loop: loop, autoplay: true });
  },

  stopDynamicSFX(src) {
    if (this.dynamicSFX[src]) {
        this.dynamicSFX[src].stop();
        delete this.dynamicSFX[src];
    }
  },

  playDialogueSFX() {
    if (this.isSfxMuted) return;
    if (this.dialogueSfx && !this.dialogueSfx.playing()) {
      this.dialogueSfx.play();
    }
  },

  stopDialogueSFX() {
    if (this.dialogueSfx) {
      this.dialogueSfx.stop();
    }
  },

  updateToggleUI(btnElement, isMuted) {
    if (!btnElement) return;
    const circle = btnElement.firstElementChild;
    if (isMuted) {
      btnElement.classList.replace('bg-white/20', 'bg-red-500/80');
      circle.style.left = '1.25rem';
    } else {
      btnElement.classList.replace('bg-red-500/80', 'bg-white/20');
      circle.style.left = '0.25rem';
    }
  },

  toggleMuteMusic(btnElement) {
    this.isMusicMuted = !this.isMusicMuted;
    const isMuted = this.isMusicMuted;
    
    const allBgms = [this.bgm, this.bgmBar, this.bgmTaman, this.bgmPhase00];
    allBgms.forEach(audio => {
        if (audio) audio.mute(isMuted);
    });

    this.updateToggleUI(btnElement, isMuted);
  },

  toggleMuteSfx(btnElement) {
    this.isSfxMuted = !this.isSfxMuted;
    const isMuted = this.isSfxMuted;
    
    const allSfxs = [
        this.tap, this.sfxMinimarket, this.sfxKeluar, this.sfxPesan,
        this.dialogueSfx, this.sfxCityPark, this.sfxChaotic,
        this.sfxSwosh, this.sfxPhoneVibrate, this.sfxPopUp
    ];
    allSfxs.forEach(audio => {
        if (audio) audio.mute(isMuted);
    });

    this.updateToggleUI(btnElement, isMuted);
  },

  toggleMuteVoiceDialogue(btnElement) {
    this.isVoiceDialogueMuted = !this.isVoiceDialogueMuted;
    this.updateToggleUI(btnElement, this.isVoiceDialogueMuted);
  },

  toggleMuteVoiceWinScene(btnElement) {
    this.isVoiceWinSceneMuted = !this.isVoiceWinSceneMuted;
    this.updateToggleUI(btnElement, this.isVoiceWinSceneMuted);
  }
};