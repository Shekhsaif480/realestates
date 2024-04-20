import React, { useState } from 'react';
import { db } from '../../firebase';
import { Button } from '@mui/material';
import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
const BasicDetails = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [no_of_bedrooms, setBedrooms] = useState("");
    const [no_of_washrooms, setWashrooms] = useState("");
    const [area_in_square_fts, setArea] = useState("");

    const handleSubmit = () => {
        const propertyId = uuidv4(); // Generate unique ID
        
        set(ref(db, 'PropertyInfo/' + propertyId), { // Include ID in the reference
            id: propertyId, // Store ID in the database
            name: name,
            address: address,
            price: price,
            amenities: amenities,
            no_of_bedrooms: no_of_bedrooms,
            no_of_washrooms: no_of_washrooms,
            area_in_square_fts: area_in_square_fts,
        }).then(() => {
            console.log('Property information added to the database successfully');
            setName('');
            setAddress('');
            setPrice('');
            setAmenities([]);
            setBedrooms('');
            setWashrooms('');
            setArea('');
        }).catch((error) => {
            console.error('Error adding property information:', error);
        });
    };

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

    return (
        <div className="max-w-full mx-auto p-6 bg-white rounded-md shadow-md overflow-y-auto max-h-96">
            <h2 className="text-2xl font-semibold mb-4">Add Information About Your Property</h2>
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
            <Button onClick={handleSubmit} variant="contained" color="primary">
                Submit
            </Button>
            
        </div>
    );
};

export default BasicDetails;
