from flask import Flask, request, render_template
from werkzeug.utils import secure_filename
import tensorflow as tf
from keras.models import load_model
import numpy as np
import cv2
import os
from keras.utils import img_to_array
from PIL import Image
from keras.preprocessing import image


app=Flask(__name__)

MODEL_PATH ='tomatoes_model.h5'

model = load_model(MODEL_PATH,compile=False)

CLASS_NAMES=['Tomato___Bacterial_spot',
                'Tomato___Early_blight',
                'Tomato___Late_blight',
                'Tomato___Leaf_Mold',
                'Tomato___Septoria_leaf_spot',
                'Tomato___Spider_mites Two-spotted_spider_mite',
                'Tomato___Target_Spot',
                'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
                'Tomato___Tomato_mosaic_virus',
                'Tomato___healthy']


def model_predict(img_path, model):
    print(img_path)
    result=None
    i=image.load_img(img_path,target_size=(256,256))
    i=image.img_to_array(i)
    i=i.reshape(1,256,256,3)
    predictions = model.predict(i)
    print(predictions[0])
    print(np.argmax(predictions))
    print(CLASS_NAMES[np.argmax(predictions)])
    result=CLASS_NAMES[np.argmax(predictions[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)
    print(result,confidence,sep=' ')
    return result,confidence


@app.route('/home', methods=['GET'])
def home():
    return render_template("index.html")


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        f = request.files['file']
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)
        print(file_path)
        preds,confidence = model_predict(file_path, model)
        data=[preds,confidence]
        return data
    return None


if __name__=="__main__":
    app.run(debug=True)
