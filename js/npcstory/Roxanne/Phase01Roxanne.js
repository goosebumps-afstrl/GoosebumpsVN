export function Phase01Roxanne() {
    return [
        {
            type: "action",
            action: () => {
                if (window.GAME && window.GAME.state) {
                    window.GAME.state.npcs.roxanne.isMet = true;
                }
                window.GAME.logic.nextStoryStep();
            }
        },
        { type: "image", src: "assets/images/0Rox01.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500 },
        {
            type: "choice",
            choices: [
                {
                    text: "French 75",
                    action: () => {
                        if (window.GAME && window.GAME.state && window.GAME.state.history) {
                            window.GAME.state.history.roxanneDrink = 'French 75';
                        }
                        window.GAME.logic.gotoSeq([
                            { type: "image", src: "assets/images/0Rox02_1.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
                            { type: "image", src: "assets/images/0Rox03.jpg", effect: "cross-dissolve", wait: 500 },
                            { type: "dialogue", retainMedia: true, name: "????", color: "Orange", text: "Minumannya cantik banget.." },
                            { type: "dialogue", retainMedia: true, name: "????", color: "Orange", text: "Sayang kalau diminum pake muka galau kaya gitu.." },
                            { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Roxanne_04") }
                        ]);
                    }
                },
                {
                    text: "Gin Tonic",
                    action: () => {
                        if (window.GAME && window.GAME.state && window.GAME.state.history) {
                            window.GAME.state.history.roxanneDrink = 'Gin Tonic';
                        }
                        window.GAME.logic.gotoSeq([
                            { type: "image", src: "assets/images/0Rox02_2.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
                            { type: "image", src: "assets/images/0Rox03.jpg", effect: "cross-dissolve", wait: 500 },
                            { type: "dialogue", retainMedia: true, name: "????", color: "Orange", text: "Hey ganteng.." },
                            { type: "dialogue", retainMedia: true, name: "????", color: "Orange", text: "Kamu sendirian?" },
                            { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Roxanne_04") }
                        ]);
                    }
                },
                {
                    text: "Whiskey On the Rock",
                    action: () => {
                        if (window.GAME && window.GAME.state && window.GAME.state.history) {
                            window.GAME.state.history.roxanneDrink = 'Whiskey On the Rock';
                        }
                        window.GAME.logic.gotoSeq([
                            { type: "image", src: "assets/images/0Rox02_3.jpg", effect: "cross-dissolve", noBreathing: true, wait: 2000, skippable: true },
                            { type: "image", src: "assets/images/0Rox03.jpg", effect: "cross-dissolve", wait: 500 },
                            { type: "dialogue", retainMedia: true, name: "????", color: "Orange", text: "Hey ganteng..." },
                            { type: "dialogue", retainMedia: true, name: "????", color: "Orange", text: "Kamu sedang sedih?" },
                            { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Roxanne_04") }
                        ]);
                    }
                }
            ]
        }
    ];
}

export function Phase01Roxanne_04() {
    return [
        { type: "image", src: "assets/images/0Rox04.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "????", color: "Orange", text: "Boleh aku temenin?" },
        { type: "image", src: "assets/images/0Rox05.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500, retainDialogue: true },
        {
            type: "choice",
            choices: [
                {
                    text: "Boleh, mau pesen lagi minuman?",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'roxanne');
                        window.GAME.logic.gotoSeq([
                            { type: "image", src: "assets/images/0Rox06.jpg", effect: "cross-dissolve", wait: 500 },
                            { type: "dialogue", retainMedia: true, name: "????", color: "Orange", text: "ga perlu {name}, makasih." },
                            { type: "image", src: "assets/images/0Rox07.jpg", effect: "cross-dissolve", wait: 500 },
                            { type: "dialogue", retainMedia: true, name: "????", color: "Orange", text: "minuman aku udah cukup, \ndan aku ga akan lama ko." },
                            { type: "image", src: "assets/images/0Rox08.jpg", effect: "cross-dissolve", wait: 500 },
                            { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Namaku Roxanne, Salam kenal {name}." },
                            { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Roxanne_09") }
                        ]);
                    }
                },
                {
                    text: "Boleh cantik, dengan senang hati",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'roxanne');
                        window.GAME.logic.gotoSeq([
                            { type: "image", src: "assets/images/0Rox08.jpg", effect: "cross-dissolve", wait: 500 },
                            { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Nama aku Roxanne. Salam kenal {name}." },
                            { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Roxanne_09") }
                        ]);
                    }
                }
            ]
        }
    ];
}

export function Phase01Roxanne_09() {
    return [
        { type: "image", src: "assets/images/0Rox09.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Yang disana itu..." },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Temen kamu {name}?" },
        { type: "image", src: "assets/images/0Rox10.jpg", effect: "cross-dissolve", noBreathing: true, wait: 500, retainDialogue: true },
        {
            type: "choice",
            choices: [
                {
                    text: "Ya, namanya Maya",
                    next: "Phase01Roxanne_11"
                },
                {
                    text: "Iya, temen cowonya gue gatau siapa",
                    next: "Phase01Roxanne_11"
                }
            ]
        }
    ];
}

export function Phase01Roxanne_11() {
    return [
        { type: "image", src: "assets/images/0Rox11.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Hahaha.. {name}," },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "kamu udah kaya ajudan pribadi..." },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "ajudan pribadi yang imut banget.." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Haha.. Iya juga",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                },
                {
                    text: "Emang pada dasarnya gue tolol sih",
                    action: () => {
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.nextStoryStep();
                    }
                }
            ]
        },
        { type: "image", src: "assets/images/0Rox12.jpg", effect: "cross-dissolve", wait: 500, retainDialogue: true },
        {
            type: "choice",
            choices: [
                {
                    text: "Ngomong-ngomong, ko lo bisa tau nama gue {name}?",
                    action: () => {
                        window.GAME.logic.gotoSeq("Phase01Roxanne_13");
                    }
                },
                {
                    text: "Roxanne kan? Ko lo bisa tau nama gue?",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'roxanne');
                        window.GAME.logic.gotoSeq("Phase01Roxanne_13");
                    }
                }
            ]
        }
    ];
}

export function Phase01Roxanne_13() {
    return [
        { type: "image", src: "assets/images/0Rox13_1.jpg", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Rox13_2.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "..." },
        { type: "image", src: "assets/images/0Rox14.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Anggap aja aku penggemar berat kamu.." },
        { type: "image", src: "assets/images/0Rox15.jpg", effect: "cross-dissolve", wait: 500, retainDialogue: true },
        {
            type: "choice",
            choices: [
                {
                    text: "Baru sekarang gue punya penggemar",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'roxanne');
                        window.GAME.logic.gotoSeq("Phase01Roxanne_16");
                    }
                },
                {
                    text: "Oh ok, senang punya penggemar <br> secantik kamu",
                    action: () => {
                        window.GAME.logic.gotoSeq("Phase01Roxanne_16");
                    }
                }
            ]
        }
    ];
}

export function Phase01Roxanne_16() {
    return [
        { type: "image", src: "assets/images/0Rox11.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Haha.. kamu lucu banget {name}." },
        { type: "image", src: "assets/images/0Rox17.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Jadi.." },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Kamu galau gara-gara cewe itu {name}?" },
        {
            type: "choice",
            choices: [
                {
                    text: "Mungkin..",
                    action: () => {
                        window.GAME.logic.gotoSeq("Phase01Roxanne_19");
                    }
                },
                {
                    text: "Engga sih, gua lagi bingung aja",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'roxanne');
                        window.GAME.logic.gotoSeq("Phase01Roxanne_19");
                    }
                }
            ]
        }
    ];
}

