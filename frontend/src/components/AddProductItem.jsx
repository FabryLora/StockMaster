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
    const { categories, fetchCategories } = useStateContext();

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
        <div className="flex flex-col justify-center items-center gap-3 self-start">
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
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setBlackScreen(!blackScreen);
                }}
                className="border p-4 rounded-md h-20 text-4xl aspect-square flex justify-center items-center"
            >
                <FontAwesomeIcon icon={faPlus} size="xl" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ scale: 0, x: "-50%", y: "-50%" }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="py-2 px-4 w-[35rem] h-[80%] max-h-screen sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 bg-[#292f33] z-20 overflow-y-auto"
                    >
                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                setBlackScreen(!blackScreen);
                                setError(false);
                            }}
                            className="absolute right-5 top-5 border border-red-500 rounded-md w-7 h-7"
                        >
                            <FontAwesomeIcon
                                icon={faX}
                                style={{ color: "#ef4444" }}
                            />
                        </button>

                        {error && (
                            <div className="bg-red-500 text-white py-2 px-3 rounded-md text-sm sm:text-base">
                                {error.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}

                        {addCategory && (
                            <div className="absolute right-3 bottom-32 z-30">
                                <form
                                    action=""
                                    method="post"
                                    className="bg-gray-600 p-2 rounded-md text-base flex justify-center flex-col gap-2"
                                    onSubmit={onSubmitCategory}
                                >
                                    <input
                                        className="border p-2 rounded-md text-black"
                                        placeholder="Nombre de la Categoria..."
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={categoriese.category_name}
                                        onChange={(ev) =>
                                            setCategoriese({
                                                ...categoriese,
                                                category_name: ev.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        className="p-2 border rounded-md cursor-pointer"
                                        type="submit"
                                        value="Agregar"
                                    />
                                </form>
                            </div>
                        )}

                        <form
                            className="flex flex-col gap-5"
                            action=""
                            method="post"
                            onSubmit={onSubmit}
                        >
                            <div className="flex flex-col sm:flex-row justify-evenly gap-2 items-center border-b-2 pb-6">
                                <div className="w-fit">
                                    {products.image_url ? (
                                        <img
                                            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md"
                                            src={products.image_url}
                                            alt=""
                                        />
                                    ) : (
                                        <div className="border rounded-md w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                                            <FontAwesomeIcon
                                                size="2xl"
                                                icon={faImage}
                                            />
                                        </div>
                                    )}
                                </div>
                                <button className="relative border rounded-md p-1 cursor-pointer text-sm sm:text-base">
                                    <input
                                        className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                                        type="file"
                                        onChange={onImageChange}
                                    />
                                    Cambiar imagen
                                </button>
                            </div>

                            <label htmlFor="name">Nombre:</label>
                            <input
                                className="bg-transparent border rounded-md p-1 text-sm sm:text-base"
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
                            />

                            <label htmlFor="description">Descripcion:</label>
                            <textarea
                                className="rounded-md text-white p-1 focus:outline-none bg-transparent border text-sm sm:text-base"
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

                            <h2>Elegir la categoria del producto:</h2>
                            <div className="relative flex flex-row gap-2">
                                <div
                                    onClick={() => {
                                        setCategoryOpen(!categoryOpen);
                                        fetchCategories();
                                    }}
                                    className="flex w-[93%] flex-row justify-between items-center px-2 cursor-pointer text-white border rounded-md p-2 text-sm sm:text-base"
                                >
                                    <span className="opacity-50">
                                        {categoryPlaceholder}
                                    </span>
                                    <MotionFontAwesomeIcon
                                        animate={{
                                            rotateZ: categoryOpen ? 180 : 0,
                                        }}
                                        transition={{
                                            type: spring,
                                            duration: 0.2,
                                        }}
                                        icon={faChevronUp}
                                        style={{ color: "#ffffff" }}
                                    />
                                </div>
                                <div className="relative h-full w-[7%] text-2xl border rounded-md">
                                    <div
                                        className="w-full h-full flex justify-center items-center cursor-pointer"
                                        onClick={() =>
                                            setAddCategory(!addCategory)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            style={{ color: "#ffffff" }}
                                        />
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {categoryOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="absolute bg-gray-600 text-white flex flex-col gap-2 w-[92%] top-12 rounded-md h-fit p-2 max-h-52 overflow-y-auto z-20"
                                        >
                                            {categories.map((cate) => (
                                                <div
                                                    onClick={() => {
                                                        setProducts({
                                                            ...products,
                                                            type: cate.category_name,
                                                        });
                                                        setCategoryPlaceholder(
                                                            cate.category_name
                                                        );
                                                        setCategoryOpen(false);
                                                    }}
                                                    className="flex flex-row justify-between border p-2 rounded-md cursor-pointer"
                                                    key={cate.id}
                                                >
                                                    <h3>
                                                        {cate.category_name}
                                                    </h3>
                                                    <div
                                                        onClick={() => {
                                                            onDeleteClick(
                                                                cate.id
                                                            );
                                                            fetchCategories();
                                                            setCategoryPlaceholder(
                                                                "Elegir categoria..."
                                                            );
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                            style={{
                                                                color: "#ef4444",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* <label htmlFor="tipos">
                                Elegir el tipo de producto:
                            </label>
                            <select
                                className="bg-transparent text-white border rounded-md p-1 text-sm sm:text-base"
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
                            </select> */}

                            <h2 className="text-lg">
                                Elegir unidad de almacenamiento:
                            </h2>
                            <div className="flex flex-row items-center justify-evenly w-full gap-3">
                                <label className="flex items-center justify-center border px-10 py-5 rounded cursor-pointer border-specialblue">
                                    <input
                                        className="hidden"
                                        type="radio"
                                        name="discount"
                                        value="5"
                                    />
                                    <span
                                        onClick={() =>
                                            setProducts({
                                                ...products,
                                                ustock: "unidad",
                                            })
                                        }
                                        className="absolute px-4 py-2 flex items-center justify-center rounded-md"
                                    >
                                        Unidad
                                    </span>
                                </label>
                                <label className="flex items-center justify-center border px-10 py-5 rounded cursor-pointer border-specialblue">
                                    <input
                                        className="hidden"
                                        type="radio"
                                        name="discount"
                                        value="10"
                                    />
                                    <span
                                        onClick={() =>
                                            setProducts({
                                                ...products,
                                                ustock: "metro",
                                            })
                                        }
                                        className="absolute px-4 py-2 flex items-center justify-center  rounded-md"
                                    >
                                        Metro
                                    </span>
                                </label>
                                <label className="relative flex items-center justify-center border px-10 py-5 rounded cursor-pointer border-specialblue">
                                    <input
                                        className="hidden"
                                        type="radio"
                                        name="discount"
                                        value="20"
                                    />
                                    <span
                                        onClick={() =>
                                            setProducts({
                                                ...products,
                                                ustock: "centimetro",
                                            })
                                        }
                                        className="absolute px-4 py-2 flex items-center justify-center  rounded-md"
                                    >
                                        Centimetro
                                    </span>
                                </label>
                            </div>
                            <label htmlFor="stock">Cantidad:</label>
                            <input
                                className="text-white pl-2 bg-transparent border rounded-md text-sm sm:text-base"
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

                            <div className="flex flex-wrap gap-2 items-center">
                                <label htmlFor="price">
                                    Precio del producto:
                                </label>
                                <input
                                    className="text-white pl-2 bg-transparent border rounded-md text-sm sm:text-base"
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
                                className="border rounded-md p-1 cursor-pointer text-sm sm:text-base"
                                type="submit"
                                value="Cargar producto"
                            />
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
