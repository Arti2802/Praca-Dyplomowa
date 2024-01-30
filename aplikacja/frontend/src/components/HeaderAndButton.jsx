export const HeaderAndButton = ({header, children}) => {
    return (
        <div className="row row-cols-auto">
                <h2 className="col">{header}</h2>
                <div className="col align-self-center">
                    {children}
                </div>
        </div>
    )
}