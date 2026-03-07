#!/bin/bash

set -e

VERSION="${1:-$(date +%Y.%m.%d)}"
RELEASE_NAME="wein-collections-template-{VERSION}"
TEMP_DIR="/tmp/${RELEASE_NAME}"

rm -rf "${TEMP_DIR}"
mkdir -p "${TEMP_DIR}"

cp config.toml "${TEMP_DIR}/"
cp -r templates "${TEMP_DIR}/"
mkdir -p "${TEMP_DIR}/static"
cp static/style.css "${TEMP_DIR}/static/"
if [ -d "static/js" ]; then
    cp -r static/js "${TEMP_DIR}/static/"
fi

mkdir -p "${TEMP_DIR}/static/lore"
cat > "${TEMP_DIR}/static/lore/local.lore" << 'EOF'
welcome!

---

example markdown > /_index
example link | https://example.com
EOF

if [ -d "src" ]; then
    cp -r src "${TEMP_DIR}/"
fi

cp package.json "${TEMP_DIR}/"
cp vite.config.ts "${TEMP_DIR}/" 2>/dev/null || true
cp tsconfig.json "${TEMP_DIR}/" 2>/dev/null || true

mkdir -p "${TEMP_DIR}/.github/workflows"
cp .github/workflows/deploy.yml "${TEMP_DIR}/.github/workflows/" 2>/dev/null || true

cp .gitignore "${TEMP_DIR}/" 2>/dev/null || true

mkdir -p "${TEMP_DIR}/content"
cat > "${TEMP_DIR}/content/welcome.md" << 'EOF'
+++
title = "Example"
date = 2026-03-07
+++

# Welcome!

EOF
