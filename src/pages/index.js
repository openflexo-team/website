import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import SimpleSlider from '@site/src/components/Slider';
import HomepageHeader from '@site/src/components/HomePageHeader';
import downloads from '../data/downloads.json';

import styles from './index.module.css';

const DOORS = [
  {
    title: 'Try it',
    description: 'Download a package and draw your first model in a quarter of an hour, with no code.',
    links: [
      {to: '/docs/get-started', label: 'Get started'},
      {to: '/downloads', label: 'Download'},
    ],
  },
  {
    title: 'Build with it',
    description: 'Learn to federate your own sources with the tutorials, or extend the platform with your own technology adapters.',
    links: [
      {to: '/docs/guide/tutorials/first-free-model', label: 'Follow the tutorials'},
      {to: '/docs/develop/setup', label: 'Develop'},
    ],
  },
  {
    title: 'Research',
    description: 'The scientific problem behind model federation, the projects and the publications.',
    links: [
      {to: '/docs/research', label: 'Research overview'},
      {to: '/docs/research/publications', label: 'Publications'},
    ],
  },
];

const EXAMPLES = [
  {
    to: '/docs/research/challenges/multi-process-challenge',
    title: 'MULTI Process Challenge',
    text: 'A process modeling challenge solved with two graphical editors built with Openflexo.',
  },
  {
    to: '/docs/research/projects/cta',
    title: 'Cyber Threat Application',
    text: 'A research prototype for modeling the attack surface of a system.',
  },
  {
    to: '/docs/discover/what-you-can-build',
    title: 'A digital twin from two files',
    text: 'An XML description of a packaging line and an Excel maintenance workbook, federated into one model.',
  },
];

function LatestRelease() {
  const latest = downloads.versions.find((version) => version.expanded);
  if (!latest) {
    return null;
  }
  return (
    <div className="container margin-vert--lg">
      <div className="alert alert--success">
        <b>{latest.version}</b>: {latest.label}. <Link to="/downloads">Download it</Link>.
      </div>
    </div>
  );
}

function Door({title, description, links}) {
  return (
    <div className="col col--4">
      <div className="card margin-bottom--lg">
        <div className="card__header">
          <h2>{title}</h2>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className="card__footer">
          {links.map((link) => (
            <Link key={link.to} className="button button--primary button--block margin-bottom--sm" to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Openflexo is an open-source infrastructure for model federation.">
      <SimpleSlider />

      <main>
        <HomepageHeader
          title="Federate, don't transform"
          content={
            <span className={styles.heroLead}>
              Openflexo is an open-source infrastructure for model federation. Its approach is to
              consider everything as a model: any source of information (a spreadsheet, an XML file, a
              database, a drawing...) can be interpreted as a model, as soon as you tell Openflexo how
              to interpret it. Your models then stay in their original tools and formats: Openflexo
              connects them instead of converting them, keeps them consistent, and lets you work with
              them together and build graphical views and editors on top of them.
            </span>
          }>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg margin-right--md" to="/downloads">
              Download
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/get-started">
              Get started
            </Link>
          </div>
        </HomepageHeader>

        <LatestRelease />

        <div className="container padding-vert--lg">
          <div className="row">
            {DOORS.map((door) => (
              <Door key={door.title} {...door} />
            ))}
          </div>
        </div>

        <div className="container padding-vert--lg">
          <div className="row">
            <div className="col col--5">
              <h2>Too many models, too many chains</h2>
              <p>
                A system is described by many models, in many tools and formats. Keeping them
                consistent usually means chains of transformations, or copy and paste.
              </p>
              <p>
                With Openflexo, each model stays where it is. Your sources are at the bottom,
                Openflexo connects them, and each user works on the view that suits them at the top.
              </p>
              <Link to="/docs/discover/model-federation">What is model federation?</Link>
            </div>
            <div className="col col--7">
              <img
                src="/images/site/ModelFederation/OF-BigPicture.png"
                alt="Data sources of many technologies connected by Openflexo to the views used by different users"
              />
            </div>
          </div>
        </div>

        <HomepageFeatures />

        <div className="container padding-vert--lg">
          <h2>See it at work</h2>
          <div className="row">
            {EXAMPLES.map((example) => (
              <div key={example.to} className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header">
                    <h3>{example.title}</h3>
                  </div>
                  <div className="card__body">
                    <p>{example.text}</p>
                  </div>
                  <div className="card__footer">
                    <Link to={example.to}>Read more</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
