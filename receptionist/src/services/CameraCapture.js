import React, { useState, useCallback, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as VisitorApi from '../API/visitorRequest';
import { toast } from 'react-toastify';

const CameraCapture = ({ visitorId, onCaptureSuccess }) => {
    const [imgSrc, setImgSrc] = useState(null);
    const webcamRef = useRef(null);

    const handleCapture = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        // Assuming imgSrc is the base64-encoded image string
        const imageBlob = await fetch(imageSrc).then((res) => res.blob());
        // Convert Blob to File (necessary for FormData)
        const file = new File([imageBlob], 'captured_image.jpg', { type: 'image/jpeg' });
        console.log('file:', file)
        try {
            const formData = new FormData();
            formData.append('image', file);
            const res = await VisitorApi.UpdateImageVisitor(visitorId, formData);
            console.log(res);
            if (res.status === 200) {
                toast.success(res.data.msg);
                onCaptureSuccess();
                //window.location.reload();
            } else {
                toast.error('Internal Server Error');
            }
        } catch (err) {
            console.error('Error updating image:', err);
            if (err.response && err.response.data && err.response.data.msg) {
                toast.error(err.response.data.msg);
            } else {
                toast.error('Internal Server Error');
            }
        }
    }, [visitorId, onCaptureSuccess]);


    useEffect(() => {
        const openWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                webcamRef.current.video.srcObject = stream;
            } catch (err) {
                console.error('Error opening webcam:', err);
            }
        };
        const cleanupTracks = () => {
            const currentWebcamRef = webcamRef.current;
            if (currentWebcamRef && currentWebcamRef.video) {
                const tracks = currentWebcamRef.video.srcObject?.getTracks();
                if (tracks) {
                    tracks.forEach(track => {
                        try {
                            track.stop();
                        } catch (error) {
                            console.error('Error stopping track:', error);
                        }
                    });
                }
            }
        };
        openWebcam();
        return cleanupTracks;
    }, [webcamRef]);


    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
        //facingMode: { exact: "environment" } for use rear camera
    };

    return (
        <>
            {imgSrc === null ? (
                <>
                    <Webcam
                        audio={false}
                        height={400}
                        ref={webcamRef}
                        width={400}
                        screenshotFormat="image/jpeg"
                        screenshotQuality={0.8}
                        imageSmoothing={true}
                        mirrored={true}
                        videoConstraints={videoConstraints}
                    />
                    <button className='btn btn-danger cam-btn' onClick={handleCapture}>Capture photo</button>
                </>
            ) : (
                <>
                    <img src={imgSrc} alt="screenshot" />
                    <button className='btn btn-danger cam-btn' style={{ marginTop: '12' }} onClick={() => setImgSrc(null)}>Retake</button>
                </>
            )}
        </>
    );
};

export default CameraCapture;
