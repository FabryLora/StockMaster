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
    const MotionLink = motion(Link);

    const links = [
        { to: "/products", title: "Productos" },
        { to: "/ventas", title: "Ventas" },
        { to: "#", title: "Gestor de productos" },
        { to: "#", title: "Gestor de ventas" },
    ];

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
                <nav className="flex flex-row justify-items-center items-center px-2 py-3 shadow-sm shadow-[#9FADBC] gap-5">
                    <Link>
                        <img className="w-[200px]" src={logo} alt="logo" />
                    </Link>
                    <ul className="w-full flex flex-row gap-4 text-base text-[#9FADBC]">
                        {links.map((link) => (
                            <MotionLink
                                to={link.to}
                                key={link.title}
                                className="py-2 px-3 rounded-md"
                                whileHover={{ backgroundColor: "#2b2f37" }}
                            >
                                {link.title}
                            </MotionLink>
                        ))}
                    </ul>
                    <div className="absolute right-5">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="border-2 border-[#9FADBC] flex items-center justify-center w-8 h-8 rounded-full"
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                style={{ color: "#9FADBC" }}
                            />
                        </motion.button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    transition={{
                                        type: easeInOut,
                                        duration: 0.2,
                                    }}
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
                </nav>
            </header>
            <div>
                <Outlet />
            </div>
        </>
    );
}
