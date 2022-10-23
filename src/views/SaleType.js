import { Link } from "react-router-dom";
import SaleTypeTable from "../components/SaleTypeTable";

const SaleType = () => {
    return (
        <div className=" mt-5 px-5 w-50 container">
            <SaleTypeTable />
            <div className="d-grid gap-2 col-6 mx-auto">
                <Link
                    to="agregarTipo"
                    class="btn btn-dark text-info fs-5 fw-bolder"
                    type="button">
                    Agregar tipo venta
                </Link>
            </div>
        </div>
    );
};

export default SaleType;
