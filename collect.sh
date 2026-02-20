#!/bin/bash
# Collect project data as JSON for the dashboard
CODE_DIR=~/Documents/Code
OUTPUT=${1:-public/data.json}

repos=()
today=$(date +%Y-%m-%d)
total_today=0
total_repos=0

echo "Collecting repo data..."

json='{"generated":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","projects":['
first=true

for d in "$CODE_DIR"/*/; do
  [ -d "$d/.git" ] || continue
  name=$(basename "$d")
  [ "$name" = "dashboard" ] && continue

  total_repos=$((total_repos + 1))

  branch=$(git -C "$d" branch --show-current 2>/dev/null)
  last_commit=$(git -C "$d" log -1 --format='%ai' 2>/dev/null)
  last_msg=$(git -C "$d" log -1 --format='%s' 2>/dev/null | sed 's/"/\\"/g' | head -c 80)
  dirty=$(git -C "$d" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  
  updated_today=false
  if echo "$last_commit" | grep -q "^$today"; then
    updated_today=true
    total_today=$((total_today + 1))
  fi

  # GitHub Actions status
  ci_status=$(gh run list -R "nulljosh/$name" --limit 1 --json conclusion --jq '.[0].conclusion' 2>/dev/null)
  [ -z "$ci_status" ] && ci_status="none"

  # Vercel check
  vercel_status="none"
  if [ -f "$d/vercel.json" ] || [ -d "$d/.vercel" ]; then
    dep_id=$(gh api "repos/nulljosh/$name/deployments?per_page=1" --jq '.[0].id' 2>/dev/null)
    if [ -n "$dep_id" ] && [ "$dep_id" != "null" ]; then
      vercel_status=$(gh api "repos/nulljosh/$name/deployments/$dep_id/statuses" --jq '.[0].state' 2>/dev/null)
      [ -z "$vercel_status" ] && vercel_status="none"
    fi
  fi

  # Live URL
  live_url=""
  case "$name" in
    scroll) live_url="https://nulljosh.github.io/scroll" ;;
    rise) live_url="https://rise-nulljosh.vercel.app" ;;
    tally) live_url="https://tally-production.vercel.app" ;;
    spark) live_url="https://spark-gamma-two.vercel.app" ;;
    dose) live_url="https://nulljosh.github.io/dose" ;;
    finn) live_url="https://nulljosh.github.io/finn" ;;
    journal) live_url="https://heyitsmejosh.com/journal" ;;
    nulljosh.github.io) live_url="https://heyitsmejosh.com" ;;
    books) live_url="https://nulljosh.github.io/books" ;;
  esac

  [ "$first" = true ] && first=false || json+=','
  json+='{"name":"'"$name"'","branch":"'"$branch"'","lastCommit":"'"$last_commit"'","lastMsg":"'"$last_msg"'","dirty":'"$dirty"',"updatedToday":'"$updated_today"',"ci":"'"$ci_status"'","vercel":"'"$vercel_status"'","liveUrl":"'"$live_url"'","github":"https://github.com/nulljosh/'"$name"'"}'
done

json+='],"stats":{"totalRepos":'"$total_repos"',"updatedToday":'"$total_today"',"date":"'"$today"'"}}'

mkdir -p "$(dirname "$OUTPUT")"
echo "$json" | python3 -m json.tool > "$OUTPUT"
echo "Written to $OUTPUT ($total_repos repos, $total_today updated today)"
