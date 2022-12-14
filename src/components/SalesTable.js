import deleteIcon from "../assets/icons/trash.png";
import SaleService from "../services/SaleService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const SalesTable = () => {
    const [sales, setSales] = useState([]);
    const [load, setLoad] = useState(false);
    const getAll = () => {
        SaleService.getAll()
            .then((response) => {
                setSales(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getAll();
    }, [load]);

    const deleteSale = (id) => {
        SaleService.remove(id)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Venta eliminada correctamente",
                });
                console.log(response.data);
                setLoad(!load);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Fallo. No se pudo eliminar la venta",
                });
                console.log(error);
            });
    };
    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr className="table-dark border-dark text-info">
                        <th scope="col">Id</th>
                        <th scope="col">Tipo venta</th>
                        <th scope="col">Persona</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/*//() despues de la => en vez de {}, ya que el () es para hacer un return de varias lineas*/}
                    {sales.map((sale) => (
                        <tr
                            className="border-start border-end border-info "
                            key={sale.id_venta}>
                            <th scope="row">{sale.id_venta}</th>
                            <td>{sale.tipo_venta.descripcion}</td>
                            <td>{sale.persona.nombre}</td>
                            <td>{sale.producto.descripcion}</td>
                            <td>{sale.cantidad}</td>
                            <td>{sale.fecha}</td>
                            <td>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        deleteSale(sale.id_venta);
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

export default SalesTable;
