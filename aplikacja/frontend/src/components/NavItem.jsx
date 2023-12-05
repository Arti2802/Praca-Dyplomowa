export const NavItem = ({link, label}) => {
    return(
        <li class="nav-item">
            <a class="nav-link" href={link}>{label}</a>
        </li>
    )
}