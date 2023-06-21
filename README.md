# Welcome to Willie The Shake #

This project is generates "Shakespearian" insults to either the terminal or an iOS app. Many years ago, the original
incantation was around, written in C, and I took that code and wrote a screen saver for my X Window System environment
on SunOS/Solaris. Originally written in _Xlib_, I had a blast.

Having found this code in a newer version developed in C++, I've written a generator program in Python that will create
any number of insults using an included model file, then either write these insults to the terminal or, even better, to
an iOS app that is currently being written.

## Overview ##

The insult generator itself is data-driven and written in Python. There's a small model file living in the _data_
directory that may be used to create as many insult phrases as you like. Creating an insult file is simple; just run
_python src/generate.py_ from the project directory, modifying a few parameters (if you like) via command-line
arguments. You may also insult yourself by running the generator with no arguments.

An insult is generated by putting three words, or fragments, in between the tokens "Thou " and "!". These three
fragments are picked at random, one from each column of words that are supplied in the data file. Any model file you use
should strictly follow this format: _three tokens per line; each token separated by a single tab character_. You may
replace the provided model file with one of your own, if you prefer.

## Current Work ##

At the moment, I'm writing an iOS app using React Native, Expo and TestApp.io. This app will use the insults created by
the generator program to offend both your friends and enemies. Stay tuned.

## Author ##

[David E. Young](mailto://youngde811@pobox.com)
