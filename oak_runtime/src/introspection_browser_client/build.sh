#!/usr/bin/env bash

# Install npm modules
npm ci

# Generate JavaScript code from the introspection_events proto
mkdir -p proto
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
PROTO_OUT_DIR="./proto"
protoc \
    --proto_path=../../../proto \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${PROTO_OUT_DIR}" \
    --ts_out="${PROTO_OUT_DIR}" \
    ../../../proto/introspection_events.proto

# Build JavaScript bundle
npx webpack
