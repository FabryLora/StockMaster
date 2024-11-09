import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import gestor from "../assets/gestordeventas.webp";
import inventoryLogo from "../assets/inventory-logo.png";
import logo from "../assets/logo-no-background.png";
import product from "../assets/productos.webp";
import sales from "../assets/sales.webp";

export default function HomePage() {
    const [imageIndex, setImageIndex] = useState(0);

    const images = [product, sales, gestor];
    const MotionLink = motion.create(Link);

    return (
        <>
            <header className="text-white bg-white sticky top-0 z-50">
                <nav className="flex flex-row justify-evenly items-center p-2 relative shadow-md">
                    <Link to={"/home"} className="w-full flex justify-center">
                        <img src={logo} width={300} alt="" />
                    </Link>
                    <ul className="flex flex-row gap-5 absolute right-10 text-specialblue">
                        <MotionLink
                            whileTap={{ scale: 0.9 }}
                            to={"/login"}
                            className="py-1 px-2 rounded-md border-specialblue border-[2px]"
                        >
                            Iniciar Sesion
                        </MotionLink>
                        <MotionLink
                            whileTap={{ scale: 0.9 }}
                            to={"/signup"}
                            className="px-3 py-1 rounded-md border-specialblue border-[2px]"
                        >
                            Registrarse
                        </MotionLink>
                    </ul>
                </nav>
            </header>
            <div className="justify-center flex py-16 bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className="flex flex-row justify-between items-center w-[80%] max-w-7xl mx-auto">
                    <div className="flex justify-center items-center">
                        <div className="flex flex-col justify-center font-poppins w-full gap-4 text-white">
                            <h2 className="font-bold text-[2rem]">
                                <span className="">Stock Master</span> es tu
                                solución para gestionar productos y llevar el
                                control de las ventas diarias
                            </h2>
                            <p className="text-lg">
                                ¡Agrega nuevos artículos o revisa el rendimiento
                                de tus ventas!
                            </p>
                            <div className="flex flex-row gap-3">
                                <input
                                    className="p-3 rounded-md border border-gray-400 focus:outline-none text-black"
                                    type="text"
                                    placeholder="Ingresa tu mail..."
                                />
                                <Link
                                    to={"/signup"}
                                    className="p-3 rounded-md bg-[#017cc5] text-white"
                                >
                                    Registrate
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div>
                        <img src={inventoryLogo} alt="" />
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-poppins text-white py-24">
                <div className="flex flex-col w-[90%] max-w-7xl mx-auto gap-16">
                    <div className="flex flex-col gap-6 max-w-2xl">
                        <h3 className="text-xl font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-pink-200">
                            EL ABC DE STOCKMASTER
                        </h3>
                        <h2 className="text-5xl font-bold leading-tight">
                            Un centro neurálgico de productividad
                        </h2>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-row gap-6">
                            <motion.div
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setImageIndex(0)}
                                className={`w-1/3 rounded-xl flex flex-col p-6 cursor-pointer backdrop-blur-sm transition-all duration-300 ${
                                    imageIndex == 0
                                        ? "bg-white/10 shadow-2xl border-blue-400 border-2"
                                        : "hover:bg-white/5"
                                }`}
                            >
                                <h2 className="font-bold text-2xl mb-3">
                                    Productos
                                </h2>
                                <p className="text-gray-100 leading-relaxed">
                                    Organiza tus productos de forma fácil y
                                    segura. Con esta funcionalidad, podrás
                                    guardar todos tus productos para tenerlos
                                    siempre disponibles y listos para usar
                                    cuando lo necesites. ¡Ahorra tiempo y lleva
                                    el control de tu inventario sin
                                    complicaciones!
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setImageIndex(1)}
                                className={`w-1/3 rounded-xl flex flex-col p-6 cursor-pointer backdrop-blur-sm transition-all duration-300 ${
                                    imageIndex == 1
                                        ? "bg-white/10 shadow-2xl border-pink-400 border-2"
                                        : "hover:bg-white/5"
                                }`}
                            >
                                <h2 className="font-bold text-2xl mb-3">
                                    Ventas
                                </h2>
                                <p className="text-gray-100 leading-relaxed">
                                    Simplifica el proceso de ventas registrando
                                    todas tus transacciones diarias. Escoge los
                                    productos guardados y añade las ventas de
                                    manera rápida y precisa, para que no se te
                                    escape ningún detalle. ¡Mantén el control
                                    total de tus ventas!
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setImageIndex(2)}
                                className={`w-1/3 rounded-xl flex flex-col p-6 cursor-pointer backdrop-blur-sm transition-all duration-300 ${
                                    imageIndex == 2
                                        ? "bg-white/10 shadow-2xl border-purple-400 border-2"
                                        : "hover:bg-white/5"
                                }`}
                            >
                                <h2 className="font-bold text-2xl mb-3">
                                    Gestion
                                </h2>
                                <p className="text-gray-100 leading-relaxed">
                                    Visualiza tus ganancias de forma clara y
                                    sencilla. Esta herramienta te permite ver
                                    cuánto has ganado en el día, mes o año,
                                    ayudándote a gestionar y analizar el
                                    rendimiento de tu negocio. ¡Lleva el control
                                    de tus ventas como nunca antes!
                                </p>
                            </motion.div>
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-2xl w-full">
                            <motion.img
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-cover"
                                src={images[imageIndex]}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-gray-900 text-white py-12">
                <div className="w-[80%] max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-4">
                            <img
                                src={logo}
                                width={200}
                                alt="Stock Master Logo"
                                className="brightness-0 invert"
                            />
                            <p className="text-gray-400">
                                Simplifica la gestión de tu inventario y ventas
                                con Stock Master.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold">
                                Enlaces Rápidos
                            </h3>
                            <ul className="flex flex-col gap-2">
                                <li>
                                    <Link
                                        to="/home"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Inicio
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/signup"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Registrarse
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold">Síguenos</h3>
                            <div className="flex gap-4">
                                <Link
                                    to={"https://github.com/fabrylora"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <FaGithub size={24} />
                                </Link>
                                <Link
                                    to={
                                        "https://www.linkedin.com/in/fabriziolora/"
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <FaLinkedin size={24} />
                                </Link>
                                <Link
                                    to={""}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <FaTwitter size={24} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()} Stock Master.
                            Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
