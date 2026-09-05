$lines = Get-Content 'js\npcstory\chloe\story_chloe_phase01.js'
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '}(\s*)$') {
        $j = $i + 1
        while ($j -lt $lines.Length -and $lines[$j].Trim() -eq '') { $j++ }
        if ($j -lt $lines.Length -and $lines[$j] -match '^\s*{') {
            Write-Host "Missing comma between lines $($i+1) and $($j+1)"
        }
    }
}
