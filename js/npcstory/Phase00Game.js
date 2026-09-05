export function Phase00Game() {
    return [
        { type: "action", action: () => { window.GAME.audio.playSFX("citypark"); } },
        { type: "image", src: "assets/images/0Gm01.webp", effect: "cross-dissolve", wait: 6000, skippable: true },
        { type: "image", src: "assets/images/0Gm02.webp", effect: "cross-dissolve", wait: 1000, skippable: true },
        { type: "action", action: () => { window.GAME.audio.playSFX("swosh"); } },
        { bg: "white", effect: "cross-dissolve", wait: 500 },
        { type: "action", action: () => { window.GAME.audio.playSFX("chaotic"); } },
        { type: "image", src: "assets/images/0Gm03.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Gm04.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Gm05.webp", effect: "cross-dissolve", wait: 1500, skippable: true },
        { type: "image", src: "assets/images/0Gm06.webp", effect: "cross-dissolve", wait: 1500, skippable: true },
        { type: "image", src: "assets/images/0Gm07.webp", effect: "cross-dissolve", wait: 1500, skippable: true },
        { type: "image", src: "assets/images/0Gm08.webp", effect: "cross-dissolve", wait: 1500, skippable: true },
        { type: "image", src: "assets/images/0Gm09.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "action", action: () => { window.GAME.audio.stopSFX("chaotic"); window.GAME.audio.playSFX("swosh"); } },
        { bg: "white", effect: "cross-dissolve", wait: 500 },
        { type: "image", src: "assets/images/0Gm10.webp", effect: "cross-dissolve", wait: 500 },
        {
            type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "{name}?",
            voiceDialogue: "assets/sounds/MayKaget_vo.ogg"
        },
        { type: "image", src: "assets/images/0Gm11.webp", effect: "cross-dissolve", wait: 500 },
        {
            type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Kamu mimpi buruk lagi?",
            voiceDialogue: "assets/sounds/May01_vo.ogg"
        },
        { type: "image", src: "assets/images/0Gm12.webp", effect: "cross-dissolve", wait: 1000 },
        { type: "image", src: "assets/images/0Gm13.webp", effect: "cross-dissolve", wait: 2000 },
        { type: "image", src: "assets/images/0Gm14.webp", effect: "cross-dissolve", wait: 500 },
        {
            type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Muka lo panik banget.",
            voiceDialogue: "assets/sounds/May02_vo.ogg"
        },
        {
            type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Akhir-akhir ini lo sering banget\nmimpi buruk kaya gini...",
            voiceDialogue: "assets/sounds/May03_vo.ogg"
        },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0Gm22.webp", effect: "cross-dissolve", wait: 500 },
        { type: "action", action: () => { window.GAME.audio.playBGM("phase00"); } },
        {
            type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Lo gapapa kan?",
            voiceDialogue: "assets/sounds/MayNanya_vo.ogg"
        },
        {
            type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Perlu ke psikiater?",
            voiceDialogue: "assets/sounds/May04_vo.ogg"
        },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Gue ga lagi tertekan atau stress kok",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                },
                {
                    text: "Apa mimpi gue ini pertanda ya?",
                    action: () => {
                        window.GAME.logic.addStat('wis', 1);
                        window.GAME.logic.nextStoryStep();
                    }
                }
            ]
        },
        { type: "image", src: "assets/images/0Gm14.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Masa sih?" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Tapi..." },
        { type: "image", src: "assets/images/0Gm15.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Kadang insting lu emang\nsuka bener sih.." },
        { type: "image", src: "assets/images/0Gm16.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Gue juga khawatir sebenernya," },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Ditengah zaman rusuh kaya gini.." },
        { type: "image", src: "assets/images/0Gm17.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Kayanya gue udah harus mulai\nnyari cowo deh..." },
        { type: "image", src: "assets/images/0Gm18.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "...Cowo ganteng berotot yang\nbisa diandelin..." },
        { type: "image", src: "assets/images/0Gm17.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Tipe-tipe pemadam kebakaran ga sih?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Hah? Gimana?",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                },
                {
                    text: "Ga sekalian sama tentara aja?",
                    action: () => {
                        window.GAME.logic.addStat('wis', 1);
                        window.GAME.logic.nextStoryStep();
                    }
                }
            ]
        },
        { type: "image", src: "assets/images/0Gm16.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Gatau sih..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Gua mikirnya.." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Kalo mati sama cowo ganteng..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Berasa film romansa cogan estetik gitu.." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Estetik? Otak lo kiamat duluan sih",
                    action: () => {
                        window.GAME.logic.addStat('love', 2, 'maya');
                        window.GAME.state.stats.last_love_change = { npc: 'maya', val: 2 };
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.gotoSeq("Phase00Game_Seq01");
                    }
                },
                {
                    text: "Masalahnya, cogannya bakal tulus jagain lo<br>apa engga?",
                    action: () => {
                        window.GAME.logic.addStat('love', 2, 'maya');
                        window.GAME.state.stats.last_love_change = { npc: 'maya', val: 2 };
                        window.GAME.logic.addStat('wis', 1);
                        window.GAME.logic.gotoSeq("Phase00Game_Seq02");
                    }
                },
            ]
        }
    ];
}

