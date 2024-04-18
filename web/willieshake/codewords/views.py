# This is the entrypoint to our Django willieshake application server.

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


def generate_pickle(request):
    print(f'generate_pickle: {request}')

    return HttpResponse("Generating a new pickle file")


def list_codewords(request):
    return codewords(request)
