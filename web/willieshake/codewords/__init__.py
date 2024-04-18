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
codewords_file = 'data/codewords'


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


def gen_codewords(codeword_count=500):
    with open(codewords_file, 'w') as strm:
        for codeword in get_nsa_codewords(pickle_cache_file=default_codewords_pickle, total_codewords=codeword_count):
            strm.write("%s\n" % codeword)


def refresh_codewords(count):
    gen_codewords(codeword_count=count)