export function Phase00Game_Seq01() {
    return [
        { type: "action", action: () => { window.GAME.audio.stopSFX("chaotic"); } },
        { type: "image", src: "assets/images/0Gm17.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Dih, ga apa-apa dong," },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Itu kan emang idaman semua cewe ga sih?" },
        { type: "image", src: "assets/images/0Gm18.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Tapi serius deh..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Kemarin gue akhirnya dapet si cowo\nestetik ini..." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "...Cowok yang mana lagi?",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'maya');
                        window.GAME.state.stats.last_love_change = { npc: 'maya', val: 1 };
                        window.GAME.logic.gotoSeq("Phase00Game_Seq04");
                    }
                },
                {
                    text: "Hah? Kemarin?",
                    action: () => {
                        window.GAME.logic.addStat('love', 2, 'maya');
                        window.GAME.state.stats.last_love_change = { npc: 'maya', val: 2 };
                        window.GAME.logic.gotoSeq("Phase00Game_Seq04");
                    }
                }
            ]
        }
    ];
}

export function Phase00Game_Seq02() {
    return [
        { type: "action", action: () => { window.GAME.audio.stopSFX("chaotic"); } },
        { type: "image", src: "assets/images/0Gm17.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Harus dong!" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Ngapain gua pacarin kalo ga tulus?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Gausah cari yang ganteng ga sih?",
                    action: () => {
                        window.GAME.logic.addStat('wis', 1);
                        window.GAME.logic.gotoSeq("Phase00Game_Seq01");
                    }
                },
                {
                    text: "Masalahnya lu suka nyari cowo yang cuma manfaatin lu doang May..",
                    action: () => {
                        window.GAME.logic.addStat('love', 5, 'maya');
                        window.GAME.state.stats.last_love_change = { npc: 'maya', val: 5 };
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.addStat('wis', 1);
                        window.GAME.logic.nextStoryStep();
                    }
                }
            ]
        },
        { type: "image", src: "assets/images/0Gm19.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Lu bener sih {name}" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Gua udah cape sama cowo bajingan." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Kadang gue mikir..." },
        { type: "image", src: "assets/images/0Gm21.webp", effect: "cross-dissolve", wait: 300 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Kenapa sih gua selalu ngedapetin cowo-cowo berengsek!" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Yang cuma manis di awal aja!" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Ujung-ujungnya..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Berengsek lagi, selingkuh lagi!" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0Gm20.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Coba aja kalo semua cowo sikapnya\nkaya lo semua..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Pengertian..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Loyal..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Selalu ada buat gue..." },
        { type: "image", src: "assets/images/0Gm22.webp", effect: "cross-dissolve", wait: 100 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Gua pengen banget deh.." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Cowo yang gua deketin sekarang.." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Sikapnya kaya lo gini..." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Cowo? cowo yang mana lagi nih?",
                    action: () => {
                        window.GAME.logic.gotoSeq("Phase00Game_Seq04");
                    }
                },
                {
                    text: "Hah? Lu belum cerita, lu lagi deketin<br>cowo lagi?",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'maya');
                        window.GAME.state.stats.last_love_change = { npc: 'maya', val: 1 };
                        window.GAME.logic.gotoSeq("Phase00Game_Seq04");
                    }
                }
            ]
        }
    ];
}

