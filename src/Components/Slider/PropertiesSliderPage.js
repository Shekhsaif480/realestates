import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { txtDB } from '../../firebase';
import PropertyCard from '../Properties/PropertyCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PropertiesSliderPage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(txtDB, 'txtData'));
        const propertyData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(propertyData);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="prev-arrow" onClick={onClick}>
        <FaChevronLeft />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="next-arrow" onClick={onClick}>
        <FaChevronRight />
      </div>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
<div className="properties-slider-page bg-gray-100 p-8 rounded-lg shadow-md mt-8">
  <h1 className="text-3xl text-orange-500 font-bold mb-6">Most Popular</h1>
  
  <Slider {...sliderSettings} className="slider">
    {properties.map((property, index) => (
      <div key={property.id} className={`property-card-container ${index !== properties.length - 1 ? 'mr-4' : ''} properties-slider-page bg-gray-100 p-8 rounded-lg shadow-md`}>
        <PropertyCard property={property} />
      </div>
    ))}
  </Slider>
</div>


  );
};

export default PropertiesSliderPage;
