import NavItem from "./NavItem";
import buyIcon from "../assets/icons/buy.png";
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <div>
            <ul className="nav nav-tabs justify-content-center bg-dark">
                <NavItem
                    path="personas"
                    content="Personas"
                />
                <NavItem
                    path="productos"
                    content="Productos"
                />
                <NavItem
                    path="tipoventa"
                    content="Tipo venta"
                />
                <NavItem
                    path="ventas"
                    content="Ventas"
                />
                <NavItem
                    path="logs"
                    content="Logs"
                />
                <NavLink
                    to="comprar"
                    className={`nav-link fs-3 link-info ${({ isActive }) =>
                        isActive ? "active" : "inactive"}`}>
                    <img
                        src={buyIcon}
                        alt="icono carrito compras"
                    />
                </NavLink>
            </ul>
        </div>
    );
};

export default Nav;
