import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import AddProductItem from "../components/AddProductItem.jsx";
import ProductItem from "../components/ProductItem.jsx";

export default function Productos() {
    //SI QUIERO USAR LA DATA EN MAS DE UN COMPONENTE ES MEJOR HACER EL PROCEDIMIENTO EN EL CONTEXT PROVIDER
    const [products, setProducts] = useState([]);
    console.log(products);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/product").then(({ data }) => {
            setProducts(data.data);
            setLoading(false);
        });
    }, []);

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
                    name=""
                    id=""
                    placeholder="Buscar producto..."
                />
            </form>

            <div className="flex flex-row gap-4 p-3">
                {loading ? (
                    <>
                        <div>
                            <Skeleton
                                variant="rectangular"
                                width={80}
                                height={80}
                                sx={{ bgcolor: "#2c2d2d" }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ bgcolor: "#2c2d2d" }}
                            />
                        </div>
                        <div>
                            <Skeleton
                                variant="rectangular"
                                width={80}
                                height={80}
                                sx={{ bgcolor: "#2c2d2d" }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ bgcolor: "#2c2d2d" }}
                            />
                        </div>
                    </>
                ) : (
                    products.map((product) => (
                        <ProductItem product={product} key={product.id} />
                    ))
                )}

                <AddProductItem />
            </div>
        </div>
    );
}
