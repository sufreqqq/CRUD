import React from 'react'
import styles from './StatCardItem.module.css'

export default function StatCardItem({ number, name, primaryColor, secondaryColor }) {
    return (
        <li className={styles.StatCardItem}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="80" rx="10" fill={secondaryColor} />
                <path d="M50.5 28H47.5V25H44.5V28H35.5V25H32.5V28H29.5C27.8455 28 26.5 29.3455 26.5 31V52C26.5 53.6545 27.8455 55 29.5 55H50.5C52.1545 55 53.5 53.6545 53.5 52V31C53.5 29.3455 52.1545 28 50.5 28ZM50.503 52H29.5V34H50.5L50.503 52Z" fill={primaryColor} />
                <path d="M38.5 48.121L47.0605 39.5605L44.9395 37.4395L38.5 43.879L35.0605 40.4395L32.9395 42.5605L38.5 48.121Z" fill={primaryColor} />
            </svg>
            <span>
                <h3 className={styles.bigText}>{number}</h3>
                <p>{name}</p>
            </span>
        </li>
    )
}
