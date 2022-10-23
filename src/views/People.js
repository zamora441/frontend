import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PeopleTable from "../components/PeopleTable";
import PersonaService from "../services/PeopleServices";
const People = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    return (
        <div className="container  mt-5">
            <PeopleTable />
            <div class="d-grid gap-2 col-6 mx-auto">
                <Link
                    to="agregarPersona"
                    className="btn btn-dark text-info fs-5 fw-bolder"
                    type="button">
                    Agregar Persona
                </Link>
            </div>
        </div>
    );
};

export default People;
