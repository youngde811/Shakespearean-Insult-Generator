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
import json
import random
import re
import sys

from pathlib import Path

progname = 'generate'

tokens = {
    'first': [],
    'second': [],
    'third': []
}

urls = {}


def fail(msg):
    print(f'{progname}: {msg}')
    sys.exit(1)


def load_urls(path):
    urls = None

    with open(path, 'r') as strm:
        urls = json.load(strm)

    assert urls.len > 0, f'The URLs file is empty: {path}'

    return urls


def load_phrases(phrases_path, urls_path):
    global tokens
    global urls

    phrase_data = []

    with open(phrases_path, 'r') as strm:
        phrase_data = strm.read().splitlines()

    if len(phrase_data) == 0:
        fail(f'the phrase file is empty: {phrases_path}')

    for raw in phrase_data:
        phrase = re.split(r'\t+', raw)

        assert len(phrase) == 3, f'{progname}: the input data file is corrupt: {phrases_path}'

        # list appends are fast in Python

        tokens['first'].append(phrase[0])
        tokens['second'].append(phrase[1])
        tokens['third'].append(phrase[2])

    urls = load_urls(urls_path)

    return len(phrase_data)


def rand(end=49):
    return random.randint(0, end)


def insult(nphrases=50):
    index = nphrases - 1

    def token(key):
        return tokens[key][rand(end=index)]

    return f"Thou {token('first')} {token('second')} {token('third')}!"


def show_insults(insults):
    for i in range(0, len(insults)):
        print(insults[i])


def create_json_insults(path, insults):
    data = {
        "insults": insults
    }

    with open(path, 'w') as strm:
        json.dump(data, strm, sort_keys=True, indent=4)


def generate_insults(path, oformat, nphrases=50, count=1):
    insults = []

    for i in range(0, count):
        entry = {
            "id": i,
            "insult": insult(nphrases=nphrases),
            "url": ""
        }

        insults.append(entry)

    # just for testing right now

    insults[0].url = urls.urls[0]
    insults[1].url = urls.url[1]

    if oformat == 'json':
        create_json_insults(path, insults)
    else:
        show_insults(insults)


def insult_me(count=1, nphrases=50):
    for i in range(0, count):
        print(insult(nphrases=nphrases))


def sanity_checks(path):
    if not Path(path).exists():
        fail(f'missing phrase file: {path}')


def main():
    default_phrases = 'data/phrases'
    default_urls = 'data/urls.json'

    ap = argparse.ArgumentParser(prog=progname, description='A Shakespearian insult generator')

    ap.add_argument('-c', '--count', metavar='COUNT', dest='count', default=0, type=int, help='Generate COUNT insults')
    ap.add_argument('-i', '--input', metavar='PATH', dest='phrases', default=default_phrases, help=f'Use PATH for the data file. Default is {default_phrases}')
    ap.add_argument('-g', '--generate', metavar='PATH', dest='genfile', default=None, help='Write a number of insults to PATH')
    ap.add_argument('-o', '--output', metavar='FORMAT', dest='oformat', choices=['json', 'text'], default='json', help='Output insults using FORMAT. Default is "json"')
    ap.add_argument('-u', '--urls', metavar='PATH', dest='urls', default=default_urls, help=f'Use PATH for the URLs data file. Default is {default_urls}')

    args = ap.parse_args()

    sanity_checks(args.phrases)

    nphrases = load_phrases(args.phrases, args.urls)

    icount = args.count if args.count > 0 else 1

    if args.genfile is not None:
        generate_insults(args.genfile, args.oformat, count=icount)
    else:
        insult_me(count=icount, nphrases=nphrases)

    sys.exit(0)


if __name__ == '__main__':
    try:
        main()
        sys.exit(0)
    except KeyboardInterrupt:
        sys.exit(1)
