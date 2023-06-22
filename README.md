# Welcome to Willie The Shake #

This project generates "Shakespearean" insults to either the terminal or (soon) an iOS app. Many years ago, I stumbled
across the original implementation (I think); it was written in C. I took that code and wrote a screen saver for my X
Window System environment on SunOS/Solaris, using _Xlib_. The documentation for the original work gave credit to a local
performer called "Willie The Shake", whom the author had apparently seen a number of times.

I found myself needing a distraction after a particularly challenging project at work. Having found a newer
implementation of this code on _GitHub_ - Kurt Blair's "Shakespearean Insult Generator" - I forked his repository;
re-wrote the generator in Python; and decided to include an iOS app that will make use of generated insults in some fun
manner. The app will be written in _React Native_ and _Expo_, and will be made available somehow.


version developed in C++, I've written a generator program in Python that will create 
any number of insults using an included model file, then either write these insults to the terminal or, even better, to
an iOS app that is currently being written.

## Overview ##

The insult generator is data-driven and written in Python 3.x. There's a small model file included in the _data_
directory, containing 50 lines of three tokens each; this file may be used to create a large number of insult
phrases. The generator may be used to insult you from a terminal, or save a configurable number of insults to a
file. The latter approach will be used to power the upcoming app.

Displaying an insult is simple; just run _bin/generate_ from the project directory with no arguments. You'll receive a
single offensive phrase; for example: _Thou ruttish fen-sucked apple-john!_.

## Usage ##

The generator offers a few command-line arguments:

- _-c COUNT_: Generate COUNT number of insults, writing them to either standard output or a file.
- _-g PATH_: Write some number of insults to PATH, saving them for later use. Whatever that might be.
- _-f PATH_: Use PATH as the insult generator's model file, rather than the default file provided.

## The Model File ##

The generator uses a "model file" to drive insult assembly. Each insult is created by putting three words, or fragments,
in between the tokens "Thou " and "!". Each of the fragments may be thought of as a column; fragments are picked at
random, one from each column of words that are supplied in the data file, using a separate random number for each. The
algorithm is actually quite simple.

You may use your own model file if you wish. If you create your own, it **must** follow a strict format: _three tokens
per line; each token separated by a single tab character_. The generator makes an attempt to validate a model file, and
fail cleanly if it gets angry.

## Current Work ##

At the moment, I'm writing an iOS app using React Native, Expo and TestApp.io. This app will use the insults created by
the generator program to offend both your friends and enemies. Stay tuned.

## Author ##

[David E. Young](mailto://youngde811@pobox.com)
