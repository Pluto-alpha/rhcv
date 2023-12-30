import React, { useRef } from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import CameraCapture from '../services/CameraCapture';

const CamModel = ({ modal, toggle, visitId }) => {

    const handleCaptureSuccess = () => {
        toggle(visitId);
    };

    return (
        <Modal open={modal} onClose={() => toggle(visitId)} center>
            {modal && <CameraCapture visitorId={visitId} onCaptureSuccess={handleCaptureSuccess} />}
        </Modal>
    )
}

export default CamModel