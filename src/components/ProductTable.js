import editIcon from "../assets/icons/editar.png";
import deleteIcon from "../assets/icons/trash.png";
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [load, setLoad] = useState(false);
    const getAll = () => {
        ProductService.getAll()
            .then((response) => {
                setProducts(response.data);
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
        ProductService.remove(id)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Producto eliminado correctamente",
                });
                console.log(response.data);
                setLoad(!load);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Fallo. No se pudo eliminar el producto",
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
                        <th scope="col">Descripcion</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/*//() despues de la => en vez de {}, ya que el () es para hacer un return de varias lineas*/}
                    {products.map((product) => (
                        <tr
                            className="border-start border-end border-info "
                            key={product.id_producto}>
                            <th scope="row">{product.id_producto}</th>
                            <td>{product.descripcion}</td>
                            <td>{product.cantidad}</td>
                            <td>
                                <Link
                                    to={"" + product.id_producto}
                                    className="btn">
                                    <img
                                        src={editIcon}
                                        alt="icono editar"
                                    />
                                </Link>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        deletePerson(product.id_producto);
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
export default ProductTable;
