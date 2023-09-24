import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { IRegisterFormData } from "../components/Form/RegisterForm";
import { ILoginFormData } from "../components/Form/LoginForm";
import { useNavigate } from "react-router-dom";
import * as z from 'zod';

interface IUserProviderProps{
    children: React.ReactNode;
}

interface IUserContext{
    usersLogin: (formData: ILoginFormData,  setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>;
    userRegister: (formData: IRegisterFormData,  setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>;
    user: IUser | null;
    userLogout: () => void;
    
}

interface IUser{
    id: string;
    name: string;
    email: string;
}

interface IUserLoginRegisterResponse{
    accessToken: string;
    user: IUser

}


export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {


    useEffect(() => {
        console.log("Montou")
        const token = localStorage.getItem("@TOKEN");
        const userId = localStorage.getItem("@USERID");
        
        const userAutoLogin = async () => {
            try{
                const {data} = await api.get<IUser>(`/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(data);
                navigate('/shop');

            }
            catch(error){
                console.log(error);
                localStorage.removeItem("@TOKEN");
                localStorage.removeItem("@USERID");
            }
        }

        if (token && userId) {
            userAutoLogin();
        }
    }, []);

    const [user, setUser] = useState<IUser | null>(null);

    const navigate = useNavigate();

    const usersLogin = async (formData: ILoginFormData, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const {data}= await api.post<IUserLoginRegisterResponse>('/login', formData);
            localStorage.setItem("@TOKEN", data.accessToken);
            localStorage.setItem("@USERID", data.user.id);
            setUser(data.user);
            navigate('/shop');
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };

    const userRegister = async (formData: IRegisterFormData, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            setLoading(true);
            const {data}= await api.post<IUserLoginRegisterResponse>('/users', formData);
            localStorage.setItem("@TOKEN", data.accessToken);
            localStorage.setItem("@USERID", data.user.id)

            setUser(data.user);
            console.log(data);
            navigate('/shop');
        }
        catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }

    }




    const userLogout = () => {
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERID");
        setUser(null);
        navigate('/');
    }

    return (
        <UserContext.Provider value={{usersLogin, userRegister, user, userLogout}}>
            {children}
        </UserContext.Provider>
    )
}