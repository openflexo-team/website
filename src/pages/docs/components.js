import React from 'react';
import Layout from '@theme/Layout';
import styles from '../index.module.css';
import HomepageHeader from '@site/src/components/HomePageHeader';
import components from "../../data/components.json";
import technologyAdapters from "../../data/technology-adapters.json";

// The only technology adapters that ever had a mini-site actually built (see the 2026-09 site
// audit): every other adapter below links to its GitHub repository instead of a fabricated
// mini-site URL.
const MINISITE_IDS = new Set(['diagram', 'emf', 'owl', 'http', 'jdbc', 'pdf', 'kafka']);

const STATUS_LABELS = {
    'stabilised': 'Stabilised',
    'migration-in-progress': 'Migration in progress',
    'active-development': 'Active development',
    'limited-support': 'Limited support',
    'retired': 'Retired',
    'unclassified': 'Not yet classified',
};

const STATUS_ORDER = ['stabilised', 'migration-in-progress', 'active-development', 'limited-support', 'retired', 'unclassified'];

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

function TaGroup({status}) {
    const adapters = technologyAdapters.adapters.filter(a => a.status === status);
    if (adapters.length === 0) {
        return null;
    }
    return (
        <div className={styles.modulesWrapper}>
            <h2>{STATUS_LABELS[status]}</h2>
            <div className="row">
                {adapters.map((a) => (
                    <Component
                        key={a.id}
                        name={a.name}
                        logo={a.logo || '/img/logo.png'}
                        source={a.repository}
                        url={MINISITE_IDS.has(a.id) ? `https://openflexo.org/openflexo-${a.id}/` : a.repository}
                    />
                ))}
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
                        <div className="alert alert--warning margin-bottom--md">
                            A few adapters below (Diagram, EMF, OWL, HTTP, JDBC, PDF, Kafka) link to a
                            per-component mini-site — content from 2023–2024, describing an older version
                            of Openflexo, not being rebuilt yet. Every other card links straight to the
                            adapter's source repository instead. Status reflects the architecture board's
                            review of 2026-04-03.
                        </div>
                        { STATUS_ORDER.map((status) => (
                            <TaGroup key={status} status={status} />
                        ))}
                    </div>

                </div>
            </div>
        </Layout>
    )
}
