export const RegisterButton = ({ link, id, name }) => {
    const fullLink = `${link}/${id}`;
    return (
        <a href={fullLink}><button className="btn btn-primary mx-1">{name}</button></a>
    )
} 