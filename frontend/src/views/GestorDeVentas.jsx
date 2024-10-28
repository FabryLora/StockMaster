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
    const [month, setMoth] = useState(currentMonth);
    const [days, setDays] = useState([]);

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

    return (
        <div className="flex flex-col gap-10 items-center">
            <div className="w-full text-center text-5xl pt-5 text-white flex flex-col gap-10">
                <div className="flex flex-row justify-between px-10">
                    <button
                        onClick={() => {
                            setYear(year - 1);
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            style={{ color: "#ffffff" }}
                        />
                    </button>

                    <h2>{year}</h2>
                    <button onClick={() => setYear(year + 1)}>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            size=""
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                </div>
                <div className="flex flex-row justify-between px-10">
                    <button
                        onClick={() => {
                            setMoth(month != 0 ? month - 1 : month + 11);
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            style={{ color: "#ffffff" }}
                        />
                    </button>

                    <h2>{months[month]}</h2>
                    <button
                        onClick={() =>
                            setMoth(month != 11 ? month + 1 : month - 11)
                        }
                    >
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            size=""
                            style={{ color: "#ffffff" }}
                        />
                    </button>
                </div>
            </div>
            <div className="w-[95%] flex flex-row flex-wrap gap-6 relative items-center">
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
    );
}
