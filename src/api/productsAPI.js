import axios from "axios";

const productsAPI = axios.create({
  baseURL: 'http://localhost:3000/products'
})

export const getProducts = async () => {
  const res = await productsAPI.get('/')
  return res.data;
}

export const createProduct = (product) => productsAPI.post('/', product);

export const deleteProduct = id => productsAPI.delete(`/${id}`);

// export const updateProduct = async (id = null) => {
//   const res = await productsAPI.get(`/${id}`);
//   return res.data;
// }

export const updateProduct = id => productsAPI.get(`/${id}`);
// export const updateProduct = (product) => productsAPI.get(`/${product.id}`, product);