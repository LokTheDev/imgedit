import React from "react";
import TextButton from "../components/textButton";
import styles from '../css/panel.module.css'

const Footer = ({uploadHanlder, downloadUrl, resetHandler}) => {

    const donwload = (value) => {
        var link = document.createElement('a');
        link.download = 'canvas_image.png';
        link.href = downloadUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <div>
            <TextButton title={"Reset filter"} handler={resetHandler} />
            <input type="file" onChange={uploadHanlder} />
            <TextButton title={"Download Image"} handler={donwload} />
        </div>
    )
}

export default Footer;