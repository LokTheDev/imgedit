import React, { useState, useCallback, useRef, useEffect } from "react";
import FilterButtonGroup from './filterButtonGroup';
import RangeSelect from "../components/rangeSelect";
import ImageContainer from "./imageContainer"
import Footer from "./footer";
import TextInput from "../components/text";
import styles from "../css/panel.module.css";

function ControlPanel() {
  const [selectFilter, setFilter] = useState("Brightness");
  const changeFilter = useCallback((value) => {
    setFilter(value);
  }, []);
  const [range, setRange] = useState(0);
  const [filter, setFilterValue] = useState({
    "Brightness": 100,
    "Saturation": 100,
    "Inversion": 0,
    "Grayscale": 0
  }
  )

  const resetHandler = () => {
    setFilterValue({
      "Brightness": 100,
      "Saturation": 100,
      "Inversion": 0,
      "Grayscale": 0
    })
  }
  const updateFilter = (value) => {
    (setFilterValue({ ...filter, [selectFilter]: value }))
    setRange(value);
  }

  const [addX, setX] = useState(0);
  const [addY, setY] = useState(0);

  const [img, setImage] = useState([]);
  const onUpload = ({ target }) => {
    const imageConfig = {
      type: "image",
      file : target.files[0],
      x: addX,
      y: addY,
      width: 100,
      height: 100
    }
    setImage([...img, imageConfig])
  }

  const onAddText = (text, color = "black", size = 16) => {
    const textItem = {
      type: "text",
      text : text,
      color : color,
      size : size,
      x: addX,
      y: addY,
      width: 100,
      height: 100
    }
    setImage([...img, textItem])
  }

  const undoHandler = () => {
    const tmp = img;
    tmp.pop();
    setImage([...tmp]);
  }



  const [downloadUrl, setUrl] = useState("");

  return (
    <>
      <div className={styles.PanelHeader}>
        <FilterButtonGroup currentFilter={selectFilter} changeFilter={changeFilter} />
        <RangeSelect currentFilter={selectFilter} handler={updateFilter} currentRange={range} />
        <TextInput handler={onAddText} />
      </div>
      <Footer undoHandler={undoHandler} uploadHanlder={onUpload} downloadUrl={downloadUrl} resetHandler={resetHandler} />
      <ImageContainer xSetter={setX} ySetter={setY} imgX={addX} imgY={addY} filters={filter} uploadImg={img} getDownloadURL={setUrl} />
    </>
  );
}

export default ControlPanel;
