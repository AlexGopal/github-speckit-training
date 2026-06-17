param(
    [string]$BranchName
)

# If no branch name provided, generate a timestamped branch
if (-not $BranchName -or $BranchName -eq '') {
    $ts = Get-Date -Format 'yyyyMMdd-HHmmss'
    $BranchName = "spec/auto-$ts"
}

Write-Host "Creating branch: $BranchName"

# Ensure we're in the project root (script is executed from project root by hooks)
try {
    git fetch origin 2>&1 | Write-Host
    git checkout -b $BranchName 2>&1 | Write-Host
    git push -u origin $BranchName 2>&1 | Write-Host
} catch {
    Write-Error "git command failed: $_"
    exit 1
}

# Emit JSON for callers
$info = @{ BRANCH_NAME = $BranchName; FEATURE_NUM = $null }
$info | ConvertTo-Json -Compress
