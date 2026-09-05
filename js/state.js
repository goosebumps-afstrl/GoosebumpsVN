export function getInitialState() {
    return {
        name: "James",
        day: 0,
        timePhaseIdx: 3,
        money: 800,
        currentLocation: 'apartment',
        stats: {
            wis: 30, cha: 70,
            energy: 30,
            hunger: 90,
            composure: 75,
            last_wis_change: 0,
            last_cha_change: 0
        },
        npcs: {
            dasha: { love: 60, storyPhase: 0, isMet: true, salaryIncreased: false },
            maya: { love: 40, storyPhase: 0, isMet: true },
            vanya: { love: 0, storyPhase: 0, isMet: false },
            clara: { love: 0, storyPhase: 0, isMet: false },
            naomi: { love: 0, storyPhase: 0, isMet: false },
            roxanne: { love: 10, storyPhase: 0, isMet: false },
            shia: { love: 0, storyPhase: 0, isMet: false },
            erika: { love: 0, storyPhase: 0, isMet: false },
            trixie: { love: 0, storyPhase: 0, isMet: false },
            janice: { love: 0, storyPhase: 0, isMet: false }
        },
        inventory: {
            proteinBar: 5, roti: 0, daging: 0, soda: 0, kopi: 0, permen: 0, mieInstan: 0, rokok: 0,
            airMineralKecil: 0, airMineralGalon: 0, cikiSnack: 0, donat: 0, lolipop: 0, keju: 0,
            lipBalm: 0, senter: 0, selang: 0, kondom: 0, rubik: 0, sabunMandi: 0, parfum: 0, lotion: 0, pelembab: 0, tali: 0
        },
        portfolio: { FLE: { quantity: 0, totalCost: 0 }, MAZ: { quantity: 0, totalCost: 0 }, ECL: { quantity: 0, totalCost: 0 }, BGY: { quantity: 0, totalCost: 0 }, LSC: { quantity: 0, totalCost: 0 } },
        stockPrices: {
            FLE: { current: 10, prev: 10 },
            MAZ: { current: 50, prev: 50 },
            ECL: { current: 25, prev: 25 },
            BGY: { current: 15, prev: 15 },
            LSC: { current: 30, prev: 30 }
        },
        loans: [],
        messages: [],
        currentView: 'view-apartment',
        composureWarned: false,
        previousView: null,
        activeStockId: null,
        storyPhase: 0,
        winState: { wg: 5, wb: 0, clicks: 0, active: false },
        introBlockActive: false,
        history: {}
    };
}

export const state = getInitialState();

