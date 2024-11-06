import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    categories: [],
    setCurrentUser: () => {},
    setUserToken: () => {},
    fetchCategories: () => {},
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [userToken, _setUserToken] = useState(
        localStorage.getItem("TOKEN") || ""
    );
    const [categories, setCategories] = useState([]);

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem("TOKEN", token);
        } else {
            localStorage.removeItem("TOKEN");
        }
        _setUserToken(token);
    };

    const fetchCategories = () => {
        axiosClient
            .get("/category")
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetchong categories", error);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                categories,
                fetchCategories,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
