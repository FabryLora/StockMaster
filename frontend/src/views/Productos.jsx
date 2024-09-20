import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Productos() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="text-white flex w-full flex-col justify-center mt-10 gap-20">
            <form
                className="flex gap-3 w-full justify-center"
                action=""
                method="get"
            >
                <input
                    className="bg-transparent border rounded-md w-1/3 p-2"
                    type="text"
                    name=""
                    id=""
                    placeholder="Buscar producto..."
                />
            </form>
            <div className="w-full flex justify-evenly items-center">
                <div className="flex flex-col justify-center items-center gap-3">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="border p-4 rounded-md h-20 text-4xl aspect-square"
                    >
                        <img src="../../public/plus-white.svg" alt="" />
                    </button>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ y: -25, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -25, opacity: 0 }}
                                className="border p-3 rounded-md"
                            >
                                <form
                                    className="flex flex-col gap-5"
                                    action=""
                                    method="get"
                                >
                                    <input type="file" src="" alt="" />
                                    <input
                                        className="bg-transparent border rounded-md p-1"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Nombre del producto..."
                                    />
                                    <label htmlFor="tipos">
                                        Elegir el grupo del producto:
                                    </label>
                                    <select
                                        className="bg-transparent border rounded-md p-1"
                                        name=""
                                        id="tipos"
                                    >
                                        <option value="none">none</option>
                                    </select>
                                    <h2 className="text-lg">
                                        Elegir unidad de almacenamiento:
                                    </h2>
                                    <div className="flex flex-row gap-3">
                                        <label htmlFor="unidad">Unidad</label>
                                        <input
                                            type="radio"
                                            name="unidad"
                                            id="unidad"
                                        />
                                        <label htmlFor="centimetro">
                                            Centimetro
                                        </label>
                                        <input
                                            type="radio"
                                            name="unidad"
                                            id="centimetro"
                                        />
                                        <label htmlFor="metro">Metro</label>
                                        <input
                                            type="radio"
                                            name="unidad"
                                            id="metro"
                                        />
                                    </div>
                                    <motion.input
                                        whileHover={{
                                            transition: { duration: 0.2 },
                                            backgroundColor: "#ffffff",
                                            color: "#000000",
                                        }}
                                        className="border rounded-md p-1 cursor-pointer"
                                        type="submit"
                                        value="Cargar"
                                    />
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
