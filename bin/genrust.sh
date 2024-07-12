#!/usr/bin/env bash

# This script is a simple front-end to our Rust-based insult generator. Make sure
# you build the Rust executable first (using Cargo), in 'release' mode, to make
# this script work.

readonly progname="$(basename $0)"

genrust='./src/genrust/target/release/genrust'

usage() {
    cat <<EOF
Usage: $progname [OPTIONS]

This script is a simple front-end to our Rust-based insult generator. Make sure
you build the Rust executable first (using Cargo), in 'release' mode, to make
this script work.

Options
  -h  Show this message and exit.
  -H  Show the insult generator's help message and exit.
EOF

    exit 1
}

ensure_binary() {
    [[ -x $genrust ]] || { echo "$progname: missing Rust binary; did you build genrust first?"; exit 1; }
}

genrust_usage() {
    ensure_binary

    $genrust -h

    exit $?
}

while getopts "hH" opt ; do
    case $opt in
        h) usage ;;
        H) genrust_usage ;;
        *) usage ;;
    esac
done

shift $((OPTIND - 1))

ensure_binary
$genrust "$@"

exit $?
