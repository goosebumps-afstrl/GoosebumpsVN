import re

with open('c:/Users/digiw/OneDrive/Documents/Goosebumps/scenes/modals.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove backgrounds from all modals
content = re.sub(r'bg-black/(60|70)', '', content)
content = re.sub(r'backdrop-blur-(md|lg)', '', content)

sahamModals = """
    <div id="modal-phone-saham" class="absolute inset-0 z-50 hidden flex-col items-center justify-center p-4 transition-opacity">
        <div class="glass-panel-main flex-col h-[55vh] w-[85%] mb-3 p-0 overflow-hidden"
            style="padding: 0;">
            <div class="flex justify-between items-center bg-black/40 p-3 border-b border-white/20">
                <span class="glass-section-title m-0">LCN Exchange</span>
                <button class="glass-button glass-button-mini !w-auto !mb-0 px-3 py-1"
                    onclick="GAME.logic.closeSahamApp()">Kembali</button>
            </div>
            <div id="saham-list" class="flex-1 overflow-y-auto p-3 flex flex-col gap-2"></div>
        </div>
    </div>

    <div id="modal-phone-saham-detail" class="absolute inset-0 z-[60] hidden flex-col items-center justify-center p-4 transition-opacity">
        <div class="glass-panel-main flex-col h-[55vh] w-[85%] mb-3 p-0 overflow-hidden"
            style="padding: 0;">
            <div class="flex justify-between items-center bg-black/40 p-2.5 border-b border-white/20">
                <span id="saham-detail-title" class="glass-section-title m-0">Detail Saham</span>
                <button class="glass-button glass-button-mini !w-auto !mb-0 px-3 py-1"
                    onclick="GAME.ui.toggleModal('modal-phone-saham-detail', false); GAME.ui.toggleModal('modal-phone-saham', false)">Kembali</button>
            </div>
            <div class="flex-1 overflow-y-auto p-2.5 flex flex-col gap-2">
                <div class="flex justify-between items-end border-b border-white/10 pb-1.5">
                    <div>
                        <p class="text-[7px] text-gray-400 uppercase tracking-widest mb-0.5">Harga per Lembar</p>
                        <p id="saham-detail-price" class="text-lg font-bold text-white">$0</p>
                    </div>
                    <div class="text-right">
                        <p class="text-[7px] text-gray-400 uppercase tracking-widest mb-0.5">Dimiliki</p>
                        <p id="saham-detail-owned" class="text-[11px] font-bold text-blue-300">0 Lembar</p>
                        <p id="saham-detail-total-value" class="text-[10px] font-bold mt-0.5 hidden">$0</p>
                    </div>
                </div>

                <div class="w-full my-1 relative bg-black/40 rounded-xl border border-white/20 shadow-inner overflow-hidden">
                    <div style="padding-top: 56.25%;"></div>
                    <canvas id="saham-chart" class="absolute top-0 left-0 w-full h-full block"></canvas>
                </div>

                <div class="grid grid-cols-2 gap-2 text-center my-1 border-y border-white/10 py-1.5">
                    <div>
                        <p class="text-[7px] text-gray-400 uppercase tracking-widest">Avg. Harga Beli</p>
                        <p id="saham-detail-avg-buy" class="text-[11px] font-bold text-white mt-0.5">$0</p>
                    </div>
                    <div>
                        <p class="text-[7px] text-gray-400 uppercase tracking-widest">Untung/Rugi</p>
                        <p id="saham-detail-profit" class="text-[11px] font-bold text-gray-400 mt-0.5">$0</p>
                    </div>
                </div>

                <div class="flex flex-col gap-1 mt-0.5">
                    <label class="text-[6px] text-gray-300 uppercase tracking-wider">Jumlah</label>
                    <div class="flex gap-1.5">
                        <button
                            class="glass-button glass-button-mini !mb-0 flex-1 justify-center bg-white/5 !py-0.5 !px-1.5 !text-[9px]"
                            onclick="GAME.logic.setSahamAmount(1)">1</button>
                        <button
                            class="glass-button glass-button-mini !mb-0 flex-1 justify-center bg-white/5 !py-0.5 !px-1.5 !text-[9px]"
                            onclick="GAME.logic.setSahamAmount(10)">10</button>
                        <button
                            class="glass-button glass-button-mini !mb-0 flex-1 justify-center bg-white/5 !py-0.5 !px-1.5 !text-[9px]"
                            onclick="GAME.logic.setSahamAmount(100)">100</button>
                    </div>
                    <input type="text" id="saham-amount" class="custom-input !py-0.5 !text-[10px] mt-1" value="0"
                        placeholder="0" oninput="GAME.logic.clampSahamAmount()">
                </div>

                <div class="flex gap-1.5 mt-1.5">
                    <button class="glass-button highlight-blue justify-center flex-1 !mb-0 !py-0.5 !text-[10px]"
                        onclick="GAME.logic.buyStock()">BUY</button>
                    <button class="glass-button highlight justify-center flex-1 !mb-0 !py-0.5 !text-[10px]"
                        onclick="GAME.logic.sellStock()">SELL</button>
                </div>
            </div>
        </div>
    </div>
"""

if 'modal-phone-saham' not in content:
    with open('c:/Users/digiw/OneDrive/Documents/Goosebumps/scenes/modals.html', 'w', encoding='utf-8') as f:
        f.write(content + '\n' + sahamModals)
else:
    with open('c:/Users/digiw/OneDrive/Documents/Goosebumps/scenes/modals.html', 'w', encoding='utf-8') as f:
        f.write(content)
