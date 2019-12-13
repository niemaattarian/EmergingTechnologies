import cv2
import flask as f1
from flask import Flask, render_template
import base64
import tensorflow as tf
import numpy as np

app = Flask(__name__)

# Add a route for the web-page
@app.route('/')
def web():
    # Here we passed the HTML file to the method.
    # This method creates and object out of the HTML and returns on on the browser
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
    # Resizing the image
    image = cv2.imread("numberimage.png", cv2.THRESH_BINARY)
    # Blurs the image for accuracy
    image = cv2.GaussianBlur(image, (0, 0), cv2.BORDER_DEFAULT)
    resizeimage = cv2.resize(image, (28, 28))
    # Writing the image to file as 28 x 28
    cv2.imwrite("numberimage.png", resizeimage)

    return render_template('web-app.html'), 200

# Predicting the image
number_image = cv2.imread("numberimage.png", cv2.IMREAD_GRAYSCALE)
# Normalising the data
number_image = number_image / 255
number_image = number_image.reshape(1, 784)
# Loads the image into the model
new_model = tf.keras.models.load_model('number_image.h5')
# Predicts the number
predictions = new_model.predict(number_image)

print(np.argmax(predictions[0]))

if __name__ == "__main__":
    app.run()
