import React from "react";
import { useNavigate } from "react-router-dom";
import { TokenChecker } from "../utils/tokenChecker";

export const AppContext = React.createContext<{
    isAuth: boolean | null;
    logout: () => void;
}>({
    isAuth: (() => {
        const token: string | null = localStorage.getItem("accessToken");
        if (token !== null) {
            return TokenChecker(token);
        }
        return false;
    })(),
    logout: () => {},
});

export const AppProvider: React.FC<{}> = ({ children }) => {
    const token: string | null = localStorage.getItem("accessToken");

    return (
        <AppContext.Provider
            value={{
                isAuth: token !== null ? TokenChecker(token) : false,
                logout: () => {
                    console.log("logout");
                    localStorage.removeItem("accessToken");
                    window.location.href = "/";
                },
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
