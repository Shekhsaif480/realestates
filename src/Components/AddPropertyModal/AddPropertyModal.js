import React, { useState , useEffect } from 'react';
import { Modal, Container, Button } from '@mui/material';
import { imgDB,txtDB } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

import {v4} from 'uuid';


const AddPropertyModal = ({ modalOpened, setModalOpened }) => {

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
      setImg(null);
      setName(null);
      setAddress(null);
      setPrice(null);
      setAmenities(null);
      setBedrooms(null);
      setWashrooms(null);
      setArea(null);
    setModalOpened(false);
  const valRef = collection(txtDB,'txtData')
  await addDoc(valRef,{id: propertyId,
    imgUrl:img,
    name: name,
    address: address,
    price: price,
    amenities: amenities,
    no_of_bedrooms: no_of_bedrooms,
    no_of_washrooms: no_of_washrooms,
    area_in_square_fts: area_in_square_fts,}).catch((error) => {
      alert("Error uploading data")
  });
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



const handleReset = () => {
  setImg(null);
  setName('');
  setAddress('');
  setPrice('');
  setAmenities([]);
  setBedrooms('');
  setWashrooms('');
  setArea('');
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
        
            <div className="max-w-full mx-auto p-6 bg-white rounded-md shadow-md overflow-y-auto max-h-[600px]">
            <label className="text-2xl font-semibold mb-8 block mx-auto text-center">Property Details</label>
            <div className='bg-white grid'>
            <label className="block mb-2 font-medium">Name:</label>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="block mb-2 font-medium">Address:</label>
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="block mb-2 font-medium">Price:</label>
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="block mb-2 font-medium">Amenities:</label>
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
            <label className="block mb-2 font-medium">Number of Bedrooms:</label>
            <input
                type="number"
                placeholder="Enter the number of bedrooms"
                value={no_of_bedrooms}
                onChange={(event) => setBedrooms(event.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="block mb-2 font-medium">Number of Washrooms:</label>
            <input
                type="number"
                placeholder="Enter the number of washrooms"
                value={no_of_washrooms}
                onChange={(event) => setWashrooms(event.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="block mb-2 font-medium">Area in Square Feet:</label>
            <input
                type="number"
                placeholder="Enter area of your property"
                value={area_in_square_fts}
                onChange={(event) => setArea(event.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="block mb-2 font-medium">Images:</label>
              <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " id="multiple_files" type="file" onChange={(e) =>handleUpload(e)}/>
              <Button onClick={handleClick}>Upload</Button>
              <Button onClick={handleReset}>Reset</Button>

            </div>
            
              {/* {
                data.map(value=><div>
                    <h1>{value.txtVal}</h1>
                    <img src={value.imgUrl} height='200px' width='200px' /> 
                </div>)
             } */}
          </div>
         
        
      </Container>
    </Modal >
  );
};

export default AddPropertyModal;

