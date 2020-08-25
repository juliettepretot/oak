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
use std::{env, fs, io};

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

    const INTROPSECTION_CLIENT_DIR: &str = "src/introspection_browser_client/dist";
    const INTROPSECTION_CLIENT_FILES: &[&str] = &["index.html", "index.js"];
    let out_dir = env::var("OUT_DIR").unwrap();
    fs::create_dir_all(&format!("{}/{}", out_dir, INTROPSECTION_CLIENT_DIR))
        .expect("unable to create introspection client out directory");
    for client_file in INTROPSECTION_CLIENT_FILES {
        let path = format!("{}/{}", INTROPSECTION_CLIENT_DIR, client_file);
        let out_path = format!("{}/{}", out_dir, path);
        let mut out_file = fs::OpenOptions::new()
            .append(true)
            .create(true)
            .open(&out_path)
            .expect("unable to open/create data file");
        if let Ok(mut source_file) = fs::File::open(&path) {
            io::copy(&mut source_file, &mut out_file).expect("failed to copy data after opening");
        }
        // Tell cargo to rerun this build script if the client_file has changed.
        // https://doc.rust-lang.org/cargo/reference/build-scripts.html#cargorerun-if-changedpath
        println!("cargo:rerun-if-changed={}", path);
    }
}
