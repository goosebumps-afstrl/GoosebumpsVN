// js/locations/Bar.js

const Bar = {
  enter() {
    GAME.state.currentStorySeq = null;
    GAME.state.currentStoryStep = 0;
    GAME.state.currentLocation = "bar";
    const isDay = GAME.state.timePhaseIdx >= 1 && GAME.state.timePhaseIdx <= 3;
    if (isDay) {
      const seq = [
        { type: "image", src: "assets/images/0Z0bartutup.jpg", wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "", text: "maaf ambrosia room tutup, kembali lagi saat malam hari" }
      ];
      GAME.logic.startStory(seq, () => {
        GAME.state.currentLocation = "city";
        GAME.ui.toggleCityMap(true, "assets/images/0Z0bartutup.jpg");
      });
    } else {
      const playerName = GAME.state.name || "Player";
      const seq = [
        { type: "image", src: "assets/images/0Z0bar01.jpg", wait: 500, skippable: true, bgm: "bar" },
        { type: "image", src: "assets/images/0Z0bar02.jpg", effect: "cross-dissolve", wait: 500, skippable: true },
        { type: "dialogue", retainMedia: true, name: "Hannah", color: "purple", text: `Hai ${playerName}...` },
        {
          type: "choice",
          choices: [
            {
              text: "pesan minum",
              action: () => {
                if (GAME.state.money < 20) {
                  GAME.ui.showToast("Uang tidak cukup!");
                  GAME.state.currentLocation = "city";
                  GAME.ui.toggleCityMap(true, "assets/images/0Z0bar02.jpg");
                  return;
                }
                const drinkSeq = [
                  { type: "image", src: "assets/images/0Z0bar03.jpg", wait: 500, skippable: true },
                  { type: "image", src: "assets/images/0Z0bar04.jpg", effect: "cross-dissolve", wait: 500, skippable: true },
                  { type: "image", src: "assets/images/0Z0bar05.jpg", effect: "cross-dissolve", wait: 500, skippable: true }
                ];
                GAME.logic.startStory(drinkSeq, () => {
                  GAME.audio.playSFX("keluar");
                  GAME.state.money -= 20;
                  GAME.state.stats.composure += 3;
                  GAME.state.stats.hunger += 5;
                  GAME.logic.advanceTime(1);
                  GAME.state.currentLocation = "city";
                  GAME.ui.toggleCityMap(true, "assets/images/0Z0bar05.jpg");
                });
              }
            },
            {
              text: "kembali",
              action: () => {
                GAME.audio.playSFX("keluar");
                GAME.state.currentLocation = "city";
                GAME.ui.toggleCityMap(true, "assets/images/0Z0bar02.jpg");
              }
            }
          ]
        }
      ];
      GAME.logic.startStory(seq);
    }
  }
};

window.GAME = window.GAME || {};
window.GAME.locations = window.GAME.locations || {};
window.GAME.locations.Bar = Bar;
