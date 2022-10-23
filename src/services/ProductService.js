import http from "../http-common";

const getAll = () => {
    return http.get("/producto");
};

const get = (id) => {
    return http.get(`/producto/${id}`);
};

const create = (data) => {
    return http.post("/producto", data);
};

const update = (data) => {
    return http.put(`/producto`, data);
};

const remove = (id) => {
    return http.delete(`producto/${id}`);
};

const ProductoService = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default ProductoService;
