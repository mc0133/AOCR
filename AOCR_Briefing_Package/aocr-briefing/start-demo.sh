#!/usr/bin/env bash
set -e
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/prototype"
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  . "$HOME/.nvm/nvm.sh"
  nvm use 24 >/dev/null
fi
if ! command -v node >/dev/null 2>&1; then
  printf 'Node.js is required. Install Node.js 24, then run this launcher again.\n' >&2
  exit 1
fi
printf 'Open http://127.0.0.1:4173 in your browser. Keep this terminal open.\n'
exec node server.mjs
