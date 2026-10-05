// js/locations/KantorUXBR.js

const KantorUXBR = {
  enter() {
    GAME.state.currentStorySeq = null;
    GAME.state.currentStoryStep = 0;
    GAME.state.currentLocation = "kantoruxbr";
    GAME.ui.showToast("Kantor UXBR sedang dalam pengembangan.");
  }
};

window.GAME = window.GAME || {};
window.GAME.locations = window.GAME.locations || {};
window.GAME.locations.KantorUXBR = KantorUXBR;
