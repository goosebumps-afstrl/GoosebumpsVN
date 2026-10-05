import { WINTRIX_sementara } from '../../winscene/WINTRIX_sementara.js';

export function Phase01Trixie() {
    return [
        {
            type: "action",
            action: () => {
                if (window.GAME && window.GAME.state) {
                    window.GAME.state.npcs.trixie.isMet = true;
                    window.GAME.state.npcs.janice.isMet = true;
                }
                window.GAME.logic.nextStoryStep();
            }
        },
        { type: "image", src: "assets/images/0Trix01.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        {
            type: "action",
            action: () => {
                window.GAME.logic.gotoSeq("Phase01Trixie_01");
            }
        }
    ];
}

export function Phase01Trixie_01() {
    const history = (window.GAME && window.GAME.state && window.GAME.state.history) ? window.GAME.state.history : {};
    const drink = history.roxanneDrink || 'French 75';
    let imgRox = "0Rox02_1.webp";
    if (drink === 'Gin Tonic') imgRox = "0Rox02_2.webp";
    if (drink === 'Whiskey On the Rock') imgRox = "0Rox02_3.webp";

    return [
        { type: "image", src: `assets/images/${imgRox}`, effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix02.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Hannah", color: "yellow", text: "Tenang kak." },
        { type: "dialogue", retainMedia: true, name: "Hannah", color: "yellow", text: "Roxanne emang wanita sibuk ko." },
        { type: "image", src: "assets/images/0Trix03.webp", effect: "cross-dissolve", wait: 500, retainDialogue: true },
        { type: "dialogue", retainMedia: true, name: "Hannah", color: "yellow", text: "Ga perlu masang muka sedih gitu ka." },
        { type: "image", src: "assets/images/0Trix04.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix05.webp", effect: "cross-dissolve", wait: 1800, skippable: false },
        { type: "image", src: "assets/images/0Trix06.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix07.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Hannah", color: "yellow", text: "Ka, kayaknya kamu lumayan populer." },
        { type: "dialogue", retainMedia: true, name: "Hannah", color: "yellow", text: "Cewe di sana pengen kenalan.." },
        { type: "image", src: "assets/images/0Trix08.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Hai.." },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Aku Trixie.." },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Ini Janice." },
        { type: "image", src: "assets/images/0Trix09.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "orange", text: "Hai.." },
        { type: "image", src: "assets/images/0Trix08.webp", effect: "cross-dissolve", wait: 500 },
        {
            type: "choice",
            choices: [
                {
                    text: "Hai.. Nama gue {name}",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'trixie');
                        window.GAME.logic.addStat('love', 1, 'janice');
                        window.GAME.logic.gotoSeq("Phase01Trixie_09");
                    }
                },
                {
                    text: "Gua {name}, Kalian cantik banget",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'janice');
                        window.GAME.logic.addStat('love', 1, 'trixie');
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.gotoSeq("Phase01Trixie_01_BranchA");
                    }
                }
            ]
        }
    ];
}

export function Phase01Trixie_01_BranchA() {
    return [
        { type: "image", src: "assets/images/0Trix17.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Janice", color: "orange", text: "..." },
        {
            type: "choice",
            choices: [
                {
                    text: "Biar gua traktir ya", action: () => {
                        window.GAME.logic.addStat('love', 10, 'trixie');
                        window.GAME.logic.gotoSeq("Phase01Trixie_01_BranchA_Traktir");
                    }
                },
                {
                    text: "Kalian baru datang?", action: () => {
                        window.GAME.logic.gotoSeq("Phase01Trixie_01_BranchA_BaruDatang");
                    }
                }
            ]
        }
    ];
}

