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
                        <h3><a href={entryTags.URL}>{entryTags.TITLE.substring(1, entryTags.TITLE.length -1)} </a></h3>
                        <b>Authors : {entryTags.AUTHOR}</b>
                        <br/>
                        <i>
                            {entryTags.BOOKTITLE ? 'In ' + entryTags.BOOKTITLE?.substring(1, entryTags.BOOKTITLE.length -1) + ', ' : ''}
                            {entryTags.ADDRESS}
                            {entryTags.JOURNAL ? 'In ' + entryTags.JOURNAL?.substring(1, entryTags.JOURNAL.length -1) + ', ' : ''} 
                            {entryTags.NUMBER} {entryTags.PAGES ? 'pp. ' + entryTags.PAGES : '' } . 
                            {entryTags.MONTH ? entryTags.MONTH + ', ': ''} {entryTags.YEAR}. 
                        </i> 
                        <a href={entryTags.PDF}>[PDF]</a>
                        
                        <p><b>{ entryTags.KEYWORDS ? 'Keywords: ' + entryTags.KEYWORDS : '' }</b></p>  
                        <h4>{ entryTags.EDITOR ? entryTags.EDITOR : ''} { entryTags.PUBLISHER?.substring(1, entryTags.PUBLISHER.length -1) }</h4> 
                        { entryTags.HAL_ID } { entryTags.HAL_VERSION }             
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default function papers() {
    const {siteConfig}  = useDocusaurusContext()
    let  papers_data    = data_papers.replace(/{'e}/g, "é").replace(/{'i}/g, "í").replace(/{`e}/g, "è").replace(/{"e}/g, "ë").replace("{^i}", "î")
    let articles        = bibtexParse.toJSON(papers_data)

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