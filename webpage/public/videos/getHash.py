import cv2
import math
import datetime
import hashlib
import numpy
import time
import sys

def getHash(infile):
	vidPath = './'+infile
	cap = cv2.VideoCapture(vidPath)
	time_tuple = tuple(map(int,infile.split('.')[0].split('-')))
	nu_time = datetime.datetime(*time_tuple)+datetime.timedelta(hours=+9) #in server

	ret, frame = cap.read()
	try:
		buf = numpy.bitwise_xor(buf,frame)
	except Exception as ex:
		buf = frame

	frame_number = cap.get(cv2.CAP_PROP_POS_FRAMES) - 1
	data = numpy.array(buf).tobytes()
	time_data =  numpy.array(nu_time.strftime('%Y-%m-%d %H:%M:%S')).tobytes()
	print(hashlib.sha256(data+time_data).hexdigest()) #.digest()

if __name__=="__main__":
    getHash(sys.argv[1])
