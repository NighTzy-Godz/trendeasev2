import React from "react";
import Slider from "react-slick";

interface ImageCarouselProps {
  mainImg: string;
  images: string[];
  onImgClick(imgLink: string): void;
}

function ImageCarousel({ mainImg, images, onImgClick }: ImageCarouselProps) {
  var settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: false,
    arrows: images?.length > 4,
    infinite: false,
  };

  const renderImages = images?.map((img, index) => {
    return (
      <div
        className={`img_slides ${mainImg === img ? "currImg" : ""}`}
        key={index}
        onClick={() => onImgClick(img)}
      >
        <img src={img} key={index} loading="lazy" />
      </div>
    );
  });
  return (
    <React.Fragment>
      <div className="product_main_img">
        <img src={mainImg} alt="" loading="lazy" />
      </div>{" "}
      {images?.length > 1 && <Slider {...settings}>{renderImages}</Slider>}
    </React.Fragment>
  );
}

export default ImageCarousel;
