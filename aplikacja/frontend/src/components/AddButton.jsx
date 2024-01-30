import { FaPlusCircle } from "react-icons/fa"

export const AddButton = ({link}) => {
    return (
        <a href={link}><button className="icon"><FaPlusCircle className="add"/></button></a>
    )
}