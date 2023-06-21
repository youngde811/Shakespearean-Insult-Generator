#!/usr/bin/env python

# This program may be used to create the data set for our Shakespearian Insult Generator.

import argparse
import random
import re
import sys

from pathlib import Path

progname = 'generate'

token_first = []
token_second = []
token_third = []


def load_phrases(path):
    phrase_data = []

    with open(path, 'r') as strm:
        phrase_data = strm.read().splitlines()

    if len(phrase_data) == 0:
        print(f'{progname}: the phrase file is empty: {path}')
        sys.exit(1)

    for raw in phrase_data:
        phrase = re.split(r'\t+', raw)

        token_first.append(phrase[0])
        token_second.append(phrase[1])
        token_third.append(phrase[2])

    return 0


def insult():
    insult = f'Thou {token_first[random.randint(0, 50)]} {token_second[random.randint(0, 50)]} {token_third[random.randint(0, 50)]}!'

    print(insult)


def sanity_checks(path):
    if not Path(path).exists():
        print(f'{progname}: missing phrase file: {path}')
        sys.exit(1)


def main():
    default_phrases = 'data/phrases'

    ap = argparse.ArgumentParser(prog=progname, description='A Shakespearian insult generator')

    ap.add_argument('-c', '--count', metavar='COUNT', dest='count', default=0, type=int, help='Generate COUNT insults')
    ap.add_argument('-f', '--file', metavar='PATH', dest='phrases', default='data/phrases', help=f'Use PATH for the data file. Default is {default_phrases}')
    ap.add_argument('-g', '--generate', metavar='PATH', dest='genfile', default=None, help='Write a number of insults to PATH')

    args = ap.parse_args()

    sanity_checks(args.phrases)
    load_phrases(args.phrases)

    icount = args.count if args.count > 0 else 1

    for i in range(0, icount):
        insult()

    sys.exit(0)


if __name__ == '__main__':
    try:
        main()
        sys.exit(0)
    except KeyboardInterrupt:
        sys.exit(1)
