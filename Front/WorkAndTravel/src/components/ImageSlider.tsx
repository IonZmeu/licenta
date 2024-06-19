import React from 'react';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ImageSliderProps {
  imageUrls: string[];
  onImageClick: () => void;
}

const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <KeyboardArrowRightOutlinedIcon
      className={className}
      onClick={onClick}
      sx={{
        color: 'white',
        zIndex: 1,
        width: 25,
        height: 25,
        right: 10,
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: '50%', 
        padding: '5px', 
        '&:hover': {
          backgroundColor: 'black', 
          color: 'white'
        },
      }}
    />
  );
};

const PrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <KeyboardArrowLeftOutlinedIcon
      className={className}
      onClick={onClick}
      sx={{
        color: 'white',
        zIndex: 1,
        width: 25,
        height: 25,
        left: 10,
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: '50%', 
        padding: '5px', 
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: 'black',
          color: 'white'
        },
      }}
    />
  );
};

const ImageSlider: React.FC<ImageSliderProps> = ({ imageUrls, onImageClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    scroll: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
    draggable: false
  };

  return (
    <Slider {...settings}>
      {imageUrls.map((imageUrl, index) => (
        <div key={index} onClick={onImageClick} style={{ cursor: 'pointer' }}>
          <img
            src={imageUrl}
            className="d-block w-100"
            alt={`Image ${index}`}
            style={{ objectFit: 'contain', width: '100%' }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;