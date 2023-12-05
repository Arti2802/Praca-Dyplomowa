export const UserTypeComponent = ({number}) => {
    return ( 
        sessionStorage.getItem('usertype') === number ? <a href="/zgloszenia">Zgłoszenia</a> : null
    )
}