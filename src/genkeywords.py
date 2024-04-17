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


def get_nsa_codewords(pickle_cache_file="nsa_codewords.pickle.gz", token_min_length=3, token_max_length=7, total_codewords=20):
    if os.path.isfile(pickle_cache_file):
        with contextlib.closing(gzip.open(pickle_cache_file, "rb")) as f_in:
            words = pickle.load(f_in)
        nouns = words["nouns"]
        adjectives = words["adjectives"]
    else:
        nouns = []
        adjectives = []

        with open("/usr/share/dict/words") as f_in:
            lines = (line.strip() for line in f_in)
            good_lines = (line for line in lines if re.match("^[a-z]{%s,%s}$" % (token_min_length, token_max_length), line))

            for line in good_lines:
                tag = nltk.pos_tag([line])[0][1]

                if tag == "NN":
                    nouns.append(line)
                elif tag == "JJ":
                    adjectives.append(line)

        with contextlib.closing(gzip.open(pickle_cache_file, "wb")) as f_out:
            pickle.dump({"nouns": nouns, "adjectives": adjectives}, f_out, -1)

    for i in range(total_codewords):
        if random.random() > 0.5:
            output = [random.choice(nouns), random.choice(nouns)]
        else:
            output = [random.choice(adjectives), random.choice(nouns)]
            yield "%s" % "".join(output).upper()


def main():
    for codeword in get_nsa_codewords():
        sys.stdout.write("%s\n" % codeword)


if __name__ == '__main__':
    try:
        main()
        sys.exit(0)
    except KeyboardInterrupt:
        sys.exit(1)
