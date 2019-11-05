from flask import Flask, escape, request, send_from_directory

app = Flask(__name__)


@app.route('/')
def web():
    send_from_directory('web-app.html')


if __name__ == "__main__":
    app.run()
