import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Link, Navigate, Outlet } from "react-router-dom";
import logo from "../assets/logo-no-background.png";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
/* import "./defaultlayout.css"; */

export default function DefaultLayout() {
    const [isOpen, setIsOpen] = useState(false);

    const { currentUser, userToken, setCurrentUser, setUserToken } =
        useStateContext();

    if (!userToken) {
        return <Navigate to={"login"} />;
    }

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then((res) => {
            setCurrentUser({});
            setUserToken(null);
        });
    };

    useEffect(() => {
        axiosClient
            .get("/me")
            .then(({ data }) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
            });
    }, [setCurrentUser]);

    return (
        <>
            <header className="text-white font-gothic text-lg">
                <nav className="grid grid-cols-3 justify-items-center items-center p-2 shadow-md shadow-gray-700">
                    <ul className="w-full flex justify-evenly">
                        <Link>Productos</Link>
                        <Link>Ventas</Link>
                    </ul>
                    <Link>
                        <img src={logo} width={400} alt="" />
                    </Link>
                    <ul className="w-full flex justify-evenly items-center">
                        <Link>Gestor de Ventas</Link>
                        <Link>Gestor de Productos</Link>
                        <div className="absolute right-5">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsOpen(!isOpen)}
                                className="border-2 border-white w-9 h-9 rounded-full"
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </motion.button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        transition={{
                                            type: easeInOut,
                                            duration: 0.2,
                                        }}
                                        tr
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 10, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        className="bg-[#292f33] rounded-md p-4 w-fit absolute -right-4 overflow-hidden flex flex-col gap-2"
                                    >
                                        <div className="text-base">
                                            <p>{currentUser.name}</p>
                                            <p>{currentUser.email}</p>
                                        </div>
                                        <motion.button
                                            onClick={(ev) => logout(ev)}
                                            className="rounded-md text-red-500 bg-defaultbg"
                                            whileTap={{
                                                scale: 0.9,
                                            }}
                                        >
                                            Cerrar Sesion
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </ul>
                </nav>
            </header>
            <body>
                <Outlet />
            </body>
        </>
    );
}
