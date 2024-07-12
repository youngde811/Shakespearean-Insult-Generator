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
  -L  Show a long version of the insult generator's help message and exit.
EOF

    exit 1
}

ensure_binary() {
    [[ -x $genrust ]] || { echo "$progname: missing Rust binary; did you build genrust first?"; exit 1; }
}

genrust_usage() {
    local flag='-h'
    local opt="$1"

    [[ $opt == long ]] && flag='--help'
    
    ensure_binary

    $genrust $flag

    exit $?
}

while getopts "hHL" opt ; do
    case $opt in
        h) usage ;;
        H) genrust_usage short ;;
        L) genrust_usage long ;;
        *) usage ;;
    esac
done

shift $((OPTIND - 1))

ensure_binary
$genrust "$@"

exit $?
