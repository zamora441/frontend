import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PersonaService from "../services/PeopleServices";
import Swal from "sweetalert2";
const UpdatePerson = () => {
    const [idPerson, setId] = useState("");
    const [name, setName] = useState("");
    const { id } = useParams();
    const [alert, setAlert] = useState("");
    const initialPerson = {
        id_persona: 0,
        identificacion: "",
        nombre: "",
    };
    const [person, setPerson] = useState(initialPerson);

    const getPerson = (id) => {
        console.log(id);
        PersonaService.get(id)
            .then((response) => {
                console.log(response.data);
                setPerson(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updatePerson = () => {
        const data = {
            id_persona: id,
            identificacion: idPerson,
            nombre: name,
        };
        PersonaService.update(data)
            .then((response) => {
                console.log(response.data);
                Swal.fire({
                    icon: "success",
                    title: "Persona actualizada correctamente",
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
        getPerson(id);
    }, []);

    const handleSubmit = () => {
        if (idPerson === "" || name === "") {
            const mesagge = "Debe rellenar todos los datos";
            setAlert(mesagge);
        } else {
            setAlert("");
            updatePerson();
        }
    };
    return (
        <div className="container mt-5 pt-5 border">
            <form>
                <div className="mb-3 ">
                    <label
                        htmlFor="id"
                        className="form-label">
                        Identificacion
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        value={idPerson}
                        placeholder={person.identificacion}
                        onChange={(e) => {
                            setId(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder={person.nombre}
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
                        class="btn btn-info text-dark fs-5 fw-bolder"
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

export default UpdatePerson;
