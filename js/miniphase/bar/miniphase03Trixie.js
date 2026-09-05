// TEMPLATE UNTUK miniphase03Trixie
// Paste script visual novel kamu di dalam array return ini
export function miniphase03Trixie() {
    return [
        { 
            type: "dialogue", 
            name: "System", 
            text: "Activity with Trixie belum tersedia, pantengin terus ya (Stay tuned!)", 
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
    window.GAME.logic['miniphase03Trixie'] = miniphase03Trixie;
}
