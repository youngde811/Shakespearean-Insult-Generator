# Welcome to Willie The Shake #

This project generates "Shakespearean" insults to either the terminal or (soon) an iOS app. Many years ago, I stumbled
across the original implementation (I think); it was written in C. I took that code and wrote a screen saver for my X
Window System environment on SunOS/Solaris, using _Xlib_. The documentation for the original work gave credit to a
performer named "Lord Buckley", who had an act he called "Willie The Shake". The code author had apparently seen this
fellow a number of times; thus the name of this project.

I found myself needing a distraction after a particularly challenging project at work. Having discovered a newer
implementation of the code on _GitHub_ - Kurt Blair's "Shakespearean Insult Generator" - I forked his repository;
re-wrote the generator in Python; and decided to include an iOS app that will make use of generated insults in some fun
manner. The app will be written in _React Native_ and _Expo_, and will be made available somehow.

## Overview ##

The insult generator is data-driven and written in Python 3.x. There's a small model file included in the _data_
directory, containing 50 lines of three tokens each; this file may be used to create a large number of insult
phrases. The generator may be used to insult you from a terminal, or save a configurable number of insults to a
file. The latter approach will be used to power the upcoming app.

Displaying an insult is simple; just run `bin/generate` from the project directory with no arguments. You'll receive a
single offensive phrase; for example: _Thou ruttish fen-sucked apple-john!_ If you need some functional information
from this script, run `bin/generate -h`.

## Usage ##

The generator offers a few command-line arguments:

| Argument | Description |
| :-: |:-: |
| _-c COUNT_ | Generate COUNT number of insults, writing them to either standard output or a file. |
| _-g PATH_ | Write some number of insults to PATH, saving them for later use. Whatever that might be. |
| _-f PATH_ | Use PATH as the insult generator's model file, rather than the default file provided. |

As implied above, in the project's _bin_ directory there is a _Bash_ script that serves as a simple wrapper around the
Python-based generator to save a small amount of typing. If you prefer, you may use your own Python interpreter
directly: `python3 src/generator.py`. Note that Python 3 is required; the generator will **not** run on any 2.x version.

## The Model File ##

The generator uses a "model file" to drive insult assembly. Each insult is created by putting three words, or fragments,
in between the tokens "Thou " and "!". Each of the fragments may be thought of as a column; fragments are picked at
random, one from each column of words that are supplied in the data file, using a separate random number for each. The
algorithm is actually quite simple.

Using the included model file, there are 50 lines of three tokens each, allowing for 573,800 combinations: $$C(n,r) = \frac{n!}{r!(n-r)!}$$

You may use your own model file if you wish. If you create your own, it **must** follow a strict format: _three tokens
per line; each token separated by a single tab character_. The generator makes an attempt to validate a model file, and
fail cleanly if it gets angry.

## Current Work ##

In progress is the development of an iOS app using _React Native_, _Expo_ and _TestApp.io_. This app will use the
insults created by the generator program to offend both your friends and enemies in various ways. I'm soliciting input
from family members to assist in identifying cool behaviors to include, so stay tuned.

## License ##

This software is made available under the _MIT License_. See _LICENSE.md_ for details.

## Attributions ##

The insult generator itself is based on the work of Kurt Blair's [Shakespearean Insult Generator](https://github.com/Kurt-Blair/Shakespearean-Insult-Generator).

## References ##

- [Lord Buckley's](http://www.lordbuckley.com/the-word-new/transcriptions/willie-the-shake.html) "Willie The Shake".
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/): A successful Git branchind model.

## Author ##

[David E. Young](mailto://youngde811@pobox.com)