export function Phase01Trixie_01_BranchA_Traktir() {
    return [
        { type: "image", src: "assets/images/0Trix11.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Boleh..." },
        { type: "image", src: "assets/images/0Trix20.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Janice", color: "orange", text: "Makasih ya {name}" },
        { type: "action", action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_09"); } }
    ];
}

export function Phase01Trixie_01_BranchA_BaruDatang() {
    return [
        { type: "image", src: "assets/images/0Trix12.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Iya, kita baru datang barusan.." },
        { type: "action", action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_09"); } }
    ];
}


export function Phase01Trixie_09() {
    return [
        { type: "image", src: "assets/images/0Trix10.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "{name}..." },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Roxanne itu temen kamu?" },
        {
            type: "choice",
            choices: [
                {
                    text: "Mungkin, gua baru kenalan barusan",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'trixie');
                        window.GAME.logic.addStat('love', 1, 'janice');
                        window.GAME.logic.gotoSeq("Phase01Trixie_09_BaruKenal");
                    }
                },
                {
                    text: "Kalian kenal Roxanne?",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'trixie');
                        window.GAME.logic.gotoSeq("Phase01Trixie_10");
                    }
                }
            ]
        }
    ];
}

export function Phase01Trixie_09_BaruKenal() {
    return [
        { type: "image", src: "assets/images/0Trix12.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Oh iya?" },
        {
            type: "choice", retainDialogue: true, choices: [
                {
                    text: "Haha kenapa?", action: () => {
                        window.GAME.logic.gotoSeq("Phase01Trixie_09_BaruKenal_Kenapa");
                    }
                },
                {
                    text: "Bukan, dia bukan pacar gua", action: () => {
                        window.GAME.logic.gotoSeq("Phase01Trixie_09_BaruKenal_BukanPacar");
                    }
                }
            ]
        }
    ];
}

export function Phase01Trixie_09_BaruKenal_Kenapa() {
    return [
        { type: "image", src: "assets/images/0Trix18.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Engga..." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Kita penasaraan aja.." },
        { type: "action", action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_11"); } }
    ];
}

export function Phase01Trixie_09_BaruKenal_BukanPacar() {
    return [
        { type: "image", src: "assets/images/0Trix20.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Janice", color: "orange", text: "Ga apa-apa sih kalau dia pacar kamu juga {name}" },
        {
            type: "choice", retainDialogue: true, choices: [
                {
                    text: "Kalau aku pacarnya, ga mungkin aku nyamperin kalian", action: () => {
                        window.GAME.logic.addStat('love', 2, 'janice');
                        window.GAME.logic.gotoSeq("Phase01Trixie_09_BaruKenal_BukanPacar_Nyamperin");
                    }
                },
                {
                    text: "Kalian kenal Roxanne?", action: () => {
                        window.GAME.logic.gotoSeq("Phase01Trixie_10");
                    }
                },
            ]
        }
    ];
}

export function Phase01Trixie_09_BaruKenal_BukanPacar_Nyamperin() {
    return [
        { type: "image", src: "assets/images/0Trix11.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Hahaha.." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Itu bagus {name}" },
        { type: "action", action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_11"); } }
    ];
}

export function Phase01Trixie_10() {
    return [
        { type: "image", src: "assets/images/0Trix17.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Dulu kita temenan sih.." },
        { type: "image", src: "assets/images/0Trix12.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Tapi sekarang dia aga beda.." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Dia selalu judging.." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Kayanya dia masih ngambek" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Ngambek?", action: () => {
                        window.GAME.logic.gotoSeq("Phase01Trixie_10_Ngambek");
                    }
                },
                {
                    text: "Kalian ngerebut cowonya kali?", action: () => {
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.gotoSeq("Phase01Trixie_10_End");
                    }
                },
            ]
        }
    ];
}

export function Phase01Trixie_10_Ngambek() {
    return [
        { type: "image", src: "assets/images/0Trix10.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "iyaa.." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Dia selalu ngomel.." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Mungkin salah kita juga sih.." },
        { type: "image", src: "assets/images/0Trix12.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Sikap kita mungkin terlalu centil buat roxanne yang lumayan elegan.." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Atau mungkin kita pernah ga sengaja ngerebut cowo inceranya mungkin.." },
        { type: "action", action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_10_End"); } }
    ];
}

export function Phase01Trixie_10_End() {
    return [
        { type: "image", src: "assets/images/0Trix14.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0Trix16.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Janice", color: "pink", text: "Kayanya iya ga sih?" },
        { type: "image", src: "assets/images/0Trix11.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Gatau juga ya..." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Aku juga bingung.." },
        { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Trixie_11") },
    ];
}

export function Phase01Trixie_11() {
    return [
        { type: "image", src: "assets/images/0Trix08.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Kamu keliatan lagi banyak pikiran {name}," },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "orange", text: "Ada apa {name}?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Hahaha.. Gua ga kenapa-napa ko",
                    action: () => {
                        window.GAME.logic.gotoSeq("Phase01Trixie_11_GaKenapa");
                    }
                },
                {
                    text: "Kalian mau ga nemenin gua minum joget, sampe gua lupa gua punya masalah?",
                    action: () => {
                        window.GAME.logic.addStat('love', 3, 'trixie');
                        window.GAME.logic.addStat('love', 5, 'janice');
                        window.GAME.logic.addStat('cha', 5);
                        window.GAME.logic.gotoSeq("Phase01Trixie_11_NemeninMinum");
                    }
                },
                {
                    text: "Kenapa? Kalian temen roxanne?",
                    action: () => {
                        window.GAME.logic.addStat('love', 2, 'trixie');
                        window.GAME.logic.addStat('love', 5, 'janice');
                        window.GAME.logic.gotoSeq("Phase01Trixie_11_TemenRox");
                    }
                },
                {
                    text: "Kalian baru datang?",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'trixie');
                        window.GAME.logic.addStat('love', 1, 'janice');
                        window.GAME.logic.gotoSeq("Phase01Trixie_11_BaruDatang");
                    }
                }
            ]
        }
    ];
}

export function Phase01Trixie_11_GaKenapa() {
    return [
        { type: "image", src: "assets/images/0Trix11.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Mau ikut kita ke dance floor?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Kalian aja, gua masih harus jagaian tuan putri yang disana",
                    action: () => {
                        window.GAME.logic.addStat('love', -1, 'janice');
                        window.GAME.logic.addStat('love', -5, 'trixie');
                        window.GAME.logic.gotoSeq("Phase01Trixie_11_TuanPutri");
                    }
                },
                {
                    text: "Okeee..",
                    action: () => {
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.gotoSeq("Phase01Trixie_16");
                    }
                },
            ]
        }
    ];
}

