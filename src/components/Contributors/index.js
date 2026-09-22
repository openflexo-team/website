import React from 'react';
import clsx from 'clsx';
import styles from './index.module.css';
import ContributorList from '../../data/contributors.json';

function initials(name) {
    return name
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
}

function Contributor({name, role, image, affiliation, email, link}){
    const displayName = link ? <a href={link} target="_blank" rel="noopener noreferrer">{name}</a> : name;
    return (
        <div className='col col--4'>
            <div className='avatar avatar--vertical margin-bottom--lg card'>
                <div className={`text--center avatar__photo avatar__photo--xl margin-bottom--sm margin-top--lg ${styles.shadowSm}`} >
                    {image ? (
                        <img src={image} alt={name}/>
                    ) : (
                        <div className={styles.placeholderAvatar}>{initials(name)}</div>
                    )}
                </div>
                <div className="text--center padding-horiz--md margin-bottom--lg">
                    <div className='avatar__name'>{displayName}</div>
                    <small className='avatar__subtitle'>{role}</small>
                    {affiliation && <div className={styles.affiliation}>{affiliation}</div>}
                    {email && (
                        <div className={styles.email}>
                            <a href={`mailto:${email}`}>{email}</a>
                        </div>
                    )}
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