export function Phase00Game_Seq04() {
    return [
        { type: "image", src: "assets/images/0Gm17.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Itu loh... yang anak gym," },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Kayanya lo udah pernah ketemu deh," },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0Gm20.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Sumpah ya, dia tuh cakep banget" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Agak pendiem sih.." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Tapi baik orangnya." },
        { type: "image", src: "assets/images/0Gm21.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Cuma cueknya kayak kulkas rusak!" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Gue chat pagi dibalesnya minggu depan." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Ko bisa sih dia cuekin lo?",
                    action: () => {
                        window.GAME.logic.addStat('love', 3, 'maya');
                        window.GAME.state.stats.last_love_change = { npc: 'maya', val: 3 };
                        window.GAME.logic.nextStoryStep();
                    }
                },
                {
                    text: "Dia ga tertarik modelan lo kali",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                }
            ]
        },
        { type: "image", src: "assets/images/0Gm17.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Ih makanya gue heran!" },
        { type: "image", src: "assets/images/0Gm21.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Kenapa sih gua susah banget dapetin cowo yang bener." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Yang nyamperin gue cuma orang-orang berengsek." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Pasti suatu saat nanti lo bakalan dapet<br>cowo yang bener ko",
                    action: () => {
                        window.GAME.logic.addStat('love', 2, 'maya');
                        window.GAME.state.stats.last_love_change = { npc: 'maya', val: 2 };
                        window.GAME.logic.nextStoryStep();
                    }
                },
                {
                    text: "Loe-nya aja sih malah nyari yang susah!",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                }
            ]
        },
        { type: "image", src: "assets/images/0Gm22.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "{name} lu pasti ngerti kan?" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Gua ga berharap cowo gua sesempurna itu kok!" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Cukup ganteng sama perhatian aja sih." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Cowo di depan lo ini apa kurang ganteng?",
                    action: () => {
                        window.GAME.logic.addStat('cha', 3);
                        window.GAME.logic.addStat('wis', 1);
                        window.GAME.logic.nextStoryStep();
                    }
                },
                {
                    text: "Mending lu sama gua aja deh?",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                }
            ]
        },
        { type: "image", src: "assets/images/0Gm20.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Ih paan sih?" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Najis..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Kita kan bestie!" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Udah lama juga sih kita temenan kaya gini...",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                },
                {
                    text: "Udah bosen gue jadi bestie",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                }
            ]
        },
        { type: "image", src: "assets/images/0Gm17.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Pokoknya sebenernya gua udah ada kemajuan sama cowo ini!" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Moga aja kedepannya dia ga secuek itu sih," },
        { type: "image", src: "assets/images/0Gm19.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Yang gue liat sih dia bukan tipe cowo main sana sini," },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Mungkin emang dia lagi sibuk kali ya?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Ya good luck deh kalo gitu",
                    action: () => {
                        window.GAME.logic.addStat('wis', 2);
                        window.GAME.logic.nextStoryStep();
                    }
                },
                {
                    text: "Gatau ya, lu bukan tipe yang bisa baca<br>sikap cowo soalnya",
                    action: () => {
                        window.GAME.logic.addStat('cha', 3);
                        window.GAME.logic.addStat('wis', 2);
                        window.GAME.logic.gotoSeq("Phase00Game_Seq04_A");
                    }
                }
            ]
        },
        { type: "image", src: "assets/images/0Gm20.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Ya semoga aja sih," },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "dia ga php-in gua." },
        { type: "image", src: "assets/images/0Gm22.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "{name}, kenapa?" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Ko muka lu jadi sedih gitu?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Gua doain semoga ini yang terbaik buat loe",
                    action: () => {
                        window.GAME.logic.gotoSeq("Phase00Game_Seq05");
                    }
                },
                {
                    text: "Gapapa, gua cuma aga iri aja",
                    action: () => {
                        window.GAME.logic.gotoSeq("Phase00Game_Seq05");
                    }
                }
            ]
        }
    ];
}

