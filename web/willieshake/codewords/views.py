# This is the entrypoint to our Django willieshake application server.

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from codewords import gen_codewords

codeword_data = './data/codewords'


def refresh_codewords(count):
    print("refresh_codewords()")

    gen_codewords(codeword_count=count)
    

def whoami(request):
    return HttpResponse("This is the codewords application server for willieshake")


def codewords(request):
    params = request.GET
    codewords = []

    refresh = params.get('refresh', 'false')
        
    if (refresh == 'true'):
        count = int(params.get('count', '500'))
        
        refresh_codewords(count)
        
    with open(codeword_data, 'r') as strm:
        codewords = strm.read().splitlines()

    response = JsonResponse({'codewords': codewords})

    return response
