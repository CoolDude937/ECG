import tensorflow as tf
from keras.models import load_model
import cv2
import numpy as np
import flask 
from flask import Flask,render_template,Response
import cv2
import requests

face_classifier=cv2.CascadeClassifier("C:/Users/mckal/OpenFrameworks/of_v0.11.2_vs2017_release/apps/myApps/myResponsiveSketch/bin\data/haarcascade_frontalface_default.xml")
classifier = load_model(r'C:\Users\mckal\OneDrive\Documents\GitHub\uottahack5\CV_display\Model_0.2_0.57.h5')

class_labels=['Angry','Happy','Neutral','Sad','Surprise']
camera=cv2.VideoCapture(0)


def generate_frames():
    url = 'http://localhost:5000/emotions'
    # Empty dict to store emotions
    emotion_val = dict()
    while True:
        ret,frame=camera.read()
        labels=[]
        gray=cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
        faces=face_classifier.detectMultiScale(gray,1.3,5)

        for (x,y,w,h) in faces:
            cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)
            roi_gray=gray[y:y+h,x:x+w]
            roi_gray=cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)

            if np.sum([roi_gray])!=0:
                roi=roi_gray.astype('float')/255.0
                roi=tf.keras.utils.img_to_array(roi)
                roi=np.expand_dims(roi,axis=0)

                preds=classifier.predict(roi)[0]
                
                # Request
                for i in range(5): 
                    emotion_val[class_labels[i]] = preds[i]
                x = request.post(url, json = emotion_val)
                
                label=class_labels[preds.argmax()]
                label_position=(x,y)
                cv2.putText(frame,label,label_position,cv2.FONT_HERSHEY_SIMPLEX,2,(0,255,0),3)
            else:
                cv2.putText(frame,'No Face Found',(20,20),cv2.FONT_HERSHEY_SIMPLEX,2,(0,255,0),3)
        ret,buffer=cv2.imencode('.jpg',frame)
        frame=buffer.tobytes()
 
        var = (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        yield var


app=Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video')
def video():
    return Response(generate_frames(),mimetype='multipart/x-mixed-replace; boundary=frame')

app.run(debug=True)
