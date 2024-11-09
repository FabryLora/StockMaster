import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Days({ currentDay, currentMonth, currentYear, sales }) {
    const [isActive, setIsActive] = useState(false);

    const filteredArray = sales.filter(
        (sale) =>
            sale.created_at.slice(0, 10) ===
            `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(
                currentDay
            ).padStart(2, "0")}`
    );

    let pricesArray = filteredArray.map((sale) => {
        return sale.final_price;
    });

    const totalRaw = pricesArray.reduce((acc, curr) => acc + Number(curr), 0);
    const total = totalRaw.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
    });

    return (
        <div className="relative">
            <button
                onClick={() => setIsActive(!isActive)}
                className={
                    isActive
                        ? "fixed inset-0 w-full h-full bg-gray-800 z-50 p-6 overflow-auto"
                        : "relative w-full aspect-square bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors p-4 flex flex-col"
                }
            >
                {filteredArray.length > 0 && !isActive && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-500 animate-pulse">
                        <FontAwesomeIcon icon={faExclamation} size="2x" />
                    </div>
                )}
                <h2
                    className={`
                    ${isActive ? "text-3xl mb-6" : "text-xl"} 
                    font-bold text-gray-100
                `}
                >
                    {currentDay}
                </h2>
                {isActive && (
                    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
                        <div className="flex flex-col gap-3 overflow-auto max-h-[70vh]">
                            {filteredArray.map((sale) => (
                                <div
                                    key={sale.id}
                                    className="flex items-center justify-between bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-gray-100 font-medium">
                                            {sale.product_name}
                                        </h3>
                                        <span className="text-gray-400 text-sm">
                                            x{sale.amount_sold}
                                        </span>
                                    </div>
                                    <span className="text-green-400 font-semibold">
                                        ${sale.final_price}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {filteredArray.length > 0 && (
                            <div className="border-t border-gray-600 pt-4 mt-4">
                                <h2 className="text-xl text-gray-100 text-center">
                                    Total del día:{" "}
                                    <span className="text-green-400 font-bold">
                                        ${total}
                                    </span>
                                </h2>
                            </div>
                        )}
                        <button
                            onClick={() => setIsActive(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                )}
            </button>
        </div>
    );
}