export function Phase01Trixie_11_TuanPutri() {
    return [
        { type: "image", src: "assets/images/0Rox10.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Oh wow.." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Kamu semacem mucikari gitu {name}?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Hahaha.. Engga dong",
                    action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_11_TuanPutri_End"); }
                },
                {
                    text: "Haha.. Iya bisa jadi",
                    action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_11_TuanPutri_End"); }
                },
            ]
        }
    ];
}

export function Phase01Trixie_11_TuanPutri_End() {
    return [
        { type: "image", src: "assets/images/0Trix11.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Kalo gitu jagain kita juga dong.." },
        { type: "image", src: "assets/images/0Trix13.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Kita bakal jadi cewe-cewe baik yang patuh ko.." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Haha.. Oke, tapi kayanya kalian bukan tipikal penurut deh",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'trixie');
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.gotoSeq("Phase01Trixie_11_TuanPutri_Penurut");
                    }
                },
                {
                    text: "Kalian mau aku jagian?",
                    action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_11_TuanPutri_End_Resume"); }
                },
            ]
        }
    ];
}

export function Phase01Trixie_11_TuanPutri_Penurut() {
    return [
        { type: "image", src: "assets/images/0Trix12.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Oh iya, kenapa?" },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Gimana kalau kita bikin permainan aja?" },
        { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Trixie_13") }
    ];
}

export function Phase01Trixie_11_TuanPutri_End_Resume() {
    return [
        { type: "image", src: "assets/images/0Trix08.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Jadi kamu mau nemenin kita?" },
        { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Trixie_12") }
    ];
}

export function Phase01Trixie_11_NemeninMinum() {
    return [
        { type: "image", src: "assets/images/0Trix18.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "{name}?" },
        { type: "image", src: "assets/images/0Trix20.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Janice", color: "orange", text: "Sampe lupa?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Ga apa-apa sih kalau kalian ga mau",
                    action: () => {
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.addStat('love', 5, 'janice');
                        window.GAME.logic.gotoSeq("Phase01Trixie_11_NemeninMinum_GaApa");
                    }
                },
                {
                    text: "Ah sory ga jadi, kayanya gua harus balik lagi ke Maya",
                    action: () => {
                        window.GAME.ui.changeScene("scene-maingame", "fade-black");
                        window.GAME.ui.updateHUD();
                    }
                },
            ]
        }
    ];
}

export function Phase01Trixie_11_NemeninMinum_GaApa() {
    return [
        { type: "image", src: "assets/images/0Rox16.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Janice", color: "pink", text: "Haha.. ga ko {name}.." },
        { type: "image", src: "assets/images/0Rox19.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Gimana kalau kita bikin permainan?" },
        {
            type: "choice", retainDialogue: true, choices: [
                {
                    text: "Permainan?",
                    action: () => window.GAME.logic.gotoSeq("Phase01Trixie_13"),
                },
                {
                    text: "Permainan kaya gimana?",
                    action: () => window.GAME.logic.gotoSeq("Phase01Trixie_13"),
                }
            ]
        }
    ];
}

export function Phase01Trixie_11_TemenRox() {
    return [
        { type: "image", src: "assets/images/0Trix17.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Dulu kita temenan sih.." },
        { type: "image", src: "assets/images/0Trix12.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Tapi sekarang dia aga beda.." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Beda gimana?",
                    action: () => {
                        window.GAME.logic.gotoSeq("Phase01Trixie_11_TemenRox_BedaGimana");
                    }
                },
                {
                    text: "Kalian ngerebut cowonya kali?",
                    action: () => {
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.gotoSeq("Phase01Trixie_11_TemenRox_End");
                    }
                },
            ]
        }
    ];
}

