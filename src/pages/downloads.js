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
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import CodeBlock from '@theme/CodeBlock'

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
    const table = document.getElementById(id.replace(/ /g,''))
    // Read the state before hiding every table: otherwise a click on an open table reopens it at once.
    const wasHidden = table.classList.contains(styles.hidden)

    let downloadTables = [...document.querySelectorAll(".download-table")]
    downloadTables.forEach(m => {
        m.classList.add(styles.hidden)
    })

    if (wasHidden) {
        table.classList.remove(styles.hidden)
    }
}

function Version(props) {
    let version_index = props.index

    return (
        <div>
            <div className={`theme-doc-version-banner alert alert--info margin--md ${styles.versionHead}`} onClick={() => openCloseAccordion(props.version)}>
                <h1>{props.version}</h1>
                <h3>{props.label}</h3>
            </div>
            <div className={`col--12 download-table ${props.expanded ? '' : styles.hidden}`} id={props.version.replace(/ /g,'')}>
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
                                    <a href="#" className="button button--primary">Details</a>
                                </div>
                            </th>
                            <th>
                                <div className={` ${styles.moduleCardPackage}`}>
                                    <div>
                                        <h3>Openflexo Designer</h3>
                                        <p>This packaging also contains various technology adapters suitable for many contexts.</p>
                                    </div>
                                    <a href="#" className="button button--primary">Details</a>
                                </div>
                            </th>
                            <th>
                                <div className={` ${styles.moduleCardPackage}`}>
                                    <div>
                                        <h3>Openflexo Headless</h3>
                                        <p>It contains command-line terminal as well as various technology adapters suitable for many contexts</p>
                                    </div>
                                    <a href="#" className="button button--primary">Details</a>
                                </div>
                            </th>
                            <th>
                                <div className={` ${styles.moduleCardPackage}`}>
                                    <div>
                                        <h3>Openflexo Maintainer</h3>
                                        <p>The purpose of this packaging is to offer full features for developers of Openflexo model federation infrastructure.</p>
                                    </div>
                                    <a href="#" className="button button--primary">Details</a>
                                </div>
                            </th>
                        </tr>

                        <tr>
                            <th id="downloads">Download</th>
                            <th>
                                <a href={downloads_list.versions[version_index].packages[1].downloadUrl.windows} className={` ${styles.downloadButton}`}>
                                    Windows
                                </a>
                                <a href={downloads_list.versions[version_index].packages[1].downloadUrl.mac} className={` ${styles.downloadButton}`}>
                                    macOS
                                </a>
                                <a href={downloads_list.versions[version_index].packages[1].downloadUrl.linux} className={` ${styles.downloadButton}`}>
                                    Linux
                                </a>
                            </th> 
                            <th>
                                <a href={downloads_list.versions[version_index].packages[2].downloadUrl.windows} className={` ${styles.downloadButton}`}>
                                    Windows
                                </a>
                                <a href={downloads_list.versions[version_index].packages[2].downloadUrl.mac} className={` ${styles.downloadButton}`}>
                                    macOS
                                </a>
                                <a href={downloads_list.versions[version_index].packages[2].downloadUrl.linux} className={` ${styles.downloadButton}`}>
                                    Linux
                                </a>
                            </th>
                            <th>
                                <a href={downloads_list.versions[version_index].packages[3].downloadUrl.windows} className={` ${styles.downloadButton}`}>
                                    Windows
                                </a>
                                <a href={downloads_list.versions[version_index].packages[3].downloadUrl.mac} className={` ${styles.downloadButton}`}>
                                    macOS
                                </a>
                                <a href={downloads_list.versions[version_index].packages[3].downloadUrl.linux} className={` ${styles.downloadButton}`}>
                                    Linux
                                </a>
                            </th>
                            <th>
                                <a href={downloads_list.versions[version_index].packages[0].downloadUrl.windows} className={` ${styles.downloadButton}`}>
                                    Windows
                                </a>
                                <a href={downloads_list.versions[version_index].packages[0].downloadUrl.mac} className={` ${styles.downloadButton}`}>
                                    macOS
                                </a>
                                <a href={downloads_list.versions[version_index].packages[0].downloadUrl.linux} className={` ${styles.downloadButton}`}>
                                    Linux
                                </a>
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
                                    { has_feature(props.name, "FreeModellingEditor", version_index) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                                <th>
                                    { has_feature(props.name, "Openflexo Designer", version_index) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                                <th>
                                    { has_feature(props.name, "Openflexo Headless", version_index) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                                <th>
                                    { has_feature(props.name, "Openflexo Maintainer", version_index) ? (<CheckIcon />) : ( <CrossIcon /> ) }
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
                                    { has_ta(props.name, "FreeModellingEditor", version_index) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                                <th>
                                    { has_ta(props.name, "Openflexo Designer", version_index) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                                <th>
                                    { has_ta(props.name, "Openflexo Headless", version_index) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                                <th>
                                    { has_ta(props.name, "Openflexo Maintainer", version_index) ? (<CheckIcon />) : ( <CrossIcon /> ) }
                                </th>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const TEMURIN8_JRE_WINDOWS = 'https://adoptium.net/temurin/releases/?version=8&os=windows&arch=x64&package=jre'
const TEMURIN8 = 'https://adoptium.net/temurin/releases/?version=8'
const SNAPSHOTS = 'https://downloads.openflexo.org/openflexo/2.99SNAPSHOT/'

function serverDownloadUrl() {
    for (const version of downloads_list.versions) {
        const server = version.packages.find(pck => pck.name == 'Openflexo Server')
        if (server != null) {
            return server.downloadUrl.linux
        }
    }
    return SNAPSHOTS
}

function InstallGuide() {
    return (
        <div className="container padding-bottom--lg">
            <h1 id="install">Installing and running Openflexo</h1>

            <div className="alert alert--warning margin-bottom--md">
                <b>Openflexo 2.99 needs Java 8.</b> It does not run on more recent Java versions: on Java 11,
                17 or 21 the application freezes at startup. None of the packages bundles a Java runtime, so
                install a Java 8 first, as described below for your platform.
            </div>

            <h2>Which package?</h2>
            <ul>
                <li><b>FreeModellingEditor</b>: the smallest one, only the free modelling editor.</li>
                <li><b>Openflexo Designer</b>: the modules and the most common technology adapters. The right choice for most users.</li>
                <li><b>Openflexo Headless</b>: the FML command-line interpreter, without graphical interface.</li>
                <li><b>Openflexo Maintainer</b>: everything, for developers of the infrastructure.</li>
                <li><b>Openflexo Server</b>: an HTTP server exposing the infrastructure, delivered as a Linux archive only (see below).</li>
            </ul>
            <p>
                The download links above point to the snapshot packaged on the date shown. Every snapshot is
                kept in <a href={SNAPSHOTS}>the snapshot directory</a>.
            </p>

            <Tabs groupId="operating-system">
                <TabItem value="windows" label="Windows" default>
                    <ol>
                        <li>
                            Install a <b>Java 8 runtime with an installer</b> (not a zip archive), for instance the
                            {' '}<a href={TEMURIN8_JRE_WINDOWS}>Eclipse Temurin 8 JRE</a>. The Openflexo launcher finds
                            Java through the Windows registry: a Java that was merely unzipped is not detected.
                        </li>
                        <li>Download the <code>.zip</code> package and extract it (right-click, <i>Extract All...</i>).</li>
                        <li>
                            Run <code>Openflexo &lt;Package&gt; 2.99SNAPSHOT.exe</code>. The variant ending with
                            {' '}<code>- Console.exe</code> also opens a console window showing the logs, useful when
                            reporting a problem.
                        </li>
                    </ol>
                    <p>
                        The launcher only accepts Java 8. If none is found, it says so and offers to open the Java 8
                        download page. If it keeps saying so after installing Java 8, check that the installer
                        registered Java in Windows: with Temurin, enable the option setting the <i>JavaSoft (Oracle)
                        registry keys</i> during installation.
                    </p>
                </TabItem>

                <TabItem value="macos" label="macOS">
                    <p>Two ways to run Openflexo on a Mac.</p>

                    <h3>Using the application (.dmg)</h3>
                    <ol>
                        <li>
                            This application needs <b>Oracle's Java 8 runtime for macOS</b>: it looks for Java
                            exclusively where Oracle's Java 8 installer puts it
                            (<code>/Library/Internet Plug-Ins/JavaAppletPlugin.plugin</code>). Other Java 8
                            distributions are not detected — use the archive below instead.
                        </li>
                        <li>
                            Double-click the <code>.dmg</code>. The disk image mounts <b>silently</b>: no window
                            opens. The volume, named <code>&lt;Package&gt;-2.99SNAPSHOT</code>, appears in the
                            Finder sidebar.
                        </li>
                        <li>Drag the application from that volume to your <i>Applications</i> folder.</li>
                        <li>
                            The application is not signed, so macOS blocks its first launch (<i>unidentified
                            developer</i>). <b>Control-click</b> the application, choose <i>Open</i>, then confirm
                            with <i>Open</i>. Later launches work normally.
                        </li>
                        <li>
                            On a Mac with Apple silicon the application runs under Rosetta 2, which macOS offers to
                            install if needed.
                        </li>
                    </ol>
                    <p>Instead of control-clicking, the quarantine can also be removed from a terminal:</p>
                    <CodeBlock language="bash">{`xattr -dr com.apple.quarantine "/Applications/Openflexo Designer 2.99SNAPSHOT.app"`}</CodeBlock>

                    <h3>Using the Linux archive in a terminal</h3>
                    <p>
                        This works with any Java 8, for instance an <a href={TEMURIN8}>Eclipse Temurin 8 JDK</a>
                        {' '}installed with its <code>.pkg</code> installer (x64; it runs under Rosetta 2 on Apple
                        silicon). Download the <b>Linux</b> package, then:
                    </p>
                    <CodeBlock language="bash">{`mkdir -p ~/Openflexo && cd ~/Openflexo
tar -xzf ~/Downloads/"Openflexo Designer 2.99SNAPSHOT.tar.gz"
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)
export PATH="$JAVA_HOME/bin:$PATH"
./start.sh`}</CodeBlock>
                    <p>
                        The archive has no top-level directory: extract it into a directory of its own, and prefer
                        a path without spaces.
                    </p>
                </TabItem>

                <TabItem value="linux" label="Linux">
                    <ol>
                        <li>
                            Install a Java 8 and make sure it is the <code>java</code> found first on your
                            {' '}<code>PATH</code>: <code>java -version</code> must print <code>1.8</code>. Your
                            distribution's OpenJDK 8 or <a href={TEMURIN8}>Eclipse Temurin 8</a> both work.
                        </li>
                        <li>
                            Extract the <code>.tar.gz</code> package into a directory of its own — the archive has no
                            top-level directory — preferably in a path without spaces.
                        </li>
                        <li>Run <code>start.sh</code>.</li>
                    </ol>
                    <CodeBlock language="bash">{`java -version        # must print 1.8
mkdir -p ~/Openflexo && cd ~/Openflexo
tar -xzf ~/Downloads/"Openflexo Designer 2.99SNAPSHOT.tar.gz"
./start.sh`}</CodeBlock>
                </TabItem>
            </Tabs>

            <h2 id="server">Openflexo Server</h2>
            <p>
                The server is delivered as a <a href={serverDownloadUrl()}>Linux archive</a> only, and needs a
                Java 8 as well. Extract it like the Linux packages, then start it with its options:
            </p>
            <CodeBlock language="bash">{`./start.sh --port 8080 --center /path/to/resource-center`}</CodeBlock>
            <ul>
                <li><code>--host</code> and <code>--port</code>: where the server listens, <code>localhost:8080</code> by default. Use <code>--host 0.0.0.0</code> to accept connections from other machines.</li>
                <li><code>--center path</code>: a resource center to register; may be given several times.</li>
                <li><code>--project path</code>: a project to open; may be given several times.</li>
                <li><code>--preload file</code>: a file listing resources to load at startup, one URI per line.</li>
                <li><code>-v</code>: verbose mode; <code>-h</code>: help.</li>
            </ul>
        </div>
    )
}

export default function downloads() {
    const {siteConfig} = useDocusaurusContext()
    return (
        <Layout title="Downloads" description="Openflexo is a model-federation infrastructure software.">
            <HomepageHeader title="DOWNLOAD OPENFLEXO INFRASTRUCTURE" />
            <div className="container">
              <div>
                <h1>About Openflexo Software...</h1>
                <p>
                    Openflexo is not a single application: it is an <b>infrastructure for model federation</b>.
                    It lets you connect models that live in different technologies, such as spreadsheets, XML
                    files, ontologies, databases or diagrams, and work with them through <b>FML</b>, the Flexo
                    Modelling Language. It is made of several kinds of components:
                </p>
                <ul>
                    <li>
                        <b>Generic components</b>: Connie (expression language), Pamela (modelling framework),
                        Gina (user interfaces) and Diana (diagrams). They do not depend on model federation. They
                        are published as Maven artefacts on <a href="https://maven.openflexo.org/">maven.openflexo.org</a>,
                        so you can use them in your own projects.
                    </li>
                    <li>
                        <b>The model federation core</b> (FML-Core), which runs FML. Its version is the version of
                        the whole infrastructure: 2.0.1 is the last stable release, and 2.99 is the one under
                        development.
                    </li>
                    <li>
                        <b>Technology adapters</b> (also called connectors). Each one handles a single technology:
                        Excel, Word, PowerPoint, EMF, OWL, JDBC, REST, and more.
                    </li>
                    <li>
                        <b>Modules</b>: applications built for a specific job, such as FreeModellingEditor or the
                        Enterprise Architecture module.
                    </li>
                </ul>
                <p>
                    You don't download these components one by one. They come in <b>packages</b>, each one a
                    ready-to-run mix of modules and technology adapters. The table below shows what each package
                    contains, for each version. If you are not sure which one to pick, choose <b>Openflexo
                    Designer</b>.
                </p>
                <p>
                    All packages need <b>Java 8</b>. Read <a href="#install">Installing and running Openflexo</a>
                    {' '}before you start.
                </p>
              </div>
            </div>
            <div className="container padding-vert--lg">
                { downloads_list.versions.map((props, idx) => (
                    <Version index={idx} {...props} />
                ))}
            </div>
            <InstallGuide />
        </Layout>
    )
}