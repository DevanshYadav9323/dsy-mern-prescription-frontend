import React,{useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router";
import AppConfig from "../constants/config";


const AuthContext = React.createContext();

const AuthProvider = ({ children })=>{
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const baseUrl = AppConfig.baseUrl

    const onLogout = async () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href ="/login"
        // history?.push("/login");
    };


    useEffect(() => {
        const verifyToken = async () => {
            setLoading(true);
            
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                   history.replace('/login')                    
                } 
            } catch (e) {
                onLogout();
            }
            setLoading(false);      
        };
        if (window.location.pathname !=="/login") {
            verifyToken()
        }
    },[history])

    const value = {
		onLogout,
		loading
	};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
