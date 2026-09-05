# GOOSEBUMPS: GAME MECHANICS & RULESET INDEX

Dokumen ini berisi rangkuman arsitektur, alur *game*, serta cara kerja kode (logika cerita) dari *engine* visual novel *Goosebumps*. Anda dapat menggunakan panduan ini sebagai acuan teknis saat menulis draf cerita atau merancang fitur baru.

---

## 1. STRUKTUR & ALUR GAME (GAME FLOW)

Saat pemain membuka *game*, urutan kejadiannya adalah sebagai berikut:

1. **Loading & Inisialisasi (`js/main.js`)**
   - Layar hitam dengan *loading bar* muncul. Di latar belakang, *game* mengambil (memuat) potongan-potongan HTML dari folder `scenes/` secara paralel (`intro.html`, `input.html`, `story.html`, `maingame.html`, `modals.html`).
   - Layar meminta pemain untuk *tap* agar Audio aktif.

2. **Title Screen (`scenes/intro.html`)**
   - Layar berisikan video latar belakang dan tombol **New Game** serta **Continue**.
   - Ketika **New Game** diklik, *game* memanggil fungsi `GAME.logic.startInputScene()`.

3. **Character Creation (`scenes/input.html`)**
   - Pemain diminta memasukkan **Nama**.
   - Pemain diminta memilih **Kondisi Awal** (Kaya/Normal/Miskin). Ini akan menentukan *Stats* dan uang (Money) awal.
   - Pemain melewati **Tutorial UI** singkat.
   - *Game* memanggil fungsi `GAME.logic.startGameReal()`.

4. **Main Game / Hub (Apartment) (`scenes/maingame.html`)**
   - Karakter berada di apartemen.
   - Ini adalah pusat (*Hub*) interaksi. Pemain dapat memulihkan *Energy* (Tidur), mengisi perut (Makan dari *Inventory*), menggunakan *Handphone*, dan keluar gedung (Bekerja/Jalan-jalan).
   - Waktu berjalan berdasarkan siklus (Pagi -> Siang -> Sore -> Malam -> Tidur).

---

## 2. SISTEM STATUS (STATS MECHANICS)

Semua status disimpan dalam objek global `GAME.state` (berada di `js/state.js`). Status memengaruhi kelangsungan hidup karakter di dalam *game*.

*   **Energy (Energi)**
    *   Digunakan untuk melakukan aktivitas fisik (seperti Bekerja atau Jalan-jalan).
    *   Jika *Energy* terlalu rendah, pemain tidak bisa melakukan aktivitas berat.
    *   **Cara Pulih:** Tidur di kasur apartemen (memanggil fungsi `GAME.logic.sleep()`).
*   **Hunger (Lapar)**
    *   Rasa lapar akan bertambah (bar akan turun) seiring berjalannya waktu dan aktivitas.
    *   Jika *Hunger* menipis, *Composure* akan ikut turun.
    *   **Cara Pulih:** Mengonsumsi makanan/minuman dari *Inventory* atau membelinya dari *Minimarket*.
*   **Composure (Ketenangan Jiwa/Nyawa)**
    *   Ini adalah indikator *"Health"* atau *"Nyawa"*.
    *   Turun jika pemain kelaparan terus-menerus atau mengalami peristiwa cerita yang membuat stres.
    *   **Game Over:** Jika *Composure* menyentuh angka 0%, permainan selesai (`GAME.logic.gameOver()`).
*   **Wisdom (Wis) & Charisma (Cha)**
    *   Status pasif yang memengaruhi tingkat kesuksesan dalam pekerjaan atau memengaruhi pilihan dialog dalam cerita.

---

## 3. ENGINE CERITA VISUAL NOVEL (STORY SEQUENCE)

*Game* menggunakan sistem *array of objects* di `js/logic.js` untuk menjalankan *cutscene* atau dialog. Anda mendefinisikan urutan kejadian dalam sebuah fungsi, lalu menjalankannya dengan `GAME.logic.startStory()`.

Semua cerita dimainkan di dalam `scenes/story.html` yang berfungsi sebagai "kanvas" panggung.

### Contoh Format Penulisan Cerita (Scripting)

