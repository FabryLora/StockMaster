import {
    faPenToSquare,
    faQuestion,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosClient from "../axios";

export default function ProductItem({ product }) {
    const [isOpen, setIsOpen] = useState(false);
    const [succ, setSucc] = useState(false);
    const [deleteRes, setDeleteRes] = useState(false);
    const FontAwesomeAnimated = motion.create(FontAwesomeIcon);
    const [blackScreen, setBlackScreen] = useState(false);

    const [productos, setProductos] = useState({
        name: product.name,
        image: product.image,
        image_url: product.image_url,
        type: product.type,
        description: product.description,
        price: product.price,
        ustock: product.ustock,
        stock: product.stock,
    });

    useEffect(() => {
        if (succ) {
            const timer = setTimeout(() => {
                setSucc(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [succ]);

    const onImageChange = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
            setProductos({
                ...productos,
                image: file,
                image_url: reader.result,
            });
            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    const update = (e) => {
        e.preventDefault();
        const payload = { ...productos };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;
        axiosClient.put(`/product/${product.id}`, payload).then((res) => {
            if (res.status === 200) {
                setSucc(true);
            }
        });
    };

    const onDeleteClick = () => {
        if (window.confirm("Estas seguro que queres eliminar el producto?")) {
            axiosClient.delete(`/product/${product.id}`).then((res) => {
                if (res.status === 204) {
                    setDeleteRes(true);
                }
            });
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-2">
                <AnimatePresence>
                    {succ && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-green-500 text-white py-2 px-3 rounded-md absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                        >
                            Producto actualizado exitosamente
                        </motion.div>
                    )}
                </AnimatePresence>

                {deleteRes && (
                    <div className="bg-green-500 text-white py-2 px-3 rounded-md absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        Producto eliminado exitosamente
                    </div>
                )}
                {blackScreen && (
                    <div className="absolute top-0 left-0 bg-black opacity-50 w-screen h-screen z-20"></div>
                )}
                <div className="flex flex-col justify-center items-center">
                    <motion.button
                        className="flex items-center justify-center flex-col h-20 bg-center aspect-square rounded-md bg-no-repeat bg-cover"
                        style={{ backgroundImage: `url(${product.image_url})` }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setIsOpen(!isOpen);
                            setBlackScreen(!blackScreen);
                        }}
                    >
                        {!product.image_url && (
                            <div className="border w-full h-full flex items-center justify-center rounded-md">
                                <FontAwesomeIcon icon={faQuestion} size="2xl" />
                            </div>
                        )}
                    </motion.button>
                    <h2>{product.name}</h2>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ scale: 0, x: "-50%", y: "-50%" }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="p-4 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 bg-[#292f33] z-20 w-[575px] h-fit"
                        >
                            <button
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                    setBlackScreen(!blackScreen);
                                }}
                                className="border border-red-500 rounded-md w-7 h-7 self-end"
                            >
                                <FontAwesomeIcon
                                    icon={faX}
                                    style={{ color: "#ef4444" }}
                                />
                            </button>

                            {deleteRes && (
                                <div className="bg-green-500 text-white py-2 px-3 rounded-md">
                                    Producto eliminado exitosamente
                                </div>
                            )}
                            <div className="flex flex-col gap-3 items-center">
                                <motion.div
                                    className="rounded-md w-fit min-h-[287px] flex items-center"
                                    whileHover={{
                                        backgroundColor: "#000",
                                        opacity: 0.5,
                                    }}
                                >
                                    <button className="relative rounded-md p-1 cursor-default flex justify-center items-center">
                                        <input
                                            className="absolute w-full h-full left-0 top-0 right-0 bottom-0 opacity-0 z-10 cursor-pointer"
                                            type="file"
                                            onChange={onImageChange}
                                        />
                                        <motion.div className="absolute w-full h-full flex justify-center items-center">
                                            <FontAwesomeAnimated
                                                icon={faPenToSquare}
                                                size="2xl"
                                                color="#9FADBC"
                                            />
                                        </motion.div>
                                        {product.image_url ? (
                                            <img
                                                src={productos.image_url}
                                                className="rounded-md max-h-[280px]"
                                            />
                                        ) : (
                                            <div className=" w-[200px] h-[280px] border rounded-md"></div>
                                        )}
                                    </button>
                                </motion.div>
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex flex-row gap-2 items-center justify-between">
                                        <h2 className="opacity-50">Nombre:</h2>
                                        <input
                                            className="bg-transparent p-2 rounded-md"
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={productos.name}
                                            placeholder={product.name}
                                            onChange={(e) =>
                                                setProductos({
                                                    ...productos,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                        {/* <p className="font-bold text-lg">
                                            {product.name}
                                        </p> */}
                                    </div>

                                    <div className="flex flex-row gap-2 items-center justify-between">
                                        <h2 className="opacity-50">
                                            Descipcion:
                                        </h2>
                                        <input
                                            className="bg-transparent p-2 rounded-md"
                                            type="text"
                                            name="description"
                                            id="description"
                                            value={productos.description}
                                            placeholder={
                                                productos.description ||
                                                "Agregar descripcion"
                                            }
                                            onChange={(e) =>
                                                setProductos({
                                                    ...productos,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="flex flex-row gap-2 items-center justify-between">
                                        <h2 className="opacity-50">Grupo:</h2>
                                        <select
                                            className="bg-transparent rounded-md p-2 w-[197px]"
                                            name="type"
                                            id="type"
                                            onChange={(ev) =>
                                                setProductos({
                                                    ...productos,
                                                    type: ev.target.value,
                                                })
                                            }
                                            value={productos.type}
                                        >
                                            <option value="" disabled>
                                                Ningun grupo seleccionado
                                            </option>

                                            <option
                                                className="bg-none"
                                                value="Telas"
                                            >
                                                Telas
                                            </option>
                                            <option value="Lanas">Lanas</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-row gap-2 items-center justify-between">
                                        <h2 className="opacity-50">
                                            Unidad de stock:
                                        </h2>
                                        <input
                                            className="bg-transparent p-2 rounded-md"
                                            type="text"
                                            name="ustock"
                                            id="ustock"
                                            value={productos.ustock}
                                            placeholder={product.ustock}
                                            onChange={(e) =>
                                                setProductos({
                                                    ...productos,
                                                    ustock: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="flex flex-row gap-2 items-center justify-between">
                                        <h2 className="opacity-50">Precio:</h2>
                                        <input
                                            className="bg-transparent p-2 rounded-md"
                                            type="number"
                                            name="name"
                                            id="name"
                                            value={productos.price}
                                            placeholder={product.price}
                                            onChange={(e) =>
                                                setProductos({
                                                    ...productos,
                                                    price: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="flex flex-row gap-2 items-center justify-between">
                                        <h2 className="opacity-50">Stock:</h2>
                                        <input
                                            className="bg-transparent p-2 rounded-md"
                                            type="number"
                                            name="name"
                                            id="name"
                                            value={productos.stock}
                                            placeholder={product.stock}
                                            onChange={(e) =>
                                                setProductos({
                                                    ...productos,
                                                    stock: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-evenly items-center py-3">
                                <motion.button
                                    onClick={onDeleteClick}
                                    whileHover={{ backgroundColor: "#EF4444" }}
                                    className="border border-red-500 px-10 py-2 rounded-md"
                                >
                                    Eliminar
                                </motion.button>
                                <motion.button
                                    onClick={update}
                                    whileHover={{ backgroundColor: "#3b82f6" }}
                                    className="border border-blue-500 px-10 py-2 rounded-md"
                                >
                                    Actualizar
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
