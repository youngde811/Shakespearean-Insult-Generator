# This file maps the URLs for our codewords web application.

from django.urls import path

from . import views

urlpatterns = [
    path("", views.whoami, name="whoami"),
]
