import { useState } from "react";
import { Link } from "react-router-dom";
import PersonaService from "../services/PeopleServices";
import Swal from "sweetalert2";
const CreatePerson = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [alert, setAlert] = useState("");
    const createPerson = () => {
        const data = {
            identificacion: id,
            nombre: name,
        };
        PersonaService.create(data)
            .then((response) => {
                console.log(response);
                setId("");
                setName("");
                Swal.fire({
                    icon: "success",
                    title: "Persona Agregado correctamente",
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
        if (id === "" || name === "") {
            const mesagge = "Debe rellenar todos los datos";
            setAlert(mesagge);
        } else {
            setAlert("");
            createPerson();
        }
    };
    return (
        <div className="container mt-5 pt-5">
            <div class="card">
                <div class="card-header bg-dark text-info fs-3">
                    Agregar Persona
                </div>
                <div class="card-body">
                    <form className="form-group">
                        <div className="mb-3 ">
                            <label
                                for="id"
                                className="form-label">
                                Identificacion
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                required
                                value={id}
                                onChange={(e) => {
                                    setId(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                for="name"
                                className="form-label">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
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
                                to="/personas"
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
export default CreatePerson;
