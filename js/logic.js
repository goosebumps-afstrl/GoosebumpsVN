export const logic = {
  storyState: {
    step: 0,
    sequence: [],
    onComplete: null,
    isTyping: false,
    typingTimeout: null,
    waitTimeout: null,
    textCompleted: false,
    currentMediaEl: null,
    pausedForChoice: false,
    preloadedImages: new Set(),
  },

  // Helper Animasi Stat
  animateStat(statName, startVal, endVal, duration) {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = startVal + (endVal - startVal) * progress;

      GAME.state.stats[statName] = currentVal;
      GAME.ui.updateHUD(); // Render animasi ke DOM

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        GAME.state.stats[statName] = endVal;
        GAME.ui.updateHUD();
      }
    };
    requestAnimationFrame(animate);
  },



  startInputScene() {
    if (GAME.getInitialState) {
        GAME.state = GAME.getInitialState();
    }
    GAME.ui.changeScene("scene-input", "fade-black");
    ["name", "condition", "tutorial"].forEach((step) => {
      const el = document.getElementById(`input-step-${step}`);
      if (el) {
        el.classList.add("hidden");
        el.classList.remove("animate-motion-in", "animate-motion-out", "flex");
      }
    });
    setTimeout(() => {
      this.changeInputStep(null, "input-step-name");
    }, 500);
  },

  changeInputStep(oldStepId, newStepId) {
    const oldEl = oldStepId ? document.getElementById(oldStepId) : null;
    const newEl = newStepId ? document.getElementById(newStepId) : null;
    if (oldEl) {
      oldEl.classList.remove("animate-motion-in");
      oldEl.classList.add("animate-motion-out");
      setTimeout(() => {
        oldEl.classList.add("hidden");
        oldEl.classList.remove("flex", "animate-motion-out");
        if (newEl) {
          newEl.classList.remove("hidden");
          newEl.classList.add("flex", "animate-motion-in");
        }
      }, 500);
    } else if (newEl) {
      newEl.classList.remove("hidden");
      newEl.classList.add("flex", "animate-motion-in");
    }
  },



  setName() {
    const input = document.getElementById("input-name").value.trim();
    if (input !== "") {
      if (input.length > 7 || !/^[a-zA-Z]+$/.test(input)) {
        GAME.ui.showToast("<span style='font-size: 0.5rem; line-height: 1.4; display: block;'>Gunakan nama lain maksimal 7 huruf.</span>");
        return;
      }
      GAME.state.name = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    } else {
      GAME.state.name = "James";
    }
    
    // Set default condition stats
    GAME.state.stats.cha = 50;
    GAME.state.stats.wis = 50;
    
    this.startTutorial();
  },

  async startTutorial() {
    this.changeInputStep("input-step-name", "input-step-tutorial");
    await new Promise((resolve) => setTimeout(resolve, 600));

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const hud = document.getElementById("tutorial-hud");
    const textBox = document.getElementById("tutorial-text-box");
    const textEl = document.getElementById("tutorial-text");
    const tapIndicator = document.getElementById("tutorial-tap-indicator");
    const barE = document.getElementById("tut-bar-energy");
    const barH = document.getElementById("tut-bar-hunger");
    const barC = document.getElementById("tut-bar-composure");
    const txtE = document.getElementById("tut-text-energy");
    const txtH = document.getElementById("tut-text-hunger");
    const txtC = document.getElementById("tut-text-composure");

    let isTransitioning = false;
    const waitForTap = () =>
      new Promise((resolve) => {
        const scene = document.getElementById("input-step-tutorial");
        const handler = () => {
          if (isTransitioning) return;
          scene.removeEventListener("click", handler);
          resolve();
        };
        scene.addEventListener("click", handler);
      });

    const showStep = async (text, setupAction) => {
      isTransitioning = true;
      if (setupAction) setupAction();
      textEl.innerHTML = text;
      tapIndicator.classList.add("opacity-0");
      textBox.classList.remove("opacity-0");
      textBox.classList.add("opacity-100");
      await sleep(500);
      isTransitioning = false;
      tapIndicator.classList.remove("opacity-0");
      await waitForTap();
      isTransitioning = true;
      tapIndicator.classList.add("opacity-0");
      textBox.classList.remove("opacity-100");
      textBox.classList.add("opacity-0");
      await sleep(500);
    };

    await sleep(500);
    hud.classList.remove("opacity-0");
    hud.classList.add("opacity-100");

    await showStep(
      "Selama permainan, kondisi kamu akan ditentukan oleh 3 indikator.",
      () => {
        barE.style.width = "0%";
        txtE.innerText = "0%";
        barH.style.width = "0%";
        txtH.innerText = "0%";
        barC.style.width = "0%";
        txtC.innerText = "0%";
      },
    );

    await showStep(
      "Indikator bar energi untuk menjaga agar kamu dapat bekerja dan melakukan aktifitas berat, energi akan berkurang saat kamu melakukan pekerjaan dan kamu dapat mengisinya kembali dengan tidur di apartemen.",
      () => {
        barE.style.width = "100%";
        txtE.innerText = "100%";
      },
    );

    await showStep(
      "Indikator bar hungry untuk menjaga rasa lapar dan composure kamu tidak turun. Kamu dapat memakan item dari mini market di tab item kamu pada bagian dapur atau tas item di handphone.",
      () => {
        barE.style.width = "0%";
        txtE.innerText = "0%";
        barH.style.width = "100%";
        txtH.innerText = "100%";
      },
    );

    await showStep(
      "Indikator bar composure untuk menjaga kamu agar tetap hidup di dalam game. Composure akan turun bila kamu secara terus menerus menahan rasa lapar dan mendapatkan kejadian buruk di dalam game. Bila bar composure menyentuh angka 0 maka game akan otomatis selesai.",
      () => {
        barH.style.width = "0%";
        txtH.innerText = "0%";
        barC.style.width = "100%";
        txtC.innerText = "100%";
      },
    );

    if (GAME.audio && GAME.audio.stopAllBGM) GAME.audio.stopAllBGM();

    hud.classList.remove("opacity-100");
    hud.classList.add("opacity-0");

    const bgOverlay = document.createElement("div");
    bgOverlay.className =
      "absolute inset-0 bg-black z-50 transition-opacity duration-1000 opacity-0 pointer-events-none";
    document.getElementById("scene-input").appendChild(bgOverlay);

    await sleep(100);
    bgOverlay.classList.remove("opacity-0");
    bgOverlay.classList.add("opacity-100");
    GAME.ui.updateHUD();
    this.startGameReal();
  },

  startStory(sequence, onComplete, transitionType = "fade-black", startStep = 0) {
    this.storyState.step = startStep;
    this.storyState.sequence = sequence;
    this.storyState.onComplete = onComplete || null;

    const sceneStory = document.getElementById("scene-story");
    if (!sceneStory.classList.contains("active")) {
      document.getElementById("story-media-layer").innerHTML = "";
      this.storyState.currentMediaEl = null;
      GAME.ui.changeScene("scene-story", transitionType);
    }

    this.storyState.pausedForChoice = false;
    GAME.ui.hideChoices();

    if (startStep > 0) {
      const mediaLayer = document.getElementById("story-media-layer");
      if (mediaLayer && mediaLayer.childElementCount === 0 && sequence) {
        for (let i = startStep - 1; i >= 0; i--) {
          const pastStep = sequence[i];
          if (pastStep && pastStep.src && (pastStep.type === "image" || pastStep.type === "video" || pastStep.type === "dialogue")) {
            let mediaEl;
            if (pastStep.src.endsWith(".webm") || pastStep.src.endsWith(".webm")) {
              mediaEl = document.createElement("video");
              mediaEl.src = pastStep.src;
              mediaEl.autoplay = true;
              mediaEl.loop = true;
              mediaEl.muted = true;
              mediaEl.playsInline = true;
            } else {
              mediaEl = document.createElement("img");
              mediaEl.src = pastStep.src;
            }
            mediaEl.className = "absolute inset-0 w-full h-full object-cover z-10 opacity-100";
            mediaLayer.appendChild(mediaEl);
            this.storyState.currentMediaEl = mediaEl;
            
            if (pastStep.bgm) {
              GAME.audio.playBGM(pastStep.bgm);
            }
            break;
          } else if (pastStep && (pastStep.bg === "black" || pastStep.bg === "white")) {
            const mediaEl = document.createElement("div");
            mediaEl.className = `absolute inset-0 w-full h-full bg-${pastStep.bg} z-10 opacity-100`;
            mediaLayer.appendChild(mediaEl);
            this.storyState.currentMediaEl = mediaEl;
            break;
          }
        }
      }
    }

    this.playStoryStep();
  },



  playStoryStep() {
    if (this.storyState.pausedForChoice) return;

    const stepIdx = this.storyState.step;
    const sequence = this.storyState.sequence;

    if (!sequence || stepIdx >= sequence.length) {
      const onCompleteCb = this.storyState.onComplete;
      this.storyState.sequence = null;
      this.storyState.onComplete = null;
      if (typeof onCompleteCb === "function") {
        onCompleteCb();
      }
      return;
    }

    // --- LOOKAHEAD PRELOADING ---
    // Preload next 3 images silently to prevent delay and white flashes
    for (let i = stepIdx + 1; i <= stepIdx + 3; i++) {
        if (i < sequence.length) {
            const lookaheadStep = sequence[i];
            if (lookaheadStep.type === "image" && lookaheadStep.src && !this.storyState.preloadedImages.has(lookaheadStep.src)) {
                this.storyState.preloadedImages.add(lookaheadStep.src);
                const img = new Image();
                img.src = lookaheadStep.src;
            }
        }
    }
    // ----------------------------

    const stepData = sequence[stepIdx];
    const playerName = GAME.state.name || "James";
    
    // Simpan step aktif ke state agar bisa diload
    GAME.state.currentStoryStep = stepIdx;

    if (this.storyState.waitTimeout) clearTimeout(this.storyState.waitTimeout);
    if (this.storyState.typingTimeout)
      clearInterval(this.storyState.typingTimeout);

    this.storyState.isTyping = false;
    this.storyState.textCompleted = false;

    if (this.storyState.mediaSkipTimeout) {
      clearTimeout(this.storyState.mediaSkipTimeout);
    }
    if (this.storyState.dialogueCooldownTimeout) {
      clearTimeout(this.storyState.dialogueCooldownTimeout);
    }
    this.storyState.canProceedDialogue = false;

    this.storyState.canSkipMedia = false;
    this.storyState.mediaSkipTimeout = setTimeout(() => {
      this.storyState.canSkipMedia = true;
    }, 1000);

    const dialogueUI = document.getElementById("story-dialogue-ui");
    const gradient = document.getElementById("story-gradient");
    const tapIndicator = document.getElementById("story-tap-indicator");

    if (stepData.type === "action") {
      if (stepData.action) stepData.action();
      if (
        this.storyState.sequence === sequence &&
        this.storyState.step === stepIdx
      ) {
        this.nextStoryStep();
      }
      return;
    }

    if (stepData.type === "choice") {
      this.storyState.pausedForChoice = true;
      GAME.ui.renderChoices(stepData.choices);
      return;
    }

    if (stepData.type === "dialogue") {
      dialogueUI.classList.remove("opacity-0");
      gradient.classList.remove("opacity-0");
      tapIndicator.classList.add("opacity-0");

      const npcNameEl = document.getElementById("story-npc-name");
      const npcBorderEl = document.getElementById("story-npc-border");
      npcNameEl.innerText = stepData.name;

      if (stepData.color) {
        npcNameEl.style.color = stepData.color;
        npcBorderEl.style.borderColor = stepData.color;
      } else if (stepData.name === "Sean") {
        npcNameEl.style.color = "#60a5fa";
        npcBorderEl.style.borderColor = "#60a5fa";
      } else if (stepData.name === "Chloe") {
        npcNameEl.style.color = "#e69b35";
        npcBorderEl.style.borderColor = "#e69b35";
      } else {
        npcNameEl.style.color = "#ffffff";
        npcBorderEl.style.borderColor = "#ffffff";
      }

      document.getElementById("story-text").innerHTML = "";
    } else if (!stepData.retainDialogue) {
      dialogueUI.classList.add("opacity-0");
      gradient.classList.add("opacity-0");
    }

    if (!stepData.retainMedia) {
      const mediaLayer = document.getElementById("story-media-layer");
      let newMediaEl = null;

      if (stepData.type === "video") {
        newMediaEl = document.createElement("video");
        newMediaEl.autoplay = true;
        newMediaEl.muted = true;
        newMediaEl.playsInline = true;
        newMediaEl.className =
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0 z-10";

        if (stepData.src.includes(".m3u8") && window.Hls && Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(stepData.src);
          hls.attachMedia(newMediaEl);
          hls.on(Hls.Events.MANIFEST_PARSED, function () {
            newMediaEl.play().catch(e => console.error("Video play failed:", e));
          });
          hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
              console.error("HLS fatal error:", data);
              setTimeout(() => { if (newMediaEl.onended) newMediaEl.onended(); }, 1000);
            }
          });
        } else {
          newMediaEl.src = stepData.src;
        }

        newMediaEl.onerror = () => {
          console.error("Video failed to load:", stepData.src);
          setTimeout(() => { if (newMediaEl.onended) newMediaEl.onended(); }, 1000);
        };
        newMediaEl.onended = () => this.nextStoryStep();
      } else if (
        (stepData.type === "image" || stepData.type === "dialogue") &&
        stepData.src
      ) {
        if (stepData.src.endsWith(".webm") || stepData.src.endsWith(".webm")) {
          newMediaEl = document.createElement("video");
          newMediaEl.src = stepData.src;
          newMediaEl.autoplay = true;
          newMediaEl.loop = true;
          newMediaEl.muted = true;
          newMediaEl.playsInline = true;
        } else {
          newMediaEl = document.createElement("img");
          newMediaEl.src = stepData.src;
        }

        let extraClasses = (newMediaEl.tagName === "IMG" && !stepData.noBreathing) ? " animate-breathing" : "";
        newMediaEl.className =
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0 z-10" + extraClasses;
      } else if (stepData.bg === "black" || stepData.bg === "white") {
        newMediaEl = document.createElement("div");
        newMediaEl.className =
          `absolute inset-0 w-full h-full bg-${stepData.bg} transition-opacity duration-1000 opacity-0 z-10`;
      }

      if (newMediaEl) {
        mediaLayer.appendChild(newMediaEl);

        const applyTransition = () => {
          if (stepData.audio) GAME.audio.playSFX(stepData.audio);
          if (stepData.bgm) GAME.audio.playBGM(stepData.bgm);
          void newMediaEl.offsetWidth;

          if (stepData.effect === "wake-up") {
            newMediaEl.classList.remove("opacity-0");
            newMediaEl.classList.add("opacity-100", "animate-wake-up");
          } else if (stepData.effect === "blur-shake") {
            newMediaEl.classList.remove("opacity-0");
            newMediaEl.classList.add("opacity-100", "animate-blur-shake");
          } else if (stepData.effect === "blur-pulse-1") {
            newMediaEl.classList.remove("opacity-0");
            newMediaEl.classList.add("opacity-100", "animate-blur-pulse-1");
          } else if (stepData.effect === "blur-pulse-2") {
            newMediaEl.classList.remove("opacity-0");
            newMediaEl.classList.add("opacity-100", "animate-blur-pulse-2");
          } else if (stepData.effect === "blur-oscillate") {
            newMediaEl.classList.remove("opacity-0");
            newMediaEl.classList.add("opacity-100", "animate-blur-oscillate");
          } else {
            newMediaEl.classList.remove("opacity-0");
            newMediaEl.classList.add("opacity-100");
          }

          if (this.storyState.currentMediaEl) {
            const oldMedia = this.storyState.currentMediaEl;
            oldMedia.classList.replace("z-10", "z-0");
            // Do not fade out old media; let the new media fade in ON TOP of it to prevent a black dip.
            setTimeout(() => {
              if (oldMedia.parentNode) oldMedia.parentNode.removeChild(oldMedia);
            }, 1500);
          }
          this.storyState.currentMediaEl = newMediaEl;
        };

        if (stepData.type === "video") {
          let hasTransitioned = false;
          const doTransition = () => {
            if (hasTransitioned) return;
            hasTransitioned = true;
            applyTransition();
          };
          newMediaEl.addEventListener('canplay', doTransition, { once: true });
          // Fallback just in case canplay doesn't fire
          setTimeout(doTransition, 2000);
        } else {
          applyTransition();
        }
      }
    }

    if (
      (stepData.type === "image" || stepData.bg === "black" || stepData.bg === "white") &&
      stepData.wait
    ) {
      this.storyState.waitTimeout = setTimeout(() => {
        this.nextStoryStep();
      }, stepData.wait);
    } else if (stepData.type === "dialogue" && stepData.text) {
      const fullText = stepData.text.replace(/\{name\}/g, playerName);
      if (stepData.voiceDialogue) {
          if (GAME.audio && GAME.audio.playVoiceDialogue) {
              GAME.audio.playVoiceDialogue(stepData.voiceDialogue);
          }
      }
      this.typeStoryText(fullText);
    }
  },

  typeStoryText(text) {
    if (GAME.audio && GAME.audio.playDialogueSFX) GAME.audio.playDialogueSFX();
    this.storyState.isTyping = true;
    const textEl = document.getElementById("story-text");
    const tapIndicator = document.getElementById("story-tap-indicator");
    textEl.innerHTML = "";

    const seq = this.storyState.sequence;
    const stepIdx = this.storyState.step;
    let isNextChoice = false;
    if (seq && stepIdx + 1 < seq.length) {
      isNextChoice = seq[stepIdx + 1].type === "choice";
    }
    const cooldownTime = isNextChoice ? 0 : 500;

    let i = 0;
    this.storyState.typingTimeout = setInterval(() => {
      textEl.innerHTML += text.charAt(i);
      i++;
      if (i >= text.length) {
        if (GAME.audio && GAME.audio.stopDialogueSFX) GAME.audio.stopDialogueSFX();
        clearInterval(this.storyState.typingTimeout);
        this.storyState.isTyping = false;
        this.storyState.textCompleted = true;
        
        this.storyState.dialogueCooldownTimeout = setTimeout(() => {
          this.storyState.canProceedDialogue = true;
          tapIndicator.classList.remove("opacity-0");
        }, cooldownTime);
      }
    }, 40);
  },

  handleStoryTap() {
    if (this.storyState.pausedForChoice) return;
    
    // Jangan izinkan tap jika modal (seperti HP atau opsi) sedang terbuka
    const modalPhone = document.getElementById("modal-phone");
    const modalOption = document.getElementById("modal-option");
    const modalSaveLoad = document.getElementById("modal-saveload");
    const modalConfirm = document.getElementById("modal-confirm-overwrite");
    
    if (
        (modalPhone && !modalPhone.classList.contains("hidden")) ||
        (modalOption && !modalOption.classList.contains("hidden")) ||
        (modalSaveLoad && !modalSaveLoad.classList.contains("hidden")) ||
        (modalConfirm && !modalConfirm.classList.contains("hidden"))
    ) {
        return;
    }

    const stepIdx = this.storyState.step;
    const sequence = this.storyState.sequence;

    if (!sequence || stepIdx >= sequence.length) return;
    const stepData = sequence[stepIdx];

    if (stepData.type !== "dialogue") {
      if (stepData.skippable !== false) {
        if (!this.storyState.canSkipMedia) return;
        this.nextStoryStep();
      }
    } else {
      if (this.storyState.isTyping) {
        if (GAME.audio && GAME.audio.stopDialogueSFX) GAME.audio.stopDialogueSFX();
        clearInterval(this.storyState.typingTimeout);
        this.storyState.isTyping = false;
        this.storyState.textCompleted = true;

        const playerName = GAME.state.name || "James";
        const fullText = stepData.text.replace(/\{name\}/g, playerName);

        document.getElementById("story-text").innerHTML = fullText;
        
        let isNextChoice = false;
        if (sequence && stepIdx + 1 < sequence.length) {
          const nextStep = sequence[stepIdx + 1];
          if (nextStep && nextStep.type === "choice") {
            isNextChoice = true;
          }
        }
        const cooldownTime = isNextChoice ? 0 : 500;
        
        this.storyState.dialogueCooldownTimeout = setTimeout(() => {
          this.storyState.canProceedDialogue = true;
          document.getElementById("story-tap-indicator").classList.remove("opacity-0");
        }, cooldownTime);
        
      } else if (this.storyState.textCompleted) {
        if (!this.storyState.canProceedDialogue) return;
        this.nextStoryStep();
      }
    }
  },
  addStat(statName, value, npcName = null) {
    if (npcName) {
        if (window.GAME.state.npcs[npcName]) {
            window.GAME.state.npcs[npcName][statName] += value;
            window.GAME.state.npcs[npcName][`last_${statName}_change`] = value;
        }
    } else {
        if (window.GAME.state.stats[statName] !== undefined) {
            window.GAME.state.stats[statName] += value;
            window.GAME.state.stats[`last_${statName}_change`] = value;
        }
    }
  },

  nextStoryStep() {
    if (this.storyState.waitTimeout) clearTimeout(this.storyState.waitTimeout);
    this.storyState.step++;
    this.playStoryStep();
  },

  handleStoryChoice(choiceObj) {
    GAME.ui.hideChoices();
    this.storyState.pausedForChoice = false;

    if (choiceObj.stats) {
      if (choiceObj.stats.heart_chloe !== undefined) {
        GAME.state.stats.heart_chloe += choiceObj.stats.heart_chloe;
        if (GAME.state.npcs && GAME.state.npcs.chloe)
          GAME.state.npcs.chloe.lastChange = choiceObj.stats.heart_chloe;
      }
      if (choiceObj.stats.cha !== undefined) {
        GAME.state.stats.cha += choiceObj.stats.cha;
        GAME.state.stats.last_cha_change = choiceObj.stats.cha;
      }
      if (choiceObj.stats.wis !== undefined) {
        GAME.state.stats.wis += choiceObj.stats.wis;
        GAME.state.stats.last_wis_change = choiceObj.stats.wis;
      }
      GAME.state.stats.cha = GAME.clamp(GAME.state.stats.cha, 0, 100);
      GAME.state.stats.wis = GAME.clamp(GAME.state.stats.wis, 0, 100);

      GAME.ui.updateHUD();
    }

    if (choiceObj.action) {
      choiceObj.action();
    } else if (choiceObj.next) {
      GAME.logic.gotoSeq(choiceObj.next);
    } else {
      this.nextStoryStep();
    }
  },

  gotoSeq(seqName, onComplete = null, startStep = 0) {
    if (typeof seqName === "string") {
      GAME.state.currentStorySeq = seqName;
      GAME.state.isInlineSequence = false;
    } else {
      GAME.state.isInlineSequence = true;
    }

    // Hapus pemblokir intro jika pemain sudah merespon aksi cerita
    if (GAME.state.introBlockActive) {
      GAME.state.introBlockActive = false;
      const blocker = document.getElementById('intro-blocker');
      if (blocker) blocker.parentNode.removeChild(blocker);
    }

    const seq = typeof seqName === "string" ? GAME.logic[seqName]() : seqName;
    GAME.logic.startStory(seq, onComplete, "fade-black", startStep);
  },

  // ==========================================
  // LOGIC UTAMA (Waktu, Kerja, Tidur, dll)
  // ==========================================
  startGameReal() {
    GAME.state.storyPhase = 4;
    GAME.state.pendingMayaEvent = true; // Block time actions until Maya Phase 01 is opened

    // Inisialisasi Timeline H-60 (Day 01 - Sabtu Sore)
    GAME.state.day = 0;
    GAME.state.timelineDay = 1;
    GAME.state.timePhaseIdx = 3; // Sore
    GAME.state.currentLocation = "city"; // Mulai dari kota bersama Maya

    GAME.ui.updateHUD();

    const uiElements = [
      document.getElementById("global-top-ui"),
      document.getElementById("global-bottom-ui"),
    ];
    uiElements.forEach((el) => {
      if (el) {
        el.style.opacity = "1";
        if (el.id === "global-bottom-ui") {
          Array.from(el.querySelectorAll("button")).forEach(b => b.style.pointerEvents = "none");
        }
      }
    });

    GAME.logic.gotoSeq("Phase00Game");
  },

  postIntroNews() {
    GAME.logic.returnHome("cross-dissolve");
    GAME.state.storyPhase = 4; // Lanjut ke gameplay normal Phase 4

    const videoBg = document.getElementById("maingame-bg-video");
    if (videoBg) {
      videoBg.classList.add("hidden");
      videoBg.pause();
    }

    const uiElements = [
      document.getElementById("global-top-ui"),
      document.getElementById("dynamic-content"),
      document.getElementById("global-bottom-ui"),
    ];
    uiElements.forEach((el) => {
      if (el) {
        el.style.opacity = "1";
        if (el.id === "global-bottom-ui") {
          Array.from(el.querySelectorAll("button")).forEach(b => b.style.pointerEvents = "auto");
        }
        el.style.pointerEvents = (el.id === "dynamic-content" || el.id === "global-bottom-ui" || el.id === "global-top-ui") ? "none" : "";
      }
    });

    const wrapper = document.getElementById("view-apartment");
    if (wrapper && !wrapper.classList.contains("minimized")) {
      GAME.logic.toggleApartmentView();
    }

    // Set Intro Blocker
    GAME.state.introBlockActive = true;
    const blockDiv = document.createElement('div');
    blockDiv.id = 'intro-blocker';
    blockDiv.className = 'absolute inset-0 z-40 cursor-pointer';
    blockDiv.onclick = () => { GAME.ui.showToast("Kamu harus membuka pesan di hp-mu terlebih dahulu."); };
    if (wrapper) wrapper.appendChild(blockDiv);

    // Clear the persistent notifications from the intro video smoothly
    setTimeout(() => {
      GAME.ui.clearPersistentNotifications();
    }, 1500);
  },

  openMessageApp() {
    GAME.ui.renderMessages();
    GAME.ui.toggleModal('modal-phone-message', false);
    document.getElementById('phone-app-message-dot').classList.add('hidden');
  },

  openMessageDetail(sender) {
    GAME.ui.renderMessageDetail(sender);
    GAME.ui.toggleModal('modal-message-detail', false);
    GAME.ui.renderMessages(); // Update read status on list
  },

  triggerGameOver() {
    GAME.ui.changeScene("scene-gameover");
  },

  toggleApartmentView() {
    const wrapper = document.getElementById("view-apartment");
    const icon = document.getElementById("apartment-toggle-icon");
    const doorExit = document.getElementById("door-exit-area");
    wrapper.classList.toggle("minimized");

    if (wrapper.classList.contains("minimized")) {
      icon.classList.add("rotate-180");
      if (doorExit) {
        doorExit.classList.remove("hidden");
        setTimeout(() => doorExit.classList.remove("opacity-0"), 10);
      }
    } else {
      icon.classList.remove("rotate-180");
      if (doorExit) {
        doorExit.classList.add("opacity-0");
        setTimeout(() => doorExit.classList.add("hidden"), 300);
      }
    }
  },

  performTransition(actionCallback) {
    const fader = document.getElementById("screen-fader");
    fader.style.transition = "opacity 0.4s ease-in";
    fader.style.opacity = "1";
    setTimeout(() => {
      if (typeof actionCallback === "function") {
        actionCallback();
      }
      setTimeout(() => {
        fader.style.transition = "opacity 0.6s ease-out";
        fader.style.opacity = "0";
      }, 100);
    }, 400);
  },

  advanceTime(phases) {
    let totalPhases = GAME.state.timePhaseIdx + phases;
    const daysPassed = Math.floor(totalPhases / 6);
    GAME.state.day += daysPassed;
    GAME.state.timePhaseIdx = totalPhases % 6;

    // Daily Pinjol Update
    if (daysPassed > 0 && GAME.state.loans) {
      GAME.state.loans.forEach(loan => {
        loan.daysUntilNextBill -= daysPassed;
        if (loan.daysUntilNextBill <= 0) {
          GAME.logic.addMessage({
            sender: "Greg",
            text: `Waktunya bayar hutangmu! Segera bayar cicilan $${loan.billAmount} dari pinjaman $${loan.amount} sekarang juga, atau aku akan datang mencarimu!`,
            day: GAME.state.day,
            action: { type: 'pay_bill', amount: loan.billAmount, loanId: loan.id },
            img: "assets/images/Greg_0Z0hutang02.webp"
          });
          loan.daysUntilNextBill = loan.billInterval;
        }
      });
    }

    for (let i = 0; i < phases; i++) {
      this.updateStockPrices();
    }
    let hungerLoss = phases * 5;
    GAME.state.stats.hunger = GAME.clamp(
      GAME.state.stats.hunger - hungerLoss,
      0,
      100,
    );
    if (GAME.state.stats.hunger === 0) {
      GAME.state.stats.composure = GAME.clamp(
        GAME.state.stats.composure - phases * 5,
        0,
        100,
      );
      if (GAME.state.stats.composure <= 0) {
        this.triggerGameOver();
        return;
      } else if (
        GAME.state.stats.composure > 0 &&
        GAME.state.stats.composure <= 20
      ) {
        GAME.ui.showToast("Ã¢Å¡Â Ã¯Â¸Â Sangat lapar, mentalmu mulai goyah!");
        GAME.state.composureWarned = true;
      }
    } else if (GAME.state.composureWarned && GAME.state.stats.composure > 20) {
      GAME.state.composureWarned = false;
    }
    GAME.ui.updateHUD();

    // Auto-save setiap kali waktu/hari berjalan
    this.saveGame("autosave");
  },

  sleep(durationType) {
    if (GAME.state.pendingMayaEvent) {
      GAME.ui.showToast("Cek pesan dari Maya di Handphone mu terlebih dahulu!");
      return;
    }
    if (GAME.state.storyPhase === 2) {
      GAME.logic.triggerStory2Part2();
      return;
    }
    this.performTransition(() => {
      if (durationType === 1) {
        GAME.state.stats.energy += 30;
        GAME.logic.advanceTime(1);
        GAME.ui.showToast("Tidur sebentar meregangkan otot.");
      } else {
        GAME.state.stats.energy += 100;
        GAME.logic.advanceTime(3);
        GAME.ui.showToast("Tidur panjang yang nyenyak.");
      }
      this.saveGame("autosave");
      GAME.ui.changeView("view-apartment", false);
    });
  },

  takeBath() {
    if (GAME.state.pendingMayaEvent) {
      GAME.ui.showToast("Cek pesan dari Maya di Handphone mu terlebih dahulu!");
      return;
    }
    if (GAME.state.storyPhase === 2) {
      GAME.logic.triggerStory2Part2();
      return;
    }
    this.performTransition(() => {
      GAME.state.stats.composure += 10;
      GAME.logic.advanceTime(1);
      GAME.ui.showToast("Mandi air dingin, terasa segar.");
      GAME.ui.changeView("view-apartment", false);
    });
  },

  work(jobId) {
    if (GAME.state.pendingMayaEvent) {
      GAME.ui.showToast("Cek pesan dari Maya di Handphone mu terlebih dahulu!");
      GAME.ui.renderJobCards();
      return;
    }
    const job = GAME.constants.jobList.find(j => j.id === jobId);
    if (!job) {
      GAME.ui.showToast("Pekerjaan tidak ditemukan.");
      return;
    }

    if (GAME.state.stats.energy < Math.abs(job.energy)) {
      GAME.ui.showToast("Energy tidak cukup untuk bekerja!");
      GAME.ui.renderJobCards(); // Put card back
      return;
    }

    this.performTransition(() => {
      GAME.state.stats.energy += job.energy;
      GAME.state.stats.hunger += job.hunger;
      if (job.composure) GAME.state.stats.composure += job.composure;

      GAME.state.money += job.pay;
      GAME.logic.advanceTime(job.hours);

      GAME.ui.showToast(`Bekerja sebagai ${job.title} menghasilkan $${job.pay}.`);
      this.saveGame("autosave");

      GAME.ui.renderJobCards();
    });
  },

  // ==========================================
  // MAP VN EVENTS
  // ==========================================

  openCityMap(forceImage = null) {
    if (GAME.state.pendingMayaEvent && !GAME.state.isPhase00SpecialMap) {
      GAME.ui.showToast("Cek pesan dari Maya di Handphone mu terlebih dahulu!");
      return;
    }
    if (GAME.state.storyPhase === 2) {
      GAME.logic.triggerStory2Part2();
      return;
    }
    const timeIdx = GAME.state.timePhaseIdx;
    const randomImgIdx = Math.floor(Math.random() * 8) + 1;
    let timeString = "siang";
    if (timeIdx === 0 || timeIdx >= 4) {
      timeString = "malam";
    } else if (timeIdx === 1) {
      timeString = "pagi";
    } else if (timeIdx === 3) {
      timeString = "sore";
    }
    const img02 = `assets/images/0Z0maps_${timeString}_${randomImgIdx}.webp`;

    const showMapOverlay = (bgImg) => {
      GAME.state.currentStorySeq = null;
      GAME.state.currentStoryStep = 0;
      GAME.state.currentLocation = "city";
      
      // Tampilkan overlay map dengan background image
      GAME.ui.toggleCityMap(true, bgImg);


      // Hide all conditional buttons first
      ['btn-map-trixie', 'btn-map-clara', 'btn-map-dasha', 'btn-map-vanya'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.add('hidden');
      });

      // Show buttons based on story phase history/variables
      if (GAME.state.npcs && GAME.state.npcs.trixie && GAME.state.npcs.trixie.storyPhase >= 2) {
         const btn = document.getElementById('btn-map-trixie');
         if (btn) btn.classList.remove('hidden');
      }
      if (GAME.state.npcs && GAME.state.npcs.clara && GAME.state.npcs.clara.storyPhase >= 5) {
         const btn = document.getElementById('btn-map-clara');
         if (btn) btn.classList.remove('hidden');
      }
      if (GAME.state.npcs && GAME.state.npcs.dasha && GAME.state.npcs.dasha.storyPhase >= 2) {
         const btn = document.getElementById('btn-map-dasha');
         if (btn) btn.classList.remove('hidden');
      }
      if (GAME.state.npcs && GAME.state.npcs.vanya && GAME.state.npcs.vanya.storyPhase >= 1) {
         const btn = document.getElementById('btn-map-vanya');
         if (btn) btn.classList.remove('hidden');
      }
    };

    if (forceImage) {
      showMapOverlay(forceImage);
    } else if (GAME.state.currentLocation === "apartment") {
      const seq = [
        { type: "image", src: "assets/images/0Z0keluargedung01.webp", wait: 1500, skippable: true },
        { type: "image", src: img02, effect: "cross-dissolve", wait: 1000, skippable: true }
      ];
      GAME.logic.startStory(seq, () => showMapOverlay(img02));
    } else {
      showMapOverlay(img02);
    }
  },

  // ==========================================
  // LOGIC EKONOMI & SAHAM
  // ==========================================
  returnHome(transitionType = "fade-black") {
    GAME.state.currentLocation = "apartment";
    GAME.ui.updateBackground();
    const wrapper = document.getElementById("view-apartment");
    const icon = document.getElementById("apartment-toggle-icon");
    if (wrapper && wrapper.classList.contains("minimized")) {
      wrapper.classList.remove("minimized");
      if (icon) icon.classList.remove("rotate-180");
    }
    GAME.ui.changeScene("scene-maingame", transitionType);
    GAME.ui.changeView("view-apartment", false);
  },

  showStoryLocation(locName) {
    document.getElementById("story-loc-title").innerText = locName;
    GAME.ui.changeView("view-story-location");
  },

  enterMapLocation(actionCallback, videoSrc) {
    if (GAME.state.isPhase00SpecialMap) {
      if (actionCallback === GAME.locations.Minimarket.enter || actionCallback === GAME.locations.TamanKota.enter) {
        // Bebas akses, treat khusus di closeMinimarket/closeTamanKota
      } else if (actionCallback === GAME.locations.KantorUXBR.enter) {
        GAME.ui.showToast("saat ini kamu sedang tidak bisa ke kantor");
        return;
      } else if (actionCallback === GAME.locations.Bar.enter) {
        GAME.ui.showToast("kembali lagi saat malam hari");
        return;
      } else if (actionCallback === GAME.locations.PusatKerja.enter) {
        GAME.ui.showToast("kembali lagi besok");
        return;
      } else if (actionCallback === GAME.logic.returnHome) {
        GAME.state.isPhase00SpecialMap = false;
        actionCallback = () => { GAME.logic.gotoSeq("Phase00Game_TVNews"); };
      } else {
        GAME.ui.showToast("Kamu tidak bisa ke sana sekarang.");
        return;
      }
    }

    GAME.ui.toggleCityMap(false);

    if (videoSrc) {
      const seq = [
        { type: "video", src: videoSrc, effect: "cross-dissolve", wait: 2000, skippable: true },
        { bg: "black", effect: "cross-dissolve", wait: 500 }
      ];
      GAME.logic.startStory(seq, () => {
        actionCallback();
      }, "none");
    } else {
      const seq = [
        { bg: "black", effect: "cross-dissolve", wait: 500 }
      ];
      GAME.logic.startStory(seq, () => {
        actionCallback();
      }, "none");
    }
  },

  
  enterTrixiePlace() {
    GAME.ui.showToast("Tempat Trixie sedang dalam pengembangan.");
  },

  enterClaraPlace() {
    GAME.ui.showToast("Tempat Clara sedang dalam pengembangan.");
  },

  enterDashaPlace() {
    GAME.ui.showToast("Tempat Dasha sedang dalam pengembangan.");
  },

  enterVanyaPlace() {
    GAME.ui.showToast("Tempat Vanya sedang dalam pengembangan.");
  },

  updateStockPrices() {
    if (!GAME.state.stockPrices) return;
    GAME.constants.stocks.forEach((stock) => {
      if (!GAME.state.stockPrices[stock.id]) {
        GAME.state.stockPrices[stock.id] = {
          current: stock.base,
          prev: stock.base,
          history: [stock.base],
        };
      }
      const data = GAME.state.stockPrices[stock.id];
      data.prev = data.current;
      const changePercent = Math.random() * (stock.vol * 2) - stock.vol;
      let newPrice = data.current * (1 + changePercent);
      if (newPrice > stock.base * 4) newPrice *= 0.9;
      if (newPrice < stock.base * 0.2) newPrice *= 1.1;
      newPrice = Math.max(1, newPrice);
      data.current = newPrice;
      if (!data.history) data.history = [data.prev];
      data.history.push(newPrice);
      if (data.history.length > 20) data.history.shift();
    });
  },

  openInventoryFromPhone() {
    GAME.ui.toggleModal('modal-phone', false);
    GAME.ui.renderPhoneInventory('food');
    GAME.ui.toggleModal('modal-phone-inventory', false);
  },

  openPinjolApp() {
    GAME.ui.toggleModal('modal-phone', false);
    GAME.ui.renderPinjolApp();
    GAME.ui.toggleModal('modal-phone-pinjol', false);
  },

  borrowPinjol(loanId) {
    const loan = GAME.constants.pinjolOptions.find(l => l.id === loanId);
    if (!loan) return;
    GAME.ui.showConfirm(
      "Konfirmasi Pinjaman",
      `Ajukan pinjaman sebesar $${loan.amount} dengan cicilan $${loan.billAmount}/${loan.billInterval} hari selama ${loan.maxTenor}x?`,
      () => {
        GAME.state.money += loan.amount;
        GAME.state.loans.push({
          id: 'loan_' + Date.now(),
          loanId: loan.id,
          amount: loan.amount,
          billAmount: loan.billAmount,
          billInterval: loan.billInterval,
          daysUntilNextBill: loan.billInterval,
          paidTenor: 0,
          maxTenor: loan.maxTenor
        });

        GAME.logic.addMessage({
          sender: "Greg",
          text: `Terima kasih telah menggunakan layanan Pinjol Cepat. Pinjaman $${loan.amount} Anda telah cair. Jangan telat bayar cicilan $${loan.billAmount} dalam ${loan.billInterval} hari, atau Anda berurusan dengan saya!`,
          day: GAME.state.day,
          action: null,
          img: "assets/images/Greg_0Z0hutang01.webp"
        });

        GAME.ui.renderPinjolApp();
        GAME.ui.updateHUD();
      }
    );
  },



  payBill(msgId, amount, loanId) {
    if (GAME.state.money < amount) {
      GAME.ui.showToast("Uang Anda tidak cukup untuk membayar tagihan ini!");
      return;
    }

    GAME.state.money -= amount;

    if (loanId) {
      const loan = GAME.state.loans.find(l => l.id === loanId);
      if (loan) {
        loan.paidTenor++;
        loan.daysUntilNextBill = loan.billInterval;
        GAME.ui.showToast(`Cicilan ke-${loan.paidTenor} sebesar $${amount} berhasil dibayar.`);

        if (loan.paidTenor >= loan.maxTenor) {
          GAME.state.loans = GAME.state.loans.filter(l => l.id !== loanId);
          GAME.ui.showToast("Pinjaman telah lunas!");
        }
      }
    } else {
      GAME.ui.showToast(`Tagihan sebesar $${amount} berhasil dibayar.`);
    }

    const msg = GAME.state.messages.find(m => m.id === msgId);
    if (msg) {
      msg.action = null;
    }

    GAME.ui.updateHUD();
    GAME.ui.toggleModal('modal-message-detail');
  },

  addMessage(msgData) {
    if (!GAME.state.messages) GAME.state.messages = [];
    const newMsg = {
      id: 'msg_' + Date.now() + Math.floor(Math.random() * 1000),
      sender: msgData.sender || "Unknown",
      text: msgData.text || "",
      day: msgData.day || GAME.state.day,
      isRead: false,
      action: msgData.action || null,
      img: msgData.img || null
    };
    // Put at the beginning
    GAME.state.messages.unshift(newMsg);
    GAME.ui.updateHUD();
    GAME.audio.playSFX("pesan");
  },

  handleMessageAction(msgId, actionId) {
    const msg = GAME.state.messages.find(m => m.id === msgId);
    if (!msg || msg.hasResponded) return; // Prevent double clicking

    // 1. Mark as responded
    msg.hasResponded = true;
    msg.respondedWith = actionId;
    GAME.ui.renderMessageDetail(msg.sender); // Re-render to show disabled buttons immediately
    
    // 2. Find the action object to apply stat changes silently
    if (msg.actions) {
        const actData = msg.actions.find(a => a.action === actionId);
        if (actData && actData.statChanges) {
            if (actData.statChanges.cha) {
                GAME.state.cha = Math.min(10, GAME.state.cha + actData.statChanges.cha);
                GAME.state.last_cha_change = actData.statChanges.cha; // Update history for phone
            }
            if (actData.statChanges.wis) {
                GAME.state.wis = Math.min(10, GAME.state.wis + actData.statChanges.wis);
                GAME.state.last_wis_change = actData.statChanges.wis;
            }
            if (actData.statChanges.mayaLove) {
                if (!GAME.state.npc) GAME.state.npc = {};
                if (!GAME.state.npc.maya) GAME.state.npc.maya = { love: 0 };
                GAME.state.npc.maya.love += actData.statChanges.mayaLove;
                GAME.state.npc.maya.last_love_change = actData.statChanges.mayaLove;
            }
            // Add other stats if necessary
        }
    }

    // 3. Delegate to story sequence handler if exists, otherwise fallback to gotoSeq
    if (window.GAME && window.GAME.phase00 && window.GAME.phase00.handleMayaChat && actionId.startsWith('maya_chat_reply_')) {
        window.GAME.phase00.handleMayaChat(actionId, msgId);
    } else {
        GAME.ui.toggleModal('modal-message-detail'); 
        GAME.ui.toggleModal('modal-phone'); 
        GAME.logic.gotoSeq(actionId);
    }
  },

  openSahamApp() {
    GAME.state.previousView = GAME.state.currentView;
    if (!GAME.state.portfolio) {
      GAME.state.portfolio = {};
      GAME.constants.stocks.forEach(
        (s) => (GAME.state.portfolio[s.id] = { quantity: 0, totalCost: 0 }),
      );
    }
    if (!GAME.state.stockPrices) {
      GAME.state.stockPrices = {};
      GAME.constants.stocks.forEach(
        (s) =>
        (GAME.state.stockPrices[s.id] = {
          current: s.base,
          prev: s.base,
          history: [s.base],
        }),
      );
    }
    Object.values(GAME.state.stockPrices).forEach((sp) => {
      if (!sp.history || sp.history.length < 20) {
        const history = [sp.current];
        let lastVal = sp.current;
        for (let i = 0; i < 19; i++) {
          const change = lastVal * (Math.random() * 0.1 - 0.05);
          lastVal = Math.max(1, lastVal - change);
          history.unshift(lastVal);
        }
        sp.history = history;
        sp.prev = history[history.length - 2];
      }
    });
    GAME.ui.toggleModal('modal-phone', false);
    GAME.ui.toggleModal('modal-phone-saham', false);
    GAME.ui.renderSahamList();
  },

  closeSahamApp() {
    GAME.ui.toggleModal("modal-phone-saham", false);
    GAME.ui.toggleModal("modal-phone");
  },

  openSahamDetail(id) {
    GAME.state.activeStockId = id;
    document.getElementById("saham-amount").value = 1;
    GAME.ui.toggleModal('modal-phone-saham', false);
    GAME.ui.toggleModal('modal-phone-saham-detail', false);
    GAME.ui.renderSahamDetail();
  },

  setSahamAmount(amount) {
    const id = GAME.state.activeStockId;
    if (!id) return;
    const stockData = GAME.state.stockPrices[id];
    const price = Math.floor(stockData.current);
    const maxAffordable = Math.floor(GAME.state.money / price);
    const portfolioData = GAME.state.portfolio[id] || { quantity: 0 };
    const owned = portfolioData.quantity;

    // Batas maksimal input adalah jumlah terbanyak antara yang bisa dibeli atau yang dimiliki (untuk dijual)
    const maxShares = Math.max(maxAffordable, owned);

    const inputEl = document.getElementById("saham-amount");

    let currentVal = parseInt(inputEl.value);
    if (isNaN(currentVal)) currentVal = 0;

    let newVal = currentVal + amount;
    if (newVal > maxShares) {
      newVal = maxShares;
    }
    // Cegah angka negatif
    if (newVal < 1 && maxShares >= 1) {
      newVal = 1;
    } else if (newVal < 0) {
      newVal = 0;
    }

    inputEl.value = newVal;
  },

  clampSahamAmount() {
    const id = GAME.state.activeStockId;
    if (!id) return;
    const stockData = GAME.state.stockPrices[id];
    const price = Math.floor(stockData.current);
    const maxAffordable = Math.floor(GAME.state.money / price);
    const portfolioData = GAME.state.portfolio[id] || { quantity: 0 };
    const owned = portfolioData.quantity;

    const maxShares = Math.max(maxAffordable, owned);
    const inputEl = document.getElementById("saham-amount");

    let val = parseInt(inputEl.value);
    if (!isNaN(val)) {
      if (val > maxShares) {
        inputEl.value = maxShares;
      } else if (val < 1 && maxShares >= 1) {
        inputEl.value = 1;
      } else if (val < 0) {
        inputEl.value = 0;
      }
    }
  },

  buyStock() {
    const id = GAME.state.activeStockId;
    const stockData = GAME.state.stockPrices[id];
    const price = Math.floor(stockData.current);
    let amountStr = document.getElementById("saham-amount").value;
    let amount = 0;
    if (amountStr === "MAX") {
      amount = Math.floor(GAME.state.money / price);
    } else {
      amount = parseInt(amountStr);
    }
    if (isNaN(amount) || amount <= 0) {
      GAME.ui.showToast("Masukkan jumlah yang valid");
      return;
    }
    const cost = price * amount;
    if (GAME.state.money >= cost) {
      GAME.state.money -= cost;
      if (!GAME.state.portfolio[id]) {
        GAME.state.portfolio[id] = { quantity: 0, totalCost: 0 };
      }
      GAME.state.portfolio[id].quantity += amount;
      GAME.state.portfolio[id].totalCost += cost;
      GAME.ui.updateHUD();
      GAME.ui.renderSahamDetail();
      GAME.ui.showToast(`Berhasil membeli ${amount} lembar saham ${id}`);
      document.getElementById("saham-amount").value = "1";
      this.saveGame("autosave");
    } else {
      GAME.ui.showToast(`Uang tidak cukup! Butuh $${cost}`);
    }
  },

  sellStock() {
    const id = GAME.state.activeStockId;
    const stockData = GAME.state.stockPrices[id];
    const price = Math.floor(stockData.current);
    const portfolioData = GAME.state.portfolio[id] || {
      quantity: 0,
      totalCost: 0,
    };
    const owned = portfolioData.quantity;
    let amountStr = document.getElementById("saham-amount").value;
    let amount = 0;
    if (amountStr === "MAX") {
      amount = owned;
    } else {
      amount = parseInt(amountStr);
    }
    if (isNaN(amount) || amount <= 0) {
      GAME.ui.showToast("Masukkan jumlah yang valid");
      return;
    }
    if (owned >= amount) {
      const avgCost = portfolioData.totalCost / owned;
      const costOfSoldShares = avgCost * amount;
      portfolioData.quantity -= amount;
      portfolioData.totalCost -= costOfSoldShares;
      if (portfolioData.quantity <= 0) {
        portfolioData.totalCost = 0;
      }
      const profit = price * amount;
      GAME.state.money += profit;
      GAME.ui.updateHUD();
      GAME.ui.renderSahamDetail();
      GAME.ui.showToast(`Menjual ${amount} lembar saham (+$${profit})`);
      document.getElementById("saham-amount").value = "1";
      this.saveGame("autosave");
    } else {
      GAME.ui.showToast(`Kamu hanya memiliki ${owned} lembar saham`);
    }
  },

  // ==========================================
  // LOGIC APLIKASI HP & INVENTORY
  // ==========================================


  closeInventory() {
    if (GAME.state.previousView) {
      GAME.ui.changeView(GAME.state.previousView, false);
      GAME.ui.toggleModal("modal-phone");
      GAME.state.previousView = null;
    } else {
      if (GAME.state.currentLocation === "apartment") {
        GAME.ui.changeView("view-apartment", false);
      } else if (GAME.state.currentLocation === "city") {
        GAME.ui.changeView("view-city", false);
      }
    }
  },

  useItem(id) {
    if (GAME.state.storyPhase === 2) {
      GAME.logic.triggerStory2Part2();
      return;
    }
    if (GAME.state.inventory[id] > 0) {
      GAME.state.inventory[id]--;
      const item = GAME.constants.shopItems.find((i) => i.id === id);
      GAME.state.stats.hunger += item.h;
      GAME.state.stats.energy += item.e;
      GAME.ui.updateHUD();
      GAME.ui.renderInventory();
      GAME.ui.showToast(`Mengkonsumsi ${item.name}`);
      
      if (item.type === 'drink') {
          GAME.audio.playSFX('drink');
      } else {
          GAME.audio.playSFX('eat');
      }
      
      this.saveGame("autosave");
    }
  },

  buyItem(id) {
    const item = GAME.constants.shopItems.find((i) => i.id === id);
    if (GAME.state.money >= item.price) {
      GAME.state.money -= item.price;
      GAME.state.inventory[id]++;
      GAME.ui.updateHUD();
      GAME.ui.showToast(`Berhasil membeli ${item.name}`);
      GAME.audio.playSFX('money');
      this.saveGame("autosave");
    } else {
      GAME.ui.showToast("❌ Uang tidak cukup!");
    }
  },

  // ==========================================
  // LOGIC SAVE & LOAD
  // ==========================================
  openSaveLoadMenu(isLoadOnly = false) {
    GAME.ui.isLoadOnlyMode = isLoadOnly;
    if (!isLoadOnly) {
      GAME.state.isInlineSequence = false;
    }
    const phoneModal = document.getElementById("modal-phone");
    if (phoneModal && !phoneModal.classList.contains("hidden")) {
      GAME.ui.toggleModal("modal-phone", false);
    }
    GAME.ui.toggleModal("modal-saveload", false);
    GAME.ui.renderSaveLoadList();
  },

  closeSaveLoadMenu() {
    GAME.ui.toggleModal("modal-saveload");
  },

  handleSaveClick(slotIndex) {
    const existingSave = localStorage.getItem(`afterstroll_save_${slotIndex}`);
    if (existingSave) {
      const confirmBtn = document.getElementById("confirm-overwrite-btn");
      confirmBtn.setAttribute("data-slot", slotIndex);
      GAME.ui.toggleModal("modal-confirm-overwrite");
    } else {
      this.saveGame(slotIndex);
    }
  },

  confirmOverwrite() {
    const confirmBtn = document.getElementById("confirm-overwrite-btn");
    const slotIndex = confirmBtn.getAttribute("data-slot");
    this.saveGame(parseInt(slotIndex, 10));
    GAME.ui.toggleModal("modal-confirm-overwrite");
  },

  exportSaveFile() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('afterstroll_save_')) {
            data[key] = localStorage.getItem(key);
        }
    }
    
    if (Object.keys(data).length === 0) {
        GAME.ui.showToast("Tidak ada data save yang bisa di-backup.");
        return;
    }

    const jsonStr = JSON.stringify(data);
    // Encode to Base64 to make it look like a proprietary save file
    const encodedStr = btoa(unescape(encodeURIComponent(jsonStr)));
    const blob = new Blob([encodedStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `goosebumps_${new Date().toISOString().slice(0,10)}.save`;
    a.click();
    
    URL.revokeObjectURL(url);
    GAME.ui.showToast("Backup berhasil diunduh.");
  },

  importSaveFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            let fileContent = e.target.result.trim();
            let decodedStr = fileContent;
            
            // Try to decode Base64 (new format)
            try {
                decodedStr = decodeURIComponent(escape(atob(fileContent)));
            } catch (err) {
                // If it fails, assume it's the old raw JSON format
            }

            const data = JSON.parse(decodedStr);
            let importedCount = 0;
            for (const key in data) {
                if (key.startsWith('afterstroll_save_')) {
                    localStorage.setItem(key, data[key]);
                    importedCount++;
                }
            }
            if (importedCount > 0) {
                GAME.ui.showToast(`${importedCount} slot save berhasil dipulihkan!`);
                GAME.ui.renderSaveLoadList(); 
            } else {
                GAME.ui.showToast("File backup tidak valid atau kosong.");
            }
        } catch (err) {
            console.error(err);
            GAME.ui.showToast("Gagal membaca file backup.");
        }
        event.target.value = ''; // Reset input
    };
    reader.readAsText(file);
  },

  saveGame(slotIndex) {
    const isAutosave = slotIndex === "autosave";
    const activeSceneEl = document.querySelector(".scene.active");
    const activeSceneId = activeSceneEl ? activeSceneEl.id : "scene-maingame";
    const stateToSave = { ...GAME.state, saveTimestamp: Date.now(), savedScene: activeSceneId };
    localStorage.setItem(
      `afterstroll_save_${slotIndex}`,
      JSON.stringify(stateToSave),
    );
    if (stateToSave.composureWarned) delete stateToSave.composureWarned;
    if (!isAutosave) {
      GAME.ui.showToast(`Progres disimpan di Slot ${slotIndex + 1}`);
      GAME.ui.renderSaveLoadList();
    }
  },

  getLatestSaveSlot() {
    let latestSlot = null;
    let maxTimestamp = 0;
    const slots = ["autosave", 0, 1, 2];

    slots.forEach(slot => {
      const dataStr = localStorage.getItem(`afterstroll_save_${slot}`);
      if (dataStr) {
        try {
          const data = JSON.parse(dataStr);
          // Fallback timestamp for legacy saves: 1 so it beats no-save, but loses to new saves
          const ts = data.saveTimestamp || 1;
          if (ts >= maxTimestamp) {
            maxTimestamp = ts;
            latestSlot = slot;
          }
        } catch (e) { }
      }
    });
    return latestSlot;
  },

  loadLatestGame() {
    const slot = this.getLatestSaveSlot();
    if (slot !== null) {
      this.loadGame(slot);
    }
  },

  loadGame(slotIndex) {
    const fader = document.getElementById("screen-fader");
    const savedStateJSON = localStorage.getItem(
      `afterstroll_save_${slotIndex}`,
    );
    if (!savedStateJSON) return false;

    fader.style.transition = "opacity 0.4s ease-in";
    fader.style.opacity = "1";

    setTimeout(() => {
      [
        "modal-phone",
        "modal-option",
        "modal-saveload",
        "modal-confirm-overwrite",
      ].forEach((id) => {
        const modal = document.getElementById(id);
        if (modal) {
          modal.classList.add("hidden");
          modal.classList.remove("flex", "animate-fade-in");
        }
      });

      const doorExit = document.getElementById("door-exit-area");
      if (doorExit) {
        doorExit.style.display = "";
      }
      
      if (GAME.ui && GAME.ui.toggleCityMap) {
        GAME.ui.toggleCityMap(false);
      }

      GAME.state = JSON.parse(savedStateJSON);

      if (GAME.logic.storyState.waitTimeout) clearTimeout(GAME.logic.storyState.waitTimeout);
      if (GAME.logic.storyState.typingTimeout) clearInterval(GAME.logic.storyState.typingTimeout);
      GAME.logic.storyState.sequence = null;
      GAME.logic.storyState.step = 0;

      if (GAME.state.storyPhase === undefined) {
        GAME.state.storyPhase = 4;
      }
      
      if (!GAME.state.currentLocation) {
        GAME.state.currentLocation = "apartment";
      }

      if (
        GAME.state.portfolio &&
        typeof GAME.state.portfolio.FLE === "number"
      ) {
        const oldPortfolio = { ...GAME.state.portfolio };
        GAME.state.portfolio = {};
        GAME.constants.stocks.forEach((stock) => {
          const quantity = oldPortfolio[stock.id] || 0;
          GAME.state.portfolio[stock.id] = {
            quantity: quantity,
            totalCost: quantity > 0 ? quantity * stock.base : 0,
          };
        });
      }

      if (!GAME.state.stockPrices) {
        GAME.state.stockPrices = {};
        GAME.constants.stocks.forEach(
          (s) =>
          (GAME.state.stockPrices[s.id] = {
            current: s.base,
            prev: s.base,
            history: [s.base],
          }),
        );
      } else {
        GAME.constants.stocks.forEach((stock) => {
          const stockData = GAME.state.stockPrices[stock.id];
          if (
            stockData &&
            (!stockData.history || stockData.history.length < 2)
          ) {
            stockData.history = [stockData.prev, stockData.current];
          }
        });
      }

      if (slotIndex !== "autosave") {
        GAME.ui.showToast(`Progres dari Slot ${slotIndex + 1} dimuat`);
      }
      GAME.ui.updateHUD();

      if (GAME.state.winState && GAME.state.winState.active) {
        document.getElementById("win-bar-blue").style.opacity = "1";
        document.getElementById("win-bar-orange").style.opacity = "1";
        GAME.ui.updateWinBars();
      } else {
        document.getElementById("win-bar-blue").style.opacity = "0";
        document.getElementById("win-bar-orange").style.opacity = "0";
      }

      if (GAME.state.savedScene === "scene-story" || (GAME.state.storyPhase < 4 && GAME.state.savedScene === undefined)) {
        if (GAME.state.storyPhase === 2 && GAME.state.savedScene === undefined) {
          GAME.ui.changeView("view-apartment");
          GAME.logic.startStory2Interactive();
          GAME.ui.updateSceneAudio("scene-maingame");
        } else {
          GAME.ui.changeScene("scene-story", "none");
          GAME.ui.updateSceneAudio("scene-story");
          
          const mediaLayer = document.getElementById("story-media-layer");
          if (mediaLayer) {
            mediaLayer.innerHTML = "";
          }
          if (GAME.logic.storyState) {
            GAME.logic.storyState.currentMediaEl = null;
          }

          if (GAME.state.currentStorySeq) {
            if (GAME.state.currentStorySeq === "getStorySequence1") {
              // GAME.logic.initStoryIntro();
            } else if (
              GAME.state.currentStorySeq === "getStorySequence2Part1"
            ) {
              GAME.state.storyPhase = 1.5;
              GAME.logic.startStory(GAME.logic.getStorySequence2Part1(), () => {
                GAME.logic.startStory2Interactive();
                GAME.ui.updateSceneAudio("scene-maingame");
              });
            } else if (
              GAME.state.currentStorySeq === "getStorySequence2Part2"
            ) {
              GAME.logic.triggerStory2Part2();
            } else if (
              GAME.state.currentStorySeq === "chloeMinigamePhase" ||
              GAME.state.currentStorySeq === "seq_3_chloe_intimacy" ||
              GAME.state.currentStorySeq === "seanMinigamePhase" ||
              GAME.state.currentStorySeq === "seq_3_sean_intimacy"
            ) {
              if (GAME.state.currentStorySeq.includes("chloe")) {
                GAME.logic.gotoSeq("seq_3_chloe_intimacy", null, GAME.state.currentStoryStep || 0);
              } else {
                GAME.logic.gotoSeq("seq_3_sean_intimacy", null, GAME.state.currentStoryStep || 0);
              }
            } else if (GAME.logic[GAME.state.currentStorySeq]) {
              GAME.logic.gotoSeq(GAME.state.currentStorySeq, null, GAME.state.currentStoryStep || 0);
            } else {
              // GAME.logic.initStoryIntro();
            }
          } else {
            const loc = GAME.state.currentLocation;
            if (loc === "city") {
              GAME.ui.changeScene("scene-maingame", "none");
              GAME.ui.changeView("view-apartment", false);
              GAME.logic.openCityMap(GAME.state.lastMapImage || null);
            } else if (loc === "minimarket") {
              GAME.ui.changeScene("scene-maingame", "none");
              GAME.ui.changeView("view-apartment", false);
              if (GAME.locations && GAME.locations.Minimarket) GAME.locations.Minimarket.enter();
            } else if (loc === "bar") {
              GAME.ui.changeScene("scene-maingame", "none");
              GAME.ui.changeView("view-apartment", false);
              if (GAME.locations && GAME.locations.Bar) GAME.locations.Bar.enter();
            } else if (loc === "pusatkerja") {
              GAME.ui.changeScene("scene-maingame", "none");
              GAME.ui.changeView("view-apartment", false);
              if (GAME.locations && GAME.locations.PusatKerja) GAME.locations.PusatKerja.enter();
            } else if (loc === "tamankota") {
              GAME.ui.changeScene("scene-maingame", "none");
              GAME.ui.changeView("view-apartment", false);
              if (GAME.locations && GAME.locations.TamanKota) GAME.locations.TamanKota.enter();
            } else if (loc === "kantoruxbr") {
              GAME.ui.changeScene("scene-maingame", "none");
              GAME.ui.changeView("view-apartment", false);
              if (GAME.locations && GAME.locations.KantorUXBR) GAME.locations.KantorUXBR.enter();
            } else if (GAME.state.storyPhase === 1 || GAME.state.storyPhase === 1.5) {
              // GAME.logic.initStoryIntro();
            } else if (GAME.state.storyPhase === 3) {
              GAME.logic.triggerStory2Part2();
            }
          }
        }
      } else {
        GAME.ui.changeScene("scene-maingame", "none");
        GAME.ui.updateSceneAudio("scene-maingame");
        GAME.ui.changeView(GAME.state.currentView || "view-apartment", false);

        if (GAME.state.storyPhase === 2) {
          if (GAME.logic.startStory2Interactive) {
            GAME.logic.startStory2Interactive();
          }
        }

        const uiElements = [
          document.getElementById("global-top-ui"),
          document.getElementById("dynamic-content"),
          document.getElementById("global-bottom-ui"),
        ];
        uiElements.forEach((el) => {
          if (el) {
            el.style.opacity = "1";
            if (el.id === "global-bottom-ui") {
              Array.from(el.querySelectorAll("button")).forEach(b => b.style.pointerEvents = "auto");
            }
            el.style.pointerEvents = (el.id === "dynamic-content" || el.id === "global-bottom-ui" || el.id === "global-top-ui") ? "none" : "";
          }
        });
      }

      if (GAME.state.storyPhase === 2) {
        const videoBg = document.getElementById("maingame-bg-video");
        if (videoBg) {
          videoBg.classList.remove("hidden");
          videoBg.play().catch((e) => { });
        }
      }

      setTimeout(() => {
        fader.style.transition = "opacity 0.6s ease-out";
        fader.style.opacity = "0";
      }, 100);
    }, 400);
  },
};
