import http from "../http-common";

const getAll = () => {
    return http.get("/venta");
};

const get = (id) => {
    return http.get(`/venta/${id}`);
};

const create = (data) => {
    return http.post("/venta", data);
};

const update = (data) => {
    return http.put(`/venta`, data);
};

const remove = (id) => {
    return http.delete(`venta/${id}`);
};

const SaleService = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default SaleService;
