import React from "react";
import styles from '../css/button.module.css'

const TextButton = ({title, style, value, handler}) => {

    const onClickHanlder = ({target}) => {
        if(!handler) return 
        handler(target.dataset.value);
    }

    return (
        <button className={styles.TextButton + ' ' + styles.style} data-value={value} onClick={onClickHanlder}>{title}</button>
    )

}


export default TextButton;