import React, { useRef, useEffect, useState } from "react";

const ImageContainer = ({ 
    xSetter,
    ySetter,
    imgX,
    imgY,
    uploadImg, filters, getDownloadURL }) => {
    const canvasRef = useRef(null);
    let Debounce;

    useEffect(() => {
        if (uploadImg && !Debounce) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            canvas.width = 1000;
            canvas.height = 1000;
            for(let item of uploadImg){
                const img = new Image();
                img.onload = function () {
                    ctx.filter = `grayscale(${filters['Grayscale']}%) brightness(${filters['Brightness']}%) saturate(${filters['Saturation']}%) invert(${filters['Inversion']}%)`;
                    ctx.drawImage(img, item.x, item.y, img.width, img.height);
                    const dataURL = canvas.toDataURL('image/png');
                    getDownloadURL(dataURL);
                };
                img.src = URL.createObjectURL(item.file)
            }
        }
    }, [uploadImg, filters]);

    useEffect(() => {
        const handleClick = (e) => {
            xSetter(e.offsetX);
            ySetter(e.offsetY);
            console.log(imgX, imgY)
          };
          canvasRef.current.addEventListener("click", handleClick);

          return () => {
            canvasRef.current.removeEventListener("click", handleClick);
          };
    },[imgX, imgY])

    return <canvas ref={canvasRef}></canvas>;
};

export default ImageContainer;
