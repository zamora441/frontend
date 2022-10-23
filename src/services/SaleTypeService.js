import http from "../http-common";

const getAll = () => {
    return http.get("/tipo_venta");
};

const get = (id) => {
    return http.get(`/tipo_venta/${id}`);
};

const create = (data) => {
    return http.post("/tipo_venta", data);
};

const update = (data) => {
    return http.put(`/tipo_venta`, data);
};

const remove = (id) => {
    return http.delete(`tipo_venta/${id}`);
};

const SaleTypeService = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default SaleTypeService;
