//
// Copyright 2019 The Project Oak Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

use oak_utils::{compile_protos_with_options, generate_grpc_code, CodegenOptions, ProtoOptions};
use std::process::Command;

fn main() {
    generate_grpc_code(
        "../proto",
        &["authentication.proto"],
        CodegenOptions {
            build_server: true,
            ..Default::default()
        },
    )
    .expect("Proto compilation failed.");

    compile_protos_with_options(
        &["../proto/introspection_events.proto"],
        &["../proto"],
        ProtoOptions {
            // Exclude generation of HandleVisit auto-derive, as it would
            // require a reference to the Oak SDK to compile.
            derive_handle_visit: false,
            ..Default::default()
        },
    );

    // Build assets for the browser client of the introspection server
    #[cfg(feature = "oak_debug")]
    let output = Command::new("npm")
        .args(&[
            "--prefix",
            "./src/introspection_browser_client",
            "run",
            "build",
        ])
        .output()
        .expect("failed to build introspection client assets");
}
