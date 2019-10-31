#!/usr/bin/env python3.6

from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Employees Service'

if __name__ == '__main__':
    app.run(ssl_context=('../ca2/server-cert.pem', '../ca2/server-key.pem'))