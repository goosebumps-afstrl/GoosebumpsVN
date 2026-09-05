$lines = Get-Content 'c:\Users\digiw\OneDrive\Documents\DevGam\js\npcstory\chloe\story_chloe_phase01.js'
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '[a-zA-Z0-9_"''\]\)]\s*\{') {
        Write-Host "$($i+1): $($lines[$i].Trim())"
    }
}
