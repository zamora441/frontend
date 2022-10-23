import editIcon from "../assets/icons/editar.png";
import deleteIcon from "../assets/icons/trash.png";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PersonaService from "../services/PeopleServices";
import { Link } from "react-router-dom";
const PeopleTable = () => {
    const [people, setPeople] = useState([]);
    const [load, setLoad] = useState(false);
    const getAll = () => {
        PersonaService.getAll()
            .then((response) => {
                setPeople(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAll();
    }, [load]);

    const deletePerson = (id) => {
        PersonaService.remove(id)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Persona eliminada correctamente",
                });
                console.log(response.data);
                setLoad(!load);
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Fallo. No se pudo eliminar la persona",
                });
            });
    };

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr className="table-dark border-dark text-info">
                        <th scope="col">Id</th>
                        <th scope="col">Identificacion</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/*//() despues de la => en vez de {}, ya que el () es para hacer un return de varias lineas*/}
                    {people.map((person) => (
                        <tr
                            className="border-start border-end border-info "
                            key={person.id_persona}>
                            <th scope="row">{person.id_persona}</th>
                            <td>{person.identificacion}</td>
                            <td>{person.nombre}</td>
                            <td>
                                <Link
                                    to={"" + person.id_persona}
                                    className="btn">
                                    <img
                                        src={editIcon}
                                        alt="icono editar"
                                    />
                                </Link>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        deletePerson(person.id_persona);
                                    }}>
                                    <img
                                        src={deleteIcon}
                                        alt="icono eliminar"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PeopleTable;
