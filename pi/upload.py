import requests
import sys

destination = str(sys.argv[1])
url = ''.join(['http://', destination, ':3000/yum'])
print(url)

from picamera import PiCamera
from time import sleep
from gpiozero import Button

button = Button(17)
camera = PiCamera()

while True:
        camera.start_preview()
        button.wait_for_press()
        camera.capture('/home/pi/Desktop/image.jpg')
        camera.stop_preview()
        files = {'food': open('/home/pi/Desktop/image.jpg')}
        response = requests.post(url, files=files)
        print(response)
        sleep(1)
