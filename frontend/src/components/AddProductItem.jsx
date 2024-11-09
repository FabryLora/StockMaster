import {
    faChevronUp,
    faImage,
    faPlus,
    faTrashCan,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, spring } from "framer-motion";
import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function AddProductItem() {
    const [isOpen, setIsOpen] = useState(false);
    const [blackScreen, setBlackScreen] = useState(false);
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
    const [categoriese, setCategoriese] = useState({
        category_name: "",
    });
    const [error, setError] = useState(false);
    const [succ, setSucc] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [addCategory, setAddCategory] = useState(false);
    /* const [category, setCategory] = useState([]); */
    const MotionFontAwesomeIcon = motion.create(FontAwesomeIcon);
    const [categoryPlaceholder, setCategoryPlaceholder] = useState(
        "Elegir categoria..."
    );
    const { categories, fetchCategories, fetchProducts } = useStateContext();

    /* useEffect(() => {
        axiosClient.get("/category").then(({ data }) => {
            setCategory(data.data);
        });
    }, []); */

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

    const onSubmitCategory = (ev) => {
        ev.preventDefault();

        const payload = { ...categoriese };

        axiosClient.post("category", payload);
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
                if (res.status === 201) {
                    setSucc(true);
                    setError(false);
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
                    setError(messagesArray);
                }
            });
        fetchProducts();
    };

    useEffect(() => {
        setIsOpen(false);
        setBlackScreen(false);
        if (succ) {
            const timer = setTimeout(() => {
                setSucc(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [succ]);

    const onDeleteClick = (id) => {
        if (window.confirm("Estas seguro que queres eliminar la categoria?")) {
            axiosClient.delete(`/category/${id}`);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-3 w-full">
            <AnimatePresence>
                {succ && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white py-2 px-3 rounded-md z-30"
                    >
                        Producto creado exitosamente
                    </motion.div>
                )}

                {blackScreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setIsOpen(!isOpen);
                            setBlackScreen(!blackScreen);
                        }}
                        className="absolute top-0 left-0 bg-black w-screen h-screen z-20"
                    ></motion.div>
                )}
            </AnimatePresence>
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    setIsOpen(!isOpen);
                    setBlackScreen(!blackScreen);
                }}
                className="group bg-gray-800/50 hover:bg-gray-800 p-4 rounded-xl h-24 aspect-square flex justify-center items-center transition-colors"
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    size="2xl"
                    className="text-gray-400 group-hover:text-white transition-colors"
                />
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ scale: 0, x: "-50%", y: "-50%" }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="p-6 w-[35rem] h-[95%] max-h-screen sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 bg-gray-800 z-20 overflow-y-auto"
                    >
                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                setBlackScreen(!blackScreen);
                                setError(false);
                            }}
                            className="absolute right-6 top-6 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={faX}
                                className="text-red-500"
                            />
                        </button>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500 text-red-500 py-3 px-4 rounded-lg text-sm">
                                {error.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}

                        <form
                            className="flex flex-col gap-6"
                            onSubmit={onSubmit}
                        >
                            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center border-b border-gray-700 pb-6">
                                <div className="relative group">
                                    {products.image_url ? (
                                        <img
                                            className="w-32 h-32 object-cover rounded-xl"
                                            src={products.image_url}
                                            alt=""
                                        />
                                    ) : (
                                        <div className="w-32 h-32 bg-gray-700/50 rounded-xl flex items-center justify-center">
                                            <FontAwesomeIcon
                                                size="2xl"
                                                icon={faImage}
                                                className="text-gray-500"
                                            />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl flex items-center justify-center transition-opacity">
                                        <input
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            type="file"
                                            onChange={onImageChange}
                                        />
                                        <span className="text-white text-sm">
                                            Cambiar imagen
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm text-gray-400"
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
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
                                        placeholder="Nombre del producto"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="description"
                                        className="text-sm text-gray-400"
                                    >
                                        Descripción
                                    </label>
                                    <textarea
                                        className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                        name="description"
                                        id="description"
                                        value={products.description}
                                        onChange={(ev) =>
                                            setProducts({
                                                ...products,
                                                description: ev.target.value,
                                            })
                                        }
                                        placeholder="Descripción del producto"
                                    ></textarea>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">
                                        Categoría
                                    </label>
                                    <div className="relative flex gap-2">
                                        <div className="relative flex-1">
                                            <div
                                                onClick={() => {
                                                    setCategoryOpen(
                                                        !categoryOpen
                                                    );
                                                    fetchCategories();
                                                }}
                                                className="flex-1 bg-gray-700/50 px-4 py-2.5 rounded-lg cursor-pointer flex items-center justify-between hover:bg-gray-700 transition-colors"
                                            >
                                                <span className="text-gray-400">
                                                    {categoryPlaceholder}
                                                </span>
                                                <MotionFontAwesomeIcon
                                                    animate={{
                                                        rotateZ: categoryOpen
                                                            ? 180
                                                            : 0,
                                                    }}
                                                    transition={{
                                                        type: spring,
                                                        duration: 0.2,
                                                    }}
                                                    icon={faChevronUp}
                                                    className="text-gray-400"
                                                />
                                            </div>

                                            <AnimatePresence>
                                                {categoryOpen && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            y: -10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            y: -10,
                                                        }}
                                                        className="absolute z-50 w-full mt-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1"
                                                    >
                                                        {categories.map(
                                                            (category) => (
                                                                <div
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    className="flex justify-between px-4 py-2 text-gray-400 hover:bg-gray-700/50 cursor-pointer transition-colors"
                                                                >
                                                                    <div
                                                                        className="w-[95%]"
                                                                        onClick={() => {
                                                                            setProducts(
                                                                                {
                                                                                    ...products,
                                                                                    type: category.category_name,
                                                                                }
                                                                            );
                                                                            setCategoryPlaceholder(
                                                                                category.category_name
                                                                            );
                                                                            setCategoryOpen(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            category.category_name
                                                                        }
                                                                    </div>

                                                                    <div
                                                                        className="w-[5%]"
                                                                        onClick={() => {
                                                                            onDeleteClick(
                                                                                category.id
                                                                            );
                                                                            setCategoryPlaceholder(
                                                                                "Elegir categoria..."
                                                                            );
                                                                            fetchCategories();
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={
                                                                                faTrashCan
                                                                            }
                                                                            className="text-red-500"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setAddCategory(!addCategory)
                                            }
                                            className="p-2.5 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="text-gray-400"
                                            />
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {addCategory && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute z-50 right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4"
                                        >
                                            <form
                                                onSubmit={onSubmitCategory}
                                                className="space-y-4"
                                            >
                                                <div className="space-y-2">
                                                    <label className="text-sm text-gray-400">
                                                        Nueva Categoría
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            categoriese.category_name
                                                        }
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setCategoriese({
                                                                ...categoriese,
                                                                category_name:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                        className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                                                        placeholder="Nombre de la categoría"
                                                    />
                                                </div>
                                                <div className="flex justify-end">
                                                    <motion.button
                                                        onClick={
                                                            onSubmitCategory
                                                        }
                                                        whileHover={{
                                                            scale: 1.02,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.98,
                                                        }}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                                                    >
                                                        Agregar
                                                    </motion.button>
                                                </div>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="space-y-4">
                                    <label className="text-sm text-gray-400">
                                        Unidad de almacenamiento
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["Unidad", "Metro", "Centimetro"].map(
                                            (unit) => (
                                                <button
                                                    key={unit}
                                                    type="button"
                                                    onClick={() =>
                                                        setProducts({
                                                            ...products,
                                                            ustock: unit.toLowerCase(),
                                                        })
                                                    }
                                                    className={`px-4 py-2.5 rounded-lg text-sm transition-colors ${
                                                        products.ustock ===
                                                        unit.toLowerCase()
                                                            ? "bg-blue-500 text-white"
                                                            : "bg-gray-700/50 text-gray-400 hover:bg-gray-700"
                                                    }`}
                                                >
                                                    {unit}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="stock"
                                            className="text-sm text-gray-400"
                                        >
                                            Cantidad
                                        </label>
                                        <input
                                            className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                                            type="number"
                                            name="stock"
                                            id="stock"
                                            value={products.stock}
                                            onChange={(ev) =>
                                                setProducts({
                                                    ...products,
                                                    stock: ev.target.value,
                                                })
                                            }
                                            placeholder="0"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="price"
                                            className="text-sm text-gray-400"
                                        >
                                            Precio
                                        </label>
                                        <input
                                            className="w-full bg-gray-700/50 border-0 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
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
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                            >
                                Cargar producto
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
