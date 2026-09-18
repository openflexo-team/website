import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Contributors from '@site/src/components/Contributors';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageHeader from '@site/src/components/HomePageHeader';
import styles from './index.module.css';
import ContributorList from '../data/contributors.json';

function SecondaryContributors(props) {
  let list = ""

  ContributorList.secondary.map((val, index) => {
    list += val.name + ', '
  });

  return list.slice(0, -2)
}

export default function contributor() {
    const {siteConfig}          = useDocusaurusContext()
    let secondary_contributors  = SecondaryContributors() + " and many other people..." 

    return (
        <Layout
          title={`${siteConfig.title}`}
          description="Openflexo is a model-federation infrastructure software.">
          <main>
            <HomepageHeader title="OPENFLEXO CORE TEAM" content="Our experts and main contributors to the project..." />
            <Contributors />
            <HomepageHeader title="They also contributed to the project..." content={ secondary_contributors }/>
          </main>
        </Layout>
        )
}
