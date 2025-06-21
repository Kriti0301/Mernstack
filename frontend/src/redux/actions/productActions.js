import axios from "axios";
import {
  CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
  READ_PRODUCTS_REQUEST, READ_PRODUCTS_SUCCESS, READ_PRODUCTS_FAILURE,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE,
} from "../types";
import { toast } from "react-toastify";

// Helper to attach token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Fetch All Products
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: READ_PRODUCTS_REQUEST });
  try {
    const token = localStorage.getItem("token");

    const query = new URLSearchParams(params).toString();
    const response = await axios.get(`/api/products?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: READ_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: READ_PRODUCTS_FAILURE, payload: error.message });
    toast.error("Failed to fetch products!");
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const response = await axios.post("/api/products", productData, getAuthHeader());
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response.data });
    toast.success("Product created successfully!");
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
    toast.error("Failed to create product!");
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const response = await axios.put(`/api/products/${id}`, productData, getAuthHeader());
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
    toast.success("Product updated successfully!");
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
    toast.error("Failed to update product!");
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    await axios.delete(`/api/products/${id}`, getAuthHeader());
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    toast.success("Product deleted successfully!");
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    toast.error("Failed to delete product!");
  }
};
