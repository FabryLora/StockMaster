import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ProductItem({ product }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-2 relative">
                <motion.button
                    className="flex items-center flex-col h-20 bg-contain aspect-square rounded-md"
                    style={{ backgroundImage: `url(${product.image_url})` }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {/* {product.image_url ? (
                        <img
                            className="rounded-md h-20"
                            src={product.image_url}
                            alt=""
                        />
                    ) : (
                        <img
                            className="h-20"
                            src="https://www.mil-colores.com/wp-content/uploads/52TRE3A-269_1-1.jpg"
                            alt=""
                        />
                    )} */}
                </motion.button>
                <h2>{product.name}</h2>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className=" z-10  w-auto min-w-[350px] rounded-md left-0 top-24 absolute"
                        >
                            <div className="flex flex-col gap-3">
                                <motion.div
                                    className="rounded-md w-fit"
                                    whileHover={{
                                        backgroundColor: "#000",
                                        opacity: 0.5,
                                    }}
                                >
                                    <img
                                        src={product.image_url}
                                        className="rounded-md max-h-[280px]"
                                    />
                                </motion.div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row gap-2 items-center">
                                        <h2 className="opacity-50">Nombre:</h2>
                                        <p className="font-bold text-lg">
                                            {product.name}
                                        </p>
                                    </div>

                                    {product.description && (
                                        <div className="flex flex-row gap-2 items-center">
                                            <h2 className="opacity-50">
                                                Descipcion:
                                            </h2>
                                            <p>{product.description}</p>
                                        </div>
                                    )}

                                    {product.type && (
                                        <div className="flex flex-row gap-2 items-center">
                                            <h2 className="opacity-50">
                                                Grupo:
                                            </h2>
                                            <p className="font-bold text-lg">
                                                {product.type}
                                            </p>
                                        </div>
                                    )}
                                    <div className="flex flex-row gap-2 items-center">
                                        <h2 className="opacity-50">
                                            Unidad de stock:
                                        </h2>
                                        <p className="font-bold text-lg">
                                            {product.ustock}
                                        </p>
                                    </div>

                                    <div className="flex flex-row gap-2 items-center">
                                        <h2 className="opacity-50">Precio:</h2>
                                        <p className="font-bold text-lg">
                                            ${product.price}
                                        </p>
                                    </div>

                                    <div className="flex flex-row gap-2 items-center">
                                        <h2 className="opacity-50">Stock:</h2>
                                        <p className="font-bold text-lg">{`${product.stock} ${product.ustock}`}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
