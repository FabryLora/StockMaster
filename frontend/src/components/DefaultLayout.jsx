import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, easeIn, easeInOut, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import logo from "../assets/logo-no-background.png";
import logotiny from "../assets/logotiny.png";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const MotionLink = motion.create(Link);

    const links = [
        { to: "/productos", title: "Productos" },
        { to: "/ventas", title: "Ventas" },
        { to: "/gestordeventas", title: "Gestor de ventas" },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [tinyMenu, setTinyMenu] = useState(false);

    const { currentUser, userToken, setCurrentUser, setUserToken } =
        useStateContext();

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
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

    if (!userToken) {
        return <Navigate to={"home"} />;
    }
    return (
        <>
            <header className="text-white font-gothic text-lg bg-defaultbg">
                <nav className="flex flex-row justify-items-center items-center shadow-lg shadow-specialblue/20 gap-5 max-md:justify-between max-md:pl-3 max-md:py-2 px-4">
                    <button
                        onClick={() => setTinyMenu(!tinyMenu)}
                        className="md:hidden"
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                    <AnimatePresence>
                        {tinyMenu && (
                            <>
                                <motion.div
                                    initial={{
                                        backgroundColor: "rgba(0,0,0,0)",
                                    }}
                                    animate={{
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                    }}
                                    exit={{
                                        backgroundColor: "rgba(0,0,0,0)",
                                    }}
                                    className="absolute top-0 left-0 h-screen w-screen z-20"
                                >
                                    <motion.div
                                        initial={{ scaleX: 0, originX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{
                                            type: easeIn,
                                            duration: 0.2,
                                        }}
                                        exit={{ scaleX: 0 }}
                                        className="flex flex-col h-full w-72 bg-defaultbg p-4 px-5 shadow-xl"
                                    >
                                        <button
                                            className="self-end border-2 text-xl border-red-500 rounded-full text-red-500 flex items-center justify-center w-8 h-8 hover:bg-red-500 hover:text-white transition-colors"
                                            onClick={() =>
                                                setTinyMenu(!tinyMenu)
                                            }
                                        >
                                            x
                                        </button>
                                        <ul className="w-full flex flex-col gap-4 py-4 text-base text-[#9FADBC]">
                                            {links.map((link) => (
                                                <MotionLink
                                                    to={link.to}
                                                    key={link.title}
                                                    className="py-1 px-3 rounded-md"
                                                    whileHover={{
                                                        backgroundColor:
                                                            "#2b2f37",
                                                    }}
                                                >
                                                    {link.title}
                                                </MotionLink>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                    <Link className="pl-2">
                        <img
                            className="w-[200px] max-md:hidden"
                            src={logo}
                            alt="logo"
                        />
                        <img
                            className="w-[40px] md:hidden"
                            src={logotiny}
                            alt="logo"
                        />
                    </Link>
                    <ul className="w-full flex flex-row gap-6 py-2 text-base text-[#9FADBC] max-md:hidden">
                        {links.map((link) => (
                            <MotionLink
                                to={link.to}
                                key={link.title}
                                className="py-2 px-4 rounded-md hover:text-white transition-colors"
                                whileHover={{ backgroundColor: "#2b2f37" }}
                            >
                                {link.title}
                            </MotionLink>
                        ))}
                    </ul>
                    <div className="pr-5">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="border-2 border-[#9FADBC] flex items-center justify-center w-8 h-8 rounded-full relative"
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
                                    className="bg-[#292f33] rounded-lg p-5 w-fit absolute right-3 overflow-hidden flex flex-col gap-3 z-10 shadow-xl border border-gray-700"
                                >
                                    <div className="text-base border-b border-gray-700 pb-3">
                                        <p className="font-semibold">
                                            {currentUser.name}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            {currentUser.email}
                                        </p>
                                    </div>
                                    <MotionLink
                                        to={"/profile"}
                                        className="rounded-md text-specialblue flex justify-center items-center bg-defaultbg py-2 hover:bg-specialblue hover:text-white transition-colors"
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                    >
                                        Editar perfil
                                    </MotionLink>
                                    <MotionLink
                                        to={"/contact"}
                                        className="rounded-md text-specialblue flex justify-center items-center bg-defaultbg py-2 hover:bg-specialblue hover:text-white transition-colors"
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                    >
                                        Contacto
                                    </MotionLink>
                                    <motion.button
                                        onClick={(ev) => logout(ev)}
                                        className="rounded-md text-red-500 bg-defaultbg py-2 hover:bg-red-500 hover:text-white transition-colors"
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                    >
                                        Cerrar Sesión
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>
            </header>
            <main className="h-[calc(100vh-57px)] overflow-x-hidden bg-gray-100 dark:bg-gray-900">
                <Outlet />
            </main>
        </>
    );
}
