// TEMPLATE UNTUK miniphase03Eri
// Paste script visual novel kamu di dalam array return ini
export function miniphase03Eri() {
    return [
        { 
            type: "dialogue", 
            name: "System", 
            text: "Activity with Eri belum tersedia, pantengin terus ya (Stay tuned!)", 
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
    window.GAME.logic['miniphase03Eri'] = miniphase03Eri;
}
