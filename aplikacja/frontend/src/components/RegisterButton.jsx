export const RegisterButton = ({ id }) => {
    const link = `/zglosZawodnikow/${id}`
    return (
        <a href={link}><button>Zgłoś zawodników</button></a>
    )
} 