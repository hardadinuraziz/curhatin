import http.server
import socketserver
import os
import sys
import posixpath
import urllib.parse

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def translate_path(self, path):
        # Abandon query parameters and trailing hash
        path = path.split('?', 1)[0].split('#', 1)[0]
        # Normalize posix path
        path = posixpath.normpath(urllib.parse.unquote(path))
        words = path.split('/')
        words = [_f for _f in words if _f]
        location = self.directory
        for word in words:
            if os.path.dirname(word) or word in (os.curdir, os.pardir):
                continue
            location = os.path.join(location, word)

        # 1. If path is exact directory or root, let default handle index.html
        if os.path.isdir(location):
            index = os.path.join(location, 'index.html')
            if os.path.exists(index):
                return index

        # 2. If location does not exist, check if location + '.html' exists
        if not os.path.exists(location) and os.path.exists(location + '.html'):
            return location + '.html'

        return location

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', PORT), CleanURLHandler) as httpd:
        print(f"Clean URL Server running at http://localhost:{PORT}/")
        sys.stdout.flush()
        httpd.serve_forever()
