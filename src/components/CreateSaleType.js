import SaleTypeService from "../services/SaleTypeService";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const CreateSaleType = () => {
    const [descripcion, setDescripcion] = useState("");
    const [alert, setAlert] = useState("");

    const createSaleType = () => {
        const data = {
            descripcion: descripcion,
        };
        SaleTypeService.create(data)
            .then((response) => {
                console.log(response);
                setDescripcion("");
                Swal.fire({
                    icon: "success",
                    title: "Tipo agregado correctamente",
                });
            })
            .catch((e) => {
                console.log(e);
                Swal.fire({
                    icon: "error",
                    title: "Fallo. No se pudo agregar",
                });
            });
    };

    const handleSubmit = () => {
        if (descripcion === "") {
            const mesagge = "Debe rellenar todos los datos";
            setAlert(mesagge);
        } else {
            setAlert("");
            createSaleType();
        }
    };

    return (
        <div className="container mt-5 pt-5 ">
            <div class="card">
                <div class="card-header bg-dark text-info fs-3">
                    Agregar tipo de venta
                </div>
                <div class="card-body">
                    <form>
                        <div className="mb-3 ">
                            <label
                                for="id"
                                className="form-label">
                                Descripcion
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) => {
                                    setDescripcion(e.target.value);
                                }}
                            />
                            <small
                                id="alert"
                                class="text-danger fs-5 fw-bolder ">
                                {alert}
                            </small>
                        </div>
                        <div class="mx-auto">
                            <Link
                                to="/tipoventa"
                                class="btn btn-info text-dark fs-5 fw-bolder "
                                type="button">
                                Regresar
                            </Link>

                            <button
                                class="btn btn-dark text-info fs-5 fw-bolder ms-3"
                                type="button"
                                onClick={() => {
                                    handleSubmit();
                                }}>
                                Agregar
                            </button>
                        </div>
                    </form>
                </div>
                <div class="card-footer text-muted bg-secondary"></div>
            </div>
        </div>
    );
};
export default CreateSaleType;
