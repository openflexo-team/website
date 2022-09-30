import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Contributors from '@site/src/components/Contributors';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageHeader from '@site/src/components/HomePageHeader';
import Partners from '@site/src/components/Partners';
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
            
            <HomepageHeader title="PARTNERS" content="They support us ..."  >
              <Partners />
            </ HomepageHeader>
            
            <div className='container'>
              <div className={styles.GoldenSponsor}>
                <img src='/img/partners/yklogo.png' alt='yklogo'/>
                <p>
                YourKit is kindly supporting open source projects with its full-featured Java Profiler. YourKit, LLC is the creator of innovative and intelligent tools for profiling Java and .NET applications. Take a look at YourKit's leading software products: <a href="http://www.yourkit.com/java/profiler/index.jsp">YourKit Java Profiler</a> and <a href="http://www.yourkit.com/.net/profiler/index.jsp">YourKit .NET Profiler</a>.
                </p>
              </div>
            </div>
          </main>
        </Layout>
        )
}
