# MIT License

# Copyright (c) 2023 David Young

# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
# documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
# persons to whom the Software is furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
# Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
# WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
# COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
# OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# This is the entrypoint to our Django willieshake application server.

import ast

from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt

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

    return JsonResponse({'codewords': codewords})


@csrf_exempt
def generate_pickle(request):
    if request.method == 'GET':
        return HttpResponseBadRequest("{'reason': 'pickle creation requires a POST'}", content_type='application/json')

    body = request.body.decode('utf-8')
    data = ast.literal_eval(body)
    
    minlen = int(data['minlen'])
    maxlen = int(data['maxlen'])

    refresh_pickle(minlen, maxlen)

    resp = JsonResponse({'minlen': minlen, 'maxlen': maxlen, 'message': 'Generated new pickle file'})


@csrc_exempt
def regenerate_codewords(request):
    if request.method == 'GET':
        return HttpResponseBadRequest("{'message': 'codeword regeneration requires a POST'}", content_type='application/json')

    body = request.body.decode('utf-8')
    data = ast.literal_eval(body)
    
    nwords = int(data['nwords'])

    regenerate_codewords(nwords=nwords)

    return JsonResponse({'nwords': nwords, 'message': 'Codewords regenerated'})


def list_codewords(request):
    return codewords(request)
