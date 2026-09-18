import React from 'react';
import Slider from "react-slick";

import styles from './index.module.css';
import sliders from '../../data/sliders.json';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Banner(props) {
  return (
    <div className={styles.slide}>
      <div className={styles.text}>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.header}>{props.header}</p>
      </div>
      <img className={styles.illustration} src={props.img} alt="" />
    </div>
  );
}

export default function SimpleSlider() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 7000,
    };

    return (
      <Slider {...settings} className={styles.sliderStyle}>
        {sliders.map((props, idx) => (
          <Banner key={idx} img={props.img} title={props.title} header={props.header} />
        ))}
      </Slider>
    );
  }
