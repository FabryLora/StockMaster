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
    const [cant, setCant] = useState();
    const [sales, setSales] = useState({
        product_name: "",
        amount_sold: "",
        final_price: "",
        discount: "",
    });
    const [error, setError] = useState(false);
    const [succ, setSucc] = useState(false);

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
            console.log(data);
        });
    }, []);

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
        return showSales.reduce(
            (sum, sale) => sum + parseFloat(sale.final_price || 0),
            0
        );
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
            <div className="h-screen border-r relative col-span-1 row-span-9">
                <form
                    className="flex flex-col justify-center items-center p-3 gap-10"
                    action=""
                    method="post"
                    onSubmit={onSubmit}
                >
                    <div className="relative">
                        <input
                            className="bg-transparent border rounded-md w-fit"
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
                                className=" border rounded-md w-full h-[400px] flex flex-col gap-4 absolute overflow-y-scroll pt-3 bg-[#292f33]"
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
                    <AnimatePresence>
                        {succ && (
                            <motion.div
                                exit={{ opacity: 0 }}
                                className="bg-green-500 text-white py-2 px-3 rounded-md"
                            >
                                Producto creado exitosamente
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex flex-col gap-2 w-full text-gray-500">
                        <h3>ID: {infoProduct.id}</h3>
                        <h3>Producto: {infoProduct.name}</h3>
                        <h3>
                            Cantidad disponible: {infoProduct.stock}{" "}
                            {infoProduct.ustock}
                        </h3>
                        <h3>
                            Precio x {infoProduct.ustock}: ${infoProduct.price}{" "}
                        </h3>
                    </div>

                    <div className="flex flex-col items-center w-full gap-3">
                        <h2>Descuento:</h2>
                        <div className="flex flex-row gap-2 justify-evenly w-full">
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
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <h2>Cantidad:</h2>
                        <input
                            onChange={(ev) => setCant(ev.target.value)}
                            className="bg-transparent border p-2 rounded-md"
                            type="number"
                            name=""
                            placeholder="Cantidad..."
                            id=""
                        />
                    </div>

                    <div className="flex flex-col items-center w-full gap-2">
                        <h2>Precio final:</h2>
                        <input
                            className="bg-transparent p-2 rounded-md border w-full"
                            type="number"
                            name=""
                            id=""
                            value={finalPrice}
                        />
                    </div>

                    <input
                        className="border rounded-md w-4/5 py-2 cursor-pointer text-lg"
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

            <div className="w-full h-[100px] border-t self-end flex items-center justify-end pr-4 col-span-4">
                <div className="text-white text-5xl">
                    ${totalFinalPrice.toFixed(2)}
                </div>
            </div>
        </div>
    );
}
