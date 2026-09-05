@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo Memulai konversi video ke HLS (m3u8)...
echo Pastikan ffmpeg sudah terinstal.

for %%f in (*.mp4) do (
    echo --------------------------------------------------
    echo Converting: %%f
    ffmpeg -y -i "%%f" -profile:v baseline -level 3.0 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls "%%~nf.m3u8"
)

echo --------------------------------------------------
echo Selesai meng-convert semua video mp4 ke m3u8!
pause
