import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import gestor from "../assets/gestor.png";
import inventoryLogo from "../assets/inventory-logo.png";
import logo from "../assets/logo-no-background.png";
import product from "../assets/product.png";
import sales from "../assets/sales.png";

export default function HomePage() {
    const [imageIndex, setImageIndex] = useState(0);

    const images = [product, sales, gestor];
    const MotionLink = motion(Link);

    return (
        <>
            <header className="text-white bg-white sticky top-0">
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
            <div className="justify-center flex py-10  bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className="flex flex-row justify-center items-center w-[80%]">
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
                                    className="p-3 rounded-md border border-gray-400 focus:outline-none"
                                    type="text"
                                    placeholder="Ingresa tu mail..."
                                />
                                <button className="p-3 rounded-md bg-[#017cc5] text-white">
                                    Registrate
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <img src={inventoryLogo} alt="" />
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-poppins text-white py-10">
                <div className="flex flex-col  w-[80%] justify-self-center gap-10">
                    <div className="flex flex-col gap-5">
                        <h3 className="text-lg">EL ABC DE STOCKMASTER</h3>
                        <h2 className="text-4xl">
                            Un centro neurálgico de productividad
                        </h2>
                        <p className="w-[50%]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quae minima consequuntur nulla animi ratione
                            nobis. Expedita tempore voluptates laboriosam, at,
                            maiores autem, excepturi exercitationem facilis
                            voluptatibus quod nostrum ex laudantium.
                        </p>
                    </div>
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-col gap-4">
                            <motion.div
                                initial={{ scale: 1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setImageIndex(0)}
                                className={`w-[400px] h-fit rounded-md flex flex-col p-2 cursor-pointer ${
                                    imageIndex == 0
                                        ? "shadow-2xl border-blue-700 border-2 border-l-8"
                                        : ""
                                }`}
                            >
                                <h2 className="font-bold">Productos</h2>
                                <p>
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
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setImageIndex(1)}
                                className={`w-[400px] h-fit rounded-md flex flex-col p-2 cursor-pointer ${
                                    imageIndex == 1
                                        ? "shadow-2xl border-pink-700 border-2 border-l-8"
                                        : ""
                                }`}
                            >
                                <h2 className="font-bold">Ventas</h2>
                                <p>
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
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setImageIndex(2)}
                                className={`w-[400px] h-fit rounded-md flex flex-col p-2 cursor-pointer ${
                                    imageIndex == 2
                                        ? "shadow-2xl border-purple-700 border-2 border-l-8"
                                        : ""
                                }`}
                            >
                                <h2 className="font-bold">Gestion</h2>
                                <p>
                                    Visualiza tus ganancias de forma clara y
                                    sencilla. Esta herramienta te permite ver
                                    cuánto has ganado en el día, mes o año,
                                    ayudándote a gestionar y analizar el
                                    rendimiento de tu negocio. ¡Lleva el control
                                    de tus ventas como nunca antes!
                                </p>
                            </motion.div>
                        </div>
                        <div className="rounded-md">
                            <img
                                className="rounded-md"
                                src={images[imageIndex]}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
