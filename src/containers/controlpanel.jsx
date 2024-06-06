import React, {useState} from "react";
import TextButton from "../components/textButton";
import styles from '../css/panel.module.css'

const FilterOptions = ['Brightness', 'Saturation', 'Inversion', 'Grayscale']

const FilterPanel = () => {
    
    const [filter, setFilter] = useState("brightness");
    const changeFilter = (value) => {
        setFilter(value);
    }

    return(
        <div className={styles.GroupContainer}> 
                <label className={styles.LABEL}>Filter</label>
                <div className={styles.FilterGroup}>
                    {FilterOptions.map((filter, index) => <TextButton key={index} title={filter} value={filter} handler={changeFilter}/>)}
                </div>            
        </div>
    )


}

export default FilterPanel;