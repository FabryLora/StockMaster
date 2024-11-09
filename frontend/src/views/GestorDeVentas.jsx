import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import Days from "../components/Days";

export default function GestorDeVentas() {
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const [sales, setSales] = useState([]);
    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(currentMonth);
    const [days, setDays] = useState([]);
    const [monthTotal, setMonthTotal] = useState(0);

    useEffect(() => {
        axiosClient.get("/sale").then(({ data }) => {
            setSales(data.data);
        });
    }, []);

    useEffect(() => {
        const lastDayOfMonth = new Date(year, month + 1, 0);
        let auxArray = [];
        for (let index = 1; index <= lastDayOfMonth.getDate(); index++) {
            auxArray.push(index);
        }
        setDays(auxArray);
    }, [month, year]);

    useEffect(() => {
        const filteredArrayByMonth = sales.filter(
            (sale) =>
                new Date(sale.created_at).getMonth() === month &&
                new Date(sale.created_at).getFullYear() === year
        );

        const totalRaw = filteredArrayByMonth.map((sale) => {
            return sale.final_price;
        });

        const total = totalRaw.reduce((acc, curr) => acc + Number(curr), 0);

        setMonthTotal(
            total.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
            })
        );
    }, [month, year, sales]);

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header con año y mes */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div className="space-y-6">
                        {/* Selector de año */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setYear(year - 1)}
                                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                            >
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    className="text-gray-300 text-xl"
                                />
                            </button>
                            <h2 className="text-4xl font-bold text-gray-100">
                                {year}
                            </h2>
                            <button
                                onClick={() => setYear(year + 1)}
                                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                            >
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="text-gray-300 text-xl"
                                />
                            </button>
                        </div>

                        {/* Selector de mes */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() =>
                                    setMonth(
                                        month != 0 ? month - 1 : month + 11
                                    )
                                }
                                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                            >
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    className="text-gray-300 text-xl"
                                />
                            </button>
                            <h2 className="text-4xl font-bold text-gray-100">
                                {months[month]}
                            </h2>
                            <button
                                onClick={() =>
                                    setMonth(
                                        month != 11 ? month + 1 : month - 11
                                    )
                                }
                                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                            >
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="text-gray-300 text-xl"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid de días */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {days.map((day) => (
                            <Days
                                key={day}
                                currentDay={day}
                                currentMonth={month + 1}
                                currentYear={year}
                                sales={sales}
                            />
                        ))}
                    </div>
                </div>

                {/* Total del mes */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-xl">
                            Total del mes:
                        </span>
                        <span className="text-4xl font-bold text-green-500">
                            ${monthTotal}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
