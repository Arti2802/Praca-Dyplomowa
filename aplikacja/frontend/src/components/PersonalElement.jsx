export const PersonalElement = ({id, children}) => {
    return (
        <>
            {id == sessionStorage.getItem('id') ? (
                children
            ) : null}
        </>
    )
}