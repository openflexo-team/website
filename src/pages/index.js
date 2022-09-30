import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import SimpleSlider from '@site/src/components/Slider';
import HomepageHeader from '@site/src/components/HomePageHeader';

import styles from './index.module.css';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Openflexo is a model-federation infrastructure software.">
      <SimpleSlider />
      
      <main>
        <HomepageHeader title="WELCOME TO OPENFLEXO" content="You're at the right place to discover Openflexo technical infrastructure and research project. You will find here support, documentation and resources." />
        <HomepageFeatures />
        <HomepageHeader title="On model federation..." content="Model federation is one of those new paradigms: instead of managing complex transformation chains, we connect directely
											to data in its original ecosystem. Openflexo's infrastructure provide components to retrieve, connect and represent
											multiple sources of information. We also develop an innovative methodology to assemble those components in a complete
											application that suit a particular need for specific business concerns." subcontent="From a technical point of view, Openflexo's software architecture is a large and complex components library. But
                      it's also a multidisciplinary project where many skills are welcome. Feel free to contact us to get involved in
                      this innovative and ambitious project." />
      </main>
    </Layout>
  );
}
