import React from 'react';
import Layout from '@theme/Layout';
import HomepageHeader from '@site/src/components/HomePageHeader';
import Partners from '@site/src/components/Partners';
import styles from './index.module.css';

export default function partners() {
    return (
        <Layout
          title="Partners"
          description="The institutions and companies that support Openflexo.">
          <main>
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
