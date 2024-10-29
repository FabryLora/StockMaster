import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../axios";

export default function SaleComponent({ sale }) {
    const onDeleteClick = () => {
        if (window.confirm("Estas seguro que queres eliminar la venta?")) {
            axiosClient.delete(`/sale/${sale.id}`);
        }
    };

    return (
        <div
            key={sale.id}
            className="flex flex-row w-[95%] p-3 border-2 border-[#017cc5] text-[#017cc5] font-bold h-12 rounded-md justify-between"
        >
            <div className="flex items-center gap-2">
                <h3 className="text-lg">{sale.product_name}</h3>
                <p className="text-[#6b7280] text-lg">x{sale.amount_sold}</p>
            </div>
            <div className="flex flex-row items-center gap-3">
                <h2 className="text-lg">${sale.final_price}</h2>
                <button onClick={onDeleteClick}>
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#ef4444" }}
                        size="xl"
                    />
                </button>
            </div>
        </div>
    );
}
