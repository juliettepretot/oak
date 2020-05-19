"""
cargo-raze crate build file.

DO NOT EDIT! Replaced on runs of cargo-raze
"""
package(default_visibility = [
  # Public for visibility by "@raze__crate__version//" targets.
  #
  # Prefer access through "//cargo", which limits external
  # visibility to explicit Cargo.toml dependencies.
  "//visibility:public",
])

licenses([
  "restricted", # "MIT OR Apache-2.0"
])

load(
    "@io_bazel_rules_rust//rust:rust.bzl",
    "rust_library",
    "rust_binary",
    "rust_test",
)


# Unsupported target "abortable" with type "test" omitted
# Unsupported target "arc_wake" with type "test" omitted
# Unsupported target "async_await_macros" with type "test" omitted
# Unsupported target "atomic_waker" with type "test" omitted
# Unsupported target "basic_combinators" with type "test" omitted
# Unsupported target "buffer_unordered" with type "test" omitted
# Unsupported target "compat" with type "test" omitted
# Unsupported target "eager_drop" with type "test" omitted
# Unsupported target "eventual" with type "test" omitted
# Unsupported target "fuse" with type "test" omitted
# Unsupported target "future_obj" with type "test" omitted
# Unsupported target "future_try_flatten_stream" with type "test" omitted

rust_library(
    name = "futures",
    crate_root = "src/lib.rs",
    crate_type = "lib",
    edition = "2018",
    srcs = glob(["**/*.rs"]),
    deps = [
        "@raze__futures_channel__0_3_5//:futures_channel",
        "@raze__futures_core__0_3_5//:futures_core",
        "@raze__futures_executor__0_3_5//:futures_executor",
        "@raze__futures_io__0_3_5//:futures_io",
        "@raze__futures_sink__0_3_5//:futures_sink",
        "@raze__futures_task__0_3_5//:futures_task",
        "@raze__futures_util__0_3_5//:futures_util",
    ],
    rustc_flags = [
        "--cap-lints=allow",
    ],
    version = "0.3.5",
    crate_features = [
        "alloc",
        "async-await",
        "default",
        "executor",
        "futures-executor",
        "std",
    ],
)

# Unsupported target "futures_ordered" with type "test" omitted
# Unsupported target "futures_unordered" with type "test" omitted
# Unsupported target "inspect" with type "test" omitted
# Unsupported target "io_buf_reader" with type "test" omitted
# Unsupported target "io_buf_writer" with type "test" omitted
# Unsupported target "io_cursor" with type "test" omitted
# Unsupported target "io_lines" with type "test" omitted
# Unsupported target "io_read" with type "test" omitted
# Unsupported target "io_read_exact" with type "test" omitted
# Unsupported target "io_read_line" with type "test" omitted
# Unsupported target "io_read_to_string" with type "test" omitted
# Unsupported target "io_read_until" with type "test" omitted
# Unsupported target "io_window" with type "test" omitted
# Unsupported target "io_write" with type "test" omitted
# Unsupported target "join_all" with type "test" omitted
# Unsupported target "macro_comma_support" with type "test" omitted
# Unsupported target "mutex" with type "test" omitted
# Unsupported target "object_safety" with type "test" omitted
# Unsupported target "oneshot" with type "test" omitted
# Unsupported target "ready_queue" with type "test" omitted
# Unsupported target "recurse" with type "test" omitted
# Unsupported target "select_all" with type "test" omitted
# Unsupported target "select_ok" with type "test" omitted
# Unsupported target "shared" with type "test" omitted
# Unsupported target "sink" with type "test" omitted
# Unsupported target "sink_fanout" with type "test" omitted
# Unsupported target "split" with type "test" omitted
# Unsupported target "stream" with type "test" omitted
# Unsupported target "stream_catch_unwind" with type "test" omitted
# Unsupported target "stream_into_async_read" with type "test" omitted
# Unsupported target "stream_peekable" with type "test" omitted
# Unsupported target "stream_select_all" with type "test" omitted
# Unsupported target "stream_select_next_some" with type "test" omitted
# Unsupported target "try_join" with type "test" omitted
# Unsupported target "try_join_all" with type "test" omitted
# Unsupported target "unfold" with type "test" omitted