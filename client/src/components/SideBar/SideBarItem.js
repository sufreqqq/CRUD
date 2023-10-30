import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SideBarItem.module.css'

export default function SideBarItem({children, name, to, active, exit, onClick}) {
  return (
    <Link to={to}>
      <li onClick={onClick} className={`${styles.SideBarItem} ${active ? styles.active : ''} ${exit ? styles.exit : ''}`}>
          {children}
       <p>{name}</p>
      </li>
    </Link>
  )
}
