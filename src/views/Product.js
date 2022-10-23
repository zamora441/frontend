import { Link } from "react-router-dom";
import ProductTable from "../components/ProductTable";

const Product = () => {
    return (
        <div className="container  mt-5">
            <ProductTable />
            <div class="d-grid gap-2 col-6 mx-auto">
                <Link
                    to="agregarProducto"
                    className="btn btn-dark text-info fs-5 fw-bolder"
                    type="button">
                    Agregar Producto
                </Link>
            </div>
        </div>
    );
};

export default Product;
