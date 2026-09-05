export function WINTRIX_sementara() {
  if (window.GAME && window.GAME.ui) {
    window.GAME.ui.initWinBars();
  }
  return [
    {
      type: "image",
      src: "assets/images/000Z_TrixieWIN01.webp",
      effect: "cross-dissolve",
      wait: 500,
      skippable: false,
    },
    { type: "dialogue", retainMedia: true, name: "Trixie", text: "..." },
    {
      type: "image",
      src: "assets/images/000Z_TrixieWIN02.webp",
      effect: "cross-dissolve",
      wait: 800,
      skippable: false,
    },
    {
      type: "image",
      src: "assets/images/000Z_TrixieWIN03.webp",
      effect: "cross-dissolve",
      wait: 800,
      skippable: false,
    },
    {
      type: "image",
      src: "assets/images/000Z_TrixieWIN02.webp",
      effect: "cross-dissolve",
      wait: 800,
      skippable: false,
    },
    {
      type: "image",
      src: "assets/images/000Z_TrixieWIN03.webp",
      effect: "cross-dissolve",
      wait: 800,
      skippable: false,
    },
    { type: "action", action: () => window.GAME.logic.gotoSeq("trixieWinPhase1Menu") },
  ];
}

export function trixieWinPhase1Menu() {
  let choices = [
    {
      text: "FG",
      action: () =>
        trixiePlayWinAnim("fg", 3, () =>
          window.GAME.logic.gotoSeq("trixieWinPhase1Menu")
        ),
    },
    {
      text: "SP",
      action: () =>
        trixiePlayWinAnim("sp", 2, () =>
          window.GAME.logic.gotoSeq("trixieWinPhase1Menu")
        ),
    },
    {
      text: "EP",
      action: () =>
        trixiePlayWinAnim("ep", 4, () =>
          window.GAME.logic.gotoSeq("trixieWinPhase1Menu")
        ),
    },
  ];
  if (window.GAME.state.winState.clicks >= 4) {
    choices.push({
      text: "TP",
      action: () => window.GAME.logic.gotoSeq("trixieWinPhase2Menu"),
    });
  }
  return [
    {
      type: "image",
      src: "assets/images/000Z_TrixieWIN02.webp",
      effect: "cross-dissolve",
      wait: 500,
      skippable: false,
    },
    { type: "choice", choices: choices },
  ];
}

export function trixiePlayWinAnim(type, wgAdd, callbackMenu) {
  window.GAME.state.winState.clicks++;
  let seq = [];
  const repeats = type === "ep" ? 5 : 4;
  seq.push({
    type: "image",
    src: `assets/images/000Z_TrixieWIN04${type}00.webp`,
    effect: "cross-dissolve",
    wait: 400,
    skippable: false,
  });

  for (let i = 0; i < repeats; i++) {
    seq.push({
      type: "image",
      src: `assets/images/000Z_TrixieWIN04${type}01.webp`,
      effect: "cross-dissolve",
      wait: 300,
      skippable: false,
    });
    seq.push({
      type: "image",
      src: `assets/images/000Z_TrixieWIN04${type}02.webp`,
      effect: "cross-dissolve",
      wait: 300,
      skippable: false,
      action: () => {
        if(window.GAME.audio && window.GAME.audio.playVoice) {
            window.GAME.audio.playVoice("assets/voice/0Z_VOG01fg.ogg");
        }
      }
    });
  }

  seq.push({
    type: "action",
    action: () => {
      trixieUpdateWinState(0, wgAdd, callbackMenu);
    },
  });

  window.GAME.logic.gotoSeq(seq);
}

export function trixieWinPhase2Menu() {
  return [
    {
      type: "image",
      src: "assets/images/000Z_TrixieWIN04.webp",
      effect: "cross-dissolve",
      wait: 500,
      skippable: false,
    },
    {
      type: "choice",
      choices: [
        { text: "GS", action: () => trixiePlayWinAnimGS() },
        { text: "TSF", action: () => window.GAME.logic.gotoSeq("trixieWinPhase3Menu") },
      ],
    },
  ];
}

export function trixiePlayWinAnimGS() {
  let seq = [];
  seq.push({
    type: "image",
    src: `assets/images/000Z_TrixieWIN04gs00.webp`,
    effect: "cross-dissolve",
    wait: 400,
    skippable: false,
  });
  for (let i = 0; i < 4; i++) {
    seq.push({
      type: "image",
      src: `assets/images/000Z_TrixieWIN04gs01.webp`,
      effect: "cross-dissolve",
      wait: 300,
      skippable: false,
      action: () => {
        if(window.GAME.audio && window.GAME.audio.playVoice) {
            const wg = window.GAME.state.winState.wg;
            let voice = "VOGF01_low.ogg";
            if (wg > 60 && wg < 85) voice = "VOGF01_med.ogg";
            if (wg >= 95) voice = "VOGF01_hig.ogg";
            window.GAME.audio.playVoice(`assets/voice/${voice}`);
        }
      },
    });
    seq.push({
      type: "image",
      src: `assets/images/000Z_TrixieWIN04gs02.webp`,
      effect: "cross-dissolve",
      wait: 200,
      skippable: false,
    });
    seq.push({
      type: "image",
      src: `assets/images/000Z_TrixieWIN04gs03.webp`,
      effect: "cross-dissolve",
      wait: 200,
      skippable: false,
    });
  }
  seq.push({
    type: "action",
    action: () =>
      trixieUpdateWinState(2, 4, () =>
        window.GAME.logic.gotoSeq("trixieWinPhase2Menu")
      ),
  });
  window.GAME.logic.gotoSeq(seq);
}

