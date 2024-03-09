from flask import Flask, request, render_template
from werkzeug.utils import secure_filename
from keras.models import load_model
import numpy as np
import cv2
import os

app=Flask(__name__)

MODEL_PATH ='tomatoes_model.h5'
LEAF_MODEL_PATH ='leafOrNotLeaf.h5'

model = load_model(MODEL_PATH,compile=False)
leaf_model = load_model(LEAF_MODEL_PATH,compile=False)

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

LEAF_CLASS_NAMES = ['leaf', 'not_a_leaf']


def model_predict(img_path, model):
    print(img_path)
    with open(img_path, "rb") as image: 
        file = image.read() 
        image = np.asarray(bytearray(file)) 
        opencv_img=cv2.imdecode(image,1)
        opencv_img=cv2.resize(opencv_img,(256,256))
        opencv_img=opencv_img.reshape((1,256,256,3))
        leaf_pred=leaf_model.predict(opencv_img)
        if (np.argmax(leaf_pred[0]) == 0):       
            y_pred=model.predict(opencv_img)
            print(y_pred)
            num=str(np.argmax(y_pred[0]))
            result=CLASS_NAMES[np.argmax(y_pred[0])]
            confidence = round(100 * (np.max(y_pred[0])), 2)
            print(num,result,confidence,sep=' ')
        else:
            num=-1
            result="not_a_leaf"
            confidence=round(100 * (np.max(leaf_pred[0])), 2)
        return num,result,confidence
    
        
@app.route('/', methods=['GET'])
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
        idx,preds,confidence = model_predict(file_path, model)
        data=[idx,preds,confidence]
        return data
    return None

if __name__=="__main__":
    app.run(debug=True)



