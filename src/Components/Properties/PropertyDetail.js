import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { txtDB } from '../../firebase';

const PropertyDetail = () => {
  const [property, setProperty] = useState(null);
  const id = '04bJQLDEa9QYDJCFlJhI'; // Placeholder ID, replace with actual ID or use useParams()

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(txtDB, 'txtData', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Destructure the property data after it's set
  const { name, address, price, imgUrl, area_in_square_fts, no_of_bedrooms, no_of_washrooms, amenities } = property;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={imgUrl} alt={name} className="w-full h-64 object-cover object-center rounded-t-lg" />
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-4">{name}</h2>
          <p className="text-gray-600 mb-2">{address}</p>
          <p className="text-blue-900 font-bold mb-2">₹{price}</p>
          <p className="text-gray-700 mb-2">Area: {area_in_square_fts} sq.ft</p>
          <p className="text-gray-700 mb-2">Bedrooms: {no_of_bedrooms}</p>
          <p className="text-gray-700 mb-4">Washrooms: {no_of_washrooms}</p>
          <p className="text-gray-700 mb-4">Contact: +91 8422033730 </p>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Amenities:</h3>
            <ul className="list-disc list-inside">
              {amenities.map((amenity, index) => (
                <li key={index} className="text-gray-700">{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
