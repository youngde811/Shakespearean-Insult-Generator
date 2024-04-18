# This is the entrypoint to our Django willieshake application server.

from django.http import HttpResponse, JsonResponse

from codewords import refresh_codewords, refresh_pickle

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


def generate_pickle(request):
    params = request.GET

    minlen = int(params.get('minlen', '7'))
    maxlen = int(params.get('maxlen', '20'))

    refresh_pickle(minlen, maxlen)

    return HttpResponse("Generated new pickle file")


def list_codewords(request):
    return codewords(request)
