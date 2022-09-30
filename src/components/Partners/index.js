import React from 'react';
import Slider from "react-slick";

import styles from './index.module.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import partnersList from '../../data/partners.json'

function PartnerLogo (props){
  return (
    <div className={styles.logoWrapper}>
      <img className={styles.logo} src={props.image}  alt={props.name} />
    </div>
  )
}

export default function Partners() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 2000,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 1000,
    };

    return (
      <div className='container '>
          <Slider {...settings} >
            {partnersList.map((props, idx) => (
                  <PartnerLogo key={idx} {...props} />
                ))}
          </Slider>
      </div>
     
    );
  }