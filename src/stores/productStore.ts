import { defineStore } from 'pinia'
import axios from 'axios'
import { setHeaders } from './setHeader';
import { message } from 'ant-design-vue';

export const useProductStore = defineStore('product', {
    state: () => {
        return { items: [], status: "idle", createStatus: "", updateStatus: "" }
} ,
    getters: {
      itemsCount: (state) => state.items.length,
    },
    actions: {
        async fetchProducts () {
            this.status = 'loading';
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
                this.items = response?.data || []
                this.status = "success"
            } catch (error) {
                console.error("Error fetching products:", error);
                this.status = 'error';
            }
            
        },
        async createProduct (values: any) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/products`, values, setHeaders())
                const newProduct = response?.data;
                this.items.push(newProduct);
                message.success(`${newProduct.name} added to list product`);
            } catch (error) {
                console.log(error)
                message.error(`${error}`);
            }
        },
        async updateProduct ({id, values} : any) {
            try {
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/products/${id}`, values, setHeaders());
                const updateProduct = response?.data;
                const itemIndex = this.items.findIndex((item : any) => item._id === id);
                this.items[itemIndex] = updateProduct;
                message.success(`${updateProduct.name} updated success`);
            } catch (error) {
                console.log(error)
                message.error(`${error}`);
            }
        },
        async deleteProduct ({id}: any) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, setHeaders())
                const deleteProduct = response?.data;
                // const itemIndex = this.items.findIndex((item : any) => item._id === id);
                console.log(id)
                this.items.splice(this.items.findIndex((arrow: any) => arrow._id === id), 1)
                message.success(`${deleteProduct.name} deleted from list product`);
            } catch (error) {
                console.log(error)
                message.error(`${error}`);
            }
        },
    },
  })