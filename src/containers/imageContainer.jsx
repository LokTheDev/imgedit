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
                    if(uploadImg[i].type === "image"){
                        const item = uploadImg[i];
                        const img = new Image();
                        await new Promise(resolve => {
                            img.onload = resolve;
                            img.src = URL.createObjectURL(item.file);
                        });
                        ctx.filter = `grayscale(${filters['Grayscale']}%) brightness(${filters['Brightness']}%) saturate(${filters['Saturation']}%) invert(${filters['Inversion']}%)`;
                        ctx.drawImage(img, item.x, item.y, img.width, img.height);
                    }
                    if(uploadImg[i].type === "text"){
                        const item = uploadImg[i];
                        ctx.fillStyle = item.color;
                        ctx.font = `bold ${item.size}px Arial`;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(item.text, item.x, item.y);
                    }
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
