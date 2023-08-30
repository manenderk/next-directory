"use client";
import { HomeSliderWithImage } from "@/app/models/HomeSliderWithImage";
import { SITE_NAME } from "@/libs/global";
import Image from "next/image";
import Slider from "react-slick";

const HomeSlider = ({ slides }: { slides: HomeSliderWithImage[] }) => {

  const settings = {
    centerMode: true,
    centerPadding: '10%',
    slidesToShow: 1,
    autoplay: true,
    arrows: false,
  };


  return (
    <Slider className="home-slider"
    {
      ...settings
    }
    >
      {slides.map((slider) => (
        <div key={slider.id} className="slide-item">
          <Image
            src={slider.image.url}
            alt={slider.title || SITE_NAME}
            width={1920}
            height={960}
            className="img-fluid rounded"
          />
        </div>
      ))}
    </Slider>
  );
};

export default HomeSlider;
