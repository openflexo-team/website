import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import HomepageHeader from '@site/src/components/HomePageHeader';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import downloads_list  from "../data/downloads.json";

function TechnologyCard (props){
    return (
        <div className="col col--4">
            <div className="card margin-bottom--lg">
                <div className="card__header">
                    <div className="avatar">
                        <img src={props.logo} alt={props.name} className={`avatar__photo ${styles.technologyLogo}`} />
                        <div className="avatar__intro">
                            <a href={props.url}>{props.name}</a>
                            <p>{props.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Package(props){

    let mdls = props.modules?.map(function(value) {
        return downloads_list.modules.find(element => element.name == value)
    });

    let tas = props.ta.map(function(value) {
        return downloads_list.technology_adapters.find(element => element.name == value)
    });

    return (
        <div className='container margin-top--md'>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            {
                Array.isArray(mdls) && mdls.length ? (
                <div className={styles.modulesWrapper}>
                    <h3>Modules:</h3>
                    <div className="row">
                        { mdls.map((pps, idx) => (
                            <TechnologyCard key={idx} {...pps} />
                        )) }
                    </div>
                </div>
                ) : ( '' )
            }
            <div className={styles.modulesWrapper}>
                <h3>Technology adapters:</h3>
                <div className="row">
                    { tas.map((pps, idx) => (
                        <TechnologyCard key={idx} {...pps} />
                    )) }
                </div>
            </div>
            <div className='text--center margin-bottom--lg'>
                <h1>Download here:</h1>
                <div className="row">
                    <div className="col col--4">
                        <img src="/img/downloads/os_mac.png" alt="macos" className={`margin--md ${styles.osImage}`} />
                        <br/>
                        <a href={props.downloadUrl.mac} className="button button--primary">macOS</a>
                    </div>
                    <div className="col col--4">
                        <img src="/img/downloads/os_windows.png" alt="windows" className={`margin--md ${styles.osImage}`} />
                        <br/>
                        <a href={props.downloadUrl.windows} className="button button--primary">Windows</a>
                    </div>
                    <div className="col col--4">
                        <img src="/img/downloads/os_linux.png" alt="linux" className={`margin--md ${styles.osImage}`} />
                        <br/>
                        <a href={props.downloadUrl.linux} className="button button--primary">Linux</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Version(props) {
    const packages = props.packages;

    return (
        <div className='container'>
            <div className="theme-doc-version-banner alert alert--info">
                <h1>{props.version}</h1>
                <h3>{props.label}</h3>
            </div>
            
            <div className="row">
                <div>
                    { packages.map((props, idx) => (
                        <Package key={idx} {...props} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function downloads() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout title="Downloads" description="Openflexo is a model-federation infrastructure software.">
            <HomepageHeader title="DOWNLOAD OPENFLEXO INFRASTRUCTURE" />
            <div className='container'>
              <div>
                <h1>About Openflexo Software...</h1>
                <p>
                Openflexo is not a software ! 
                <br/>
                Openflexo in an infrastructure with generic components, and some other components dedicated to model federation.
                </p>
                <ul>
                    <li>
                        Some generic component are part of Openflexo infrastructure (Connie, Pamela, Gina, Diana, ...). Those components are generally released as Maven artefacts to be used in any contexts (feel free to use them in your own environment).
                    </li>
                    <li>
                        Some components are the core implementation of model federation (eg. Openflexo FML-Core framework). Those components version is the infrastructure generic version (current infrastructure version under development is 1.8.x)
                    </li>
                    <li>
                        Openflexo infrastructure also contains some technical components dedicated to handle a given technology. They are called Technology Adapters or connectors (eg.  OWL TechnologyAdapter,  EMF TechnologyAdapter or  M/S Word TechnologyAdapter).
                    </li>
                    <li>
                        Openflexo infrastructure also contains some business-specific components which are defined as autonomous applications. They are called Modules (eg.  FreeModellingEditor,  OpenflexoModeller, or EnterpriseArchitectureModule)
                    </li>
                </ul>
              </div>
            </div>
            <div className="container">
                <div>
                    { downloads_list.versions.map((props, idx) => (
                        <Version key={idx} {...props} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}