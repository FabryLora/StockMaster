import {
    faImage,
    faPenToSquare,
    faQuestion,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProductItem({ product }) {
    const [isOpen, setIsOpen] = useState(false);
    const [succ, setSucc] = useState(false);
    const [deleteRes, setDeleteRes] = useState(false);
    const FontAwesomeAnimated = motion.create(FontAwesomeIcon);
    const [blackScreen, setBlackScreen] = useState(false);
    const [error, setError] = useState(false);
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

    const { fetchProducts, categories } = useStateContext();

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

    const translateErrorMessages = (messages) => {
        const translations = {
            "The name field is required.": "El campo de nombre es obligatorio.",
            "The price field is required.": "El campo Precio es obligatorio.",
            "The ustock field is required.":
                "El campo Unidad de stock es obligatorio",
            "The stock field is required.": "El campo Stock es obligatorio",
        };

        return messages.map((message) => translations[message] || message);
    };

    const update = (e) => {
        e.preventDefault();
        const payload = { ...productos };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;
        axiosClient
            .put(`/product/${product.id}`, payload)
            .then((res) => {
                if (res.status === 200) {
                    setSucc(true);
                }
            })
            .catch((err) => {
                if (err && err.response) {
                    const errorMessages = err.response.data.errors;
                    const messagesArray = [];

                    Object.values(errorMessages).forEach(
                        (messagesArrayField) => {
                            messagesArrayField.forEach((message) => {
                                messagesArray.push(message);
                            });
                        }
                    );
                    setSucc(false);
                    setError(translateErrorMessages(messagesArray));
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
            fetchProducts();
        }
    };

    useEffect(() => {
        if (deleteRes) {
            const timer = setTimeout(() => {
                setDeleteRes(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [deleteRes]);

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-2">
                <AnimatePresence>
                    {succ && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-green-500 text-white py-2 px-3 rounded-md absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                        >
                            Producto actualizado exitosamente
                        </motion.div>
                    )}

                    {deleteRes && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-green-500 text-white py-2 px-3 rounded-md absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                        >
                            Producto eliminado exitosamente
                        </motion.div>
                    )}
                    {blackScreen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsOpen(false);
                                setBlackScreen(false);
                                setError(false);
                            }}
                            className="absolute top-0 left-0 bg-black w-screen h-screen z-20"
                        ></motion.div>
                    )}
                </AnimatePresence>
                <div className="flex flex-col justify-center items-center">
                    <div className="group relative bg-gray-800/50 hover:bg-gray-800 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                        <motion.button
                            className="w-[200px] h-[200px] rounded-xl overflow-hidden bg-gray-700/50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setIsOpen(!isOpen);
                                setBlackScreen(!blackScreen);
                            }}
                        >
                            {product.image_url ? (
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700/50 to-gray-800/50">
                                    <FontAwesomeIcon
                                        icon={faQuestion}
                                        className="text-gray-400 text-3xl"
                                    />
                                </div>
                            )}
                        </motion.button>

                        <div className="mt-4 space-y-2">
                            <h2 className="text-lg font-medium text-white truncate">
                                {product.name}
                            </h2>
                            <p className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                {product.price.toLocaleString("es-AR", {
                                    style: "currency",
                                    currency: "ARS",
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="fixed inset-0 z-40 flex items-center justify-center p-4 overflow-y-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl border border-gray-700 my-auto"
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                            >
                                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                                    <h3 className="text-xl font-semibold text-white">
                                        Editar Producto
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            setBlackScreen(false);
                                            setError(false);
                                        }}
                                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <FontAwesomeIcon
                                            icon={faX}
                                            className="text-red-500"
                                        />
                                    </button>
                                </div>

                                <div className="p-6 space-y-6">
                                    {error && (
                                        <div className="bg-red-500/10 border border-red-500 text-red-500 py-3 px-4 rounded-lg text-sm">
                                            {error.map((error, index) => (
                                                <p key={index}>{error}</p>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex justify-center">
                                        <motion.div
                                            className="relative group rounded-xl overflow-hidden"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <input
                                                type="file"
                                                onChange={onImageChange}
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <FontAwesomeAnimated
                                                    icon={faPenToSquare}
                                                    size="2xl"
                                                    className="text-white"
                                                />
                                            </div>
                                            {productos.image_url ? (
                                                <img
                                                    src={productos.image_url}
                                                    className="max-h-[280px] rounded-xl"
                                                />
                                            ) : (
                                                <div className="w-[200px] h-[280px] bg-gray-700/50 rounded-xl flex items-center justify-center">
                                                    <FontAwesomeIcon
                                                        icon={faImage}
                                                        className="text-gray-500 text-4xl"
                                                    />
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm text-gray-400">
                                                    Nombre
                                                </label>
                                                <input
                                                    className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                                                    type="text"
                                                    value={productos.name}
                                                    onChange={(e) =>
                                                        setProductos({
                                                            ...productos,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm text-gray-400">
                                                    Categoría
                                                </label>
                                                <select
                                                    value={productos.type}
                                                    onChange={(ev) =>
                                                        setProductos({
                                                            ...productos,
                                                            type: ev.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option
                                                        value=""
                                                        className="text-gray-900"
                                                    >
                                                        Categorías
                                                    </option>
                                                    {categories.map(
                                                        (category) => (
                                                            <option
                                                                key={
                                                                    category.id
                                                                }
                                                                value={
                                                                    category.category_name
                                                                }
                                                                className="text-gray-900"
                                                            >
                                                                {
                                                                    category.category_name
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">
                                                Descripción
                                            </label>
                                            <textarea
                                                className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                                value={productos.description}
                                                onChange={(e) =>
                                                    setProductos({
                                                        ...productos,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm text-gray-400">
                                                    Unidad
                                                </label>
                                                <input
                                                    className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                                                    type="text"
                                                    value={productos.ustock}
                                                    onChange={(e) =>
                                                        setProductos({
                                                            ...productos,
                                                            ustock: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm text-gray-400">
                                                    Stock
                                                </label>
                                                <input
                                                    className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                                                    type="number"
                                                    value={productos.stock}
                                                    onChange={(e) =>
                                                        setProductos({
                                                            ...productos,
                                                            stock: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm text-gray-400">
                                                    Precio
                                                </label>
                                                <input
                                                    className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                                                    type="number"
                                                    value={productos.price}
                                                    onChange={(e) =>
                                                        setProductos({
                                                            ...productos,
                                                            price: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 p-6 border-t border-gray-700">
                                    <motion.button
                                        onClick={onDeleteClick}
                                        whileHover={{
                                            scale: 1.02,
                                            backgroundColor: "rgb(239 68 68)",
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-2.5 rounded-lg border border-red-500 text-red-500 hover:text-white transition-colors"
                                    >
                                        Eliminar
                                    </motion.button>
                                    <motion.button
                                        onClick={update}
                                        whileHover={{
                                            scale: 1.02,
                                            backgroundColor: "rgb(59 130 246)",
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-2.5 rounded-lg border border-blue-500 text-blue-500 hover:text-white transition-colors"
                                    >
                                        Actualizar
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