export function Phase01Trixie_11_TemenRox_BedaGimana() {
    return [
        { type: "image", src: "assets/images/0Trix10.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "iyaa.." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Dia selalu ngomel.." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Mungkin salah kita juga sih.." },
        { type: "image", src: "assets/images/0Trix12.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Sikap kita mungkin terlalu centil buat roxanne yang lumayan elegan.." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Atau mungkin kita pernah ga sengaja ngerebut cowo inceranya mungkin.." },
        { type: "action", action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_11_TemenRox_End"); } }
    ];
}

export function Phase01Trixie_11_TemenRox_End() {
    return [
        { type: "image", src: "assets/images/0Trix14.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0Trix16.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Janice", color: "pink", text: "Kayanya iya ga sih?" },
        { type: "image", src: "assets/images/0Trix11.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Gatau juga ya..." },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Aku juga bingung.." },
        { type: "action", action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_11"); } }
    ];
}

export function Phase01Trixie_11_BaruDatang() {
    return [
        { type: "image", src: "assets/images/0Trix12.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Iya, kita datang waktu kamu ngobrol sama roxanne." },
        { type: "action", action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_11"); } }
    ];
}

export function Phase01Trixie_12() {
    return [
        { type: "image", src: "assets/images/0Trix14.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Kamu mau nemenin kita sampai mana?" },
        { type: "image", src: "assets/images/0Trix15.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Malem ini kita lagi bosen." },
        { type: "image", src: "assets/images/0Trix16.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "orange", text: "Super duper bosen!" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Oh ya?",
                    action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_12_OhYa"); }
                },
                {
                    text: "Tergantung, kalian mau sampai mana?",
                    action: () => {
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.gotoSeq("Phase01Trixie_12_SampeKasur");
                    }
                }
            ]
        }
    ];
}

export function Phase01Trixie_12_OhYa() {
    return [
        { type: "image", src: "assets/images/0Trix12.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0Trix08.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Jadi kamu mau nemenin kita?" },
        { type: "action", action: () => window.GAME.logic.gotoSeq("Phase01Trixie_12_SampeKasur") }
    ];
}

export function Phase01Trixie_12_SampeKasur() {
    return [
        { type: "image", src: "assets/images/0Trix15.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Sampe kasur?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Kasur?",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                },
                {
                    text: "Kalian berdua?",
                    action: () => {
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.nextStoryStep();
                    }
                }
            ]
        },
        { type: "image", src: "assets/images/0Trix20.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "orange", text: "Kamu takut {name}?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Aga kaget sih..",
                    action: () => { window.GAME.logic.nextStoryStep(); }
                },
                {
                    text: "Haha mau ke tempat gua sekarang?",
                    action: () => {
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.gotoSeq("Phase01Trixie_13");
                    }
                }
            ]
        },
        { type: "image", src: "assets/images/0Trix11.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Apa kita terlalu to the point {name}?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Iya, lumayan serem sih",
                    action: () => {
                        window.GAME.logic.addStat('wis', 1);
                        window.GAME.logic.nextStoryStep();
                    }
                },
                {
                    text: "Kalian bukan penculik kan?",
                    action: () => {
                        window.GAME.logic.addStat('wis', 1);
                        window.GAME.logic.nextStoryStep();
                    }
                }
            ]
        },
        { type: "image", src: "assets/images/0Trix17.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "Orange", text: "Bukannya..." },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "Orange", text: "Cowo-cowo malah seneng ya?" },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "Orange", text: "Diculik kaya gini?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Hahaha.. iya juga",
                    action: () => {
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.nextStoryStep();
                    }
                },
                {
                    text: "Iyaa.. Tapi gua engga sih",
                    action: () => {
                        window.GAME.logic.addStat('love', 2, 'trixie');
                        window.GAME.logic.addStat('love', 2, 'janice');
                        window.GAME.logic.nextStoryStep();
                    }
                },
            ]
        },
        { type: "image", src: "assets/images/0Trix20.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "Orange", text: "..." },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "Orange", text: "Apa jangan-jangan.." },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "Orange", text: "Kamu masih perjaka {name}?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Jujur iya...",
                    action: () => {
                        window.GAME.logic.nextStoryStep();
                    }
                },
                {
                    text: "Hahaha.. Ga gitu Janice..",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'trixie');
                        window.GAME.logic.addStat('love', 5, 'janice');
                        window.GAME.logic.nextStoryStep();
                    }
                },
            ]
        },
        { type: "image", src: "assets/images/0Trix19.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Ga perlu takut kaya gitu {name}," },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Kamu gamau?" },
        { type: "image", src: "assets/images/0Trix18.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Kita ga sembarang pilih orang ko," },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Kita ga suka tipe om-om cabul," },
        { type: "image", src: "assets/images/0Trix20.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "Orange", text: "Justru tipe-tipe kaya dia yang lebih menarik ga sih?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Haha.. Kalian beneran ngebuat gua takut",
                    action: () => {
                        window.GAME.logic.nextStoryStep();
                    }
                },
                {
                    text: "Menarik? gua bisa bikin lebih menarik lagi",
                    action: () => {
                        window.GAME.logic.addStat('love', 10, 'trixie');
                        window.GAME.logic.addStat('love', 3, 'janice');
                        window.GAME.logic.nextStoryStep();
                    }
                },
            ]
        },
        { type: "image", src: "assets/images/0Trix12.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Jadi..." },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Gimana {name}?" },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Santai dulu ga sih?",
                    action: () => {
                        window.GAME.logic.gotoSeq("Phase01Trixie_12_SantaiDulu");
                    }
                },
                {
                    text: "Oke.. sekarang?",
                    action: () => {
                        window.GAME.logic.addStat('love', 2, 'trixie');
                        window.GAME.logic.addStat('love', 1, 'janice');
                        window.GAME.logic.gotoSeq("Phase01Trixie_13");
                    }
                },
            ]
        }
    ];
}

