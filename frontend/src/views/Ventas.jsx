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
        type: "",
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
    const [succ, setSucc] = useState(false);
    const [instantImage, setInstantImage] = useState("");
    const [errors, setErrors] = useState({
        product_name: null,
        amount_sold: null,
        final_price: null,
        discount: null,
        general: null,
    });
    const [amountStock, setAmountStock] = useState();

    useEffect(() => {
        setSales({
            ...sales,
            discount: descuento,
            amount_sold: cant,
            final_price: finalPrice,
        });
    }, [descuento, cant, finalPrice]);

    useEffect(() => {
        const getProducts = () => {
            setLoading(true);
            axiosClient.get("/product").then(({ data }) => {
                setProducts(data.data);
                setFilteredProducts(data.data);

                if (infoProduct.id) {
                    const currentProduct = data.data.find(
                        (p) => p.id === infoProduct.id
                    );
                    if (currentProduct) {
                        setInfoProduct((prev) => ({
                            ...prev,
                            stock: currentProduct.stock,
                        }));
                        setAmountStock(currentProduct.stock);
                    }
                }
                setLoading(false);
            });
        };

        getProducts();
    }, [showSales]);

    const fetchSales = () => {
        axiosClient.get("/sale").then(({ data }) => {
            setShowSales(
                data.data.filter(
                    (sale) =>
                        sale.created_at && sale.created_at.startsWith(today)
                )
            );
        });
    };

    useEffect(() => {
        fetchSales();
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
        const total = showSales.reduce(
            (sum, sale) => sum + parseFloat(sale.final_price || 0),
            0
        );
        return total.toLocaleString("es-AR", { minimumFractionDigits: 2 });
    }, [showSales]);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...sales };

        if (infoProduct.stock >= cant) {
            axiosClient
                .post("sale", payload)
                .then((res) => {
                    if (res.status === 201) {
                        setSucc(true);
                        setErrors({});
                        fetchSales();
                    }
                })
                .catch((err) => {
                    if (err && err.response) {
                        const errorMessages = err.response.data.errors;
                        const newErrors = {};

                        Object.entries(errorMessages).forEach(
                            ([field, messages]) => {
                                newErrors[field] = messages[0];
                            }
                        );

                        setSucc(false);
                        setErrors(newErrors);
                    }
                });

            axiosClient.put(`product/${infoProduct.id}`, {
                name: infoProduct.name,
                stock: infoProduct.stock - cant,
                price: infoProduct.price,
                ustock: infoProduct.ustock,
                type: infoProduct.type,
            });
        } else {
            setErrors({ amount_sold: "No hay suficiente stock" });
        }
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
        <div className="flex flex-row text-white h-full bg-gray-900 max-md:flex max-md:flex-col max-md:overflow-auto no-scrollbar">
            <AnimatePresence>
                {succ && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed right-1/2 transform translate-x-1/2 top-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 max-md:right-20"
                    >
                        Venta realizada exitosamente
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="h-full border-r border-specialblue/30 w-[28rem] relative overflow-y-scroll backdrop-blur-sm bg-gray-900/50 max-md:order-1 max-md:w-full max-md:overflow-y-visible">
                <form
                    className="flex flex-col justify-center items-center p-6 gap-8"
                    onSubmit={onSubmit}
                >
                    <div className="relative w-full">
                        <input
                            className="bg-gray-800/50 border border-specialblue/50 rounded-lg w-full p-3 focus:ring-2 focus:ring-specialblue focus:border-transparent transition-all"
                            type="text"
                            onChange={handleSearch}
                            value={searchTerm}
                            onFocus={() => setIsOpen(!isOpen)}
                            placeholder="Buscar producto..."
                        />

                        {isOpen && (
                            <div className="border border-specialblue/30 rounded-lg w-full max-h-[400px] flex flex-col gap-2 absolute overflow-y-scroll mt-2 bg-gray-800/95 z-30 backdrop-blur-sm shadow-xl">
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
                                                    type: product.type,
                                                });
                                                setAmountStock(product.stock);
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

                    {errors.general && (
                        <div className="bg-red-500 text-white py-2 px-3 rounded-md">
                            {errors.general}
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
                                Cantidad disponible: {amountStock}{" "}
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

                        <input
                            onChange={(ev) => setCant(ev.target.value)}
                            className={`bg-transparent border p-2 rounded-md border-specialblue text-center ${
                                errors.amount_sold ? "border-red-500" : ""
                            }`}
                            type="number"
                            name=""
                            placeholder="Cantidad..."
                            id=""
                        />
                        {errors.amount_sold && (
                            <span className="text-red-500 text-sm">
                                {errors.amount_sold}
                            </span>
                        )}
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

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-specialblue/10 border border-specialblue text-specialblue font-bold rounded-lg w-full py-3 cursor-pointer text-lg transition-all hover:bg-specialblue hover:text-white"
                        type="submit"
                    >
                        Agregar Venta
                    </motion.button>
                </form>
            </div>

            <div className="flex flex-col w-full justify-between h-full bg-gray-900/30 backdrop-blur-sm max-md:order-2 max-md:mt-32">
                <div className="flex flex-col p-6 gap-4 overflow-y-auto h-full">
                    {showSales.map((infoSales) => (
                        <SaleComponent
                            key={infoSales.id}
                            sale={infoSales}
                            product={infoProduct}
                            onDelete={fetchSales}
                        />
                    ))}
                </div>

                <div className="w-full border-t border-specialblue/30 bg-gray-800/50 backdrop-blur-sm">
                    <div className="text-specialblue text-5xl p-6 font-bold text-right">
                        ${totalFinalPrice}
                    </div>
                </div>
            </div>
        </div>
    );
}
