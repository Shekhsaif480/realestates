import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { txtDB } from '../../firebase';
import PropertyCard from './PropertyCard';
import { motion } from "framer-motion";


const PropertiesDisplayPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
    let filtered = properties;

    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(property =>
        selectedAmenities.some(amenity => property.amenities.includes(amenity))
      );
    }

    if (minPrice !== '' && maxPrice !== '') {
      filtered = filtered.filter(property =>
        property.price >= minPrice && property.price <= maxPrice
      );
    }

    if (searchQuery !== '') {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(property =>
        property.name && property.name.toLowerCase().includes(lowercaseQuery)
      );
    }

    setFilteredProperties(filtered);
  };

  const handleSearch = () => {
    filterProperties();
  };

  const allAmenities = properties.reduce((acc, property) => {
    property.amenities.forEach(amenity => {
      if (!acc.includes(amenity)) {
        acc.push(amenity);
      }
    });
    return acc;
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const [showFilters, setShowFilters] = useState(false);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="properties-display-page bg-gray-100 p-8 rounded-lg shadow-md">
      <motion.h1
        initial={{ y: "2rem", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, type: "ease-in" }}
        className="font-bold text-2xl text-orange-500 md:text-5xl mb-4"
      >
        Properties
      </motion.h1>
    
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:border-blue-500 flex-grow"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">
          Search
        </button>
        <button onClick={handleToggleFilters} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition duration-300">
          {showFilters ? "Hide Filters" : "Apply Filters"}
        </button>
      </div>

      {showFilters && (
        <>
          <div className="mb-4">
            <label className="mr-2 font-medium">Filter by Amenity:</label>
            <div className="flex flex-wrap">
              {allAmenities.map(amenity => (
                <div key={amenity} className="flex items-center mr-4 mb-2">
                  <input
                    type="checkbox"
                    id={amenity}
                    value={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onChange={handleAmenityChange}
                    className="mr-1"
                  />
                  <label htmlFor={amenity}>{amenity}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex mb-4">
            <label className="mr-2 font-medium">Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:border-blue-500"
            />
            <label className="mr-2 font-medium">Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>

  );
};

export default PropertiesDisplayPage;
