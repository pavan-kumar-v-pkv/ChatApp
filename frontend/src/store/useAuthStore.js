import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
    authUser: {name: 'john', _id:123, age:30}._id,
    isLoggedIn: false,
    login: () => {
        console.log("login called");
        set({ authUser: {name: 'john', _id:123, age:30}._id, isLoggedIn: true });
    }
}));