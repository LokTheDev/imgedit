import React, { useState } from "react";
import styles from '../css/panel.module.css'


const RangeSelect = ({ currentFilter, handler }) => {

    const [range, setRange] = useState(0)

    const onChangeHandler = ({target}) => {
        setRange(target.value)
    }

    return (
        <div className={styles.GroupContainer}>
            <label className={styles.LABEL}>{currentFilter}</label>
            <div className={styles.rangeRow}>
                <input type='range' onChange={onChangeHandler} value={range} max={100} min={0}/>
                <span>{range}%</span>
            </div>
        </div>
    )

}

export default RangeSelect;