export function Phase01Trixie_12_SantaiDulu() {
    return [
        { type: "image", src: "assets/images/0Trix12.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "..." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Kalian emang udah biasa main berdua ya?",
                    action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_12_SantaiDulu_MainBerdua"); }
                },
                {
                    text: "Gimana kalau kita bikin permainan?",
                    action: () => {
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.gotoSeq("Phase01Trixie_12_SantaiDulu_MainBerdua");
                    }
                },
            ]
        }
    ];
}

export function Phase01Trixie_12_SantaiDulu_MainBerdua() {
    return [
        { type: "image", src: "assets/images/0Trix12.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "..." },
        {
            type: "choice", retainDialogue: true,
            choices: [
                {
                    text: "Haha.. Kalian beneran ngebuat gua takut",
                    action: () => { window.GAME.logic.gotoSeq("Phase01Trixie_12_SantaiDulu_End"); }
                },
                {
                    text: "Menarik? gua bisa bikin lebih menarik lagi",
                    action: () => {
                        window.GAME.logic.addStat('love', 10, 'trixie');
                        window.GAME.logic.addStat('cha', 1);
                        window.GAME.logic.gotoSeq("Phase01Trixie_12_SantaiDulu_End");
                    }
                },
            ]
        }
    ];
}

export function Phase01Trixie_12_SantaiDulu_End() {
    return [
        { type: "image", src: "assets/images/0Trix08.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", name: "Trixie", color: "pink", text: "Jadi kamu mau nemenin kita?" },
        {
            type: "choice",
            choices: [
                {
                    text: "Oke.. sekarang?",
                    action: () => {
                        window.GAME.logic.addStat('love', 2, 'trixie');
                        window.GAME.logic.addStat('love', 1, 'janice');
                        window.GAME.logic.gotoSeq("Phase01Trixie_13");
                    }
                },
                {
                    text: "Gimana kalau kita bikin permainan?",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'trixie');
                        window.GAME.logic.addStat('love', 1, 'janice');
                        window.GAME.logic.gotoSeq("Phase01Trixie_13");
                    }
                }
            ]
        }
    ];
}

