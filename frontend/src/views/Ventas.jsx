import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import axiosClient from "../axios.js";
import ProductLoadingVentas from "../components/ProductLoadingVentas.jsx";
import SaleComponent from "../components/SaleComponent.jsx";
import "./ventas.css";

export default function Ventas() {
    const today = new Date().toISOString().split("T")[0];

    const [products, setProducts] = useState([]);
    const [showSales, setShowSales] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [infoProduct, setInfoProduct] = useState({
        id: "",
        name: "",
        price: "",
        ustock: "",
        stock: "",
    });
    const [price, setPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState();
    const [descuento, setDescuento] = useState(0);
    const [cant, setCant] = useState(1);
    const [sales, setSales] = useState({
        product_name: "",
        amount_sold: "",
        final_price: "",
        discount: "",
    });
    const [error, setError] = useState(false);
    const [succ, setSucc] = useState(false);
    const [instantImage, setInstantImage] = useState("");

    useEffect(() => {
        setSales({
            ...sales,
            discount: descuento,
            amount_sold: cant,
            final_price: finalPrice,
        });
    }, [descuento, cant, finalPrice]);

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/product").then(({ data }) => {
            setProducts(data.data);
            setFilteredProducts(data.data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        axiosClient.get("/sale").then(({ data }) => {
            setShowSales(
                data.data.filter(
                    (sale) =>
                        sale.created_at && sale.created_at.startsWith(today)
                )
            );
        });
    }, [showSales]);

    useEffect(() => {
        let totalPrice = price * cant;
        if (descuento != 0) {
            setFinalPrice(totalPrice - totalPrice * (descuento / 100));
        } else {
            setFinalPrice(totalPrice);
        }
    }, [descuento, cant]);

    useEffect(() => {
        if (succ) {
            const timer = setTimeout(() => {
                setSucc(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [succ]);

    const totalFinalPrice = useMemo(() => {
        const total = showSales.reduce(
            (sum, sale) => sum + parseFloat(sale.final_price || 0),
            0
        );
        return total.toLocaleString("es-AR", { minimumFractionDigits: 2 });
    }, [showSales]);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...sales };

        axiosClient
            .post("sale", payload)
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

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filtrar productos que coincidan con el valor de búsqueda
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="grid grid-cols-5 grid-rows-9 text-white">
            <AnimatePresence>
                {succ && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed right-[45%] top-5 bg-green-500 text-white py-2 px-3 rounded-md"
                    >
                        Producto creado exitosamente
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="h-screen border-r border-specialblue relative col-span-1 row-span-9">
                <form
                    className="flex flex-col justify-center items-center p-3 gap-10"
                    action=""
                    method="post"
                    onSubmit={onSubmit}
                >
                    <div className="relative">
                        <input
                            className="bg-transparent border border-specialblue rounded-md w-fit"
                            type="text"
                            name=""
                            onChange={handleSearch}
                            value={searchTerm}
                            onFocus={() => setIsOpen(!isOpen)}
                            /* onBlur={() => setIsOpen(!isOpen)} */
                            id=""
                            placeholder="Buscar producto..."
                        />

                        {isOpen && (
                            <div
                                className=" border rounded-md w-full h-[400px] flex flex-col gap-4 absolute overflow-y-scroll pt-3 bg-[#292f33] z-30"
                                style={{
                                    scrollbarWidth: "thin",
                                }}
                            >
                                {loading ? (
                                    <>
                                        <ProductLoadingVentas />
                                        <ProductLoadingVentas />
                                        <ProductLoadingVentas />
                                    </>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <div
                                            className="flex flex-row items-center justify-evenly cursor-pointer hover:bg-[#9fadbc41] p-1"
                                            key={product.id}
                                            onClick={() => {
                                                setInfoProduct({
                                                    name: product.name,
                                                    id: product.id,
                                                    price: product.price,
                                                    ustock: product.ustock,
                                                    stock: product.stock,
                                                });
                                                setIsOpen(false);
                                                setPrice(product.price);
                                                setFinalPrice(product.price);
                                                setSales({
                                                    ...sales,
                                                    product_name: product.name,
                                                });
                                                setInstantImage(
                                                    product.image_url
                                                );
                                            }}
                                        >
                                            {product.image_url ? (
                                                <div
                                                    className="bg-cover bg-center w-24 h-24 rounded-md"
                                                    style={{
                                                        backgroundImage: `url(${product.image_url})`,
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-24 h-24 border rounded-md flex justify-center items-center">
                                                    <FontAwesomeIcon
                                                        icon={faQuestion}
                                                        size="2xl"
                                                    />
                                                </div>
                                            )}

                                            <h2>{product.name}</h2>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-500 text-white py-2 px-3 rounded-md">
                            {error.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col w-full gap-5 text-gray-500">
                        <div
                            className="w-32 h-32 border rounded-md self-center bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${instantImage})` }}
                        ></div>
                        <div className="flex flex-col gap-3">
                            <h3>ID: {infoProduct.id}</h3>
                            <h3>Producto: {infoProduct.name}</h3>
                            <h3>
                                Cantidad disponible: {infoProduct.stock}{" "}
                                {infoProduct.ustock}
                            </h3>
                            <h3>
                                Precio x {infoProduct.ustock}: $
                                {infoProduct.price}{" "}
                            </h3>
                        </div>
                    </div>

                    <fieldset className="flex flex-col items-center w-full gap-3 border border-specialblue py-4 rounded-md text-center">
                        <legend className="text-specialblue text-xl font-bold">
                            Descuento
                        </legend>
                        {/* <h2 className="text-xl">Descuento</h2> */}
                        {/* <div className="flex flex-row gap-2 justify-evenly w-full">
                            <motion.button
                                whileHover={{
                                    backgroundColor: "#fff",
                                    color: "#000",
                                }}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setDescuento(0);
                                }}
                                className="border rounded-sm w-[48px] p-1"
                            >
                                0%
                            </motion.button>
                            <motion.button
                                whileHover={{
                                    backgroundColor: "#fff",
                                    color: "#000",
                                }}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setDescuento(5);
                                }}
                                className="border rounded-sm w-[48px]"
                            >
                                5%
                            </motion.button>
                            <motion.button
                                whileHover={{
                                    backgroundColor: "#fff",
                                    color: "#000",
                                }}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setDescuento(10);
                                }}
                                className="border rounded-sm w-[48px]"
                            >
                                10%
                            </motion.button>
                            <motion.button
                                whileHover={{
                                    backgroundColor: "#fff",
                                    color: "#000",
                                }}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setDescuento(20);
                                }}
                                className="border rounded-sm w-[48px]"
                            >
                                20%
                            </motion.button>
                        </div> */}
                        <div className="flex flex-row items-center justify-evenly w-full">
                            <label className="flex items-center justify-center border px-4 py-2 rounded cursor-pointer w-[48px] h-[42px] border-specialblue">
                                <input
                                    className="hidden"
                                    type="radio"
                                    name="discount"
                                    value="0"
                                />
                                <span
                                    onClick={() => {
                                        setDescuento(0);
                                    }}
                                    className="absolute flex items-center justify-center w-[48px] h-[42px] rounded-md"
                                >
                                    0%
                                </span>
                            </label>
                            <label className="flex items-center justify-center border px-4 py-2 rounded cursor-pointer w-[48px] h-[42px] border-specialblue">
                                <input
                                    className="hidden"
                                    type="radio"
                                    name="discount"
                                    value="5"
                                />
                                <span
                                    onClick={() => {
                                        setDescuento(5);
                                    }}
                                    className="absolute flex items-center justify-center w-[48px] h-[42px] rounded-md"
                                >
                                    5%
                                </span>
                            </label>
                            <label className="flex items-center justify-center border px-4 py-2 rounded cursor-pointer w-[48px] h-[42px] border-specialblue">
                                <input
                                    className="hidden"
                                    type="radio"
                                    name="discount"
                                    value="10"
                                />
                                <span
                                    onClick={() => {
                                        setDescuento(10);
                                    }}
                                    className="absolute flex items-center justify-center w-[48px] h-[42px] rounded-md"
                                >
                                    10%
                                </span>
                            </label>
                            <label className="relative flex items-center justify-center border px-4 py-2 rounded cursor-pointer w-[48px] h-[42px] border-specialblue">
                                <input
                                    className="hidden"
                                    type="radio"
                                    name="discount"
                                    value="20"
                                />
                                <span
                                    onClick={() => {
                                        setDescuento(20);
                                    }}
                                    className="absolute flex items-center justify-center w-[48px] h-[42px] rounded-md"
                                >
                                    20%
                                </span>
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className="flex flex-col w-full border border-specialblue p-4 rounded-md gap-2 items-center text-center">
                        <legend className="text-xl font-bold text-specialblue">
                            Cantidad
                        </legend>
                        {/* <h2 className="text-xl">Cantidad</h2> */}
                        <input
                            onChange={(ev) => setCant(ev.target.value)}
                            className="bg-transparent border p-2 rounded-md border-specialblue text-center"
                            type="number"
                            name=""
                            placeholder="Cantidad..."
                            id=""
                        />
                    </fieldset>

                    <fieldset className="flex flex-col items-center w-full gap-2 rounded-md border border-specialblue p-4 text-center">
                        <legend className="text-specialblue text-xl font-bold">
                            Precio Final
                        </legend>
                        {/* <h2 className="text-xl">Precio final</h2> */}
                        <input
                            className="bg-transparent p-2 rounded-md border border-specialblue text-center"
                            type="number"
                            name=""
                            id=""
                            value={finalPrice}
                        />
                    </fieldset>

                    <motion.input
                        whileHover={{
                            background: "#017cc5",
                            color: "#fff",
                        }}
                        className="border border-specialblue font-bold rounded-md w-4/5 py-2 cursor-pointer text-lg"
                        style={{ color: "#017cc5" }}
                        type="submit"
                        value="Agregar"
                    />
                </form>
            </div>

            <div className="flex flex-col col-span-4 row-span-8 py-4 items-center red gap-3">
                {showSales.map((infoSales) => (
                    <SaleComponent key={infoSales.id} sale={infoSales} />
                ))}
            </div>

            <div className="w-full h-[100px] border-t border-specialblue self-end flex items-center justify-end pr-4 col-span-4">
                <div className="text-specialblue text-5xl">
                    ${totalFinalPrice}
                </div>
            </div>
        </div>
    );
}
