#!/bin/bash

# GitHub Pages Setup Script for the Task Force Fraud Research Brief
# Run this AFTER you have authenticated with: gh auth login

set -e

echo "=========================================="
echo "  GitHub Pages Deployment Helper"
echo "=========================================="
echo ""

# Check if gh is authenticated
if ! gh auth status >/dev/null 2>&1; then
    echo "❌ You are not logged into GitHub CLI."
    echo "Please run this first:"
    echo "    gh auth login"
    echo ""
    echo "Then re-run this script."
    exit 1
fi

echo "✅ GitHub CLI is authenticated."

# Get GitHub username
USERNAME=$(gh api user --jq .login)
echo "Your GitHub username: $USERNAME"

# Suggest repo name
DEFAULT_REPO="vance-task-force-fraud-brief"
read -p "Enter repository name [$DEFAULT_REPO]: " REPO_NAME
REPO_NAME=${REPO_NAME:-$DEFAULT_REPO}

echo ""
echo "This will:"
echo "  1. Create a new public GitHub repository: $USERNAME/$REPO_NAME"
echo "  2. Push this research brief to it"
echo "  3. Enable GitHub Pages"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

# Create the repo
echo ""
echo "Creating repository..."
gh repo create "$REPO_NAME" --public --source=. --remote=origin --push

echo ""
echo "✅ Code pushed to GitHub."

# Enable GitHub Pages
echo ""
echo "Enabling GitHub Pages..."
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  "/repos/$USERNAME/$REPO_NAME/pages" \
  -f source.branch='main' \
  -f source.path='/' || echo "Pages may already be enabled or will be soon."

echo ""
echo "=========================================="
echo "🎉 Success!"
echo ""
echo "Your public site will be available at:"
echo "https://$USERNAME.github.io/$REPO_NAME"
echo ""
echo "It can take 1-2 minutes for GitHub Pages to deploy."
echo "You can check progress at:"
echo "https://github.com/$USERNAME/$REPO_NAME/actions"
echo ""
echo "Once live, update the Open Graph URL in index.html if desired."
echo "=========================================="