export function Phase00Game_Seq04_A() {
    return [
        { type: "image", src: "assets/images/0Gm20.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Dih kata siapa!" },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Gua bisa bedain mana yang buaya mana yang engga ya!" },
        { type: "image", src: "assets/images/0Gm22.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Seengganya gua juga tau lu bukan tipikal buaya." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Anti banget gue sama buaya!" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Hahaha.. Kata siapa?",
                    action: () => {
                        window.GAME.logic.gotoSeq("Phase00Game_Seq05");
                    }
                },
                {
                    text: "Semoga yang ini loe ga di kecewain lagi ya..",
                    action: () => {
                        window.GAME.logic.gotoSeq("Phase00Game_Seq05");
                    }
                }
            ]
        }
    ];
}

export function Phase00Game_Seq05() {
    return [
        { type: "image", src: "assets/images/0Gm23.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Ntar malem temenin gue ke klub yuk?" },
        { type: "image", src: "assets/images/0Gm24.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Gue pengen minum, joget santai." },
        { type: "image", src: "assets/images/0Gm25.webp", effect: "cross-dissolve", wait: 1500 },
        { type: "image", src: "assets/images/0Gm26.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Pokoknya lu wajib ikut, gak boleh nolak!" },
        { type: "image", src: "assets/images/0Gm27.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Gue siap-siap dulu ya!" },
        { type: "action", action: () => { window.GAME.audio.stopSFX("citypark"); } },
        { type: "image", src: "assets/images/0Gm28.webp", effect: "cross-dissolve", wait: 500 },
        {
            type: "dialogue", retainMedia: true, name: "Maya", color: "pink", text: "Love you, bestie! Bye!",
            voiceDialogue: "assets/sounds/MayBye_vo.ogg"
        },
        { type: "image", src: "assets/images/0Gm29.webp", effect: "cross-dissolve", wait: 1500, skippable: true },
        { type: "image", src: "assets/images/0Gm30.webp", effect: "cross-dissolve", wait: 2500, skippable: true },
        { type: "image", src: "assets/images/0Z0maps_sore_7.webp", effect: "cross-dissolve", wait: 3000, skippable: true },
        { type: "image", src: "assets/images/0Z0maps_sore_6.webp", effect: "cross-dissolve", wait: 500, skippable: true },
        {
            type: "action",
            action: () => {
                if (window.GAME && window.GAME.logic) {
                    window.GAME.state.isPhase00SpecialMap = true;
                    window.GAME.logic.openCityMap('assets/images/0Gm29.webp');
                }
            }
        }
    ];
}

