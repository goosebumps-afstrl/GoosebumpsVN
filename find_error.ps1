$text = Get-Content 'c:\Users\digiw\OneDrive\Documents\DevGam\js\npcstory\chloe\story_chloe_phase01.js' -Raw
$matches = [regex]::Matches($text, '}(?:\s*){')
foreach ($m in $matches) {
    Write-Host "Found match at index $($m.Index)"
}
if ($matches.Count -eq 0) {
    Write-Host "No missing commas found between objects!"
}
