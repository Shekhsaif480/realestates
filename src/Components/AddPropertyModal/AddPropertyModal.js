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

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [no_of_bedrooms, setBedrooms] = useState("");
  const [no_of_washrooms, setWashrooms] = useState("");
  const [area_in_square_fts, setArea] = useState("");


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
  await addDoc(valRef,{id: propertyId,
    imgUrl:img,
    name: name,
    address: address,
    price: price,
    amenities: amenities,
    no_of_bedrooms: no_of_bedrooms,
    no_of_washrooms: no_of_washrooms,
    area_in_square_fts: area_in_square_fts,})
  alert("Data added successfully")
}
const handleCheckboxChange = (event) => {
  const { value, checked } = event.target;
  if (checked) {
      // If checkbox is checked, add the amenity to the array
      setAmenities((prevAmenities) => [...prevAmenities, value]);
  } else {
      // If checkbox is unchecked, remove the amenity from the array
      setAmenities((prevAmenities) => prevAmenities.filter((amenity) => amenity !== value));
  }
};
 
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
            <h2 className="text-2xl font-semibold mb-4">Add Information About Your Property</h2>
            <div className='bg-white grid'>
            <label className="block mb-2">Name:</label>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="block mb-2">Address:</label>
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="block mb-2">Price:</label>
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="block mb-2">Amenities:</label>
            <div className="mb-4 space-y-2">
                <div>
                    <input
                        type="checkbox"
                        id="swimmingPool"
                        value="Swimming Pool"
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="swimmingPool">Swimming Pool</label>
                </div>
                <div>
                    <input type="checkbox" id="gym" value="Gym" onChange={handleCheckboxChange} />
                    <label htmlFor="gym">Gym</label>
                </div>
                <div>
                    <input type="checkbox" id="garden" value="Garden" onChange={handleCheckboxChange} />
                    <label htmlFor="garden">Garden</label>
                </div>
                <div>
                    <input type="checkbox" id="parking" value="Parking" onChange={handleCheckboxChange} />
                    <label htmlFor="parking">Parking</label>
                </div>
            </div>
            <label className="block mb-2">Number of Bedrooms:</label>
            <input
                type="number"
                placeholder="Enter the number of bedrooms"
                value={no_of_bedrooms}
                onChange={(event) => setBedrooms(event.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="block mb-2">Number of Washrooms:</label>
            <input
                type="number"
                placeholder="Enter the number of washrooms"
                value={no_of_washrooms}
                onChange={(event) => setWashrooms(event.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="block mb-2">Area in Square Feet:</label>
            <input
                type="number"
                placeholder="Enter area of your property"
                value={area_in_square_fts}
                onChange={(event) => setArea(event.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
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

