export const ui = {
  showConfirm(title, message, onConfirm) {
    document.getElementById('general-confirm-title').innerText = title;
    document.getElementById('general-confirm-text').innerText = message;
    document.getElementById('general-confirm-btn').onclick = () => {
      GAME.ui.toggleModal('modal-general-confirm');
      onConfirm();
    };
    GAME.ui.toggleModal('modal-general-confirm');
  },

  showToast(msg) {
    const isComposureWarning = msg.startsWith("⚠️");
    if (!isComposureWarning && GAME.state.stats.composure <= 20) {
      return;
    }

    const toast = document.getElementById("toast");
    toast.innerHTML = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translate(-50%, 10px)";
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, 0)";
    }, 2500);
  },

  fadeBlackTransition(callback, duration = 800) {
    const fader = document.getElementById("screen-fader");
    if (!fader) {
      if (callback) callback();
      return;
    }
    fader.style.pointerEvents = "auto";
    fader.style.transition = `opacity ${duration / 2}ms ease-in-out`;
    fader.style.opacity = "1";

    setTimeout(() => {
      if (callback) callback();

      setTimeout(() => {
        fader.style.opacity = "0";
        setTimeout(() => {
          fader.style.pointerEvents = "none";
        }, duration / 2);
      }, 100);
    }, duration / 2);
  },

  changeScene(sceneId, transitionType = "fade-black") {
    const oldScene = document.querySelector(".scene.active");
    const target = document.getElementById(sceneId);

    if (sceneId === "scene-maingame") {
      GAME.state.isInlineSequence = false;
    }

    if (oldScene && oldScene.id === sceneId) {
      return;
    }

    if (transitionType === "cross-blur" && oldScene) {
      oldScene.style.zIndex = "10";
      target.style.zIndex = "15";
      target.classList.add("active", "animate-blur-in");
      oldScene.classList.add("animate-blur-out");
      this.updateSceneAudio(sceneId, oldScene.id);

      setTimeout(() => {
        oldScene.classList.remove("active", "animate-blur-out");
        oldScene.style.zIndex = "";
        target.classList.remove("animate-blur-in");
        target.style.zIndex = "";
      }, 800);
    } else if (transitionType === "cross-dissolve" && oldScene) {
      oldScene.style.zIndex = "10";
      target.style.zIndex = "15";
      target.classList.add("active", "animate-cross-in");
      oldScene.classList.add("animate-cross-out");
      this.updateSceneAudio(sceneId, oldScene.id);

      setTimeout(() => {
        oldScene.classList.remove("active", "animate-cross-out");
        oldScene.style.zIndex = "";
        target.classList.remove("animate-cross-in");
        target.style.zIndex = "";
      }, 800);
    } else if (transitionType === "fade-black" && oldScene) {
      this.fadeBlackTransition(() => {
        oldScene.classList.remove("active", "animate-fade-in", "animate-blur-in", "animate-cross-in");
        target.classList.add("active");
        this.updateSceneAudio(sceneId, oldScene.id);
      }, 800);
    } else {
      if (oldScene) {
        oldScene.classList.remove(
          "active",
          "animate-fade-in",
          "animate-blur-in",
          "animate-cross-in",
        );
      }
      target.classList.add("active");
      if (transitionType !== "none") {
        target.classList.add("animate-fade-in");
      }
      this.updateSceneAudio(sceneId, oldScene ? oldScene.id : null);
    }

    const globalTopUI = document.getElementById("global-top-ui");
    const globalBottomUI = document.getElementById("global-bottom-ui");
    if (globalTopUI && globalBottomUI) {
      if (sceneId === "scene-maingame" || sceneId === "scene-story") {
        globalTopUI.classList.remove("opacity-0");
        globalTopUI.classList.add("opacity-100");
        
        // Show bottom UI but hide option gear if needed, or keep both
        globalBottomUI.classList.remove("opacity-0");
        globalBottomUI.classList.add("opacity-100");
        
        // Ensure buttons are clickable during story
        Array.from(globalBottomUI.querySelectorAll("button")).forEach(b => b.style.pointerEvents = "auto");
        globalBottomUI.style.pointerEvents = "none";
      } else {
        globalTopUI.classList.remove("opacity-100");
        globalTopUI.classList.add("opacity-0");
        globalBottomUI.classList.remove("opacity-100");
        globalBottomUI.classList.add("opacity-0");
      }
    }
  },

  updateSceneAudio(sceneId, oldSceneId) {
    if (sceneId === "scene-intro") {
      GAME.audio.playBGM("main");
      return;
    } else if (sceneId === "scene-gameover") {
      GAME.audio.stopAllBGM();
      return;
    } else if (oldSceneId === "scene-gameover" && sceneId !== "scene-story" && sceneId !== "scene-maingame") {
      GAME.audio.playBGM("main");
      return;
    }

    if (GAME.state && GAME.state.currentBGMKey) {
        if (GAME.state.currentBGMKey === "NONE") {
            GAME.audio.stopAllBGM();
        } else {
            GAME.audio.playBGM(GAME.state.currentBGMKey);
        }
        return;
    }

    // Fallback if no specific BGM was saved
    if (sceneId === "scene-story") {
      if (GAME.state.storyPhase === 1) {
        GAME.audio.playBGM("intro");
      } else if (GAME.state.storyPhase === 2) {
        GAME.audio.stopAllBGM();
      }
    } else if (sceneId === "scene-maingame") {
      if (GAME.state.storyPhase === 2) {
        GAME.audio.stopAllBGM();
      } else {
        GAME.audio.playBGM("main");
      }
    }
  },

  toggleModal(modalId, useAnimation = true) {
    const modal = document.getElementById(modalId);
    
    if (modalId === 'modal-phone') {
        const mainDot = document.getElementById('phone-notif-dot');
        if (mainDot) mainDot.classList.add('hidden');
        if (GAME && GAME.ui && GAME.ui.renderPhoneStats) {
            GAME.ui.renderPhoneStats();
        }
    }

    if (modal.classList.contains("hidden")) {
      modal.classList.remove("hidden");
      if (useAnimation) {
        modal.classList.add("flex");
        const panel = modal.querySelector('.glass-panel-main');
        const animTarget = panel ? panel : modal;
        animTarget.classList.add("transition-opacity", "duration-300", "opacity-0");
        void animTarget.offsetWidth;
        animTarget.classList.remove("opacity-0");
        animTarget.classList.add("opacity-100");
      } else {
        modal.classList.add("flex");
        const panel = modal.querySelector('.glass-panel-main');
        const animTarget = panel ? panel : modal;
        animTarget.classList.remove("opacity-0", "transition-opacity", "duration-300");
        animTarget.classList.add("opacity-100");
      }
    } else {
      modal.classList.add("hidden");
      const panel = modal.querySelector('.glass-panel-main');
      const animTarget = panel ? panel : modal;
      animTarget.classList.remove("opacity-100", "transition-opacity", "duration-300");
      modal.classList.remove("flex");
    }

    const doorExit = document.getElementById("door-exit-area");
    if (doorExit) {
      const anyModalOpen = Array.from(document.querySelectorAll("#modals-container > div")).some(m => !m.classList.contains("hidden"));

      const backdrop = document.getElementById("global-modal-backdrop");
      if (backdrop) {
          if (anyModalOpen) {
              backdrop.classList.remove("hidden");
              if (useAnimation) backdrop.classList.add("opacity-100");
              else backdrop.classList.add("opacity-100"); // keep it solid
          } else {
              backdrop.classList.remove("opacity-100");
              if (useAnimation) {
                  setTimeout(() => { if (!Array.from(document.querySelectorAll("#modals-container > div")).some(m => !m.classList.contains("hidden"))) backdrop.classList.add("hidden"); }, 300);
              } else {
                  backdrop.classList.add("hidden");
              }
          }
      }

      // Debounce door exit visibility to prevent flickering during synchronous modal swaps
      if (window._doorExitTimeout) clearTimeout(window._doorExitTimeout);
      window._doorExitTimeout = setTimeout(() => {
        const anyModalOpenNow = Array.from(document.querySelectorAll("#modals-container > div")).some(m => !m.classList.contains("hidden"));
        if (anyModalOpenNow) {
          doorExit.classList.add("opacity-0");
          setTimeout(() => doorExit.classList.add("hidden"), 300);
        } else {
          if (GAME.state.currentView === "view-apartment") {
            const wrapper = document.getElementById("view-apartment");
            if (wrapper && wrapper.classList.contains("minimized")) {
              doorExit.classList.remove("hidden");
              setTimeout(() => doorExit.classList.remove("opacity-0"), 10);
            }
          }
        }
      }, 50);
    }
  },

  changeView(viewId, useTransition = true) {
    const doChange = () => {
      const container = document.getElementById("dynamic-content");
      Array.from(container.children).forEach((child) => {
        child.classList.add("hidden");
        child.classList.remove("flex");
      });

      const viewCity = document.getElementById("view-city");
      if (viewCity) {
        if (viewId === "view-city") {
          viewCity.classList.remove("hidden");
          viewCity.classList.add("flex");
          if (GAME.state.currentView && GAME.state.currentView !== "view-city" && GAME.state.currentView !== "view-saham") {
             if (GAME.audio && GAME.audio.playSFX) GAME.audio.playSFX("keluar");
          }
        } else {
          viewCity.classList.add("hidden");
          viewCity.classList.remove("flex");
        }
      }
      const target = document.getElementById(viewId);
      target.classList.remove("hidden");
      target.classList.add("flex");

      const doorExit = document.getElementById("door-exit-area");
      if (doorExit) {
        if (viewId === "view-apartment") {
          const wrapper = document.getElementById("view-apartment");
          if (wrapper && wrapper.classList.contains("minimized")) {
            doorExit.classList.remove("hidden");
            setTimeout(() => doorExit.classList.remove("opacity-0"), 10);
          } else {
            doorExit.classList.add("opacity-0");
            doorExit.classList.add("hidden");
          }
        } else {
          doorExit.classList.add("opacity-0");
          doorExit.classList.add("hidden");
        }
      }

      if (viewId === "view-kitchen") GAME.ui.renderInventory();

      const previousView = GAME.state.currentView;
      if (
        viewId === "view-city" &&
        (previousView === "view-minimarket" ||
          previousView === "view-jobs" ||
          previousView === "view-story-location")
      ) {
        // Waktu tidak lagi berjalan otomatis di sini. Waktu hanya berjalan melalui callback VN event.
      }

      if (viewId === "view-minimarket") GAME.ui.renderShop();
      if (viewId === "view-jobs") {
        if (GAME.ui.renderJobCards) GAME.ui.renderJobCards();
      }
      if (viewId === "view-saveload") {
        GAME.ui.isLoadOnlyMode = false;
        GAME.ui.renderSaveLoadList();
      }
      if (viewId === "view-saham") GAME.ui.renderSahamList();

      if (viewId === "view-city") {
        const mapLabels = document.querySelectorAll("#view-city .map-label");
        mapLabels.forEach((label) => (label.style.opacity = "1"));
      }
      GAME.state.currentView = viewId;
      GAME.ui.updateBackground();
    };

    if (useTransition) {
      this.fadeBlackTransition(doChange);
    } else {
      doChange();
    }
  },

  toggleCityMap(show, bgImage = null) {
    const overlay = document.getElementById("view-city-overlay");
    if (!overlay) return;
    if (show) {
      if (bgImage) {
        GAME.state.lastMapImage = bgImage;
        GAME.ui.updateBackground();
      }
      overlay.classList.remove("hidden");
      overlay.classList.add("flex");
      
      const buttons = Array.from(overlay.children).filter(btn => 
        btn.tagName === "BUTTON" && !btn.classList.contains("hidden")
      );

      buttons.forEach(btn => {
        btn.style.opacity = "0";
        btn.style.transform = "scale(0.8) translateX(20px)";
        btn.style.transition = "none";
      });

      // Small delay to allow DOM to render the flex container first
      setTimeout(() => {
        buttons.forEach((btn, index) => {
          setTimeout(() => {
            btn.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            btn.style.opacity = "1";
            btn.style.transform = "scale(1) translateX(0)";
          }, index * 120);
        });
      }, 50);
    } else {
      overlay.classList.add("hidden");
      overlay.classList.remove("flex");
    }
  },

  updateMessageCounter() {
      const unreadCount = GAME.state.messages.filter(m => !m.isRead).length;
      const mainDot = document.getElementById('phone-notif-dot');
      const appDot = document.getElementById('phone-app-message-dot');
      
      if (unreadCount > 0) {
          if (mainDot) {
              mainDot.classList.remove('hidden');
              mainDot.innerText = unreadCount > 9 ? '9+' : unreadCount;
          }
          if (appDot) {
              appDot.classList.remove('hidden');
              appDot.innerText = unreadCount > 9 ? '9+' : unreadCount;
          }
      } else {
          if (mainDot) mainDot.classList.add('hidden');
          if (appDot) appDot.classList.add('hidden');
      }
  },

  showPushNotification(msg) {
      const container = document.getElementById('notification-container');
      if (!container) return;

      const notifId = 'notif-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
      const profilePic = GAME.constants.contacts[msg.sender] || '';
      
      const picHtml = profilePic ? 
          `<img src="${profilePic}" class="w-full h-full object-cover">` : 
          `<span class="text-[10px] font-bold text-gray-400">?</span>`;

      const safeSender = msg.sender.replace(/[^a-zA-Z0-9]/g, '') || 'unknown';
      const senderClass = 'notif-sender-' + safeSender;
      const existingNotif = container.querySelector('.' + senderClass);
      if (existingNotif) {
          existingNotif.parentNode.removeChild(existingNotif);
      }

      const el = document.createElement('div');
      el.id = notifId;
      el.className = `glass-panel-main !p-2 flex items-center gap-3 bg-black/60 border border-white/20 shadow-lg transform transition-all duration-500 translate-y-[-20px] opacity-0 ${senderClass}`;
      el.innerHTML = `
          <div class="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/20 bg-gray-800 flex items-center justify-center">
              ${picHtml}
          </div>
          <div class="flex-1 overflow-hidden">
              <div class="font-bold text-[10px] text-white truncate">${msg.sender}</div>
              <p class="text-[9px] text-gray-300 truncate">${msg.text}</p>
          </div>
      `;

      container.appendChild(el);

      // Animate in
      requestAnimationFrame(() => {
          el.classList.remove('translate-y-[-20px]', 'opacity-0');
      });

      if (msg.persist) {
          el.classList.add('persistent-notif');
      } else {
          // Remove after 5 seconds
          setTimeout(() => {
              el.classList.add('translate-y-[-20px]', 'opacity-0');
              setTimeout(() => {
                  if (el.parentNode) el.parentNode.removeChild(el);
              }, 500);
          }, 5000);
      }
  },

  clearPersistentNotifications() {
      const persistents = document.querySelectorAll('.persistent-notif');
      persistents.forEach(el => {
          el.classList.remove('persistent-notif');
          el.classList.add('translate-y-[-20px]', 'opacity-0');
          setTimeout(() => {
              if (el.parentNode) el.parentNode.removeChild(el);
          }, 500);
      });
  },

  receiveMessage(msgData) {
      if (msgData.text) {
          const playerName = GAME.state.name || "James";
          msgData.text = msgData.text.replace(/\{name\}/g, playerName);
      }
      GAME.state.messages.push(msgData); // Add to end (chronological for chat room)
      
      const modalMessageDetail = document.getElementById('modal-message-detail');
      const isChatDetailOpen = modalMessageDetail && !modalMessageDetail.classList.contains('hidden');
      const currentChatName = document.getElementById('chat-header-name') ? document.getElementById('chat-header-name').innerText : '';

      if (isChatDetailOpen && currentChatName === msgData.sender) {
          // Chat is actively open for this sender, no push notification needed
          msgData.isRead = true; // Mark read instantly
          this.renderMessageDetail(msgData.sender);
          
          // Play sound
          if (GAME.audio && GAME.audio.playSFX) {
              GAME.audio.playSFX('popup');
          }
      } else {
          // Normal behavior
          this.updateMessageCounter();
          this.showPushNotification(msgData);
          
          if (GAME.audio && GAME.audio.playSFX) {
              GAME.audio.playSFX('phonevibrate');
          }
      }
  },

  renderMessages() {
      const list = document.getElementById('phone-contact-list');
      if (!list) return;
      list.innerHTML = '';
      
      if (GAME.state.messages.length === 0) {
          list.innerHTML = '<p class="text-[9px] text-gray-500 text-center mt-4">Tidak ada percakapan.</p>';
          return;
      }

      // Group by sender
      const contacts = {};
      GAME.state.messages.forEach(msg => {
          if (!contacts[msg.sender]) {
              contacts[msg.sender] = { messages: [], unreadCount: 0 };
          }
          contacts[msg.sender].messages.push(msg);
          if (!msg.isRead) contacts[msg.sender].unreadCount++;
      });

      // Sort contacts by latest message timestamp
      const sortedSenders = Object.keys(contacts).sort((a, b) => {
          const lastA = contacts[a].messages[contacts[a].messages.length - 1];
          const lastB = contacts[b].messages[contacts[b].messages.length - 1];
          // Since they are pushed chronologically, we can just compare index or time, but let's assume they are ordered by state.messages array index.
          return GAME.state.messages.indexOf(lastB) - GAME.state.messages.indexOf(lastA);
      });

      sortedSenders.forEach(sender => {
          const contactData = contacts[sender];
          const latestMsg = contactData.messages[contactData.messages.length - 1];
          const unreadCount = contactData.unreadCount;
          
          const profilePic = GAME.constants.contacts[sender] || '';
          const picHtml = profilePic ? 
              `<img src="${profilePic}" class="w-full h-full object-cover">` : 
              `<span class="text-xs font-bold text-gray-400">?</span>`;
              
          const bgClass = unreadCount > 0 ? 'bg-white/10' : 'hover:bg-white/5';
          const nameClass = unreadCount > 0 ? 'text-white' : 'text-gray-300';
          
          list.innerHTML += `
              <div class="w-full p-3 border-b border-white/5 cursor-pointer flex items-center gap-3 transition-colors ${bgClass}" onclick="GAME.logic.openMessageDetail('${sender}')">
                  <div class="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-800 flex items-center justify-center border ${unreadCount > 0 ? 'border-red-500' : 'border-white/20'}">
                      ${picHtml}
                  </div>
                  <div class="flex-1 overflow-hidden">
                      <div class="flex justify-between items-baseline mb-0.5">
                          <span class="font-bold text-[11px] ${nameClass} truncate">${sender}</span>
                          <span class="text-[7px] text-gray-500">${latestMsg.time || ''}</span>
                      </div>
                      <div class="flex justify-between items-center gap-2">
                          <p class="text-[9px] ${unreadCount > 0 ? 'text-gray-200' : 'text-gray-500'} truncate flex-1">${latestMsg.image ? '📷 Foto lampiran' : latestMsg.text}</p>
                          ${unreadCount > 0 ? `<span class="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0">${unreadCount}</span>` : ''}
                      </div>
                  </div>
              </div>
          `;
      });
  },

  renderMessageDetail(sender) {
      document.getElementById('chat-header-name').innerText = sender;
      const profilePic = GAME.constants.contacts[sender] || '';
      
      const imgEl = document.getElementById('chat-header-img');
      const initialEl = document.getElementById('chat-header-initial');
      
      if (profilePic) {
          imgEl.src = profilePic;
          imgEl.classList.remove('hidden');
          initialEl.classList.add('hidden');
      } else {
          imgEl.classList.add('hidden');
          initialEl.classList.remove('hidden');
      }

      const container = document.getElementById('chat-bubbles-container');
      container.innerHTML = '';
      
      const actionsContainer = document.getElementById('chat-action-area');
      const buttonsContainer = document.getElementById('chat-action-buttons');
      buttonsContainer.innerHTML = '';
      actionsContainer.classList.add('hidden');

      const msgs = GAME.state.messages.filter(m => m.sender === sender);
      
      msgs.forEach((msg, index) => {
          msg.isRead = true; // Mark read as they are rendered
          
          let animateClass = msg.hasRendered ? '' : 'animate-pop-in';
          let delay = msg.hasRendered ? 0 : (index * 80);
          let delayStyle = msg.hasRendered ? '' : `style="animation-delay: ${delay}ms;"`;

          let textClass = msg.text === 'message deleted' ? 'text-gray-400 italic' : 'text-white';
          let bubbleHtml = `
              <div class="flex flex-col max-w-[85%] self-start ${animateClass} mb-2" ${delayStyle}>
                  <div class="bg-white/10 ${textClass} p-2.5 pb-4 rounded-2xl rounded-tl-sm text-[10px] shadow-sm border border-white/5 relative">
                      ${msg.text ? `<p class="whitespace-pre-wrap leading-relaxed">${msg.text}</p>` : ''}
                      ${msg.image ? `
                          <div class="${msg.text ? 'mt-2' : ''} rounded-lg overflow-hidden">
                              <img src="${msg.image}" class="w-full h-auto object-cover border border-white/10 rounded-lg">
                          </div>
                      ` : ''}
                      <span class="text-[6px] text-gray-400 absolute bottom-1 right-2">${msg.time || ''}</span>
                  </div>
              </div>
              <div class="flex flex-col w-full items-end gap-1 mb-2">
                  ${msg.actions ? msg.actions.map((act, actIndex) => {
                      if (msg.hasResponded && msg.respondedWith !== act.action) return '';
                      let btnAnimateClass = (msg.hasRendered || msg.hasResponded) ? '' : 'animate-pop-in';
                      let btnDelay = msg.hasResponded ? 0 : (delay + 100 + (actIndex * 100));
                      let btnDelayStyle = (msg.hasRendered || msg.hasResponded) ? '' : `style="animation-delay: ${btnDelay}ms;"`;
                      return `
                      <button class="bg-blue-500/20 hover:bg-blue-500/40 border border-blue-400/30 text-blue-200 text-[9px] px-3 py-1.5 rounded-2xl rounded-tr-sm transition-all flex items-start text-left gap-1 backdrop-blur-sm max-w-[85%] ${btnAnimateClass} ${msg.hasResponded ? 'opacity-50 pointer-events-none' : ''}" ${btnDelayStyle} onclick="GAME.logic.handleMessageAction('${msg.id}', '${act.action}')">
                          <span>${act.text}</span>
                      </button>
                      `;
                  }).join('') : (msg.action && msg.actionText ? `
                      <button class="bg-blue-500/20 hover:bg-blue-500/40 border border-blue-400/30 text-blue-200 text-[9px] px-3 py-1.5 rounded-2xl rounded-tr-sm transition-colors flex items-start text-left gap-1 backdrop-blur-sm max-w-[85%] ${animateClass}" ${msg.hasRendered ? '' : `style="animation-delay: ${delay + 100}ms;"`} onclick="
                          GAME.ui.toggleModal('modal-message-detail'); 
                          GAME.ui.toggleModal('modal-phone'); 
                          GAME.logic.gotoSeq('${msg.action}')
                      ">
                          <span>${msg.actionText}</span>
                      </button>
                  ` : '')}
              </div>
          `;
          container.innerHTML += bubbleHtml;
          msg.hasRendered = true; // Mark as rendered so it doesn't animate again
      });
      
      this.updateMessageCounter();
      
      // Auto scroll to bottom
      setTimeout(() => {
          container.scrollTop = container.scrollHeight;
      }, 50);
  },

  updateBackground() {
    const bgElement = document.getElementById("background-layer");
    const videoBg = document.getElementById("maingame-bg-video");
    const isDay = GAME.state.timePhaseIdx >= 1 && GAME.state.timePhaseIdx <= 3;

    if (videoBg) videoBg.classList.add("hidden");
    
    if (GAME.state.currentLocation === "apartment") {
      bgElement.style.backgroundImage = isDay
        ? "url('assets/images/apartment-day-bg.jpg')"
        : "url('assets/images/apartment-night-bg.jpg')";
    } else if (GAME.state.currentLocation === "city") {
      if (GAME.state.currentView === "view-minimarket") {
        bgElement.style.backgroundImage = "url('assets/images/00Z0minimarket00.jpg')";
      } else if (GAME.state.lastMapImage) {
        bgElement.style.backgroundImage = `url('${GAME.state.lastMapImage}')`;
      } else {
        bgElement.style.backgroundImage = isDay
          ? "url('assets/images/city-day-bg.jpg')"
          : "url('assets/images/city-night-bg.jpg')";
      }
    }
  },

  updateHUD() {
    const { stats, day, timePhaseIdx, money } = GAME.state;
    stats.energy = GAME.clamp(stats.energy, 0, 100);
    stats.hunger = GAME.clamp(stats.hunger, 0, 100);
    stats.composure = GAME.clamp(stats.composure, 0, 100);

    document
      .querySelectorAll(".hud-bar-energy")
      .forEach((el) => (el.style.width = stats.energy + "%"));
    document
      .querySelectorAll(".hud-text-energy")
      .forEach((el) => (el.innerText = Math.round(stats.energy) + "%"));

    document
      .querySelectorAll(".hud-bar-hunger")
      .forEach((el) => (el.style.width = stats.hunger + "%"));
    document
      .querySelectorAll(".hud-text-hunger")
      .forEach((el) => (el.innerText = Math.round(stats.hunger) + "%"));

    document
      .querySelectorAll(".hud-bar-composure")
      .forEach((el) => (el.style.width = stats.composure + "%"));
    document
      .querySelectorAll(".hud-text-composure")
      .forEach((el) => (el.innerText = Math.round(stats.composure) + "%"));

    const timePhaseStr = GAME.constants.timePhases[timePhaseIdx];
    const isNight = timePhaseIdx === 0 || timePhaseIdx === 4 || timePhaseIdx === 5;
    const timeIcon = isNight ? '🌙' : '☀️';

    document
      .querySelectorAll(".hud-ui-daytime-day")
      .forEach((el) => (el.innerText = `Day ${day}`));

    document
      .querySelectorAll(".hud-ui-daytime-phase")
      .forEach((el) => (el.innerText = timePhaseStr));

    document
      .querySelectorAll(".hud-ui-daytime-icon")
      .forEach((el) => (el.innerText = timeIcon));
    document
      .querySelectorAll(".hud-ui-money")
      .forEach((el) => (el.innerText = money));

    const dayNameStr = GAME.constants.days[day % 7];
    document
      .querySelectorAll(".hud-ui-dayname")
      .forEach((el) => (el.innerText = dayNameStr));

    document.getElementById("phone-time").innerText =
      `${dayNameStr}, Day ${day}`;

    GAME.ui.renderPhoneStats();

    // Notifikasi Red Dot
    const unreadMessages = GAME.state.messages ? GAME.state.messages.filter(m => !m.isRead).length : 0;
    const dotMain = document.getElementById("phone-notif-dot");
    const dotApp = document.getElementById("phone-app-message-dot");

    if (dotMain) {
      if (unreadMessages > 0) dotMain.classList.remove("hidden");
      else dotMain.classList.add("hidden");
    }
    if (dotApp) {
      if (unreadMessages > 0) dotApp.classList.remove("hidden");
      else dotApp.classList.add("hidden");
    }

    GAME.ui.updateBackground();
  },

  renderInventory() {
    const container = document.getElementById("kitchen-inventory");
    const previewContainer = document.getElementById("kitchen-preview");
    container.innerHTML = "";
    if (previewContainer) previewContainer.classList.add("hidden");

    let hasItems = false;

    GAME.constants.shopItems.filter(i => i.type === 'food' || i.type === 'drink').forEach((item) => {
      let count = GAME.state.inventory[item.id];
      if (count > 0) {
        hasItems = true;
        const el = document.createElement("div");
        el.className = "relative bg-black/40 rounded-xl border border-white/10 shadow-lg flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors aspect-square group";
        el.innerHTML = `
            <div class="w-full h-full p-2 flex flex-col items-center justify-center relative overflow-hidden">
                <span class="absolute text-3xl opacity-40 group-hover:opacity-10 transition-opacity">${item.icon || '📦'}</span>
                <img src="assets/images/item_${item.id}.png" class="w-full h-full object-contain z-10 drop-shadow-md" 
                     onerror="this.style.display='none'; this.previousElementSibling.classList.replace('opacity-40', 'opacity-100'); this.previousElementSibling.classList.replace('group-hover:opacity-10', 'group-hover:opacity-100');">
            </div>
            <div class="absolute top-1 right-1 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md z-20">x${count}</div>
        `;

        el.onclick = () => {
          if (!previewContainer) return;
          previewContainer.classList.remove("hidden");
          const img = document.getElementById("kitchen-preview-img");
          img.src = `assets/images/item_${item.id}.png`;
          img.style.display = 'block';
          document.getElementById("kitchen-preview-fallback").innerText = item.icon || '📦';

          document.getElementById("kitchen-preview-name").innerText = item.name;

          const hText = item.h !== 0 ? (item.h > 0 ? `+${item.h} H` : `${item.h} H`) : "";
          const eText = item.e !== 0 ? (item.e > 0 ? `+${item.e} E` : `${item.e} E`) : "";
          const sep = hText && eText ? ", " : "";
          document.getElementById("kitchen-preview-stats").innerText = `${hText}${sep}${eText}`;

          const btn = document.getElementById("kitchen-preview-btn");
          btn.onclick = () => {
            GAME.logic.useItem(item.id);
          };
        };

        container.appendChild(el);
      }
    });

    if (!hasItems) {
      container.innerHTML = '<p class="col-span-4 text-center text-gray-400 mt-10 text-[10px] italic">Kulkas dan lemarimu kosong.</p>';
    }
  },

  renderPhoneInventory(filterType = 'food') {
    const container = document.getElementById("phone-inventory-list");
    const previewContainer = document.getElementById("phone-inventory-preview");

    // Update Tab UI
    document.getElementById("tab-phone-inv-food").classList.remove("highlight-blue", "text-white");
    document.getElementById("tab-phone-inv-nonfood").classList.remove("highlight-blue", "text-white");
    document.getElementById("tab-phone-inv-food").classList.add("text-gray-400");
    document.getElementById("tab-phone-inv-nonfood").classList.add("text-gray-400");

    if (filterType === 'food') {
      document.getElementById("tab-phone-inv-food").classList.add("highlight-blue", "text-white");
      document.getElementById("tab-phone-inv-food").classList.remove("text-gray-400");
    } else {
      document.getElementById("tab-phone-inv-nonfood").classList.add("highlight-blue", "text-white");
      document.getElementById("tab-phone-inv-nonfood").classList.remove("text-gray-400");
    }

    container.innerHTML = "";
    if (previewContainer) previewContainer.classList.add("hidden");

    let hasItems = false;

    GAME.constants.shopItems.filter(i => filterType === 'food' ? (i.type === 'food' || i.type === 'drink') : i.type === filterType).forEach((item) => {
      let count = GAME.state.inventory[item.id];
      if (count > 0) {
        hasItems = true;
        const el = document.createElement("div");
        el.className = "relative bg-black/40 rounded-xl border border-white/10 shadow-lg flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors aspect-square group";
        el.innerHTML = `
            <div class="w-full h-full p-2 flex flex-col items-center justify-center relative overflow-hidden">
                <span class="absolute text-2xl opacity-40 group-hover:opacity-10 transition-opacity">${item.icon || '📦'}</span>
                <img src="assets/images/item_${item.id}.png" class="w-full h-full object-contain z-10 drop-shadow-md" 
                     onerror="this.style.display='none'; this.previousElementSibling.classList.replace('opacity-40', 'opacity-100'); this.previousElementSibling.classList.replace('group-hover:opacity-10', 'group-hover:opacity-100');">
            </div>
            <div class="absolute top-1 right-1 bg-blue-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-full shadow-md z-20 leading-none">x${count}</div>
        `;

        el.onclick = () => {
          if (!previewContainer) return;
          previewContainer.classList.remove("hidden");
          const img = document.getElementById("phone-inventory-img");
          img.src = `assets/images/item_${item.id}.png`;
          img.style.display = 'block';
          document.getElementById("phone-inventory-fallback").innerText = item.icon || '📦';

          document.getElementById("phone-inventory-name").innerText = item.name;

          let statsHtml = "";
          const btn = document.getElementById("phone-inventory-btn");

          if (item.type === 'food' || item.type === 'drink') {
            const hText = item.h !== 0 ? (item.h > 0 ? `+${item.h} H` : `${item.h} H`) : "";
            const eText = item.e !== 0 ? (item.e > 0 ? `+${item.e} E` : `${item.e} E`) : "";
            const sep = hText && eText ? ", " : "";
            statsHtml = `${hText}${sep}${eText}`;

            btn.classList.remove("hidden");
            btn.onclick = () => {
              GAME.logic.useItem(item.id);
              GAME.ui.renderPhoneInventory(filterType);
            };
          } else {
            statsHtml = item.desc || "Item Spesial";
            btn.classList.add("hidden");
          }
          document.getElementById("phone-inventory-stats").innerText = statsHtml;
        };

        container.appendChild(el);
      }
    });

    if (!hasItems) {
      container.innerHTML = '<p class="col-span-3 text-center text-gray-400 mt-6 text-[9px] italic">Tidak ada item.</p>';
    }
  },

  renderShop() {
    const container = document.getElementById("shop-list");
    container.innerHTML = "";
    // Change grid to 3 columns to make items more square-like and less stretched
    container.className = "overflow-y-auto flex-1 grid grid-cols-3 gap-2 pb-2 content-start";

    GAME.constants.shopItems.forEach((item) => {
      const el = document.createElement("div");
      // Flexible frame design with minimum height to prevent squishing
      el.className = "relative bg-black/40 p-2 rounded-xl border border-white/10 shadow-lg flex flex-col items-center justify-between overflow-hidden group min-h-[130px]";

      let statsHtml = "";
      if (item.type === 'food' || item.type === 'drink') {
        const hText = item.h !== 0 ? (item.h > 0 ? `+${item.h} H` : `${item.h} H`) : "";
        const eText = item.e !== 0 ? (item.e > 0 ? `+${item.e} E` : `${item.e} E`) : "";
        const sep = hText && eText ? " | " : "";
        statsHtml = `<div class="text-[6px] bg-green-900/40 border border-green-500/30 text-green-300 rounded px-1 font-medium tracking-wide leading-none mt-1 text-center">${hText}${sep}${eText}</div>`;
      }

      el.innerHTML = `
          <!-- Gambar Item / Fallback -->
          <div class="w-full h-12 bg-white/5 rounded-lg mb-1 flex items-center justify-center relative overflow-hidden shrink-0">
              <span class="absolute text-2xl opacity-30 group-hover:opacity-10 transition-opacity">${item.icon || '📦'}</span>
              <img src="assets/images/item_${item.id}.png" class="w-full h-full object-contain z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-md" 
                   onerror="this.style.display='none'; this.previousElementSibling.classList.replace('opacity-30', 'opacity-100'); this.previousElementSibling.classList.replace('group-hover:opacity-10', 'group-hover:opacity-100');">
          </div>
          
          <!-- Info Item -->
          <div class="w-full flex flex-col items-center justify-end flex-1 text-center mt-1 pb-1">
              <div class="font-bold text-[10px] tracking-wide text-white leading-tight line-clamp-1 w-full" title="${item.name}">${item.name}</div>
              <div class="text-[11px] font-bold text-yellow-400 mt-0.5 bg-black/40 px-1.5 rounded">$${item.price}</div>
              ${statsHtml}
          </div>

          <!-- Tombol Beli Kecil (Kanan Atas) -->
          <button class="absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-500/80 hover:bg-blue-400 text-white flex items-center justify-center border border-white/20 shadow-md backdrop-blur-sm transition-all active:scale-90 z-20"
                  onclick="GAME.logic.buyItem('${item.id}')" title="Beli">
              <span class="text-[10px] font-bold leading-none">+</span>
          </button>
      `;
      container.appendChild(el);
    });
  },

  renderJobCards() {
    const container = document.getElementById("job-cards-container");
    if (!container) return;
    container.innerHTML = "";

    if (!GAME.ui.currentJobCards) {
      GAME.ui.currentJobCards = [...GAME.constants.jobList];
    }

    const cards = GAME.ui.currentJobCards;

    // Render top 3 for performance
    for (let i = Math.min(cards.length - 1, 2); i >= 0; i--) {
      const job = cards[i];
      const el = document.createElement("div");
      el.className = "absolute inset-0 m-auto w-4/5 h-4/5 bg-black/60 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl flex flex-col items-center justify-center p-4 transition-all duration-500 ease-out transform";
      el.style.zIndex = cards.length - i;

      const scale = 1 - (i * 0.05);
      const translateY = i * 15;
      el.style.transform = `scale(${scale}) translateY(${translateY}px)`;

      el.innerHTML = `
            <div class="w-24 h-24 mb-6 relative flex items-center justify-center">
                <span class="absolute inset-0 flex items-center justify-center text-6xl opacity-30">${job.icon}</span>
                <img src="assets/images/job_${job.id}.png" class="w-full h-full object-contain relative z-10 drop-shadow-lg"
                     onerror="this.style.display='none'; this.previousElementSibling.classList.replace('opacity-30', 'opacity-100');">
            </div>
            <h3 class="text-lg font-bold text-white tracking-wide text-center leading-tight mb-3">${job.title}</h3>
            <div class="text-sm font-bold text-yellow-400 mb-3">${job.hours} Jam | $${job.pay}</div>
            <div class="text-[10px] text-red-300 text-center font-medium leading-relaxed bg-red-900/30 px-3 py-1.5 rounded-lg border border-red-500/20">
                ${job.energy}% E, ${job.hunger}% H
                ${job.composure !== 0 ? (job.composure > 0 ? ', +' + job.composure + '% C' : ', ' + job.composure + '% C') : ''}
            </div>
        `;
      container.appendChild(el);
    }
  },

  swipeJobLeft() {
    if (!GAME.ui.currentJobCards || GAME.ui.currentJobCards.length === 0) return;
    const container = document.getElementById("job-cards-container");
    const cards = container.children;
    if (cards.length === 0) return;

    const topCard = cards[cards.length - 1]; // DOM order is reversed z-index
    topCard.style.transform = "translateX(-150%) rotate(-15deg)";
    topCard.style.opacity = "0";

    setTimeout(() => {
      const job = GAME.ui.currentJobCards.shift();
      GAME.ui.currentJobCards.push(job);
      GAME.ui.renderJobCards();
    }, 500);
  },

  swipeJobRight() {
    if (!GAME.ui.currentJobCards || GAME.ui.currentJobCards.length === 0) return;
    const container = document.getElementById("job-cards-container");
    const cards = container.children;
    if (cards.length === 0) return;

    const topCard = cards[cards.length - 1];
    topCard.style.transform = "translateX(150%) rotate(15deg)";
    topCard.style.opacity = "0";

    const job = GAME.ui.currentJobCards[0];

    setTimeout(() => {
      GAME.ui.showToast(`Mengambil pekerjaan ${job.title}...`);
      GAME.locations.PusatKerja.work(job.id);
    }, 500);
  },

  renderPinjolApp() {
    const container = document.getElementById("phone-pinjol-list");
    container.innerHTML = "";

    if (!GAME.state.loans) GAME.state.loans = [];

    GAME.constants.pinjolOptions.forEach(loan => {
      const el = document.createElement("div");
      el.className = "bg-black/60 rounded-xl p-3 border border-red-500/20 shadow-md relative overflow-hidden group shrink-0";

      const activeLoan = GAME.state.loans.find(l => l.loanId === loan.id);

      if (activeLoan) {
        el.innerHTML = `
                  <div class="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
                  <div class="flex justify-between items-center mb-1 pl-2">
                      <h4 class="text-xs font-bold text-white">$${loan.amount}</h4>
                      <span class="text-[8px] px-1.5 py-0.5 bg-yellow-500/20 text-yellow-300 rounded border border-yellow-500/30">AKTIF</span>
                  </div>
                  <div class="text-[9px] text-gray-300 mb-2 pl-2">
                      Sisa Tenor: ${activeLoan.maxTenor - activeLoan.paidTenor}x<br>
                      Tagihan Berikut: $${activeLoan.billAmount} dalam ${activeLoan.daysUntilNextBill} Hari
                  </div>
              `;
      } else {
        el.innerHTML = `
                  <div class="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                  <div class="flex justify-between items-center mb-1 pl-2">
                      <h4 class="text-xs font-bold text-white">$${loan.amount}</h4>
                  </div>
                  <div class="text-[9px] text-gray-300 mb-2 pl-2">
                      Cicilan: $${loan.billAmount} per ${loan.billInterval} hari<br>
                      Tenor: ${loan.maxTenor}x bayar
                  </div>
                  <button class="glass-button glass-button-mini w-full !mb-0 bg-green-600/30 text-green-100 border-green-500/50 hover:bg-green-600/50" onclick="GAME.logic.borrowPinjol('${loan.id}')">Ajukan Sekarang</button>
              `;
      }
      container.appendChild(el);
    });
  },

  openLoadGameMenu() {
    this.isLoadOnlyMode = true;
    this.renderSaveLoadList();
    this.toggleModal("modal-saveload");
  },

  renderSaveLoadList() {
    const container = document.getElementById("saveload-list");
    container.innerHTML = "";
    
    // Siapkan daftar slot (Autosave di atas, diikuti slot 0 s/d saveSlotCount-1)
    const slotsToRender = ["autosave"];
    for (let i = 0; i < GAME.constants.saveSlotCount; i++) {
        slotsToRender.push(i);
    }
    
    slotsToRender.forEach(slotKey => {
      const isAutosave = slotKey === "autosave";
      const el = document.createElement("div");
      el.className =
        "flex justify-between items-center bg-white/10 p-2.5 rounded-[16px] border border-white/20 shadow-inner gap-2";

      const savedDataRaw = localStorage.getItem(`afterstroll_save_${slotKey}`);
      let contentHTML = "";

      if (savedDataRaw) {
        const savedData = JSON.parse(savedDataRaw);
        const timeName = GAME.constants.timePhases[savedData.timePhaseIdx];
        const slotName = isAutosave ? "Auto Save" : `Slot ${slotKey + 1}`;
        const slotColor = isAutosave ? "text-yellow-400" : "text-green-300";
        contentHTML = `
                            <div class="flex-1">
                                <div class="font-bold text-xs tracking-wide ${slotColor}">${slotName}</div>
                                <div class="text-[9px] text-gray-300 mt-0.5">Day ${savedData.day} - ${timeName}</div>
                            </div>
                            <button class="glass-button glass-button-mini !mb-0 highlight" onclick="GAME.logic.loadGame('${slotKey}')">Muat</button>
                        `;
      } else {
        const slotName = isAutosave ? "Auto Save - Kosong" : `Slot ${slotKey + 1} - Kosong`;
        contentHTML = `
                            <div class="flex-1">
                                <div class="font-bold text-xs tracking-wide text-gray-400">${slotName}</div>
                            </div>
                        `;
      }

      const simpanBtnHTML = (isAutosave || GAME.ui.isLoadOnlyMode || GAME.state.isInlineSequence) ? "" : `<button class="glass-button glass-button-mini !mb-0 highlight-blue" onclick="GAME.logic.handleSaveClick(${slotKey})">Simpan</button>`;

      el.innerHTML = `
                        ${contentHTML}
                        ${simpanBtnHTML}
                    `;
      container.appendChild(el);
    });
  },

  renderSahamList() {
    const container = document.getElementById("saham-list");
    if (!container) return;
    container.innerHTML = "";

    GAME.constants.stocks.forEach((stock) => {
      const data = GAME.state.stockPrices[stock.id];
      const owned =
        (GAME.state.portfolio[stock.id] &&
          GAME.state.portfolio[stock.id].quantity) ||
        0;
      const diff = data.current - data.prev;
      const percent = data.prev > 0 ? ((diff / data.prev) * 100).toFixed(2) : 0;

      let trendColor = "text-gray-400";
      let trendIcon = "-";
      if (diff > 0) {
        trendColor = "text-green-400";
        trendIcon = "▲";
      } else if (diff < 0) {
        trendColor = "text-red-400";
        trendIcon = "▼";
      }

      const el = document.createElement("div");
      el.className =
        "bg-white/10 p-3 rounded-[24px] border border-white/20 shadow-inner cursor-pointer hover:bg-white/20 transition-all";
      el.onclick = () => GAME.logic.openSahamDetail(stock.id);
      el.innerHTML = `
                        <div class="flex justify-between items-center">
                            <div class="flex-1">
                                <div class="font-bold text-sm tracking-wide">${stock.id} <span class="text-[11px] text-gray-300 font-normal ml-1">${stock.name}</span></div>
                                <div class="text-[11px] text-gray-400 mt-1">Owned: <span class="${owned > 0 ? "text-blue-300 font-bold" : ""}">${owned}</span></div>
                            </div>
                            <div class="text-right w-16">
                                <div class="font-bold text-base text-white">$${Math.floor(data.current)}</div>
                                <div class="text-[11px] font-bold ${trendColor} mt-0.5">${trendIcon} ${Math.abs(percent)}%</div>
                            </div>
                        </div>
                    `;
      container.appendChild(el);
    });
  },

  renderSahamDetail() {
    const id = GAME.state.activeStockId;
    if (!id) return;
    const stock = GAME.constants.stocks.find((s) => s.id === id);
    const data = GAME.state.stockPrices[id];
    const portfolioData = GAME.state.portfolio[id] || {
      quantity: 0,
      totalCost: 0,
    };
    const owned = portfolioData.quantity;

    document.getElementById("saham-detail-title").innerText =
      `${stock.id} - ${stock.name}`;
    document.getElementById("saham-detail-price").innerText =
      `$${Math.floor(data.current)}`;
    document.getElementById("saham-detail-owned").innerText = `${owned} Lembar`;

    let avgBuyPrice = 0;
    let profitLoss = 0;
    const profitEl = document.getElementById("saham-detail-profit");

    if (owned > 0 && portfolioData.totalCost > 0) {
      avgBuyPrice = portfolioData.totalCost / owned;
      profitLoss = (data.current - avgBuyPrice) * owned;
    }

    document.getElementById("saham-detail-avg-buy").innerText =
      `$${avgBuyPrice.toFixed(2)}`;
    profitEl.innerText = `${profitLoss >= 0 ? "+" : ""}$${profitLoss.toFixed(2)}`;

    profitEl.classList.remove(
      "text-green-400",
      "text-red-400",
      "text-gray-400",
    );

    const totalValEl = document.getElementById("saham-detail-total-value");
    if (owned > 0) {
      const totalValue = owned * data.current;
      totalValEl.innerText = `$${Math.floor(totalValue)}`;
      totalValEl.classList.remove("hidden", "text-green-400", "text-red-400", "text-gray-400");

      if (profitLoss > 0) {
        profitEl.classList.add("text-green-400");
        totalValEl.classList.add("text-green-400");
      } else if (profitLoss < 0) {
        profitEl.classList.add("text-red-400");
        totalValEl.classList.add("text-red-400");
      } else {
        profitEl.classList.add("text-gray-400");
        totalValEl.classList.add("text-gray-400");
      }
    } else {
      totalValEl.classList.add("hidden");
      profitEl.classList.add("text-gray-400");
    }
    this.renderStockChart(id, "saham-chart");
  },

  renderStockChart(stockId, canvasId) {
    if (window.sahamChartInstance) {
      window.sahamChartInstance.destroy();
    }

    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const data = GAME.state.stockPrices[stockId].history || [];
    if (data.length < 2) return;

    const isUp = data.length >= 2
      ? data[data.length - 1] >= data[data.length - 2]
      : data[data.length - 1] >= data[0];
    const lineColor = isUp ? "#4ade80" : "#f87171";
    const gradientStartColor = isUp
      ? "rgba(74, 222, 128, 0.5)"
      : "rgba(248, 113, 113, 0.5)";

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight);
    gradient.addColorStop(0, gradientStartColor);
    gradient.addColorStop(1, "rgba(0,0,0,0.0)");

    const timeLabels = ["00.00", "04.00", "08.00", "12.00", "16.00", "20.00"];
    const labels = data.map((_, i) => {
      if (data.length <= 1) return "";
      const step = (data.length - 1) / 5;
      for (let j = 0; j < 6; j++) {
        if (Math.round(j * step) === i) {
          return timeLabels[j];
        }
      }
      return "";
    });

    window.sahamChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: lineColor,
            backgroundColor: gradient,
            borderWidth: 2.5,
            pointRadius: 0,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: {
            display: true,
            grid: {
              color: (context) => context.tick && context.tick.label ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              drawBorder: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.5)',
              font: { size: 7 },
              maxRotation: 0,
              autoSkip: false
            }
          },
          y: { display: false, beginAtZero: false, grace: "20%" },
        },
        animation: { duration: 500, easing: "easeInOutQuad" },
      },
    });
  },

  renderChoices(choices) {
    const container = document.getElementById("story-choices-container");
    const dialogueUI = document.getElementById("story-dialogue-ui");
    container.innerHTML = "";
    container.classList.remove("hidden");

    choices.forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.className = "story-choice-btn animate-choice-in";
      btn.style.animationDelay = `${index * 0.1}s`;
      const playerName = GAME.state.name || "James";
      btn.innerHTML = choice.text.replace(/\{name\}/g, playerName);
      btn.onclick = (e) => {
        e.stopPropagation();
        GAME.logic.handleStoryChoice(choice);
      };
      container.appendChild(btn);
    });

    requestAnimationFrame(() => {
      if (dialogueUI) {
        const choicesHeight = container.offsetHeight;
        dialogueUI.style.transform = `translateY(-${choicesHeight + 15}px)`;
      }
    });
  },

  hideChoices() {
    const container = document.getElementById("story-choices-container");
    const dialogueUI = document.getElementById("story-dialogue-ui");
    container.innerHTML = "";
    container.classList.add("hidden");

    if (dialogueUI) {
      dialogueUI.style.transform = "translateY(0)";
    }
  },

  initWinBars() {
    GAME.state.winState = { wg: 5, wb: 0, clicks: 0, active: true };
    document.getElementById("win-bar-blue").style.opacity = "1";
    document.getElementById("win-bar-orange").style.opacity = "1";
    this.updateWinBars();
  },

  updateWinBars() {
    const { wb, wg } = GAME.state.winState;
    document.getElementById("win-fill-blue").style.height =
      `${GAME.clamp(wb, 0, 100)}%`;
    document.getElementById("win-fill-orange").style.height =
      `${GAME.clamp(wg, 0, 100)}%`;
  },

  hideWinBars() {
    GAME.state.winState.active = false;
    document.getElementById("win-bar-blue").style.opacity = "0";
    document.getElementById("win-bar-orange").style.opacity = "0";
  },

  renderPhoneStats() {
    const { stats } = GAME.state;
    const container = document.getElementById("phone-stats-container");
    if (!container) return;

    const formatChange = (val) => {
      if (val > 0) return `<span class="text-blue-400">+${val}</span>`;
      if (val < 0) return `<span class="text-red-400">${val}</span>`;
      return `<span class="text-gray-400">0</span>`;
    };

    let html = "";
    let panelCount = 0;

    html += `
                    <div class="w-full shrink-0 snap-center px-0.5">
                        <div class="glass-hud flex flex-col p-2.5">
                            <div class="flex justify-between items-center pb-1.5 border-b border-white/10 mb-1.5">
                                <div class="text-center w-full">
                                    <div class="text-gray-300 text-[8px] mb-0.5 uppercase tracking-wider">Wisdom</div>
                                    <div class="text-sm font-bold">${stats.wis}%</div>
                                </div>
                                <div class="w-[1px] h-6 bg-white/20"></div>
                                <div class="text-center w-full">
                                    <div class="text-gray-300 text-[8px] mb-0.5 uppercase tracking-wider">Charisma</div>
                                    <div class="text-sm font-bold">${stats.cha}%</div>
                                </div>
                            </div>
                            <div class="text-center text-[7px] text-gray-300 uppercase tracking-widest font-medium">
                                History: Wis ${formatChange(stats.last_wis_change || 0)} | Cha ${formatChange(stats.last_cha_change || 0)}
                            </div>
                        </div>
                    </div>
                `;
    panelCount++;

    Object.keys(GAME.state.npcs).forEach(npcKey => {
        const npc = GAME.state.npcs[npcKey];
        if (npc.isMet) {
            const npcName = npcKey.charAt(0).toUpperCase() + npcKey.slice(1);
            html += `
                <div class="w-full shrink-0 snap-center px-0.5">
                    <div class="glass-hud flex flex-col p-2.5">
                        <div class="flex justify-between items-center pb-1.5 border-b border-white/10 mb-1.5">
                            <div class="text-left w-full pl-1">
                                <div class="text-white text-[10px] font-bold uppercase tracking-wider mb-0.5">${npcName}</div>
                                <div class="text-[7px] text-gray-400">Story Phase: <span class="text-white">${npc.storyPhase || 0}</span></div>
                            </div>
                            <div class="text-right w-full pr-1">
                                <div class="text-gray-300 text-[7px] mb-0.5 uppercase tracking-wider">Love</div>
                                <div class="text-sm font-bold flex items-center justify-end gap-1.5">${npc.love || 0} <span class="text-[10px]">❤️</span></div>
                            </div>
                        </div>
                        <div class="text-center text-[7px] text-gray-300 uppercase tracking-widest font-medium">
                            History: Love ${formatChange(npc.last_love_change || 0)}
                        </div>
                    </div>
                </div>
            `;
            panelCount++;
        }
    });



    container.innerHTML = html;

    const dotsContainer = document.getElementById("phone-stats-dots");
    if (dotsContainer) {
      let dotsHtml = "";
      for (let i = 0; i < panelCount; i++) {
        dotsHtml += `<div class="w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === 0 ? "bg-white" : "bg-white/30"}"></div>`;
      }
      dotsContainer.innerHTML = dotsHtml;
    }
  },

  scrollPhoneStats(dir) {
    const container = document.getElementById("phone-stats-container");
    if (!container) return;
    const width = container.offsetWidth;
    container.scrollBy({ left: dir * width, behavior: "smooth" });
  },

  updateCarouselDots() {
    const container = document.getElementById("phone-stats-container");
    const dotsContainer = document.getElementById("phone-stats-dots");
    if (!container || !dotsContainer) return;

    const index = Math.round(container.scrollLeft / container.offsetWidth);
    const dots = dotsContainer.children;

    for (let i = 0; i < dots.length; i++) {
      if (i === index) {
        dots[i].classList.replace("bg-white/30", "bg-white");
      } else {
        dots[i].classList.replace("bg-white", "bg-white/30");
      }
    }
  },
};
