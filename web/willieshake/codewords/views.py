# This is the entrypoint to our Django willieshake application server.

from django.shortcuts import render
from django.http import HttpResponse


def whoami(request):
    return HttpResponse("This is the codewords application server for willieshake")
