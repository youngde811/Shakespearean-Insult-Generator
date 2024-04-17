# This is the entrypoint to our Django willieshake application server.

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

codeword_data = './data/codewords'


def refresh_codewords(request):
    print("refresh_codewords()")
    

def whoami(request):
    return HttpResponse("This is the codewords application server for willieshake")


def codewords(request):
    params = request.GET
    codewords = []

    refresh = params.get('refresh', 'false')

    if (refresh == 'true'):
        refresh_codewords(request)
        
    with open(codeword_data, 'r') as strm:
        codewords = strm.read().splitlines()

    response = JsonResponse({'codewords': codewords})

    return response
