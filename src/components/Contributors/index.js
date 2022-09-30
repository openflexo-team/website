import React from 'react';
import clsx from 'clsx';
import styles from './index.module.css';
import ContributorList from '../../data/contributors.json';

function Contributor({name, role, image}){
    return (
        <div className='col col--4'>
            <div className='avatar avatar--vertical margin-bottom--lg card'>
                <div className={`text--center avatar__photo avatar__photo--xl margin-bottom--sm margin-top--lg ${styles.shadowSm}`} >
                    <img src={image} alt={name}/>
                </div>
                <div className="text--center padding-horiz--md margin-bottom--lg">
                    <div className='avatar__name'>{name}</div>
                    <small className='avatar__subtitle'>{role}</small>
                </div>
            </div>
        </div>
    )
}

export default function TeamContributors() {
    return (
        <section className={styles.contributorWrapper}>
            <div className="container">
                <div className="row padding-top--lg">
                    {ContributorList.primary.map((props, idx) => (
                    <Contributor key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}