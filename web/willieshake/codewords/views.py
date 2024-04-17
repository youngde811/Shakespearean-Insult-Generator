# This is the entrypoint to our Django willieshake application server.

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

codeword_data = './data/codewords'


def whoami(request):
    return HttpResponse("This is the codewords application server for willieshake")


def codewords(request):
    params = request.GET
    codewords = []

    print(f'GET: codewords: {params}')
    print(f"GET: codewords: params.count: {params.get('count', '')}")

    with open(codeword_data, 'r') as strm:
        codewords = strm.read().splitlines()

    response = JsonResponse({'codewords': codewords})

    return response
