import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Days({ currentDay, currentMonth, currentYear, sales }) {
    const [isActive, setIsActive] = useState(false);

    const filteredArray = sales.filter(
        (sale) =>
            sale.created_at.slice(0, 10) ===
            `${currentYear}-${currentMonth}-${currentDay}`
    );

    let pricesArray = filteredArray.map((sale) => {
        return sale.final_price;
    });

    const totalRaw = pricesArray.reduce((acc, curr) => acc + Number(curr), 0);
    const total = totalRaw.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
    });

    return (
        <div>
            <button
                onClick={() => setIsActive(!isActive)}
                className={
                    isActive
                        ? " flex flex-col rounded-md border justify-start items-start px-3 py-1 text-white text-xl absolute top-0 left-0 w-full h-full bg-[#292f33] z-10"
                        : "relative flex w-32 h-32 rounded-md border justify-start items-start px-3 py-1 text-white text-xl"
                }
            >
                {filteredArray.length != 0 && isActive == false && (
                    <div className="absolute top-1/2 left-1/2 animate -translate-x-1/2 -translate-y-1/2">
                        <FontAwesomeIcon
                            icon={faExclamation}
                            size="3x"
                            style={{ color: "#ffffff" }}
                        />
                    </div>
                )}
                <h2 className={isActive ? "text-2xl" : ""}>{currentDay}</h2>
                {isActive && (
                    <>
                        <div className="flex flex-col justify-start gap-3 overflow-scroll w-full p-3">
                            {filteredArray.map((sale) => (
                                <div
                                    className="flex flex-row border rounded-md p-2 justify-between"
                                    key={sale.id}
                                >
                                    <div className="flex flex-row gap-2">
                                        <h2>{sale.product_name}</h2>
                                        <p className="text-[#6b7280]">
                                            x{sale.amount_sold}
                                        </p>
                                    </div>
                                    <h2>${sale.final_price}</h2>
                                </div>
                            ))}
                        </div>
                        {filteredArray.length != 0 && (
                            <h2 className="self-center pb-3">
                                Total del dia: ${total}
                            </h2>
                        )}
                    </>
                )}
            </button>
        </div>
    );
}
