import React, {useState} from "react";
import RangeSelect from "./rangeSelect";

const TextInput = ({handler}) => {
    const [text, setText] = useState("");
    const [size, setSize] = useState(16);
    const [color, setColor] = useState("black")
    const btnClick = () => {
        handler(text, color , size);
    }


    return (
        <>
        <input type="text" onChange={(e) => {setText(e.target.value)}}/>
        <button onClick={btnClick}>Add</button>
        <RangeSelect currentFilter="Size" handler={setSize} currentRange={size} />
        <input type="color" onChange={(e) => {setColor(e.target.value)}}/>
        </>
    )
}

export default TextInput;