
const Log()=>{
new gridjs.Grid({
    search: true,
    pagination: {
        enabled: true,
        summary: false,
    },
    columns: ["ID", "DESCRIPCION", "FECHA"],
    server: {
        method: "GET",
        url: "http://localhost:8080/log",
        then: (data) =>
            data.map((log) => [log.id_log, log.descripcion, log.fecha]),
    },
    styles: {
        th: {
            backgroundColor: "#999",
            width: "100%",
        },
    },
}).render(document.getElementById("table"));
}

export default Log