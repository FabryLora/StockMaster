import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import AddProductItem from "../components/AddProductItem.jsx";
import ProductItem from "../components/ProductItem.jsx";
import ProductLoading from "../components/ProductLoading.jsx";

export default function Productos() {
    //SI QUIERO USAR LA DATA EN MAS DE UN COMPONENTE ES MEJOR HACER EL PROCEDIMIENTO EN EL CONTEXT PROVIDER
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/product").then(({ data }) => {
            setProducts(data.data);
            setFilteredProducts(data.data);
            setLoading(false);
        });
    }, []);

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
        <div className="text-white flex w-full flex-col justify-center mt-10 gap-20">
            <form
                className="flex gap-3 w-full justify-center"
                action=""
                method="post"
            >
                <input
                    className="bg-transparent border rounded-md w-1/3 p-2"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Buscar producto..."
                />
            </form>

            <div className="flex flex-row gap-4 p-3">
                {loading ? (
                    <>
                        <ProductLoading />
                        <ProductLoading />
                        <ProductLoading />
                    </>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductItem product={product} key={product.id} />
                    ))
                )}

                <AddProductItem />
            </div>
        </div>
    );
}
