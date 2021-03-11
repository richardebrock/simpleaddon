import http.server
import socketserver

PORT = 8181
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving on port", PORT)
    httpd.serve_forever()