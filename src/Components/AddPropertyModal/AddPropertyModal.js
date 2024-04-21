import React, { useState , useEffect } from 'react';
import { Modal, Container, Typography, Button } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { imgDB,txtDB } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

import {v4} from 'uuid';






const AddPropertyModal = ({ modalOpened, setModalOpened }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [txt , setTxt] = useState('');
  const [img , setImg] = useState('');
  const [data,setData] = useState([]);


  const handleUpload = (e) =>{
    console.log(e.target.files[0])
    const imgs = ref(imgDB,`Imgs/${v4()}`)
    uploadBytes(imgs,e.target.files[0]).then(data=>{
        console.log(data,"imgs")
        getDownloadURL(data.ref).then(val=>{
            setImg(val)
        })
    })
} 
const handleClick = async () =>{
  const propertyId = v4();
  const valRef = collection(txtDB,'txtData')
  await addDoc(valRef,{id: propertyId,name:txt,imgUrl:img})
  alert("Data added successfully")
}
 
const getData = async () =>{
  const valRef = collection(txtDB,'txtData')
  const dataDb = await getDocs(valRef)
  const allData = dataDb.docs.map(val=>({...val.data(),id:val.id}))
  setData(allData)
  console.log(dataDb)
}

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
    setImg(null);
    setModalOpened(false);
  };

  useEffect(()=>{
    getData()
})
console.log(data,"datadata")

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
              <input onChange={(e)=>setTxt(e.target.value)}/>
              <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " id="multiple_files" type="file" onChange={(e) =>handleUpload(e)}/>
              <Button onClick={handleClick}>submit details</Button>

            </div>
            <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
              {/* {
                data.map(value=><div>
                    <h1>{value.txtVal}</h1>
                    <img src={value.imgUrl} height='200px' width='200px' /> 
                </div>)
             } */}
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