```javascript
// Contoh di dalam js/logic.js
getContohCerita1() {
  return [
    // 1. Menampilkan gambar background dengan efek transisi
    { 
      type: "image", 
      src: "assets/images/background_bar.jpg", 
      effect: "cross-dissolve", 
      wait: 1000 
    },
    // 2. Menampilkan Dialog Karakter
    { 
      type: "dialogue", 
      retainMedia: true, 
      name: "Orang Asing", 
      text: "Hei {name}, kamu mau pesan minuman apa?" 
    },
    // 3. Menampilkan Video Background Skala Penuh
    { 
      type: "video", 
      src: "assets/videos/adegan_minum.mp4", 
      skippable: false 
    },
    // 4. Memicu Aksi/Logika Khusus (Misal: Uang berkurang)
    {
      type: "action",
      action: () => {
        GAME.state.money -= 50;
        GAME.ui.showToast("Uang berkurang $50", "warning");
      }
    },
    // 5. Pilihan Ganda (Branching)
    {
      type: "choice",
      choices: [
        {
          text: "Pesan Beer ($10)",
          action: () => {
             // Lanjut ke sekuen minum beer
             GAME.logic.gotoSeq("getSekuenMinumBeer");
          }
        },
        {
          text: "Tolak dan Pulang",
          action: () => {
             // Menyelesaikan cerita dan kembali ke apartemen
             GAME.logic.startGameReal();
          }
        }
      ]
    }
  ];
}
```

### Properti Cerita (Story Properties) yang Didukung:
- `type`: Tipe adegan (`"image"`, `"video"`, `"dialogue"`, `"action"`, `"choice"`).
- `src`: Alamat (*path*) dari gambar atau video (`assets/images/...`).
- `name`: Nama karakter yang berbicara di kotak teks. (Bisa menggunakan `{name}` agar di-replace dengan nama pemain asli).
- `text`: Teks dialog yang akan diketik di layar.
- `wait`: Waktu jeda (dalam milidetik) sebelum adegan otomatis berlanjut.
- `skippable`: Jika diset `false`, pemain tidak bisa melewati (*skip*) animasi/jeda tersebut.
- `retainMedia`: Jika diset `true`, gambar/video sebelumnya tidak akan dihapus (berguna saat karakter saling bergantian bicara dengan latar yang sama).
- `effect`: Efek animasi CSS pada latar visual (misal: `"cross-dissolve"`, `"blur-pulse-1"`).

---

## 4. SISTEM PEKERJAAN & WAKTU (TIME SYSTEM)

*   **Pekerjaan (Jobs):**
    Saat karakter keluar gedung dan mengakses menu "Pusat Pekerjaan", sistem akan memutar adegan *dummy* (layar hitam) selama beberapa detik, menambahkan uang, lalu mengurangi energi pemain. Waktu harian akan maju (`GAME.logic.advanceTime()`).
*   **Waktu (TimeOfDay):**
    *Game* membagi hari menjadi indeks waktu:
    - `0` = Pagi (Morning)
    - `1` = Siang (Afternoon)
    - `2` = Sore (Evening)
    - `3` = Malam (Night)
    Jika pemain bekerja, siklus akan melompat. Jika sudah lewat "Malam", karakter akan dipaksa untuk beristirahat (masuk ke hari berikutnya).
*   **Pergantian Hari (`changeDay`):**
    Menghitung tagihan (seperti sewa apartemen bulanan) dan memulihkan/mereset aktivitas tertentu.

---

## 5. UI & HANDPHONE (APPS)

Aplikasi Handphone dipanggil lewat `modal-phone` di `scenes/modals.html`.
- **Contact / Pesan:** Diatur di `state.messages`. Untuk mengirim pesan dari NPC ke karakter, gunakan fungsi `GAME.logic.sendMessage('Nama NPC', 'Isi Pesan')`.
- **Inventory:** Sistem penyimpanan *item* (makanan/minuman). Disimpan di `state.inventory`. Mengonsumsi *item* akan memanggil `GAME.logic.useItem()`, yang memulihkan *Hunger* atau memberikan efek suara tertentu.
- **Minimarket:** Array objek statis di `state.js` yang menentukan harga dan nilai pemulihan (*restore*) setiap produk. Pembelian memanggil `GAME.logic.buyItem()`.
