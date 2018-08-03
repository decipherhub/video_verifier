import cv2
import math
import datetime
import hashlib
import numpy
import time
import sys

def videoSplitter(infile):
    #infile='2018-06-02-13-45-38.avi'
    cap = cv2.VideoCapture('./'+infile)
    fps = 25

    #if __name__ == '__main__':
    #vidPath = '/path/foo/video.mp4'
    vidPath = './'+infile
    shotsPath = './splitz/%s.avi' # output path (must be avi, otherwize choose other codecs)
    #segRange = [(0,40),(50,100),(200,400)] # a list of starting/ending frame indices pairs
    seg = (0,10*fps)
    fps_ratio = (10*fps,10*fps)

    cap = cv2.VideoCapture(vidPath)
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    size = (int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)))
    fourcc = int(cv2.VideoWriter_fourcc('X','V','I','D')) # XVID codecs
    time_tuple = tuple(map(int,infile.split('.')[0].split('-')))
    nu_time = datetime.datetime(*time_tuple)+datetime.timedelta(hours=+9) #in server

    full_length =int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(full_length)
    segRange = [seg]
    for idx,(begFidx,endFidx) in enumerate(segRange):
        print(begFidx,endFidx)
    #while(cap.isOpened()):
        writer = cv2.VideoWriter(shotsPath%str(nu_time.strftime('%Y-%m-%d-%H-%M-%S')),fourcc,fps,size)
        if begFidx<full_length:
            if endFidx>full_length:
                endFidx=full_length
                
            cap.set(cv2.CAP_PROP_POS_FRAMES,begFidx)
            ret = True # has frame returned
            
            while(cap.isOpened() and ret and writer.isOpened()):
                ret, frame = cap.read()
                try:
                    buf = numpy.bitwise_xor(buf,frame)
                except Exception as ex:
                    buf = frame

                frame_number = cap.get(cv2.CAP_PROP_POS_FRAMES) - 1
                #print(frame_number)
                if frame_number < endFidx:
                    writer.write(frame)
                else:
                    sendJson={}
                    data = numpy.array(buf).tobytes()
                    time_data =  numpy.array(nu_time.strftime('%Y-%m-%d %H:%M:%S')).tobytes()
                    #sendJson['frame'] = nframe
                    sendJson['timeStamp'] = nu_time.strftime('%Y-%m-%d %H:%M:%S')
                    sendJson['hash'] = hashlib.sha256(data+time_data).hexdigest()#.digest()
                    print(sendJson)
                    break
                
                
        else:
            break
        
        
                
        writer.release()
        time.sleep(10)
        nu_time = nu_time+datetime.timedelta(seconds=+10)
        a=(begFidx,endFidx)
        segRange.append(tuple([sum(x) for x in zip(a,fps_ratio)]))

    return 0

if __name__=="__main__":
    videoSplitter(sys.argv[1])