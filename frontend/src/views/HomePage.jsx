import { Link } from "react-router-dom";
import inventoryLogo from "../assets/inventory-logo.png";
import logo from "../assets/logo-no-background.png";

export default function HomePage() {
    return (
        <>
            <header className="text-white bg-white">
                <nav className="flex flex-row justify-evenly items-center p-2 relative shadow-md">
                    <Link to={"/home"} className="w-full flex justify-center">
                        <img src={logo} width={300} alt="" />
                    </Link>
                    <ul className="flex flex-row gap-5 absolute right-10 text-black">
                        <Link
                            to={"/login"}
                            className="py-1 px-2 rounded-md border-[2px]"
                        >
                            Iniciar Sesion
                        </Link>
                        <Link
                            to={"/signup"}
                            className="px-3 py-1 rounded-md border-[2px]"
                        >
                            Registrarse
                        </Link>
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
            <div></div>
        </>
    );
}