export function Phase00Game_TVNews() {
    return [
        { bg: "black", wait: 1000 },
        {
            type: "action",
            action: () => {
                if (window.GAME && window.GAME.logic) {
                    window.GAME.logic.advanceTime(1);
                }
                window.GAME.logic.nextStoryStep();
            }
        },
        { type: "video", src: "assets/videos/00Apar01.webm", effect: "cross-dissolve", wait: 1000, skippable: false },
        { type: "image", src: "assets/images/00Apart02.webp", wait: 500 },
        { type: "image", src: "assets/images/00Apart03.webp", wait: 3000, skippable: true },
        { type: "action", action: () => { window.GAME.audio.stopAllBGM(); } }, // This will fade out the current BGM
        { type: "image", src: "assets/images/00Apart04.webp", wait: 1000 },
        { type: "image", src: "assets/videos/001News01.webm", wait: 2000 },
        {
            type: "dialogue", name: "Penyiar Berita", color: "#60a5fa",
            text: "Selamat malam pemirsa, "
        },
        {
            type: "dialogue", name: "Penyiar Berita", color: "#60a5fa",
            text: "Kembali lagi dalam siaran Berita Utama."
        },
        {
            type: "dialogue", name: "Penyiar Berita", color: "#60a5fa",
            text: "Kami awali informasi malam ini dengan krisis kekeringan global."
        },
        {
            type: "dialogue", name: "Penyiar Berita", color: "#60a5fa",
            text: "Badan Meteorologi melaporkan, "
        },
        {
            type: "dialogue", name: "Penyiar Berita", color: "#60a5fa",
            text: "hingga detik ini belum ada satupun bagian wilayah dunia yang mengalami fase turunnya curah hujan,"
        },
        {
            type: "dialogue", name: "Penyiar Berita", color: "#60a5fa",
            text: "Menanggapi ancaman kelangkaan air,"
        },
        {
            type: "dialogue", name: "Penyiar Berita", color: "#60a5fa",
            text: "Pemerintah resmi mengumumkan pembangunan mega proyek desalinasi,"
        },
        {
            type: "dialogue", name: "Penyiar Berita", color: "#60a5fa",
            text: "Pihak kementerian sedang berupaya mengatasi kendala proyek tersebut akibat perang benua."
        },
        {
            type: "dialogue", name: "Penyiar Berita", color: "#60a5fa",
            text: "Sabotase jalur energi dan logistik membuat penyelesaian mega-proyek ini berjalan lambat."
        },
        {
            type: "dialogue", name: "Penyiar Berita", color: "#60a5fa",
            text: "Untuk menjaga sisa pasokan yang ada,"
        },
        {
            type: "dialogue", name: "Penyiar Berita", color: "#60a5fa",
            text: "Pemerintah mengumumkan pemberlakuan sistem penjatahan."
        },
        {
            type: "action",
            action: () => {
                if (window.GAME && window.GAME.ui) {
                    window.GAME.ui.receiveMessage({
                        id: 'm_mystery_1', sender: '????',
                        text: 'Dear {name}, <br>Dalam game ini kamu akan menemukan sebuah krisis dan kericuhan yang akan terjadi pada hari ke-60 di dalam game. Kamu dapat menyiapkan uang, air, dan makanan sebelum harganya mulai menjadi mahal.', time: 'Day 0 - Malam', isRead: false, persist: true
                    });

                    if (window.GAME.phase00 && window.GAME.phase00.triggerMayaInteractiveChat) {
                        window.GAME.phase00.triggerMayaInteractiveChat();
                    }
                }
                window.GAME.logic.nextStoryStep();
            }
        },
        {
            type: "dialogue", name: "Penyiar Berita", color: "#60a5fa",
            text: "Berita Utama akan segera kembali setelah jeda berikut..."
        },
        {
            type: "action",
            action: () => {
                if (window.GAME && window.GAME.logic) {
                    window.GAME.logic.postIntroNews();
                }
            }
        }
    ];
}

window.GAME = window.GAME || {};
window.GAME.phase00 = window.GAME.phase00 || {};

