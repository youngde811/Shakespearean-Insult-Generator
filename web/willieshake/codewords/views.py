# This is the entrypoint to our Django willieshake application server.

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from codewords import refresh_codewords

codeword_data = './data/codewords'


def whoami(request):
    return HttpResponse("This is the codewords application server for willieshake")


def codewords(request):
    params = request.GET
    codewords = []

    refresh_count = int(params.get('refresh', '0'))

    if (refresh_count > 0):
        refresh_codewords(refresh_count)

    with open(codeword_data, 'r') as strm:
        codewords = strm.read().splitlines()

    response = JsonResponse({'codewords': codewords})

    return response
