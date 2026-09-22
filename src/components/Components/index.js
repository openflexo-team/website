import React from 'react';
import styles from '@site/src/pages/index.module.css';
import components from '@site/src/data/components.json';
import technologyAdapters from '@site/src/data/technology-adapters.json';

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

function Card(props) {
    return (
        <div className="col col--3">
            <div className="card margin-bottom--lg">
                <div className="card__header">
                    <div className="avatar">
                        <img src={props.logo} alt={props.name} className={`avatar__photo ${styles.technologyLogo}`} />
                        <div className="avatar__intro">
                            <a href={props.url}>{props.name}</a>
                        </div>
                        {props.source && (
                            <a href={props.source} className={styles.githubButton}>
                                <img alt="GitHub logo" height="30" src="/img/github.svg" title="GitHub" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TaGroup({status}) {
    const adapters = technologyAdapters.adapters.filter((a) => a.status === status);
    if (adapters.length === 0) {
        return null;
    }
    return (
        <div className={styles.modulesWrapper}>
            <h3>{STATUS_LABELS[status]}</h3>
            <div className="row">
                {adapters.map((a) => (
                    <Card
                        key={a.id}
                        name={a.name}
                        logo={a.logo || '/img/logo.png'}
                        source={a.repository}
                        url={MINISITE_IDS.has(a.id) ? `https://openflexo.org/openflexo-${a.id}/` : a.repository}
                    />
                ))}
            </div>
        </div>
    );
}

export function GenericComponents() {
    return (
        <div className={styles.modulesWrapper}>
            <div className="row">
                {components.generic.map((props, idx) => (
                    <Card key={idx} {...props} />
                ))}
            </div>
        </div>
    );
}

export function CoreComponents() {
    return (
        <div className={styles.modulesWrapper}>
            <div className="row">
                {components.core.map((props, idx) => (
                    <Card key={idx} {...props} url={props.url === '#' ? props.source : props.url} />
                ))}
            </div>
        </div>
    );
}

export function TechnologyAdapters() {
    return (
        <>
            {STATUS_ORDER.map((status) => (
                <TaGroup key={status} status={status} />
            ))}
        </>
    );
}
