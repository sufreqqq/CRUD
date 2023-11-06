import React from 'react'
import styles from "./Layout.module.css";
import SideBar from '../SideBar/SideBar';


function Layout({ title, children }) {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src='./logo.svg' alt="CRUD"></img>
        </div>

      </header>
      <div className={styles.container}>
        <SideBar />
        <main className={styles.main}>
          <div className={styles.head}>
          <h1 className={styles.title}>{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout