import React, { useState } from 'react';
import { Modal, Container, Typography, Button } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { storage } from "../../firebase"

import { getDatabase, ref, push } from 'firebase/database'; // Import Realtime Database functions
import { v4 as uuidv4 } from 'uuid';

import { uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const AddPropertyModal = ({ modalOpened, setModalOpened }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [img, setImage] = useState(null);
  const [propertyId, setPropertyId] = useState(null); // State to store property ID
  const [imgUrl, setImgUrl] = useState(null);

  const handleUpload = () => {
    if (img !== null) {
      const newPropertyId = uuidv4(); // Generate unique ID for the property
      const imgRef = ref(storage, `propertyimgs/${newPropertyId}/${img.name}`); // Include property ID in the storage reference path
      uploadBytes(imgRef, img)
        .then((snapshot) => {
          console.log(snapshot);
          getDownloadURL(imgRef)
            .then((url) => {
              setImgUrl(url); // Set the image URL state
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
            });
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };

  const handleDelete = () => {
    if (imgUrl !== null) {
      // Parse the path from the URL
      const path = imgUrl.split('?')[0]; // Remove query parameters if any
      // Get a reference to the file using the parsed path
      const imgRef = ref(storage, path);
      deleteObject(imgRef)
        .then(() => {
          console.log('File deleted successfully');
          setImgUrl(null);
        })
        .catch((error) => {
          console.error('Error deleting file:', error);
        });
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinish = () => {
    // Reset all states to initial values
    setActiveStep(0);
    setImage(null);
    setImgUrl(null);
    setPropertyId(null); // Clear propertyId
    setModalOpened(false);
  };

  return (
    <Modal
      open={modalOpened}
      onClose={() => setModalOpened(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeOnClickOutside
    >
      <Container sx={{ height: 'auto', width: '80%', margin: '10vh auto', backgroundColor: 'white', padding: '20px' }}>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>Image Upload</StepLabel>
          </Step>
          <Step>
            <StepLabel>Basic Details</StepLabel>
          </Step>
        </Stepper>
        {activeStep === 0 ? (
          <div className='mt-20 '>
            {/* <BasicDetails /> */}
            <div className='bg-white grid'>
              <label className="block mb-2 text-sm font-large text-gray-900 " htmlFor="multiple_files">Upload Property Image </label>
              <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " id="multiple_files" type="file" onChange={(e) => setImage(e.target.files[0])} />
              <Button onClick={handleDelete} disabled={!imgUrl}>Delete</Button>
              <Button onClick={handleUpload} disabled={imgUrl !== null}>Upload</Button>
            </div>
            <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        ) : activeStep === 2 ? (
          <React.Fragment>
            <Typography>All steps completed</Typography>
            <Button onClick={handleFinish}>Finish</Button>
            <Button onClick={handleReset}>Reset</Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
          </React.Fragment>
        )}
      </Container>
    </Modal >
  );
};

export default AddPropertyModal;

