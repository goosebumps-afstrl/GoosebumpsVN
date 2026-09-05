export function Phase01Maya() {
    return [
        {
            type: "action",
            action: () => {
                if (window.GAME && window.GAME.state) {
                    window.GAME.state.pendingMayaEvent = false;

                    // Tutup paksa semua modal handphone agar tidak menghalangi adegan
                    const modals = document.querySelectorAll('[id^="modal-"]');
                    modals.forEach(m => {
                        m.classList.add('hidden');
                        m.classList.remove('flex');
                    });
                }
            }
        },
        { type: "image", src: "assets/images/0May00.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0May01.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "{name}! Lo udah siap?" },
        { type: "image", src: "assets/images/0May01-1.jpg", effect: "cross-dissolve", wait: 3000, skippable: true },
        { type: "image", src: "assets/images/0May01-2.jpg", effect: "cross-dissolve", wait: 500, },
        { type: "dialogue", name: "Maya", color: "pink", text: "Hei?" },
        { type: "image", src: "assets/images/0May01-3.jpg", effect: "cross-dissolve", noBreathing: false, wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "Tau ga..." },
        { type: "dialogue", name: "Maya", color: "pink", text: "Cowo yang tadi sore kita obrolin?" },
        { type: "dialogue", name: "Maya", color: "pink", text: "Dia bakal ikut jugaa!" },
        {
            type: "choice",
            choices: [
                {
                    text: "Seriusan?",
                    action: () => {
                        window.GAME.state.npcs.maya.love += 2;
                        window.GAME.state.stats.cha += 1;
                        window.GAME.state.stats.wis += 1;
                        window.GAME.logic.gotoSeq("Phase01Maya_A1");
                    }
                },
                {
                    text: "Ah males gua jadi obat nyamuk",
                    action: () => {
                        window.GAME.state.npcs.maya.love += 1;
                        window.GAME.state.stats.cha += 1;
                        window.GAME.state.stats.wis += 2;
                        window.GAME.logic.gotoSeq("Phase01Maya_A2");
                    }
                },
            ]
        }
    ];
}

export function Phase01Maya_A1() {
    return [
        { type: "image", src: "assets/images/0May02.jpg", effect: "cross-dissolve", wait: 300 },
        { type: "dialogue", name: "Maya", color: "pink", text: "Benerkan kata gua.." },
        { type: "dialogue", name: "Maya", color: "pink", text: "Kemarin tuh doi cuma sibuk aja.." },
        { type: "image", src: "assets/images/0May03A.jpg", effect: "cross-dissolve", noBreathing: true, wait: 900, },
        { type: "image", src: "assets/images/0May04A.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0May05A.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0May01-3.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "Yuk, berangkat?" },
        {
            type: "choice",
            choices: [
                {
                    text: "Ga ah gua ga jadi ikut",
                    action: () => {
                        window.GAME.state.npcs.maya.love += 2;
                        window.GAME.state.stats.cha += 1;
                        window.GAME.state.stats.wis += 1;
                        if (window.GAME) window.GAME.logic.gotoSeq("Phase01Maya_A2");
                    }
                },
                {
                    text: "Males ah, mending gua tidur",
                    action: () => {
                        window.GAME.state.npcs.maya.love += 1;
                        window.GAME.state.stats.cha += 1;
                        window.GAME.state.stats.wis += 1;
                        window.GAME.logic.gotoSeq("Phase01Maya_A2");
                    }
                }
            ]
        }
    ];
}

export function Phase01Maya_A2() {
    return [
        { type: "image", src: "assets/images/0MayA201.jpg", effect: "cross-dissolve", wait: 300 },
        { type: "dialogue", name: "Maya", color: "pink", text: "Ih ko gitu sih?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Males anjir ngapain!",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                },
                {
                    text: "Ngapain gua disana? Ngobrol ma cowo lu?",
                    action: () => {
                        window.GAME.state.stats.wis += 1;
                        window.GAME.logic.nextStoryStep();
                    }
                }
            ]
        },
        { type: "image", src: "assets/images/0MayA202.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Kan disana lu bisa nyari cewe juga!" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Double date nanti kita..." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Dih tolol...",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                },
                {
                    text: "Gua bukan om-om yang doyan<br>nyari cewe di bar anjir!",
                    action: () => {
                        window.GAME.state.stats.cha += 1;
                        window.GAME.state.stats.last_cha_change = 1;
                        window.GAME.logic.nextStoryStep();
                    }
                }
            ]
        },
        { type: "image", src: "assets/images/0May01-3.jpg", effect: "cross-dissolve", wait: 500, },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Yaudah seengganya temenin gua aja ya.." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Kapan lagi gua main sama dua\ncowo ganteng?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Bener-bener aneh pikiran lo",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                },
                {
                    text: "Emang fetis lo jadi bahan threesome ya?",
                    action: () => {
                        window.GAME.state.stats.cha += 1;
                        window.GAME.state.stats.last_cha_change = 1;
                        window.GAME.logic.nextStoryStep();
                    }
                }
            ]
        },
        { type: "image", src: "assets/images/0May02A.jpg", effect: "cross-dissolve", wait: 250, skippable: true },
        { type: "dialogue", name: "Maya", color: "pink", text: "Gua cuma pengen pamer cowo aja sih," },
        { type: "dialogue", name: "Maya", color: "pink", text: "Wleee.." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Seganteng apa sih emangnya?",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                },
                {
                    text: "Dih najis, so cantik banget!",
                    action: () => {
                        window.GAME.state.stats.cha += 1;
                        window.GAME.state.stats.last_cha_change = 1;
                        window.GAME.logic.nextStoryStep();
                    }
                }
            ]
        },
        { type: "image", src: "assets/images/0May02.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0May01-3.jpg", effect: "cross-dissolve", wait: 500, },
        { type: "dialogue", name: "Maya", color: "pink", text: "Pliss, Ikut ya?" },
        {
            type: "choice",
            choices: [
                {
                    text: "Ya udah terserah lo dah",
                    action: () => {
                        window.GAME.state.npcs.maya.love += 2;
                        window.GAME.state.stats.cha += 1;
                        window.GAME.state.stats.wis += 1;
                        if (window.GAME) window.GAME.logic.gotoSeq("Phase01Maya_001");
                    }
                },
                {
                    text: "Cariin kaos kaki gua dulu kalo gitu!",
                    action: () => {
                        window.GAME.state.npcs.maya.love += 1;
                        window.GAME.state.stats.cha += 1;
                        window.GAME.state.stats.wis += 1;
                        window.GAME.logic.gotoSeq("Phase01Maya_B1");
                    }
                }
            ]
        }
    ];
}

