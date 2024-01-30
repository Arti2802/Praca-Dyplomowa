import { FaEdit } from "react-icons/fa";

export const EditButton = (link) => {
    return (
        <a href={link}><FaEdit className="edit">Edytuj</FaEdit></a>
    )
}