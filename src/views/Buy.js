import SaleTypeService from "../services/SaleTypeService";
import PersonaService from "../services/PeopleServices";
import ProductService from "../services/ProductService";
import SaleService from "../services/SaleService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const Buy = () => {
    const [people, setPeople] = useState([]);
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState([]);
    const [amountInput, setAmountInput] = useState(0);
    const [person, setPerson] = useState(null);
    const [product, setProduct] = useState(null);
    const [type, setType] = useState(null);
    const [amount, setAmount] = useState(0);
    const [load, setLoad] = useState(false);

    const getAllPeople = () => {
        PersonaService.getAll()
            .then((response) => {
                setPeople(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAllTypes = () => {
        SaleTypeService.getAll()
            .then((response) => {
                setTypes(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAllProducts = () => {
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
        getAllPeople();
        getAllProducts();
        getAllTypes();
    }, [load]);

    const createSale = (person, product, type, amount) => {
        const data = {
            tipo_venta: type,
            persona: person,
            producto: product,
            cantidad: parseInt(amount),
        };
        if (type === null && person === null && product === null) {
            Swal.fire({
                icon: "info",
                title: "Seleccione las opciones",
                text: "No selecciono ninguna opcion. Seleccione todas la opciones necesarias.",
            });
        } else if (type === null || person === null || product === null) {
            Swal.fire({
                icon: "info",
                title: "No ha seleccionado todos los datos.",
                text: "Debe seleccionar todos los datos",
            });
        } else if (parseInt(amount) === 0 || parseInt(amount) < 0) {
            Swal.fire({
                icon: "error",
                title: "No selecciono una cantidad",
                text: "Debe seleccionar una cantidad mayor a 0",
            });
        } else if (amount > product.cantidad) {
            Swal.fire({
                icon: "error",
                title: "Cantidad insuficiente",
                text: "La cantidad seleccionada sobrepasa el stock disponible",
            });
        } else {
            SaleService.create(data)
                .then((response) => {
                    console.log(response.data);
                    setLoad(!load);
                    Swal.fire({
                        icon: "success",
                        title: "Compra realizada",
                    });
                })

                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleSubmit = () => {
        console.log(person);
        console.log(product);
        console.log(type);
        console.log(amount);
        createSale(person, product, type, amount);
    };

    return (
        <div className="container px-5 pt-5 ">
            <div class="card">
                <div class="card-header bg-dark text-info fs-3">
                    Realizar compra
                </div>
                <div class="card-body">
                    <form className="row px-5 ">
                        <div className="col-md-10 offset-md-3">
                            <div className="row mb-3 ">
                                <label
                                    htmlFor="person"
                                    className="col-sm-2 col-form-label">
                                    Persona
                                </label>
                                <div className="col-sm-3">
                                    <select
                                        id="person"
                                        className="form-select"
                                        onChange={(e) => {
                                            setPerson(
                                                JSON.parse(e.target.value)
                                            );
                                        }}
                                        onBlur={(e) => {
                                            setPerson(
                                                JSON.parse(e.target.value)
                                            );
                                        }}>
                                        <option>Seleccione persona</option>
                                        {people.map((person) => (
                                            <option
                                                key={person.id_persona}
                                                value={JSON.stringify(person)}>
                                                {person.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label
                                    htmlFor="type"
                                    className="col-sm-2 col-form-label">
                                    Tipo venta
                                </label>
                                <div className="col-sm-3">
                                    <select
                                        id="type"
                                        className="form-select"
                                        onChange={(e) => {
                                            setType(JSON.parse(e.target.value));
                                        }}
                                        onBlur={(e) => {
                                            setType(JSON.parse(e.target.value));
                                        }}>
                                        <option>Seleccione tipo</option>
                                        {types.map((type) => (
                                            <option
                                                key={type.id_venta}
                                                value={JSON.stringify(type)}>
                                                {type.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label
                                    htmlFor="product"
                                    className="col-sm-2 col-form-label">
                                    Producto
                                </label>
                                <div className="col-sm-3">
                                    <select
                                        id="product"
                                        className="form-select"
                                        onChange={(e) => {
                                            setProduct(
                                                JSON.parse(e.target.value)
                                            );
                                            setAmountInput(
                                                JSON.parse(e.target.value)
                                                    .cantidad
                                            );
                                        }}
                                        onBlur={(e) => {
                                            setProduct(
                                                JSON.parse(e.target.value)
                                            );
                                            setAmountInput(
                                                JSON.parse(e.target.value)
                                                    .cantidad
                                            );
                                        }}>
                                        <option>Seleccione Producto</option>
                                        {products.map((product) => (
                                            <option
                                                key={product.id_producto}
                                                value={JSON.stringify(product)}>
                                                {product.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <label className=" col-sm-2 col-form-label ">
                                    {`Cantidad Max: ${amountInput}`}
                                </label>

                                <div className="col-sm-2 ">
                                    <input
                                        type="number"
                                        id="amount"
                                        className="form-control"
                                        min="1"
                                        max={amountInput}
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 offset-md-3">
                                <button
                                    className="col align-self-center btn btn-dark text-info fw-bolder mb-3"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSubmit();
                                    }}>
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="card-footer text-muted bg-secondary"></div>
            </div>
        </div>
    );
};

export default Buy;
