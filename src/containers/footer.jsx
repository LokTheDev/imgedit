import React from "react";
import TextButton from "../components/textButton";
import styles from '../css/panel.module.css'

const Footer = ({undoHandler, uploadHanlder, downloadUrl, resetHandler}) => {

    const donwload = (value) => {
        var link = document.createElement('a');
        link.download = 'canvas_image.png';
        link.href = downloadUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    const onInputClick = (event) => {
        event.target.value = ''
    }

    return (
        <div>
            <TextButton title={"Reset filter"} handler={resetHandler} />
            <input type="file" onInput={uploadHanlder} onClick={onInputClick} />
            <TextButton title={"Download Image"} handler={donwload} />
            <TextButton title={"Undo"} handler={undoHandler} />

        </div>
    )
}

export default Footer;