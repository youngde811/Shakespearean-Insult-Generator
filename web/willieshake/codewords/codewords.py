#!/usr/bin/env python

# This Python module may be used to generate NSA-style codewords, just to irritate those
# guys. Inspiration and support comes from: https://coderwall.com/p/xov5na/generating-nsa-codewords.

import contextlib
import pickle
import gzip
import os
import random
import re
import sys

import nltk


word_dict = '/usr/share/dict/words'
default_codewords_pickle = 'data/nsa_codewords.pickle.gz'


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
        good_lines = (line for line in lines if re.match(f"^[a-z]{{ {minlen},{maxlen} }}$", line))

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


def gen_codewords():
    ap.add_argument('-f', '--file', metavar='PATH', dest='codewords', default=default_codewords_pickle,
                    help='A compressed codeword pickle file')
    ap.add_argument('-c', '--codewords', metavar='COUNT', dest='ncodewords', default=20, type=int, help='The number of code words to generate')

    args = ap.parse_args()

    for codeword in get_nsa_codewords(pickle_cache_file=args.codewords, total_codewords=args.ncodewords):
        sys.stdout.write("%s\n" % codeword)


if __name__ == '__main__':
    try:
        main()
        sys.exit(0)
    except KeyboardInterrupt:
        sys.exit(1)
