export const NavItem = ({link, label}) => {
    return(
        <li className="nav-item">
            <a className="nav-link" href={link}>{label}</a>
        </li>
    )
}