export function trixieWinPhase3Menu() {
  return [
    {
      type: "image",
      src: "assets/images/000Z_TrixieWIN05.webp",
      effect: "cross-dissolve",
      wait: 500,
      skippable: false,
    },
    {
      type: "choice",
      choices: [
        { text: "MS", action: () => trixiePlayWinAnimTSF("ms", 4, 4) },
        { text: "CG", action: () => trixiePlayWinAnimTSF("cg", 4, 4) },
        { text: "DS", action: () => trixiePlayWinAnimTSF("ds", 4, 5) },
      ],
    },
  ];
}

export function trixiePlayWinAnimTSF(type, wbAdd, wgAdd) {
  let seq = [];
  seq.push({
    type: "image",
    src: `assets/images/000Z_TrixieWIN05${type}00.webp`,
    effect: "cross-dissolve",
    wait: 400,
    skippable: false,
  });

  const repeats = type === "ds" ? 10 : 8;
  for (let i = 0; i < repeats; i++) {
    seq.push({
      type: "image",
      src: `assets/images/000Z_TrixieWIN05${type}01.webp`,
      effect: "cross-dissolve",
      wait: 200,
      skippable: false,
      action: () => {
        if(window.GAME.audio && window.GAME.audio.playVoice) {
            window.GAME.audio.playVoice("assets/voice/VOGF01.ogg");
        }
      }
    });
    seq.push({
      type: "image",
      src: `assets/images/000Z_TrixieWIN05${type}02.webp`,
      effect: "cross-dissolve",
      wait: 200,
      skippable: false,
    });
  }

  seq.push({
    type: "action",
    action: () =>
      trixieUpdateWinState(wbAdd, wgAdd, () =>
        window.GAME.logic.gotoSeq("trixieWinPhase3Menu")
      ),
  });
  window.GAME.logic.gotoSeq(seq);
}

export function trixieUpdateWinState(wbAdd, wgAdd, continueCallback) {
  window.GAME.state.winState.wb = Math.min(100, window.GAME.state.winState.wb + wbAdd);
  window.GAME.state.winState.wg = Math.min(100, window.GAME.state.winState.wg + wgAdd);
  if(window.GAME.ui && window.GAME.ui.updateWinBars) {
    window.GAME.ui.updateWinBars();
  }

  if (window.GAME.state.winState.wg >= 100) {
    window.GAME.logic.gotoSeq([
      {
        type: "image",
        src: "assets/images/000Z_TrixieWIN06ejk01.webp",
        effect: "cross-dissolve",
        wait: 600,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/00Z_TrixieWIN06ejk02.webp",
        effect: "cross-dissolve",
        wait: 600,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/00Z_TrixieWIN06ejk03.webp",
        effect: "cross-dissolve",
        wait: 600,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/00Z_TrixieWIN06ejk04.webp",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "action",
        action: () => {
          window.GAME.state.winState.wg = 0;
          if(window.GAME.ui && window.GAME.ui.updateWinBars) {
            window.GAME.ui.updateWinBars();
          }
          continueCallback();
        },
      },
    ]);
  } else if (window.GAME.state.winState.wb >= 100) {
    if(window.GAME.ui && window.GAME.ui.hideWinBars) {
        window.GAME.ui.hideWinBars();
    }
    window.GAME.logic.gotoSeq([
      {
        type: "image",
        src: "assets/images/00Z_TrixieWIN07endF01.webp",
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/00Z_TrixieWIN07endF02.webp",
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/00Z_TrixieWIN07endF03.webp",
        effect: "cross-dissolve",
        wait: 800,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/00Z_TrixieWIN07endF04.webp",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      {
        type: "image",
        src: "assets/images/00Z_TrixieWIN08end01.webp",
        effect: "cross-dissolve",
        wait: 1000,
        skippable: false,
      },
      { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "..." },
      {
        type: "image",
        src: "assets/images/00Z_TrixieWIN08end02.webp",
        effect: "cross-dissolve",
        wait: 1500,
        skippable: false,
      },
      { bg: "black", effect: "cross-dissolve", wait: 1500, skippable: false },
      {
        type: "action",
        action: () => {
            if (window.GAME && window.GAME.logic) {
                window.GAME.logic.gotoSeq("Phase01Trixie_50");
            }
        }
      },
    ]);
  } else {
    continueCallback();
  }
}

// Sub-functions are exported directly.
