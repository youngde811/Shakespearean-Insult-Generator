#!/usr/bin/env python

# This program may be used to create the data set for our Shakespearian Insult Generator.

import argparse
import sys

from pathlib import Path

progname = 'generate'


def load_phrases(path):
    phrases = []

    with open(path, 'r') as strm:
        phrases = strm.read().splitlines()

    if len(phrases) == 0:
        print(f'{progname}: the phrase file is empty: {path}')
        sys.exit(1)

    print(phrases)

    return 0


def sanity_checks(path):
    if not Path(path).exists():
        print(f'{progname}: missing phrase file: {path}')
        sys.exit(1)


def main():
    default_phrases = 'data/phrases'

    ap = argparse.ArgumentParser(prog=progname, description='A Shakespearian insult generator')

    ap.add_argument('-f', '--file', metavar='PATH', dest='phrases', default='data/phrases', help=f'Use PATH for the data file. Default is {default_phrases}')

    args = ap.parse_args()

    sanity_checks(args.phrases)
    load_phrases(args.phrases)

    sys.exit(0)


if __name__ == '__main__':
    try:
        main()
        sys.exit(0)
    except KeyboardInterrupt:
        sys.exit(1)
