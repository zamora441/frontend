import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import CreatePerson from "./components/CreatePerson";
import Buy from "./views/Buy";
import People from "./views/People";
import Product from "./views/Product";
import Sales from "./views/Sales";
import SaleType from "./views/SaleType";
import CreateProduct from "./components/CreateProduct";
import CreateSaleType from "./components/CreateSaleType";
import UpdatePerson from "./components/UpdatePerson";
import Updateproduct from "./components/updateProduct";
import UpdateSaleType from "./components/UpdateSaleType";
import Logs from "./views/Logs";

const App = () => {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                {/* Personas*/}

                <Route
                    path="/personas"
                    element={<People />}
                />

                <Route
                    path="/personas/agregarPersona"
                    element={<CreatePerson />}
                />
                <Route
                    path="/personas/:id"
                    element={<UpdatePerson />}
                />
                {/*Productos*/}
                <Route
                    path="/productos"
                    element={<Product />}
                />

                <Route
                    path="/productos/agregarProducto"
                    element={<CreateProduct />}
                />

                <Route
                    path="/productos/:id"
                    element={<Updateproduct />}
                />

                {/*tipo venta*/}

                <Route
                    path="/tipoventa"
                    element={<SaleType />}
                />
                <Route
                    path="/tipoventa/agregarTipo"
                    element={<CreateSaleType />}
                />
                <Route
                    path="/tipoventa/:id"
                    element={<UpdateSaleType />}
                />

                <Route
                    path="/ventas"
                    element={<Sales />}
                />
                <Route
                    path="/comprar"
                    element={<Buy />}
                />
                <Route
                    index
                    element={<Buy />}
                />
                <Route
                    path="/logs"
                    element={<Logs />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
