import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductService from "../services/ProductService";
import Swal from "sweetalert2";
const Updateproduct = () => {
    const [amount, setAmount] = useState(0);
    const [descripcion, setDescripcion] = useState("");
    const { id } = useParams();
    const [alert, setAlert] = useState("");
    const initialProduct = {
        descripcion: "",
        id_producto: 0,
        cantidad: 0,
    };
    const [product, setProduct] = useState(initialProduct);

    const getproduct = (id) => {
        console.log(id);
        ProductService.get(id)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateproduct = () => {
        const data = {
            descripcion: descripcion,
            id_producto: id,
            cantidad: amount,
        };
        ProductService.update(data)
            .then((response) => {
                console.log(response.data);
                Swal.fire({
                    icon: "success",
                    title: "Producto actualizado correctamente",
                });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Fallo. No se pudo actualizar",
                });
            });
    };

    useEffect(() => {
        getproduct(id);
    }, []);

    const handleSubmit = () => {
        if (descripcion === "") {
            const mesagge = "Debe rellenar todos los datos";
            setAlert(mesagge);
        } else if (amount === 0 || amount <= 0) {
            const mesagge =
                "No se puede agregar productos con una cantidad igual o menor a 0";
            setAlert(mesagge);
        } else {
            setAlert("");
            updateproduct();
        }
    };
    return (
        <div className="container mt-5 pt-5 border">
            <form>
                <div className="mb-3 ">
                    <label
                        htmlFor="descripcion"
                        className="form-label">
                        Descripcion
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="descripcion"
                        value={descripcion}
                        placeholder={product.descripcion}
                        onChange={(e) => {
                            setDescripcion(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="amount"
                        className="form-label">
                        Cantidad
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="cantidad"
                        placeholder={product.cantidad}
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
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
                        Modificar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Updateproduct;
