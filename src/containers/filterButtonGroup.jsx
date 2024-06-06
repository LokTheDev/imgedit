import React from "react";
import TextButton from "../components/textButton";
import styles from '../css/panel.module.css'

const FilterOptions = ['Brightness', 'Saturation', 'Inversion', 'Grayscale']

const FilterButtonGroup = ({ currentFilter, changeFilter }) => {

    return (
        <div className={styles.GroupContainer}>
            <label className={styles.LABEL}>Filter</label>
            <div className={styles.FilterGroup}>
                {FilterOptions.map((filter, index) => <TextButton key={index} title={filter} value={filter} theme={filter === currentFilter && 'SELECTED'} handler={changeFilter} />)}
            </div>
        </div>
    )

}

export default FilterButtonGroup;