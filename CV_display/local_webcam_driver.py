from keras.models import load_model
from keras.preprocessing import image
import cv2
import numpy as np
import keras
import tensorflow as tf

# Face obj detection model 
face_classifier=cv2.CascadeClassifier("CV_display\haarcascade_frontalface_default.xml")

# Emotion model
classifier = load_model(r"CV_display\02_resnet_4_7M_model.h5")
class_labels=['Pain','Happy','Neutral','Sad','Surprise']

def generate_frames(camera_frame):
    frame = np.copy(camera_frame)
    preds=[]
    # Greyscale webcam input
    gray=cv2.cvtColor(np.float32(frame),cv2.COLOR_BGR2GRAY) 
    gray = np.uint8(gray)
    # Localize face with Haarcascade
    faces=face_classifier.detectMultiScale(gray,1.3,5) 

    for (x,y,w,h) in faces:
        cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)
        roi_gray=gray[y:y+h,x:x+w]
        roi_gray=cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)

        # Feed face into emotion detector if face present
        if np.sum([roi_gray])!=0:
            roi=roi_gray.astype('float')/255.0
            roi= tf.keras.preprocessing.image.img_to_array(roi)
            roi=np.expand_dims(roi,axis=0)

            preds=classifier.predict(roi)[0]
            label=class_labels[preds.argmax()]
            label_position=(x,y)
            cv2.putText(frame,label,label_position,cv2.FONT_HERSHEY_SIMPLEX,2,(0,255,0),3)

    return frame, preds

# Run webcam 
if __name__ == "__main__":
    camera=cv2.VideoCapture(0)
    while True:
        ret, frame = camera.read()
        if frame.any() == True:
            frame, preds = generate_frames(frame)
            cv2.imshow('Emotion Detector',frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    camera.release()
    cv2.destroyAllWindows()