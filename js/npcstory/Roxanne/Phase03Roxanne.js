// TEMPLATE UNTUK Phase03Roxanne
// Paste script visual novel kamu di dalam array return ini
export function Phase03Roxanne() {
    return [
        { 
            type: "dialogue", 
            name: "System", 
            text: "Cerita Roxanne Phase 03 belum tersedia, pantengin terus ya (Stay tuned!)", 
            bg: "black",
            wait: 3000
        },
        // Tambahkan action untuk mengembalikan ke maingame setelah selesai
        { 
            action: () => {
                if (window.GAME && window.GAME.ui) {
                    window.GAME.ui.changeScene("scene-maingame");
                }
            } 
        }
    ];
}

// Attach ke GAME.logic agar bisa dipanggil secara dinamis
if (typeof window !== 'undefined' && window.GAME && window.GAME.logic) {
    window.GAME.logic['Phase03Roxanne'] = Phase03Roxanne;
}
