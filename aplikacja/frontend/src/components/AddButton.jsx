import { FaPlusCircle } from "react-icons/fa"

export const AddButton = ({header, link}) => {
    return (
        <div className="row row-cols-auto">
                <div className="col px-1">
                    <h1>{header}</h1>
                </div>
                <div className="col-1 align-self-center px-1">
                <a href={link}><button className="icon"><FaPlusCircle className="add"/></button></a>
                </div>
        </div>
    )
}