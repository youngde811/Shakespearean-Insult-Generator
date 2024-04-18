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

# This Python module may be used to generate NSA-style codewords, just to irritate those
# guys. Inspiration and support comes from: https://coderwall.com/p/xov5na/generating-nsa-codewords.

import argparse
import contextlib
import pickle
import gzip
import os
import random
import re
import sys

import nltk


word_dict = '/usr/share/dict/words'
default_codewords_pickle = 'nsa_codewords.pickle.gz'


def load_wordlist(cachefile):
    nouns = []
    adjectives = []
    words = []

    with contextlib.closing(gzip.open(cachefile, "rb")) as strm:
        words = pickle.load(strm)

    nouns = words["nouns"]
    adjectives = words["adjectives"]

    return nouns, adjectives


def create_wordlist(cachefile, minlen=3, maxlen=7):
    nouns = []
    adjectives = []

    with open(word_dict) as strm:
        lines = (line.strip() for line in strm)
        good_lines = (line for line in lines if re.match("^[a-z]{%s,%s}$" % (minlen, maxlen), line))

        for line in good_lines:
            tag = nltk.pos_tag([line])[0][1]

            if tag == "NN":
                nouns.append(line)
            elif tag == "JJ":
                adjectives.append(line)

    with contextlib.closing(gzip.open(cachefile, "wb")) as strm:
        pickle.dump({"nouns": nouns, "adjectives": adjectives}, strm, -1)

    return nouns, adjectives


def get_nsa_codewords(pickle_cache_file, token_min_length=3, token_max_length=7, total_codewords=20):
    nouns = []
    adjectives = []

    if os.path.isfile(pickle_cache_file):
        nouns, adjectives = load_wordlist(pickle_cache_file)
    else:
        nouns, adjectives = create_wordlist(pickle_cache_file, token_min_length, token_max_length)

    for i in range(total_codewords):
        if random.random() > 0.5:
            output = [random.choice(nouns), random.choice(nouns)]
        else:
            output = [random.choice(adjectives), random.choice(nouns)]
            yield f'{"".join(output).upper()}'


def clear_pickle_file(fname):
    if os.path.isfile(fname):
        os.remove(fname)


def main():
    global default_codewords_pickle

    ap = argparse.ArgumentParser()

    ap.add_argument('-f', '--file', metavar='PATH', dest='pickle_file', default=default_codewords_pickle,
                    help='use PATH as the compressed codeword pickle file')
    ap.add_argument('-c', '--codewords', metavar='COUNT', dest='ncodewords', default=20, type=int, help='the number of code words to generate')
    ap.add_argument('-r', '--remove', dest='remove_pickle', action='store_true', default=False, help='generate a new pickle cache file')

    args = ap.parse_args()

    if args.remove_pickle:
        clear_pickle_file(args.pickle_file)

    for codeword in get_nsa_codewords(pickle_cache_file=args.pickle_file, total_codewords=args.ncodewords):
        sys.stdout.write("%s\n" % codeword)


if __name__ == '__main__':
    try:
        main()
        sys.exit(0)
    except KeyboardInterrupt:
        sys.exit(1)
