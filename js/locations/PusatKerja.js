// js/locations/PusatKerja.js

const PusatKerja = {
  enter() {
    GAME.state.currentStorySeq = null;
    GAME.state.currentStoryStep = 0;
    GAME.state.currentLocation = "pusatkerja";
    const isLateNight = GAME.state.timePhaseIdx === 4 || GAME.state.timePhaseIdx === 5 || GAME.state.timePhaseIdx === 0;
    if (isLateNight) {
      const seq = [
        { type: "image", src: "assets/images/0Z0pusatpekerjaantutup.jpg", wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "", text: "maaf pusat pekerjaan tutup, kembali lagi saat pagi hari" }
      ];
      GAME.logic.startStory(seq, () => {
        GAME.state.currentLocation = "city";
        GAME.ui.toggleCityMap(true);
      });
    } else {
      if (!GAME.state.jobsVisits) GAME.state.jobsVisits = 0;
      GAME.state.jobsVisits++;

      const playerName = GAME.state.name || "Player";
      const randomLidyaImg = Math.floor(Math.random() * 3) + 1; // Menghasilkan angka 1, 2, atau 3
      const seq = [
        { type: "image", src: "assets/images/00Z0pusatpekerjaan01.jpg", wait: 1000, skippable: true },
        { type: "image", src: `assets/images/00Z0pusatpekerjaan02_${randomLidyaImg}.jpg`, effect: "cross-dissolve", wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "Lidya", color: "lightblue", text: `hallo ${playerName}, kamu ingin mengambil pekerjaan apa hari ini?` },
        { type: "image", src: "assets/images/0Z0pusatpekerjaan03.jpg", effect: "cross-dissolve", wait: 500, skippable: true }
      ];

      GAME.logic.startStory(seq, () => {
        const panel = document.getElementById("view-jobs");
        panel.classList.remove("hidden", "animate-motion-out");
        panel.classList.add("flex", "animate-motion-in");
        if (GAME.ui.renderJobCards) GAME.ui.renderJobCards();
      });
    }
  },

  close() {
    const panel = document.getElementById("view-jobs");
    panel.classList.remove("animate-motion-in");
    panel.classList.add("animate-motion-out");

    setTimeout(() => {
      panel.classList.add("hidden");
      panel.classList.remove("flex");

      GAME.audio.playSFX("keluar");
      GAME.state.currentLocation = "city";
      GAME.ui.toggleCityMap(true, "assets/images/0Z0pusatpekerjaan03.jpg");
    }, 500);
  },

  work(jobType) {
    let eCost = 0, hCost = 0, cGain = 0, timeCost = 0, income = 0;
    let seqPrefix = "";

    if (jobType === "layanan") {
      eCost = 30; hCost = 30; cGain = 5; timeCost = 3; income = 75;
      seqPrefix = "0Z0laymas";
    } else if (jobType === "buruh") {
      eCost = 50; hCost = 30; cGain = -5; timeCost = 3; income = 85;
      seqPrefix = "0Z0buruh";
    } else if (jobType === "kurir") {
      eCost = 10; hCost = 10; cGain = 0; timeCost = 1; income = 25;
      seqPrefix = "0Z0kurir";
    }

    if (GAME.state.stats.energy < eCost) {
      GAME.ui.showToast("❌ Energi tidak cukup untuk bekerja!");
      return;
    }

    // Sembunyikan panel pekerjaan secara instan sebelum cerita dimulai
    const panel = document.getElementById("view-jobs");
    if (panel) {
      panel.classList.add("hidden");
      panel.classList.remove("flex", "animate-motion-in", "animate-motion-out");
    }

    const playerName = GAME.state.name || "Player";
    const seq = [
      { type: "image", src: `assets/images/${seqPrefix}01.jpg`, wait: 500, skippable: true },
      { type: "image", src: `assets/images/${seqPrefix}02.jpg`, effect: "cross-dissolve", wait: 500, skippable: true },
      { type: "image", src: "assets/images/0Z0pusatpekerjaan04.jpg", wait: 700, skippable: true },
      { type: "dialogue", retainMedia: true, name: "Lidya", color: "lightblue", text: `terimakasih atas kerja kerasnya ${playerName}.` },
      { type: "image", src: "assets/images/0Z0pusatpekerjaan05.jpg", effect: "cross-dissolve", wait: 1000, skippable: true }
    ];

    GAME.logic.startStory(seq, () => {
      GAME.state.stats.energy -= eCost;
      GAME.state.stats.hunger -= hCost;
      GAME.state.stats.composure += cGain;
      GAME.state.money += income;
      GAME.logic.advanceTime(timeCost);
      GAME.ui.showToast(`Mendapat $${income}`);
      GAME.audio.playSFX("keluar");
      GAME.state.currentLocation = "city";
      GAME.ui.toggleCityMap(true, "assets/images/0Z0pusatpekerjaan05.jpg");
    });
  }
};

window.GAME = window.GAME || {};
window.GAME.locations = window.GAME.locations || {};
window.GAME.locations.PusatKerja = PusatKerja;
