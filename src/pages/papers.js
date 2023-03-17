import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import bibtexParse from '@orcid/bibtex-parse-js';
import {data_papers} from '../data/papers'

function Article({entryTags}){
    return (
        <div className='col col--12'>
            <div className='margin-bottom--lg margin-top--lg card'>
                <h2 className={`margin-left--lg margin-top--md ${styles.articleYear}`}>{entryTags.YEAR}</h2>
                <ul>
                    <li>
                        <h3><a href={entryTags.URL}>{entryTags.TITLE}, </a></h3>
                        {entryTags.AUTHOR}
                        <br/>
                        In <i>{entryTags.JOURNAL}, {entryTags.MONTH}, {entryTags.YEAR}. </i> <a href={entryTags.PDF}>[PDF]</a>
                        <p>Keywords: <b>{entryTags.KEYWORDS}</b></p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default function papers() {
    const {siteConfig}  = useDocusaurusContext()
    let articles        = bibtexParse.toJSON(data_papers)
    
    return (
        <Layout
          title={`${siteConfig.title}`}
          description="Openflexo is a model-federation infrastructure software.">
          <main>
            {articles.map((props, idx) => (
                <Article key={idx} {...props} />
            ))}
          </main>
        </Layout>
        )
}