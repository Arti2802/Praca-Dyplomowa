import { FaTrash } from "react-icons/fa";

export const DeleteButton = ({fn}) => {
    return (
        <button className="icon" type="button" onClick={fn}><FaTrash className="delete"/></button>
    )
}