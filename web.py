from idlelib.idle_test.test_browser import f1

from flask import Flask, send_from_directory, render_template

import base64
app = Flask(__name__)

# Add a route for the web-page
@app.route('/')
def web():
    return render_template('web-app.html')


# Add a route for the web-page
@app.route('/uploadImage', methods=['GET', 'POST'])
def uploadImage():
    numberImage = f1.request.values.get("numberImage", "")
    # Print to the console
    print(numberImage)
    # Decode the string to an image
    decodedImage = base64.b64decode(numberImage[22:])
    # Saving the image
    with open("numberImage.png", "num") as f:
        f.write(decodedImage)


if __name__ == "__main__":
    app.run()


