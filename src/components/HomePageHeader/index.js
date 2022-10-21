import React from 'react';
import Slider from "react-slick";

import styles from './index.module.css';

export default function HomepageHeader(props) {
    return (
      <header className={styles.heroBanner}>
        <div className="container">
          <h1 className="hero__title">{props.title}</h1>
          <hr className={styles.heroBannerHr} />
          <p className={styles.heroContent}>
            {props.content}
          </p>
          <br/>
          <p className={styles.heroContent}>
            {props.subcontent}
          </p>
        </div>

        { props.children }
      </header>
    );
  }