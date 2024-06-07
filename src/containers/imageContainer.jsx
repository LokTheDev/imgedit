import React, { useRef, useEffect, useState } from "react";

const ImageContainer = ({ 
    xSetter,
    ySetter,
    imgX,
    imgY,
    uploadImg,
    filters,
    getDownloadURL }) => {
    const canvasRef = useRef(null);
    let Debounce;

    useEffect(() => {
        if (uploadImg && !Debounce) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            canvas.width = 1000;
            canvas.height = 1000;
            const loadAndDrawImages = async () => {
                for (let i = 0; i < uploadImg.length; i++) {
                    const item = uploadImg[i];
                    const img = new Image();
                    await new Promise(resolve => {
                        img.onload = resolve;
                        img.src = URL.createObjectURL(item.file);
                    });
                    ctx.filter = `grayscale(${filters['Grayscale']}%) brightness(${filters['Brightness']}%) saturate(${filters['Saturation']}%) invert(${filters['Inversion']}%)`;
                    ctx.drawImage(img, item.x, item.y, img.width, img.height);
                    const dataURL = canvas.toDataURL('image/png');
                    getDownloadURL(dataURL);
                }
            };

            // Call the async function to load and draw images
            loadAndDrawImages();
        }
    }, [uploadImg, filters]);

    useEffect(() => {
        const handleClick = (e) => {
            var rect = canvasRef.current.getBoundingClientRect();
            xSetter(e.clientX - rect.left);
            ySetter(e.clientY - rect.top);
        };
        canvasRef.current.addEventListener("click", handleClick);

        return () => {
            canvasRef.current.removeEventListener("click", handleClick);
        };
    }, [imgX, imgY])

    return <canvas ref={canvasRef}></canvas>;
};

export default ImageContainer;
