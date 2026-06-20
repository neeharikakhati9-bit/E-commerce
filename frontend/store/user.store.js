import { create } from "zustand";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { AUTH_URL } from "../constants";

export const useUserStore = create((set, get) => ({
  user: null,
  token: null,

  // sign up function
  signup: async (input) => {
    try {
      // check for empty fields
      if (!input.name || !input.password || !input.email || !input.cpassword) {
        toast.error("All fields are reqiured");
        return;
      }

      //   check if my password and confirm-password are same or not
      if (input.password !== input.cpassword) {
        toast.error("Password and confim password doesn't match");
        return;
      }

      // send http request with the inputs as body
      const response = await axios.post(`${AUTH_URL}/signup`, {
        ...input,
        cpassword: undefined,
      });
      if (response.status === 400) {
        throw new Error(response.data.message);
      }

      console.log(response.data);
      //   if everything will be okay so we will set the values we recieved from the backend
      set({
        user: response.data.user,
        token: response.data.token,
      });
      //   save token to localstorage
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  },

  // login function
  login: async (input) => {
    try {
      // check for empty fields
      if (!input.email || !input.password) {
        toast.error("All fields are required");
        return;
      }

      // send request to backend
      const response = await axios.post(`${AUTH_URL}/login`, input);
      if (response.status === 400) throw new Error(response.data.message);
      set({
        user: response.data.user,
        token: response.data.token,
      });
      // save token to localstorage
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response.data.message);
      } else toast.error(error.message);
    }
  },

  // check me function
  checkme: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(`${AUTH_URL}/check-me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 400) throw new Error(response.data.message);
      set({
        user: response.data.user,
      });
    } catch (error) {
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
      });
    }
  },
}));
