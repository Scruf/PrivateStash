"""
WSGI config for reporter project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os
import sys
path =  '/home/HLX/reporter'
if path not in sys.path:
    sys.path.append(path)
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "reporter.settings")
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
