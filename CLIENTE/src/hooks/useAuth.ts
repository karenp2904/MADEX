import { IUsuario } from "@/models/interfaces/IUsuario";
import { create } from "zustand"

export type IUseAuth = {
    user: IUsuario | null
    auth: () => void
}

export const useAuth = create<IUseAuth>((set) => ({
    user: null,
    auth: async () => {
        const usuario = localStorage.getItem("usuario");
        if(usuario) {
            set({
                user: JSON.parse(usuario)
            })
        }
    }
}));