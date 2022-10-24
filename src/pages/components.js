import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import HomepageHeader from '@site/src/components/HomePageHeader';
import components  from "../data/components.json";

function Component (props){
    return (
        <div className="col col--3">
            <div className="card margin-bottom--lg">
                <div className="card__header">
                    <div className="avatar">
                        <img src={props.logo} alt={props.name} className={`avatar__photo ${styles.technologyLogo}`} />
                        <div className="avatar__intro">
                            <a href={props.url}>{props.name}</a>
                        </div>
                        <a href={props.source} className={styles.githubButton}> 
                            <img alt="GitHub logo" height="30" src="/img/github.svg" title="GitHub" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function downloads() {
    return (
        <Layout title="components" description="Openflexo technical infrastructure.">
            <HomepageHeader title="Openflexo technical infrastructure" />
            <div className="container">
                <div className='container'>   

                    <div className={styles.modulesWrapper}>
                        <h1>Generic components:</h1>                 
                        <div className="row">
                            { components.generic.map((props, idx) => (
                                <Component key={idx} {...props} />
                            ))}
                        </div>
                    </div>

                    <div className={styles.modulesWrapper}>
                        <h1>Openflexo Core Components:</h1>                 
                        <div className="row">
                            { components.core.map((props, idx) => (
                                <Component key={idx} {...props} />
                            ))}
                        </div>
                    </div>

                    <div className={styles.modulesWrapper}>
                        <h1>Openflexo Technology Adapters:</h1>                 
                        <div className="row">
                            { components.ta.map((props, idx) => (
                                <Component key={idx} {...props} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}