import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


const FeatureList = [
  {
    title: 'What?',
    Svg: require('@site/static/img/software.svg').default,
    description: (
      <>
        Openflexo is not not a tool nor a software, but a collection of innovative technical software components, exploring new paradigms.
      </>
    ),
  },
  {
    title: 'Why?',
    Svg: require('@site/static/img/creation.svg').default,
    description: (
      <>
        Because tomorrow's software solutions require to manage sources of information, to retrieve it, represent it and connect it.
      </>
    ),
  },
  {
    title: 'How?',
    Svg: require('@site/static/img/colab.svg').default,
    description: (
      <>
        Openflexo's core team is animating an enthusiastic and creative contributor's community sharing those concerns.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
