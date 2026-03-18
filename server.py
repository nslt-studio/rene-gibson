#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler

class CORSHandler(SimpleHTTPRequestHandler):
    def send_response(self, *args, **kwargs):
        super().send_response(*args, **kwargs)
        self.send_header('Access-Control-Allow-Origin', '*')

    def log_message(self, format, *args):
        pass  # silence logs

HTTPServer(('', 8080), CORSHandler).serve_forever()
