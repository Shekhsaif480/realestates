import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { txtDB } from '../../firebase';
import PropertyCard from './PropertyCard';

const PropertiesDisplayPage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(txtDB, 'properties'));
      const propertyData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(propertyData);
    };

    fetchProperties();
  }, []);

  return (
    <div className="properties-display-page">
      <h1>Properties</h1>
      <div className="property-cards">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesDisplayPage;
