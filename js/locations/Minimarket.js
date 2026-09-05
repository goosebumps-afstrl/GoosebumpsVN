// js/locations/Minimarket.js

const Minimarket = {
  enter() {
    const isNight = GAME.state.timePhaseIdx === 0 || GAME.state.timePhaseIdx >= 4;
    GAME.state.minimarketVisits = (GAME.state.minimarketVisits || 0) + 1;

    let visitMod = GAME.state.minimarketVisits % 3;
    let marketImageErika = "assets/images/0Z0minimarket02Erika_1.jpg";
    if (visitMod === 2) {
      marketImageErika = "assets/images/0Z0minimarket02Erika_2.jpg";
    } else if (visitMod === 0) {
      marketImageErika = "assets/images/0Z0minimarket02Erika_3.jpg";
    }
    let marketImageShia = "assets/images/0Z0minimarket02Shia_1.jpg";
    if (visitMod === 2) {
      marketImageShia = "assets/images/0Z0minimarket02Shia_2.jpg";
    } else if (visitMod === 0) {
      marketImageShia = "assets/images/0Z0minimarket02Shia_3.jpg";
    }

    let seq = [];
    if (!isNight) {
      seq = [
        { type: "image", src: "assets/images/00Z0minimarket01.jpg", wait: 1500, skippable: true },
        { type: "action", action: () => { window.GAME.audio.playSFX("minimarket"); } },
        { type: "image", src: marketImageErika, effect: "cross-dissolve", wait: 1000, skippable: true },
        { type: "dialogue", retainMedia: true, name: "Erika", color: "pink", text: "selamat datang diminimarket selamat berbelanja." },
        { type: "image", src: "assets/images/00Z0minimarket00.jpg", effect: "cross-dissolve", wait: 500, skippable: true }
      ];
    } else {
      seq = [
        { type: "image", src: "assets/images/00Z0minimarket01.jpg", wait: 1500, skippable: true },
        { type: "action", action: () => { window.GAME.audio.playSFX("minimarket"); } },
        { type: "image", src: marketImageShia, wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "Shia", color: "yellow", text: "selamat datang, selamat berbelanja." },
        { type: "image", src: "assets/images/00Z0minimarket00.jpg", effect: "cross-dissolve", wait: 500, skippable: true }
      ];
    }
    GAME.logic.startStory(seq, () => {
      // Tampilkan panel sebagai overlay di atas VN scene
      const panel = document.getElementById("view-minimarket");
      panel.classList.remove("hidden", "animate-motion-out");
      panel.classList.add("flex", "animate-motion-in");
      GAME.ui.renderShop();
    });
  },

  close() {
    const panel = document.getElementById("view-minimarket");
    panel.classList.remove("animate-motion-in");
    panel.classList.add("animate-motion-out");

    setTimeout(() => {
      panel.classList.add("hidden");
      panel.classList.remove("flex");

      const timeIdx = GAME.state.timePhaseIdx;
      let timeString = "siang";
      if (timeIdx === 0 || timeIdx >= 4) {
        timeString = "malam";
      } else if (timeIdx === 3) {
        timeString = "sore";
      }
      const bgImg = `assets/images/0Z0minimarket06${timeString}.jpg`;

      const seq = [
        { type: "image", src: "assets/images/0Z0minimarket03.jpg", effect: "cross-dissolve", wait: 1000, skippable: true },
        { type: "image", src: "assets/images/0Z0minimarket04.jpg", effect: "cross-dissolve", wait: 700, skippable: true },
        { type: "image", src: "assets/images/0Z0minimarket05.jpg", effect: "cross-dissolve", wait: 700, skippable: true },
        { type: "image", src: bgImg, effect: "cross-dissolve", wait: 700, skippable: true }
      ];
      GAME.logic.startStory(seq, () => {
        GAME.audio.playSFX("keluar");
        GAME.state.currentLocation = "city";
        GAME.ui.toggleCityMap(true, bgImg); // Tampilkan map overlay di atas gambar luar minimarket
        if (!GAME.state.isPhase00SpecialMap) {
            GAME.logic.advanceTime(1);
        }
      }, "none"); // Mulai story exit dari frame saat ini (00Z0minimarket00) tanpa fade-black
    }, 500);
  }
};

window.GAME = window.GAME || {};
window.GAME.locations = window.GAME.locations || {};
window.GAME.locations.Minimarket = Minimarket;
