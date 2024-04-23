import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { txtDB } from '../../firebase';
import PropertyCard from './PropertyCard';

const PropertiesDisplayPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(txtDB, 'txtData'));
        const propertyData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(propertyData);
        setFilteredProperties(propertyData);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleAmenityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedAmenities([...selectedAmenities, value]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(amenity => amenity !== value));
    }
  };

  const filterProperties = () => {
    const filtered = properties.filter(property =>
      selectedAmenities.some(amenity => property.amenities.includes(amenity))
    );
    setFilteredProperties(filtered);
  };

  useEffect(() => {
    filterProperties();
  }, [selectedAmenities]);

  const allAmenities = properties.reduce((acc, property) => {
    property.amenities.forEach(amenity => {
      if (!acc.includes(amenity)) {
        acc.push(amenity);
      }
    });
    return acc;
  }, []);

  return (
    <div className="properties-display-page bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Properties</h1>
      
      <div className="flex flex-wrap mb-4">
        <label className="mr-2">Filter by Amenity:</label>
        {allAmenities.map(amenity => (
          <div key={amenity} className="flex items-center mr-4 mb-2">
            <input
              type="checkbox"
              id={amenity}
              value={amenity}
              checked={selectedAmenities.includes(amenity)}
              onChange={handleAmenityChange}
            />
            <label htmlFor={amenity} className="ml-2">{amenity}</label>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesDisplayPage;
