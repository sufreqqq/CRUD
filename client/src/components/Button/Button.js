import React from 'react'
import styles from  "./Button.module.css"

const Button = ({children, ...props}) => {
  return (
    <button {...props} className={styles.button_blue}>{children}</button>
  )
}

export default Button
