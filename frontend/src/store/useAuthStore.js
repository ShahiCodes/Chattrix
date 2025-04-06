import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
// import { set } from "mongoose";

const BAS_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api": "/"; 

export const useAuthStore = create((set, get) => ({
    authUser: null,
   
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    // Adding default onlineUsers
    onlineUsers: [],
    socket: null,
    // remember to remove it

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
            get().connectSocket(); 
        } catch (error) {
            console.log("error checking auth", error)
            set({authUser: null});

        } finally{
            set({isCheckingAuth: false})
        }
    },


    signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account created successfully");
          get().connectSocket();
        } catch (error) {
            console.log("signup error")
          toast.error(error.response.data.message);
        } finally {
          set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");

          get().disconnectSocket();
    
          get().connectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
      },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
      const {authUser} = get();
      if(!authUser || get().socket?.connected) return;

      const socket = io(BAS_URL, {
        query: {
          userId: authUser._id,
        }
      });
      socket.connect();
      console.log("Socket connected for user:", authUser._id);

      set({ socket: socket});

      socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
      })
    },

    disconnectSocket: () => {
      if(get().socket?.connected) get().socket.disconnect();

    }
}))