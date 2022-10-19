import { NavLink } from "react-router-dom";

const NavItem = ({ path, content }) => {
    return (
        <NavLink
            to={path}
            className={`nav-link fs-3 link-info ${({ isActive }) =>
                isActive ? "active" : "inactive"}`}>
            {content}
        </NavLink>
    );
};

export default NavItem;
