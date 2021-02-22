#!/usr/bin/env bash

set -e

cd "$(dirname $0)/.."

if [[ $(git rev-parse --abbrev-ref HEAD) != 'master' ]]; then
  exit 1
fi

./scripts/clean.sh
./scripts/build-integration-fixtures.sh
CI=true yarn react-scripts test
yarn build
yarn build:cli
