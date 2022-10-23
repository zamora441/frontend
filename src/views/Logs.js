import "gridjs/dist/theme/mermaid.css";
import { Grid } from "gridjs-react";
import { useEffect, useState } from "react";
import LogService from "../services/LogServices";

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const getAll = () => {
        LogService.getAll()
            .then((response) => {
                console.log(response.data);
                setLogs(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="w-50 h-50">
            <Grid
                data={logs.map((log) => [
                    log.id_log,
                    log.descripcion,
                    log.fecha,
                ])}
                columns={["ID", "DESCRIPCION", "FECHA"]}
                search={true}
                pagination={{
                    enabled: true,
                    limit: 20,
                }}
                styles={{
                    th: {
                        backgroundColor: "#999",
                        width: "100%",
                    },
                }}
            />
        </div>
    );
};

export default Logs;
