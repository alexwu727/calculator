import { Textfit } from "react-textfit";
import "./Screen.css"

const Screen = ({ value }) => {
    return (
        <Textfit className="screen" mode="single" max={80}>
            {value}
        </Textfit>
    )
}

export default Screen