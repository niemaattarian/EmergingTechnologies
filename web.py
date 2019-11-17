import flask as f1

from flask import Flask, render_template

import base64
app = Flask(__name__)

# Add a route for the web-page
@app.route('/')
def web():
    return render_template('web-app.html')


# Add a route for the web-page
@app.route('/uploadImage', methods=['POST'])
def uploadimage():
    numberimage = f1.request.values.get("numberImage", "")
    # Print to the console
    print(numberimage)
    # Decode the string to an image
    decodedimage = base64.b64decode(numberimage[22:])
    # Saving the image
    with open("numberimage.png", "wb") as f:
        f.write(decodedimage)

    return render_template('web-app.html', 200)

if __name__ == "__main__":
    app.run()