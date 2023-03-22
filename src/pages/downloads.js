import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import HomepageHeader from '@site/src/components/HomePageHeader'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import downloads_list  from "../data/downloads.json"
import CheckIcon from '@site/src/components/svgIcons/CheckIcon'
import CrossIcon from '@site/src/components/svgIcons/CrossIcon'

function has_feature (component, module, version) {
    let res = false

    downloads_list.versions[version].packages.map(pck => {
        if (pck.name == module && pck.modules != null && pck.modules.includes(component)){
            res = true
        }
    })

    return res
}

function has_ta (component, ta, version) {
    let res = false

    downloads_list.versions[version].packages.map(pck => {
        if (pck.name == ta && pck.ta != null && pck.ta.includes(component)){
            res = true
        }
    })

    return res
}

function openCloseAccordion(id) {
    let downloadTables = [...document.querySelectorAll(".download-table")]
    downloadTables.forEach(m => {
        m.classList.add(styles.hidden)
    })

    let classes = document.getElementById(id.replace(/ /g,'')).classList

    if(classes.contains(styles.hidden)) {
        document.getElementById(id.replace(/ /g,'')).classList.remove(styles.hidden)
    } else {
        document.getElementById(id.replace(/ /g,'')).classList.add(styles.hidden)
    }
    
}

function Version(props) {
    return (
        <div>
            <div className={`theme-doc-version-banner alert alert--info margin--md ${styles.versionHead}`} onClick={() => openCloseAccordion(props.version)}>
                <h1>{props.version}</h1>
                <h3>{props.label}</h3>
            </div>
            <div className={`col--12 download-table ${styles.hidden}`} id={props.version.replace(/ /g,'')}>
                <table className={`margin-bottom--lg ${styles.downloadTable}`}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>
                                <div className={` ${styles.moduleCardPackage}`}>
                                    <div>
                                        <h3>FreeModellingEditor</h3>
                                        <p>This metamodelling tool is used to make concept emergence from a simple drawing or from a PowerPoint slide.</p>
                                    </div>
                                    <a href="#downloads" className="button button--primary">Download</a>
                                </div>
                            </th>
                            <th>
                                <div className={` ${styles.moduleCardPackage}`}>
                                    <div>
                                        <h3>Openflexo Designer</h3>
                                        <p>This packaging also contains various technology adapters suitable for many contexts.</p>
                                    </div>
                                    <a href="#downloads" className="button button--primary">Download</a>
                                </div>
                            </th>
                            <th>
                                <div className={` ${styles.moduleCardPackage}`}>
                                    <div>
                                        <h3>Openflexo Headless</h3>
                                        <p>It contains command-line terminal as well as various technology adapters suitable for many contexts</p>
                                    </div>
                                    <a href="#downloads" className="button button--primary">Download</a>
                                </div>
                            </th>
                            <th>
                                <div className={` ${styles.moduleCardPackage}`}>
                                    <div>
                                        <h3>Openflexo Maintainer</h3>
                                        <p>The purpose of this packaging is to offer full features for developers of Openflexo model federation infrastructure.</p>
                                    </div>
                                    <a href="#downloads" className="button button--primary">Download</a>
                                </div>
                            </th>
                        </tr>
                    
                        <tr>
                            <th>
                                Modules
                            </th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        { downloads_list.modules.map((props, idx) => (
                            <tr>
                                <th>
                                    <div className={` ${styles.taComponent}`}>
                                        <img src={props.logo} alt={props.name}  />
                                        <span>{props.name}</span>
                                    </div>
                                    
                                </th>
                                <th>
                                    { has_feature(props.name, "FreeModellingEditor", 0) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                                <th>
                                    { has_feature(props.name, "Openflexo Designer", 0) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                                <th>
                                    { has_feature(props.name, "Openflexo Headless", 0) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                                <th>
                                    { has_feature(props.name, "Openflexo Maintainer", 0) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                            </tr>
                        )) }
                    </tbody>
                    <thead>
                        <tr>
                            <th>Technology Adapters</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { downloads_list.technology_adapters.map((props, idx) => (
                            <tr>
                                <th>
                                    <div className={` ${styles.taComponent}`}>
                                        <img src={props.logo} alt={props.name} className={`${styles.technologyLogo}`} />
                                            {props.name}
                                    </div>
                                </th>
                                <th>
                                    { has_ta(props.name, "FreeModellingEditor", 0) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                                <th>
                                    { has_ta(props.name, "Openflexo Designer", 0) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                                <th>
                                    { has_ta(props.name, "Openflexo Headless", 0) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                                <th>
                                    { has_ta(props.name, "Openflexo Maintainer", 0) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                            </tr>
                        )) }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th id="downloads">Download</th>
                            <th>
                                <a href={downloads_list.versions[0].packages[0].downloadUrl.windows} className={` ${styles.downloadButton}`}>
                                    Windows
                                </a>
                                <a href={downloads_list.versions[0].packages[0].downloadUrl.mac} className={` ${styles.downloadButton}`}>
                                    macOS
                                </a>
                                <a href={downloads_list.versions[0].packages[0].downloadUrl.linux} className={` ${styles.downloadButton}`}>
                                    Linux
                                </a>
                            </th>
                            <th>
                                <a href={downloads_list.versions[0].packages[0].downloadUrl.windows} className={` ${styles.downloadButton}`}>
                                    Windows
                                </a>
                                <a href={downloads_list.versions[0].packages[0].downloadUrl.mac} className={` ${styles.downloadButton}`}>
                                    macOS
                                </a>
                                <a href={downloads_list.versions[0].packages[0].downloadUrl.linux} className={` ${styles.downloadButton}`}>
                                    Linux
                                </a>
                            </th>
                            <th>
                                <a href={downloads_list.versions[0].packages[0].downloadUrl.windows} className={` ${styles.downloadButton}`}>
                                    Windows
                                </a>
                                <a href={downloads_list.versions[0].packages[0].downloadUrl.mac} className={` ${styles.downloadButton}`}>
                                    macOS
                                </a>
                                <a href={downloads_list.versions[0].packages[0].downloadUrl.linux} className={` ${styles.downloadButton}`}>
                                    Linux
                                </a>
                            </th>
                            <th>
                                <a href={downloads_list.versions[0].packages[0].downloadUrl.windows} className={` ${styles.downloadButton}`}>
                                    Windows
                                </a>
                                <a href={downloads_list.versions[0].packages[0].downloadUrl.mac} className={` ${styles.downloadButton}`}>
                                    macOS
                                </a>
                                <a href={downloads_list.versions[0].packages[0].downloadUrl.linux} className={` ${styles.downloadButton}`}>
                                    Linux
                                </a>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default function downloads() {
    const {siteConfig} = useDocusaurusContext()
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
            <div className="container padding-vert--lg">
                { downloads_list.versions.map((props, idx) => (
                    <Version key={idx} {...props} />
                ))}
            </div>
        </Layout>
    )
}