export function Phase01Roxanne_19() {
    return [
        { type: "image", src: "assets/images/0Rox18.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Mau coba bikin dia cemburu?" },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Boleh aku nyandar ke bahu kamu?" },
        { type: "image", src: "assets/images/0Rox19.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Apa kamu penasaran?" },
        { type: "image", src: "assets/images/0Rox20.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Aku berani taruhan kalau dia\npasti bakal cemburu." },
        { type: "image", src: "assets/images/0Rox21.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Pegang pinggang aku {name}" },
        { type: "image", src: "assets/images/0Rox22.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Aku ga keberatan." },
        { type: "image", src: "assets/images/0Rox23.jpg", effect: "cross-dissolve", wait: 1500, skippable: true },
        { type: "image", src: "assets/images/0Rox24.jpg", effect: "cross-dissolve", wait: 1500, skippable: true },
        { type: "image", src: "assets/images/0Rox25.jpg", effect: "cross-dissolve", wait: 1500, skippable: true },
        { type: "image", src: "assets/images/0Rox26.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "..." },
        { type: "image", src: "assets/images/0Rox27.jpg", effect: "cross-dissolve", wait: 1500, skippable: true },
        { type: "image", src: "assets/images/0Rox28.jpg", effect: "cross-dissolve", wait: 1500, skippable: true },
        { type: "image", src: "assets/images/0Rox29.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Kamu emang super duper lucu {name}." },
        { type: "image", src: "assets/images/0Rox30.jpg", effect: "cross-dissolve", wait: 1500, skippable: true },
        { type: "image", src: "assets/images/0Rox16.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Sorry.. tapi kayanya aku harus pergi." },
        { type: "image", src: "assets/images/0Rox32.jpg", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Mungkin kita bisa ketemu lagi lain waktu" },
        { type: "dialogue", retainMedia: true, name: "Roxanne", color: "Orange", text: "Bye {name}..." },
        { type: "image", src: "assets/images/0Rox33.jpg", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Rox34.jpg", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Rox35.jpg", effect: "cross-dissolve", wait: 2000, skippable: true },
        {
            type: "action",
            action: () => {
                if (window.GAME && window.GAME.logic) {
                    window.GAME.logic.saveGame("autosave");
                    window.GAME.logic.gotoSeq("Phase01Trixie");
                }
            }
        }
    ];
}

// Sub-functions are exported directly.
