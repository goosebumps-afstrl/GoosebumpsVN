// js/locations/TamanKota.js

const TamanKota = {
  getTimeSuffix(idx) {
    if (idx === 3) return "sore";
    if (idx === 1 || idx === 2) return "siang";
    return "malam"; // 0, 4, 5
  },

  getVideoTimeSuffix(idx) {
    if (idx === 1) return "pagi";
    if (idx === 2) return "siang";
    if (idx === 3) return "sore";
    if (idx === 5) return "dinihari";
    return "malam"; // 0 (tengah malam) and 4 (malam)
  },

  showChoices(timeSuffix) {
    const seq = [
      { type: "dialogue", retainMedia: true, name: "", text: "kamu berada di taman kota, apa yang akan kamu lakukan?" },
      {
        type: "choice",
        choices: [
          {
            text: "bersantai dipinggir danau",
            action: () => {
              // Jika masih di Phase00, blokir aksi ini
              if (GAME.state.isPhase00SpecialMap) {
                GAME.ui.showToast("kamu sedang ada janji");
                // Tampilkan kembali pilihannya agar pemain bisa menekan "kembali"
                TamanKota.showChoices(timeSuffix);
                return;
              }

              // Jika diperbolehkan:
              const videoTimeSuffix = TamanKota.getVideoTimeSuffix(GAME.state.timePhaseIdx);
              
              // Terapkan logika stat secara langsung
              GAME.state.stats.composure += 3;
              GAME.logic.advanceTime(1);
              
              // Ambil suffix gambar setelah waktu dimajukan
              const newTimeSuffix = TamanKota.getTimeSuffix(GAME.state.timePhaseIdx);

              const enjoySeq = [
                // Putar video dengan waktu sebelum maju
                { type: "video", src: `assets/videos/00TamKot_${videoTimeSuffix}.webm`, loop: false, skippable: true },
                // Langsung cross dissolve ke gambar 0Z0tamkot02 tanpa butuh klik tombol 'kembali'
                { type: "image", src: `assets/images/0Z0tamkot02${newTimeSuffix}.webp`, effect: "cross-dissolve", wait: 1000, skippable: true },
                { type: "image", src: `assets/images/0Z0tamkot01${newTimeSuffix}.webp`, effect: "cross-dissolve", wait: 700, skippable: true }
              ];
              
              GAME.logic.startStory(enjoySeq, () => {
                  GAME.audio.playSFX("keluar");
                  window.GAME.audio.stopSFX("citypark");
                  GAME.state.currentLocation = "city";
                  GAME.ui.toggleCityMap(true, `assets/images/0Z0tamkot01${newTimeSuffix}.webp`);
              });
            }
          },
          {
            text: "kembali",
            action: () => {
              GAME.audio.playSFX("keluar");
              window.GAME.audio.stopSFX("citypark");
              const exitSeq = [
                { type: "image", src: `assets/images/0Z0tamkot01${timeSuffix}.webp`, effect: "cross-dissolve", wait: 700, skippable: true }
              ];
              GAME.logic.startStory(exitSeq, () => {
                GAME.state.currentLocation = "city";
                GAME.ui.toggleCityMap(true, `assets/images/0Z0tamkot01${timeSuffix}.webp`);
              });
            }
          }
        ]
      }
    ];
    GAME.logic.startStory(seq);
  },

  enter() {
    const timeSuffix = TamanKota.getTimeSuffix(GAME.state.timePhaseIdx);
    const targetBgm = GAME.state.isPhase00SpecialMap ? "phase00" : "taman";
    
    const seq = [
      { type: "action", action: () => { window.GAME.audio.playSFX("citypark"); } },
      { type: "image", src: `assets/images/0Z0tamkot01${timeSuffix}.webp`, wait: 3000, skippable: true, bgm: targetBgm },
      { type: "image", src: `assets/images/0Z0tamkot02${timeSuffix}.webp`, effect: "cross-dissolve", wait: 1000, skippable: true }
    ];
    // Mainkan visual novel pembuka, setelah selesai baru tampilkan pilihan
    GAME.logic.startStory(seq, () => {
      TamanKota.showChoices(timeSuffix);
    });
  }
};

window.GAME = window.GAME || {};
window.GAME.locations = window.GAME.locations || {};
window.GAME.locations.TamanKota = TamanKota;
