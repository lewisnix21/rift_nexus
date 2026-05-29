#!/usr/bin/env bash
# Foolproof Firebase deploy for riftbound.
#
# What this does:
#   1. Switches to the main repo (where firebase.json lives).
#   2. For every local `claude/*` worktree branch, fast-forwards master to it
#      (skips if already merged or if it would require a non-FF merge).
#   3. Runs `firebase deploy --only hosting`.
#
# Why this exists:
#   The site deploys from `master` in the main repo. Worktrees under
#   `.claude/worktrees/<branch>` have their own branches; commits there don't
#   reach master automatically. Without this script, it's easy to deploy a
#   stale page (we got bitten once and lost 11 batches of work to a stale
#   master). Run this instead of `firebase deploy` directly.
#
# Usage: bash deploy.sh   (run from anywhere)

set -e

REPO_ROOT="C:/Users/lewis/OneDrive/Desktop/riftbound"
cd "$REPO_ROOT"

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "master" ]; then
  echo "  Main repo is on branch '$CURRENT_BRANCH', expected 'master'. Aborting."
  exit 1
fi

# Only block on staged/unstaged changes to *tracked* files. Ignore untracked files
# (the repo has long-standing untracked artifacts like firebase.json that don't matter).
if ! git diff-index --quiet HEAD --; then
  echo "  Main repo has uncommitted changes to tracked files. Stash or commit them first."
  exit 1
fi

# Fast-forward master to every claude/* branch that is ahead of it.
ANY_MERGED=0
for branch in $(git for-each-ref --format='%(refname:short)' refs/heads/claude/); do
  # Is master strictly behind this branch (FF possible)?
  if git merge-base --is-ancestor master "$branch" 2>/dev/null && [ "$(git rev-parse master)" != "$(git rev-parse "$branch")" ]; then
    echo "Fast-forwarding master → $branch"
    git merge --ff-only --no-edit "$branch"
    ANY_MERGED=1
  fi
done

if [ "$ANY_MERGED" -eq 0 ]; then
  echo "master is already up to date with all claude/* branches."
fi

echo ""
echo "Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo ""
echo "Done. Hard-refresh the site (Ctrl+Shift+R) to bypass browser cache."