window.GAME.phase00.triggerMayaInteractiveChat = function () {
    setTimeout(() => {
        window.GAME.ui.receiveMessage({
            id: 'm_maya_i1', sender: 'Maya', text: '{name}, temenin gua sekarang ya!', time: 'Day 0 - Malam', isRead: false, persist: false
        });
    }, 800);

    setTimeout(() => {
        window.GAME.ui.receiveMessage({
            id: 'm_maya_i2', sender: 'Maya', text: 'Lo udah siap-siap belum?', time: 'Day 0 - Malam', isRead: false, persist: false
        });
    }, 1800);

    setTimeout(() => {
        window.GAME.ui.receiveMessage({
            id: 'm_maya_i3', sender: 'Maya', text: 'Lo udah mandi?', time: 'Day 0 - Malam', isRead: false, persist: false,
            actions: [
                { text: "Belum, mandi bareng?", action: 'maya_chat_reply_1', statChanges: { cha: 1 } },
                { text: "Kaya lo udah mandi aja?", action: 'maya_chat_reply_2', statChanges: { mayaLove: 1, cha: 1 } }
            ]
        });
    }, 2800);
};

window.GAME.phase00.handleMayaChat = function (actionId, sourceMsgId) {
    if (actionId === 'maya_chat_reply_1' || actionId === 'maya_chat_reply_2') {
        setTimeout(() => {
            window.GAME.ui.receiveMessage({
                id: 'm_maya_i4', sender: 'Maya', text: 'Gua baru beres mandi banget.', image: 'assets/images/maya_selfie_bar01.webp', time: 'Day 0 - Malam', isRead: false, persist: false
            });
        }, 1000);

        setTimeout(() => {
            window.GAME.ui.receiveMessage({
                id: 'm_maya_i5', sender: 'Maya', text: 'Buruan lo juga siap-siap!', time: 'Day 0 - Malam', isRead: false, persist: false,
                actions: [
                    { text: "Kirim foto lagi baru gua siap-siap", action: 'maya_chat_reply_3', statChanges: { mayaLove: -5 } },
                    { text: "Iya.. Gua siap-siap sekarang", action: 'maya_chat_reply_4', statChanges: { mayaLove: 2, wis: 1 } }
                ]
            });
        }, 2000);
    }
    else if (actionId === 'maya_chat_reply_3') {
        // MT01
        setTimeout(() => {
            const mt01Id = 'm_maya_mt01';
            window.GAME.ui.receiveMessage({
                id: mt01Id, sender: 'Maya', text: '', image: 'assets/images/maya_selfie_bar02.webp', time: 'Day 0 - Malam', isRead: false, persist: false
            });

            // Delete after 3 seconds
            setTimeout(() => {
                const msg = GAME.state.messages.find(m => m.id === mt01Id);
                if (msg) {
                    msg.text = 'message deleted';
                    msg.image = null;
                    const modalPhoneMessage = document.getElementById('modal-message-detail');
                    if (modalPhoneMessage && !modalPhoneMessage.classList.contains('hidden')) {
                        GAME.ui.renderMessageDetail('Maya'); // live update
                    }
                }
            }, 3000);

            // Schedule final message
            setTimeout(() => {
                window.GAME.phase00.triggerMayaFinalChat();
            }, 4500);

        }, 1000);
    }
    else if (actionId === 'maya_chat_reply_4') {
        // MT02
        setTimeout(() => {
            window.GAME.ui.receiveMessage({
                id: 'm_maya_mt02', sender: 'Maya', text: 'okay.. love u..', time: 'Day 0 - Malam', isRead: false, persist: false
            });

            // Schedule final message
            setTimeout(() => {
                window.GAME.phase00.triggerMayaFinalChat();
            }, 1500);

        }, 1000);
    }
};

window.GAME.phase00.triggerMayaFinalChat = function () {
    window.GAME.ui.receiveMessage({
        id: 'm_maya_final', sender: 'Maya', text: 'Yuk berangkat?', image: 'assets/images/maya_selfie_bar03.webp', time: 'Day 0 - Malam', isRead: false, persist: false,
        actions: [
            { text: "Oke, gass berangkat", action: 'Phase01Maya' } // Triggers normal VN phase
        ]
    });
};
