export const UserTypeComponent = ({number, children}) => {
    return ( 
        sessionStorage.getItem('usertype') === number ? children : null
    )
}