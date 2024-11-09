import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    categories: [],
    products: [],
    loading: null,
    setCurrentUser: () => {},
    setUserToken: () => {},
    fetchCategories: () => {},
    fetchProducts: () => {},
    updateUserProfile: () => {},
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [userToken, _setUserToken] = useState(
        localStorage.getItem("TOKEN") || ""
    );
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const fetchProducts = () => {
        setLoading(true);
        axiosClient
            .get("/product")
            .then((res) => {
                setProducts(res.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetchong products", error);
            });
    };

    const updateUserProfile = (userData) => {
        return axiosClient.put("/user/update", userData).then(({ data }) => {
            setCurrentUser(data);
            return data;
        });
    };

    useEffect(() => {
        if (userToken) {
            fetchCategories();
            fetchProducts();
        }
    }, [userToken]);

    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                categories,
                fetchCategories,
                products,
                fetchProducts,
                loading,
                updateUserProfile,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
