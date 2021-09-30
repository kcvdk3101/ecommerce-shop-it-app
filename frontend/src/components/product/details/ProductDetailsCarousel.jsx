import React, { useState } from "react";
import {
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
} from "reactstrap";

const ProductDetailsCarousel = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const next = () => {
    const nextIndex =
      activeIndex === product.images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    const nextIndex =
      activeIndex === 0 ? product.images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    setActiveIndex(newIndex);
  };

  const slides =
    product.images &&
    product.images.map((image) => {
      return (
        <CarouselItem key={image._id}>
          <img
            class="mx-auto d-block rounded"
            src={image.url}
            alt={product.name}
          />
        </CarouselItem>
      );
    });
  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={product.images}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default ProductDetailsCarousel;