export function Phase01Trixie_12A() {
    return [
        { type: "image", src: "assets/images/0Trix18.webp", effect: "cross-dissolve", wait: 500 },
        {
            type: "choice",
            choices: [
                {
                    text: "Kita bikin games minum, <br> sebelum ke dance floor?",
                    next: "Phase01Trixie_14"
                }
            ]
        }
    ];
}

export function Phase01Trixie_13() {
    return [
        { type: "image", src: "assets/images/0Trix18.webp", effect: "cross-dissolve", wait: 500 },
        {
            type: "choice",
            choices: [
                {
                    text: "Kita bikin games minum, <br> sebelum ke dance floor?",
                    next: "Phase01Trixie_14"
                }
            ]
        }
    ];
}

export function Phase01Trixie_14() {
    return [
        { type: "image", src: "assets/images/0Trix19.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Aku setuju!" },
        { type: "image", src: "assets/images/0Trix15.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Kita buat games adu tatap mata!" },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Yang ngedip duluan, dia harus minum." },
        { type: "image", src: "assets/images/0Trix20.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "orange", text: "Boleh aku coba duluan?!" },
        { type: "image", src: "assets/images/0Trix21.webp", effect: "cross-dissolve", wait: 500 },
        {
            type: "choice",
            choices: [
                {
                    text: "Haha, lo berdua emang seru banget",
                    action: () => {
                        window.GAME.logic.addStat('love', 5, 'trixie');
                        window.GAME.logic.addStat('love', 3, 'janice');
                        window.GAME.logic.gotoSeq("Phase01Trixie_16");
                    }
                },
                {
                    text: "Ok, siapa takut!",
                    action: () => {
                        window.GAME.logic.addStat('love', 1, 'trixie');
                        window.GAME.logic.addStat('love', 1, 'janice');
                        window.GAME.logic.gotoSeq("Phase01Trixie_16");
                    }
                }
            ]
        }
    ];
}

export function Phase01Trixie_16() {
    return [
        { type: "image", src: "assets/images/0Trix22.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix23.webp", effect: "cross-dissolve", wait: 2000, skippable: false },
        { type: "image", src: "assets/images/0Trix24.webp", effect: "cross-dissolve", wait: 500, skippable: false },
        { type: "image", src: "assets/images/0Trix23.webp", effect: "cross-dissolve", wait: 800, skippable: false },
        { type: "image", src: "assets/images/0Trix25.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "orange", text: "Ahh! Aku berkedip!" },
        { type: "image", src: "assets/images/0Trix26.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "orange", text: "{name} terlalu tampan buat ditatap!" },
        { type: "image", src: "assets/images/0Trix27.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix28.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix29.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix30.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix31.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix32.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix33.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix34_1.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix34_2.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix34_3.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0Trix34_4.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix34_5.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix35.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix36.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix37.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix38.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix39.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix40_1.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix40_2.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix40_3.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix40_4.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix40_5.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix40_6.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix40_7.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "{name}!" },
        { type: "image", src: "assets/images/0Trix41_1.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix41_2.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix41_3.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix42.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Gimana kalo kita lanjut di tempat lain?" },
        {
            type: "action",
            action: () => {
                const history = (window.GAME && window.GAME.state && window.GAME.state.history) ? window.GAME.state.history : {};
                const cost = history.mayaGaLucu ? 400 : 500;
                window.GAME.state.money -= cost;

                // advance time 1 slot
                window.GAME.state.timePhaseIdx += 1;
                if (window.GAME.state.timePhaseIdx > 4) {
                    window.GAME.state.timePhaseIdx = 1;
                    window.GAME.state.day += 1;
                }

                window.GAME.logic.gotoSeq("Phase01Trixie_35");
            }
        }
    ];
}

export function Phase01Trixie_35() {
    return [
        { bg: "black", wait: 2000 },
        { type: "image", src: "assets/images/0Trix43.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix44.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { bg: "black", wait: 2000 },
        { type: "image", src: "assets/images/0Trix45.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "orange", text: "Jadi ini tempat-mu {name}?" },
        { type: "image", src: "assets/images/0Trix46_1.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Aku kira tempat-mu tidak sesempit ini." },
        { type: "image", src: "assets/images/0Trix46_2.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "orange", text: "Aaa.. Kepalaku pusing banget." },
        { type: "image", src: "assets/images/0Trix47.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix48.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Ayo Jen, ini belum selesai!" },
        { type: "image", src: "assets/images/0Trix49.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix50.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Janice", color: "orange", text: "{name}, aku pengen ke kasur..." },
        { type: "image", src: "assets/images/0Trix51.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix52.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix53_1.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Aw!!" },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Ya ampun Jen!" },
        { type: "image", src: "assets/images/0Trix53_2.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix54.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix55.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix56.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix57.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix58.webp", effect: "cross-dissolve", wait: 500 },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "..." },
        { type: "image", src: "assets/images/0Trix59.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix60.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix61.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "image", src: "assets/images/0Trix62.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Ayo {name}," },
        { type: "dialogue", retainMedia: true, name: "Trixie", color: "pink", text: "Aku udah ga tahan..." },
        {
            type: "action",
            action: () => {
                window.GAME.logic.gotoSeq("WINTRIX_sementara");
            }
        }
    ];
}

export function Phase01Trixie_50() {
    return [
        {
            type: "action",
            action: () => {
                window.GAME.state.timePhaseIdx = 1; // Pagi
                window.GAME.state.stats.energy = 100;
                window.GAME.state.stats.hunger = 10;
                window.GAME.logic.gotoSeq([
                    { type: "image", src: "assets/images/0Trix63.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
                    { type: "image", src: "assets/images/0Trix64.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
                    { type: "image", src: "assets/images/0Trix65.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
                    { bg: "black", wait: 1000 },
                    { type: "image", src: "assets/images/0Trix66.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
                    { type: "image", src: "assets/images/0Trix67.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
                    { type: "image", src: "assets/images/0Trix68.webp", effect: "cross-dissolve", wait: 2000, skippable: true },
                    {
                        type: "action",
                        action: () => {
                            window.GAME.ui.changeScene("scene-maingame", "fade-black");
                            window.GAME.ui.updateHUD();
                        }
                    }
                ]);
            }
        }
    ];
}

// Sub-functions are exported directly.
