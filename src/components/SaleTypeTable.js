import editIcon from "../assets/icons/editar.png";
import deleteIcon from "../assets/icons/trash.png";
import SaleTypeService from "../services/SaleTypeService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const SaleTypeTable = () => {
    const [types, setTypes] = useState([]);
    const [load, setLoad] = useState(false);
    const getAll = () => {
        SaleTypeService.getAll()
            .then((response) => {
                setTypes(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getAll();
    }, [load]);

    const deleteType = (id) => {
        SaleTypeService.remove(id)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Tipo eliminado correctamente",
                });
                console.log(response.data);
                setLoad(!load);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Fallo. No se pudo eliminar el tipo",
                });
                console.log(error);
            });
    };
    return (
        <div>
            <table className="table table-hover ">
                <thead>
                    <tr className="table-dark border-dark text-info">
                        <th scope="col">Id</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/*//() despues de la => en vez de {}, ya que el () es para hacer un return de varias lineas*/}
                    {types.map((type) => (
                        <tr
                            className="border-start border-end border-info "
                            key={type.id_tipo_venta}>
                            <th scope="row">{type.id_tipo_venta}</th>
                            <td>{type.descripcion}</td>
                            <td>
                                <Link
                                    to={"" + type.id_tipo_venta}
                                    className="btn">
                                    <img
                                        src={editIcon}
                                        alt="icono editar"
                                    />
                                </Link>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        deleteType(type.id_tipo_venta);
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

export default SaleTypeTable;
