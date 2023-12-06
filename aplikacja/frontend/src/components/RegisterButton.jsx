export const RegisterButton = ({ link, id, name }) => {
    const fullLink = `/${link}/${id}`
    return (
        <a href={fullLink}><button>{name}</button></a>
    )
} 