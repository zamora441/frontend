import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SaleTypeService from "../services/SaleTypeService";
import Swal from "sweetalert2";
const UpdateSaleType = () => {
    const [descripcion, setDescripcion] = useState("");
    const { id } = useParams();
    const [alert, setAlert] = useState("");
    const initialType = {
        descripcion: "",
        id_tipo_venta: 0,
    };
    const [type, setType] = useState(initialType);

    const getType = (id) => {
        console.log(id);
        SaleTypeService.get(id)
            .then((response) => {
                console.log(response.data);
                setType(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateType = () => {
        const data = {
            descripcion: descripcion,
            id_tipo_venta: id,
        };
        SaleTypeService.update(data)
            .then((response) => {
                console.log(response.data);
                Swal.fire({
                    icon: "success",
                    title: "Tipo actualizado correctamente",
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
        getType(id);
    }, []);

    const handleSubmit = () => {
        if (descripcion === "") {
            const mesagge = "Debe rellenar todos los datos";
            setAlert(mesagge);
        } else {
            setAlert("");
            updateType();
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
                        placeholder={type.descripcion}
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
                        Modificar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateSaleType;
