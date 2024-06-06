import React, { useRef, useEffect, useState } from "react";

const ImageContainer = ({ uploadImg, filters, getDownloadURL }) => {
    const canvasRef = useRef(null);
    let Debounce;

    useEffect(() => {
        if (uploadImg && !Debounce) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            const img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.filter = `grayscale(${filters['Grayscale']}%) brightness(${filters['Brightness']}%) saturate(${filters['Saturation']}%) invert(${filters['Inversion']}%)`;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL('image/png');
                getDownloadURL(dataURL);
            };
            Debounce = setTimeout(
                img.src = URL.createObjectURL(uploadImg)
            , 1000)
            
        }
        if(Debounce){
            clearTimeout(Debounce);
        }
    }, [uploadImg, filters]);

    return <canvas ref={canvasRef}></canvas>;
};

export default ImageContainer;
