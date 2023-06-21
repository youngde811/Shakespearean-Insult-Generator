#!/usr/bin/env python

# MIT License

# Copyright (c) 2023 David Young

# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
# documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
# persons to whom the Software is furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
# Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
# WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
# COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
# OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# This program may be used to create insults, and optionally save them to a file, using our
# Shakespearian Insult Generator.

import argparse
import os
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

        assert len(phrase) == 3, f'{progname}: the input data file is corrupt: {path}'

        # list appends are fast in Python

        token_first.append(phrase[0])
        token_second.append(phrase[1])
        token_third.append(phrase[2])

    return 0


def rand(begin=0, end=50):
    return random.randint(begin, end)


def insult(strm=sys.stdout):
    insult = f'Thou {token_first[rand()]} {token_second[rand()]} {token_third[rand()]}!'

    print(insult, file=strm)


def open_genfile(path):
    if not os.access(os.path.dirname(path), os.W_OK):
        print(f'{progname}: insult save file cannot be created here: {path}')
        sys.exit(1)

    return open(path, mode='w')


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
    ostrm = sys.stdout if args.genfile is None else open_genfile(args.genfile)

    for i in range(0, icount):
        insult(strm=ostrm)

    sys.exit(0)


if __name__ == '__main__':
    try:
        main()
        sys.exit(0)
    except KeyboardInterrupt:
        sys.exit(1)