export const constants = {
    contacts: {
        'Maya': 'assets/images/maya_profile.jpg',
        '????': 'assets/images/mystery_profile.jpg',
        'Dasha': 'assets/images/dasha_profile.jpg',
        'Vanya': 'assets/images/vanya_profile.jpg',
        'Clara': 'assets/images/clara_profile.jpg',
        'Naomi': 'assets/images/naomi_profile.jpg',
        'Roxanne': 'assets/images/roxanne_profile.jpg',
        'Shia': 'assets/images/shia_profile.jpg',
        'Erika': 'assets/images/erika_profile.jpg',
        'Trixie': 'assets/images/trixie_profile.jpg',
        'Janice': 'assets/images/janice_profile.jpg'
    },
    shopItems: [
        { id: 'proteinBar', type: 'food', name: 'Protein Bar', price: 5, h: 50, e: 0, icon: '🍫' },
        { id: 'roti', type: 'food', name: 'Roti', price: 6, h: 80, e: 0, icon: '🍞' },
        { id: 'daging', type: 'food', name: 'Daging', price: 7, h: 90, e: 0, icon: '🍗' },
        { id: 'soda', type: 'drink', name: 'Soda', price: 3, h: 10, e: 5, icon: '🥤' },
        { id: 'kopi', type: 'drink', name: 'Kopi', price: 4, h: 10, e: 30, icon: '☕' },
        { id: 'permen', type: 'food', name: 'Permen', price: 1, h: 5, e: 0, icon: '🍬' },
        { id: 'mieInstan', type: 'food', name: 'Cup Ramen', price: 4, h: 40, e: 0, icon: '🍜' },
        { id: 'rokok', type: 'food', name: 'Rokok', price: 1, h: -1, e: 3, icon: '🚬' },
        { id: 'airMineralKecil', type: 'drink', name: 'Aquafina', price: 2, h: 5, e: 10, icon: '💧' },
        { id: 'cikiSnack', type: 'food', name: 'Doritos', price: 3, h: 15, e: 0, icon: '🍟' },
        { id: 'donat', type: 'food', name: 'Donat', price: 4, h: 25, e: 0, icon: '🍩' },
        { id: 'lolipop', type: 'food', name: 'Lolipop', price: 1, h: 2, e: 2, icon: '🍭' },
        { id: 'keju', type: 'food', name: 'Keju', price: 6, h: 20, e: 0, icon: '🧀' },
        { id: 'airMineralGalon', type: 'non-food', name: 'Jerrycan', price: 10, icon: '🚰', desc: 'Air Purifier 20 liter.' },
        { id: 'lipBalm', type: 'non-food', name: 'Lip Balm', price: 5, icon: '💄', desc: 'Pelembab bibir agar tidak kering.' },
        { id: 'senter', type: 'non-food', name: 'Senter', price: 15, icon: '🔦', desc: 'Berguna untuk tempat gelap.' },
        { id: 'selang', type: 'non-food', name: 'Selang', price: 12, icon: '🪱', desc: 'Selang air karet.' },
        { id: 'kondom', type: 'non-food', name: 'Kondom', price: 8, icon: '🎈', desc: 'Barang penting di malam hari.' },
        { id: 'rubik', type: 'non-food', name: 'Rubik', price: 10, icon: '🎲', desc: 'Mainan teka-teki kotak.' },
        { id: 'sabunMandi', type: 'non-food', name: 'Sabun', price: 4, icon: '🧼', desc: 'Untuk membersihkan badan.' },
        { id: 'parfum', type: 'non-food', name: 'Parfum', price: 25, icon: '✨', desc: 'Wangi yang memikat hati.' },
        { id: 'lotion', type: 'non-food', name: 'Lotion', price: 10, icon: '🧴', desc: 'Merawat kulit agar halus.' },
        { id: 'pelembab', type: 'non-food', name: 'Lubricant', price: 12, icon: '🧴', desc: 'Menjaga kelembapan kulit.' },
        { id: 'tali', type: 'non-food', name: 'Tali', price: 8, icon: '🪢', desc: 'Bisa digunakan untuk mengikat barang.' }
    ],
    pinjolOptions: [
        { id: 'p10k', amount: 10000, maxTenor: 10, billAmount: 1300, billInterval: 20 },
        { id: 'p5k', amount: 5000, maxTenor: 5, billAmount: 1200, billInterval: 20 },
        { id: 'p3k', amount: 3000, maxTenor: 3, billAmount: 1050, billInterval: 20 },
        { id: 'p2k', amount: 2000, maxTenor: 2, billAmount: 1050, billInterval: 15 },
        { id: 'p1k', amount: 1000, maxTenor: 2, billAmount: 550, billInterval: 15 }
    ],
    jobList: [
        { id: 'layanan', title: 'Layanan Masyarakat', icon: '🧹', hours: 3, pay: 75, energy: -30, hunger: -30, composure: 5 },
        { id: 'kurir', title: 'Kurir Paket', icon: '📦', hours: 1, pay: 25, energy: -10, hunger: -10, composure: 0 },
        { id: 'buruh', title: 'Buruh Pabrik', icon: '🏭', hours: 3, pay: 85, energy: -50, hunger: -30, composure: -5 }
    ],
    stocks: [
        { id: 'FLE', name: 'Fleeca Bank', base: 10, vol: 0.08 },
        { id: 'MAZ', name: 'Maze Bank', base: 50, vol: 0.12 },
        { id: 'ECL', name: 'eCola', base: 25, vol: 0.18 },
        { id: 'BGY', name: 'Burger Shot', base: 15, vol: 0.10 },
        { id: 'LSC', name: 'LS Customs', base: 30, vol: 0.05 }
    ],
    timePhases: ['Dini Hari', 'Pagi', 'Siang', 'Sore', 'Malam', 'Tengah Malam'],
    days: ['Sabtu', 'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
    saveSlotCount: 15
};