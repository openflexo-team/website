import React from 'react';
import Slider from "react-slick";

import styles from './index.module.css';
import sliders from '../../data/sliders.json';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Banner( props) {

  return (
    <div className={styles.containerStyle}>
      <img className={styles.imgStyle} src={ props.img }/>
      {/* <div className={styles.textWrapperStyle} >
        <h1 className={styles.h1Style}>{ props.title  }</h1>
        <h3 className={styles.h3Style}>{ props.header }</h3> 
      </div> */}
    </div>
  );
}

export default function SimpleSlider() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 0,
    };

    return (
      <Slider {...settings} className={styles.sliderStyle}>
        {sliders.map((props, idx) => (
          <Banner img={props.img} title={props.title} header={props.header} />
        ))}
        
      </Slider>
    );
  }