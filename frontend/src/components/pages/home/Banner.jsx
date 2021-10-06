import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  Col,
  Row,
} from "reactstrap";
import { BANNERS } from "../../../constant";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === BANNERS.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? BANNERS.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = BANNERS.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        className="w-100"
      >
        <Link to="/login">
          <img
            className="img-fluid w-100"
            style={{ minHeight: "auto", maxHeight: 500, objectFit: "cover" }}
            src={item.src}
            alt={item.altText}
          />
        </Link>
      </CarouselItem>
    );
  });

  return (
    <Row className="justify-content-center">
      <Col xs={10}>
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={BANNERS}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
            className="carousel-prev-icon"
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
            className="carousel-next-icon"
          />
        </Carousel>
      </Col>
    </Row>
  );
};

export default Banner;
