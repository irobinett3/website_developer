from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse
from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render
from django.views import View


def home(request):
    return render(request, 'home.html')
from django.http import JsonResponse
from django.views import View

class UploadView(View):
    def post(self, request, *args, **kwargs):
        # Process the uploaded data here
        # Example: Save files, update database, etc.
        return JsonResponse({'message': 'Data received successfully'}, status=200)

def test_view(request):
    return JsonResponse({'message': 'Backend is working!'})