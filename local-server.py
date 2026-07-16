from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
from urllib.parse import urlparse


class ShowBarnHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        path = urlparse(path).path

        if path in ("/", "/show-barn", "/show-barn/"):
            path = "/index.html"
        elif path.startswith("/show-barn/"):
            path = path[len("/show-barn") :]

        return super().translate_path(path)

    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    with TCPServer(("127.0.0.1", 8080), ShowBarnHandler) as httpd:
        print("http://127.0.0.1:8080/show-barn/")
        httpd.serve_forever()
