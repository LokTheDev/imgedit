import React, {useState, useCallback} from "react";
import FilterButtonGroup from './filterButtonGroup';
import RangeSelect from "../components/rangeSelect";

function ControlPanel() {

  const [selectFilter, setFilter] = useState("brightness");

  const changeFilter = (useCallback = (value) => {
      setFilter(value);
  })

  return (
    <div>
      <FilterButtonGroup currentFilter={selectFilter} changeFilter={changeFilter} />
      <RangeSelect currentFilter={selectFilter} />
    </div>
  );
}

export default ControlPanel;
