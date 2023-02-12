# Emotional Cardiography (ECG)


## Inspiration
The inspiration for ECG comes form the tremendous labor shortage Canada is currently having in the medical industry and the desire to make safety and security accessible to everyone whos staying in medical facilities.

## What it does
ECG uses a ML model we trained and python OpenCV to be able to detect a humans emotions based of facial expressions. Then using a heart rate sensor hooked up to an Arduino to simulate a professional grade cardiac event monitor,  we take in a patients bpm using C++. Then it sends both pieces of data to a web application made in JavaScript in real time using various libraries and techniques. Finally, the web application made using react creates a friendly user interface for the doctor to be able to see the probability of the patients possible emotions, the bpm and a suggestions section which gives the doctor recommendations based off our data.

## How we built it
First we created a sequential model using 8 convolutional layers based on the fer2013 data set we found from Kaggle. Which includes about 24000 training images and 3000 validation images, after various transformations we end up having about 4.7 million parameters to train our model. Then after some optimization, we sent the model to our website by using the external flask library to return the live footage into an html file. 

On the hardware side, we used an KY-039 heartbeat sensor and an Arduino to sense heartbeats, then we created an algorithm to approximate the average BPM of the last 4 seconds and used the serial monitor to send the information to JavaScript to be processed.

## Challenges we ran into
One of the main challenges we ran into was the ability to transfer data in real time, whether that be from python to JavaScript, sending a live streamed from python to html, or sending C++ readings to JavaScript. Most of our time ended up being spent debugging various different transferring techniques we found. Another challenged we had was our model program was inconsistent with successfully initializing, one attempt it would work and the next after no syntax changes it would fail. Another issue we ran into in the OpenCV side was getting all the versions to line up in the virtual environment we created, eventually after enough pip installs we found out about poetry and used that to standardize all of our version control.

Challenges of getting BPM:
The first challenge was the lack of an actual pulse rate sensor. The heartbeat sensor we had instead does not return a BPM but a number from 0 to 1023 when blood moves through the finger and the sensor picks up a change in light. We had to figure out an algorithm that would convert this to BPM.
The second challenge was to use an algorithm that correctly approximated a BPM in short intervals, as we needed speed for the demo. We eventually decided on 4 seconds, which was long enough to give decent readings. 

## Accomplishments that we're proud of
BPM accomplishments:
-syncing a buzzer beep with the heartbeat
-being able to find a BPM without a pulse rate sensor

## What we learned
-Proper equipment or potentially more useful sensors can make things a lot easier

## What's next for Emotional-Cardiography (ECG)
-Perhaps switching to a pulse rate sensor, and tuning a bit to better approximate the average BPM at the same rate or faster.
