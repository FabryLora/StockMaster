import { faPenToSquare, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import axiosClient from "../axios";

export default function ProductItem({ product }) {
    const [isOpen, setIsOpen] = useState(false);
    const [succ, setSucc] = useState(false);
    const [deleteRes, setDeleteRes] = useState(false);
    const FontAwesomeAnimated = motion.create(FontAwesomeIcon);

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
            <div className="flex flex-col justify-center items-center gap-2 relative">
                <div className="flex flex-col justify-center items-center">
                    <motion.button
                        className="flex items-center justify-center flex-col h-20 bg-contain aspect-square rounded-md"
                        style={{ backgroundImage: `url(${product.image_url})` }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
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
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className=" z-10  w-auto min-w-[350px] rounded-md right-0 top-24 absolute flex flex-col gap-4 bg-[#292F33]"
                        >
                            {succ && (
                                <div className="bg-green-500 text-white py-2 px-3 rounded-md">
                                    Producto actualizado exitosamente (recargue
                                    la pagina)
                                </div>
                            )}
                            {deleteRes && (
                                <div className="bg-green-500 text-white py-2 px-3 rounded-md">
                                    Producto eliminado exitosamente (recargue la
                                    pagina)
                                </div>
                            )}
                            <div className="flex flex-col gap-3 items-center">
                                <motion.div
                                    className="rounded-md w-fit"
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
                                <div className="flex flex-col gap-1">
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
                            <div className="flex flex-row justify-evenly items-center gap-4 pb-2">
                                <motion.button
                                    onClick={onDeleteClick}
                                    whileHover={{ backgroundColor: "#EF4444" }}
                                    className="border border-red-500 px-3 py-2 rounded-md"
                                >
                                    Eliminar
                                </motion.button>
                                <motion.button
                                    onClick={update}
                                    whileHover={{ backgroundColor: "#3b82f6" }}
                                    className="border border-blue-500 px-3 py-2 rounded-md"
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
