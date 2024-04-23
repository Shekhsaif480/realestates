import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property,docId }) => {
  const { name, address, price, imgUrl } = property;

  return (
    <Link className="property-card bg-white shadow-lg rounded-lg overflow-hidden" to={`/property/${docId}`}>
      <img src={imgUrl} alt={name} className="w-full h-56 object-cover object-center" />
      <div className="property-details p-4">
        <h2 className="property-name text-xl font-bold mb-2">{name}</h2>
        <p className="property-address text-gray-600 mb-2">{address}</p>
        <p className="property-price text-blue-500 font-bold text-lg">₹{price}</p>
        {/* Add more details here if needed */}
      </div>
    </Link>
  );
};

export default PropertyCard;
