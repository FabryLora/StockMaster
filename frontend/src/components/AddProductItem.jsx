import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import whitePlus from "../assets/plus-white.svg";
import axiosClient from "../axios.js";

export default function AddProductItem() {
    const [isOpen, setIsOpen] = useState(false);

    const [products, setProducts] = useState({
        name: "",
        image: null,
        image_url: null,
        type: "",
        description: "",
        price: "",
        ustock: "",
        stock: "",
    });

    const [error, setError] = useState("");

    const onImageChange = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
            setProducts({
                ...products,
                image: file,
                image_url: reader.result,
            });
            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...products };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;

        axiosClient
            .post("product", payload)
            .then((res) => {
                console.log(res);
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

                    setError(messagesArray);
                    console.log(messagesArray);
                }
                console.log(err, err.response);
            });
    };

    return (
        <div className="flex flex-col justify-center items-center gap-3 self-start relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="border p-4 rounded-md h-20 text-4xl aspect-square"
            >
                <img src={whitePlus} alt="" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: -25, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -25, opacity: 0 }}
                        className="border p-3 rounded-md absolute top-24 left-0 backdrop-blur-md flex flex-col gap-5"
                    >
                        {error && (
                            <div className="bg-red-500 text-white py-2 px-3 rounded-md">
                                {error.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}
                        <form
                            className="flex flex-col gap-5"
                            action=""
                            method="post"
                            onSubmit={onSubmit}
                        >
                            <div className="flex flex-row justify-evenly gap-2 items-center">
                                <div className="w-fit">
                                    {products.image_url ? (
                                        <img
                                            className="w-32 h-32 object-cover rounded-md"
                                            src={products.image_url}
                                            alt=""
                                        />
                                    ) : (
                                        <div className="border rounded-md w-32 h-32 flex items-center justify-center">
                                            <FontAwesomeIcon
                                                size="2xl"
                                                icon={faImage}
                                            />
                                        </div>
                                    )}
                                </div>
                                <button className="relative border rounded-md p-1 cursor-default">
                                    <input
                                        className="absolute left-0 top-0 right-0 bottom-0 opacity-0 "
                                        type="file"
                                        onChange={onImageChange}
                                    />
                                    Cambiar imagen
                                </button>
                            </div>

                            <input
                                className="bg-transparent border rounded-md p-1"
                                type="text"
                                name="name"
                                id="name"
                                value={products.name}
                                onChange={(ev) =>
                                    setProducts({
                                        ...products,
                                        name: ev.target.value,
                                    })
                                }
                                placeholder="Nombre del producto..."
                            />
                            <label htmlFor="description">Descripcion:</label>
                            <textarea
                                className="rounded-md text-black p-1 focus:outline-none bg-transparent border"
                                name="description"
                                onChange={(ev) =>
                                    setProducts({
                                        ...products,
                                        description: ev.target.value,
                                    })
                                }
                                value={products.description}
                                id="description"
                            ></textarea>
                            <label htmlFor="tipos">
                                Elegir el tipo de producto:
                            </label>
                            <select
                                className="bg-transparent border rounded-md p-1"
                                name="tipos"
                                id="tipos"
                                onChange={(ev) =>
                                    setProducts({
                                        ...products,
                                        type: ev.target.value,
                                    })
                                }
                                value={products.type}
                            >
                                <option value="" disabled>
                                    Seleccionar tipo
                                </option>
                                <option value="telas">Telas</option>
                            </select>
                            <h2 className="text-lg">
                                Elegir unidad de almacenamiento:
                            </h2>
                            <div className="flex flex-row gap-3">
                                <label htmlFor="unidad">Unidad</label>
                                <input
                                    onChange={(ev) =>
                                        setProducts({
                                            ...products,
                                            ustock: ev.target.value,
                                        })
                                    }
                                    value="unidad"
                                    type="radio"
                                    name="unidad"
                                    id="unidad"
                                    checked={products.ustock === "unidad"}
                                />
                                <label htmlFor="centimetro">Centimetro</label>
                                <input
                                    onChange={(ev) =>
                                        setProducts({
                                            ...products,
                                            ustock: ev.target.value,
                                        })
                                    }
                                    value="centimetro"
                                    checked={products.ustock === "centimetro"}
                                    type="radio"
                                    name="unidad"
                                    id="centimetro"
                                />
                                <label htmlFor="metro">Metro</label>
                                <input
                                    onChange={(ev) =>
                                        setProducts({
                                            ...products,
                                            ustock: ev.target.value,
                                        })
                                    }
                                    type="radio"
                                    name="unidad"
                                    id="metro"
                                    value="metro"
                                    checked={products.ustock === "metro"}
                                />
                                <label htmlFor="stock">Cantidad:</label>
                                <input
                                    className="text-black bg-transparent border rounded-md"
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    onChange={(ev) =>
                                        setProducts({
                                            ...products,
                                            stock: ev.target.value,
                                        })
                                    }
                                    value={products.stock}
                                />
                            </div>
                            <div className="flex flex-row gap-2">
                                <label htmlFor="price">
                                    Precio del producto:
                                </label>
                                <input
                                    className="text-black bg-transparent border rounded-md"
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={products.price}
                                    onChange={(ev) =>
                                        setProducts({
                                            ...products,
                                            price: ev.target.value,
                                        })
                                    }
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
    );
}
