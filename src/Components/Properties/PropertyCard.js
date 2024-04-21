import React from 'react';

const PropertyCard = ({ property }) => {
  const { name, address, price, imageUrl } = property;

  return (
    <div className="property-card">
      <img src={imageUrl} alt={name} className="property-image" />
      <div className="property-details">
        <h2 className="property-name">{name}</h2>
        <p className="property-address">{address}</p>
        <p className="property-price">${price}</p>
        {/* Add more details here if needed */}
      </div>
    </div>
  );
};

export default PropertyCard;