export function Phase01Maya_B1() {
    return [
        { type: "image", src: "assets/images/0May02B1.jpg", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0May02B2.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "Bener-bener lo ya {name}.." },
        { type: "image", src: "assets/images/0May02B3.jpg", effect: "cross-dissolve", wait: 500, },
        { type: "dialogue", name: "Maya", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0May02B4.jpg", effect: "cross-dissolve", wait: 500, },
        { type: "dialogue", name: "Maya", color: "pink", text: "Lo lagi ngerjain gua ya?" },
        { type: "image", src: "assets/images/0May02B5.jpg", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0May02B6.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0May02B7.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0May02B8.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "Hei {name}..." },
        { type: "image", src: "assets/images/0May02B9.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "Gimana kalo gua jadi step-sis?" },
        { type: "image", src: "assets/images/0May02B10.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0May02B11.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "{name}, step-bro..." },
        { type: "image", src: "assets/images/0May02B12.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "Help, step-bro, i’m stuck ahh.." },
        { type: "image", src: "assets/images/0May02B10.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "Step-bro..." },
        {
            type: "choice",
            choices: [
                {
                    text: "Pegang Pantat Maya",
                    action: () => {
                        window.GAME.state.npcs.maya.love -= 10;
                        window.GAME.state.npcs.maya.last_love_change = -10;
                        window.GAME.state.stats.cha -= 5;
                        window.GAME.state.stats.last_cha_change = -5;
                        window.GAME.state.stats.wis -= 5;
                        window.GAME.state.stats.last_wis_change = -5;
                        window.GAME.logic.gotoSeq("Phase01Maya_C1");
                    }
                },
                {
                    text: "Jangan bercanda kaya gitu Njing,<br>ntar lo gua entot nangis!",
                    action: () => {
                        window.GAME.state.npcs.maya.love += 5;
                        window.GAME.state.npcs.maya.last_love_change = 5;
                        window.GAME.state.stats.cha += 5;
                        window.GAME.state.stats.last_cha_change = 5;
                        window.GAME.state.stats.wis += 5;
                        window.GAME.state.stats.last_wis_change = 5;
                        window.GAME.logic.gotoSeq([
                            { type: "image", src: "assets/images/0May02B13.jpg", effect: "cross-dissolve", noBreathing: true, wait: 1500, skippable: true },
                            { type: "image", src: "assets/images/0May02B14.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
                            { type: "image", src: "assets/images/0May02B15.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
                            { type: "dialogue", name: "Maya", color: "pink", text: "Pffft… you don't want me, stepbro?" },
                            { type: "image", src: "assets/images/0May02B16.jpg", effect: "cross-dissolve", noBreathing: true, wait: 1500, retainDialogue: true, skippable: true },
                            { type: "image", src: "assets/images/0May02B17.jpg", effect: "cross-dissolve", wait: 500, retainDialogue: true },
                            {
                                type: "choice",
                                choices: [
                                    {
                                        text: "Ga lucu ya anjing!",
                                        action: () => {
                                            if (window.GAME && window.GAME.state && window.GAME.state.history) {
                                                window.GAME.state.history.mayaGaLucu = true;
                                            }
                                            window.GAME.state.stats.wis += 1;
                                            window.GAME.state.stats.last_wis_change = 1;
                                            window.GAME.logic.gotoSeq([
                                                { type: "image", src: "assets/images/0May02B18.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
                                                { type: "image", src: "assets/images/0May02B19.jpg", effect: "cross-dissolve", wait: 500 },
                                                { type: "dialogue", name: "Maya", color: "pink", text: "Yuk ah udah buruan." },
                                                { type: "image", src: "assets/images/0May02B20.jpg", effect: "cross-dissolve", wait: 500 },
                                                { type: "dialogue", name: "Maya", color: "pink", text: "Pokonya minuman kamu aku yang bayar!" },
                                                { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Maya_001") }
                                            ]);
                                        }
                                    },
                                    {
                                        text: "Beneran pengen gua entot lu ya?",
                                        action: () => {
                                            if (window.GAME && window.GAME.state && window.GAME.state.history) {
                                                window.GAME.state.history.mayaGaLucu = true;
                                            }
                                            window.GAME.state.stats.cha += 1;
                                            window.GAME.state.stats.last_cha_change = 1;
                                            window.GAME.logic.gotoSeq([
                                                { type: "image", src: "assets/images/0May02B17.jpg", effect: "cross-dissolve", wait: 500, retainDialogue: true },
                                                { type: "dialogue", name: "Maya", color: "pink", text: "Engga pliss..." },
                                                { type: "dialogue", name: "Maya", color: "pink", text: "Jangan step-bro.." },
                                                { type: "image", src: "assets/images/0May02B15.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
                                                { type: "dialogue", name: "Maya", color: "pink", text: "..." },
                                                { type: "image", src: "assets/images/0May02B18.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
                                                { type: "image", src: "assets/images/0May02B19.jpg", effect: "cross-dissolve", wait: 500 },
                                                { type: "dialogue", name: "Maya", color: "pink", text: "Yuk ah udah buruan." },
                                                { type: "image", src: "assets/images/0May02B20.jpg", effect: "cross-dissolve", wait: 500 },
                                                { type: "dialogue", name: "Maya", color: "pink", text: "Pokonya minuman kamu aku yang bayar!" },
                                                { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Maya_001") }
                                            ]);
                                        }
                                    }
                                ]
                            }
                        ]);
                    }
                }
            ]
        }
    ];
}

export function Phase01Maya_C1() {
    return [
        { type: "image", src: "assets/images/0May02C1.jpg", effect: "cross-dissolve", wait: 1000, skippable: true },
        { type: "image", src: "assets/images/0May02C2.jpg", effect: "cross-dissolve", wait: 1000 },
        { type: "image", src: "assets/images/0May02C3.jpg", effect: "cross-dissolve", wait: 1000 },
        { type: "image", src: "assets/images/0May02C4.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "Ah..." },
        { type: "image", src: "assets/images/0May02C5.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "{name}?!" },
        { type: "image", src: "assets/images/0May02B13.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
        { type: "dialogue", name: "Maya", color: "pink", text: "Tangan lu ngapain anjing?!" },
        {
            type: "choice",
            choices: [
                {
                    text: "Lah? lo yang mulai!",
                    action: () => {
                        window.GAME.state.stats.wis += 1;
                        window.GAME.state.stats.last_wis_change = 1;
                        window.GAME.logic.gotoSeq([
                            { type: "image", src: "assets/images/0May02C6.jpg", effect: "cross-dissolve", noBreathing: true, wait: 1000, skippable: true },
                            { type: "image", src: "assets/images/0May02C7.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
                            { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Tolol! Jijik banget!!" },
                            { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Bercanda anjiir!" },
                            { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Sangean lu ya?" },
                            { type: "image", src: "assets/images/0May02C8.jpg", effect: "cross-dissolve", noBreathing: true, wait: 1000, skippable: true },
                            { type: "image", src: "assets/images/0May02C9.jpg", effect: "cross-dissolve", wait: 500 },
                            { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Yuk, ah udah buruan." },
                            { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Maya_001") }
                        ]);
                    }
                },
                {
                    text: "Haha.. Sorry..",
                    action: () => {
                        window.GAME.state.stats.wis += 1;
                        window.GAME.state.stats.last_wis_change = 1;
                        window.GAME.logic.gotoSeq([
                            { type: "image", src: "assets/images/0May02C6.jpg", effect: "cross-dissolve", noBreathing: true, wait: 1000, skippable: true },
                            { type: "image", src: "assets/images/0May02C7.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
                            { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Tolol! Jijik banget!!" },
                            { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Sangean lu ya?" },
                            { type: "image", src: "assets/images/0May02C8.jpg", effect: "cross-dissolve", noBreathing: true, wait: 1000, skippable: true },
                            { type: "image", src: "assets/images/0May02C9.jpg", effect: "cross-dissolve", wait: 500 },
                            { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Yuk, ah udah buruan." },
                            { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Maya_001") }
                        ]);
                    }
                }
            ]
        }
    ];
}

export function Phase01Maya_001() {
    return [
        { bg: "black", wait: 3000 },
        { type: "image", src: "assets/images/0May03.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500, },
        { type: "dialogue", retainMedia: true, name: "????", color: "#90c2ffff", noBreathing: true, text: "...." },
        { type: "image", src: "assets/images/0May04.jpg", effect: "cross-dissolve", wait: 500, },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0May05.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0May06.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0May07.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0May08.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
        {
            type: "action",
            action: () => {
                if (window.GAME && window.GAME.logic) {
                    window.GAME.logic.saveGame("autosave");
                    window.GAME.logic.gotoSeq("Phase01Roxanne");
                }
            }
        }
    ];
}

// Sub-functions are now exported directly.
