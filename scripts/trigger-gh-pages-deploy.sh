#!/usr/bin/env bash
set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  echo "The GitHub CLI (gh) is required to trigger the deployment workflow." >&2
  exit 1
fi

workflow_name="Deploy GitHub Pages from gh-pages"

# Trigger the workflow dispatch.
echo "Triggering '${workflow_name}' workflow on gh-pages..."
if ! gh workflow run "${workflow_name}" --ref gh-pages; then
  echo "Failed to dispatch the workflow." >&2
  exit 1
fi

# Fetch the most recent run for the workflow on the gh-pages branch.
run_url=$(gh run list --workflow "${workflow_name}" --branch gh-pages --limit 1 --json url --jq '.[0].url')

if [[ -n "${run_url}" ]]; then
  echo "Workflow dispatched. Monitor the run here: ${run_url}"
else
  echo "Workflow dispatched, but the run URL could not be determined." >&2
fi
