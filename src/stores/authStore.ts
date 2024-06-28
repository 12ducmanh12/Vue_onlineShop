import axios from "axios";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      token: localStorage.getItem("token"),
      name: "",
      email: "",
      _id: "",
      isAdmin: "",
      registerStatus: "",
      registerError: "",
      loginStatus: "",
      loginError: "",
      userLoaded: false,
    };
  },
  actions: {
    async login (user: any) {
        this.loginStatus = 'pending';
        try {
            const response  = await axios.post(`${import.meta.env.VITE_API_URL}/login`,{
                email: user.email,
                password: user.password
            });
            const token = response.data;
            localStorage.setItem("token",token);
            this.setUserData(token);
            this.loginStatus = 'success';  
        } catch (error : any) {
            console.log(error?.response?.data);
            this.loginStatus = 'rejected';
            this.loginError = error?.response?.data;
        }
    },
    async register(user: any) {
        this.registerStatus = "pending";
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`,{
                name: user.name,
                email: user.email,
                password: user.password
            });
            const token = response.data
            localStorage.setItem("token",token); 
            this.registerStatus = 'success';  
        } catch (error : any) {
            console.log(error.response.data);
            this.registerStatus = 'rejected';
            this.registerError = error.response.data;
        }
    },
    setUserData(token: any) {
        const user : any = jwtDecode(token);
        this.token = token;
        this.name = user.name;
        this.email = user.email;
        this._id = user._id;
        this.isAdmin = user.isAdmin;
        this.userLoaded = true;
    },
    loadUser() {
        const token = this.token;
        if (token) {
            this.setUserData(token);
        }
    },
    logOutUser() {
        localStorage.removeItem('token');
        this.token = '';
        this.name = '';
        this.email = '';
        this._id = '';
        this.isAdmin = '';
        this.registerStatus = '';
        this.registerError = '';
        this.loginStatus = '';
        this.loginError = '';
        this.userLoaded = false;
    }
  }
});
