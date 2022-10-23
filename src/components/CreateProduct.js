import { useState } from "react";
import { Link } from "react-router-dom";
import ProductoService from "../services/ProductService";
import Swal from "sweetalert2";

const CreateProduct = () => {
    const [descripcion, setDescripcion] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [alert, setAlert] = useState("");
    const createProduct = () => {
        const data = {
            descripcion: descripcion,
            cantidad: cantidad,
        };
        ProductoService.create(data)
            .then((response) => {
                console.log(response);
                setDescripcion("");
                setCantidad("");
                Swal.fire({
                    icon: "success",
                    title: "Producto Agregado correctamente",
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
        } else if (cantidad === 0) {
            const mesagge =
                "No se puede agregar productos con una cantidad igual o menor a 0";
            setAlert(mesagge);
        } else {
            setAlert("");
            createProduct();
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <div class="card">
                <div class="card-header bg-dark text-info fs-3">
                    Agregar producto
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
                                required
                                onChange={(e) => {
                                    setDescripcion(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                for="name"
                                className="form-label">
                                Cantidad
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="name"
                                value={cantidad}
                                onChange={(e) => {
                                    setCantidad(e.target.value);
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
                                to="/productos"
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
export default CreateProduct;
