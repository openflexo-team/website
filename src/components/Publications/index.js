import React from 'react';
import bibtexParse from '@orcid/bibtex-parse-js';
import {data_papers} from '@site/src/data/papers';
import styles from '@site/src/pages/index.module.css';
import thumbnails from '@site/src/data/publication-thumbnails.json';
import publicationStyles from './index.module.css';

const hasThumbnails = Object.keys(thumbnails).length > 0

function Thumbnail({entryTags}) {
    if (!hasThumbnails) {
        return null
    }
    const source = thumbnails[entryTags.HAL_ID]
    const title = entryTags.TITLE.substring(1, entryTags.TITLE.length - 1)
    if (!source) {
        return <div className={publicationStyles.placeholder} aria-hidden="true" />
    }
    return (
        <a href={entryTags.PDF || entryTags.URL}>
            <img className={publicationStyles.thumbnail} src={source} alt={'First page of ' + title} loading="lazy" />
        </a>
    )
}

function Article({entryTags}){
    return (
        <div className='col col--12'>
            <div className='margin-bottom--lg margin-top--lg card'>
                <h2 className={`margin-left--lg margin-top--md ${styles.articleYear}`}>{entryTags.YEAR}</h2>
                <ul>
                    <li className={publicationStyles.item}>
                        <Thumbnail entryTags={entryTags} />
                        <div className={publicationStyles.text}>
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
                        {entryTags.SCHOOL ? <span>{entryTags.SCHOOL.replace(/^\{+|\}+$/g, '')}. </span> : null}
                        {entryTags.NOTE ? <b>{entryTags.NOTE}. </b> : null}
                        {entryTags.PDF ? <a href={entryTags.PDF}>[PDF]</a> : null}
                        {entryTags.DOI ? <span> <a href={'https://doi.org/' + entryTags.DOI}>[DOI]</a></span> : null}
                        {entryTags.URL && entryTags.HAL_VERSION ? <span> <a href={entryTags.URL + entryTags.HAL_VERSION + '/bibtex'}>[BibTeX]</a></span> : null}

                        <p><b>{ entryTags.KEYWORDS ? 'Keywords: ' + entryTags.KEYWORDS : '' }</b></p>  
                        <h4>{ entryTags.EDITOR ? entryTags.EDITOR : ''} { entryTags.PUBLISHER?.substring(1, entryTags.PUBLISHER.length -1) }</h4> 
                        { entryTags.HAL_ID } { entryTags.HAL_VERSION }             
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default function Publications() {
    let articles = bibtexParse.toJSON(data_papers)

    articles.sort((a, b) => a.entryTags.YEAR - b.entryTags.YEAR)
    articles.reverse()
    return (
        <div className='row'>
            {articles.map((props, idx) => (
                <Article key={idx} {...props} />
            ))}
        </div>
    )
}
