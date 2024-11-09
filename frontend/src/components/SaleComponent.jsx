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
        <div className="flex flex-row w-full p-4 bg-gray-800/30 border border-specialblue/20 text-white rounded-lg justify-between hover:bg-gray-800/50 transition-all group">
            <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium">{sale.product_name}</h3>
                <p className="text-gray-400 text-lg">x{sale.amount_sold}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
                <h2 className="text-lg font-bold text-specialblue">
                    ${sale.final_price}
                </h2>
                <button
                    onClick={onDeleteClick}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 hover:text-red-400 transition-colors"
                        size="lg"
                    />
                </button>
            </div>
        </div>
    );
}
