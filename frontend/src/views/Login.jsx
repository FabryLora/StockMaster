import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-no-background.png";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import "./login.css";

export default function Login() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ __html: "" });

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });

        axiosClient
            .post("/login", {
                email,
                password,
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
            })
            .catch((error) => {
                if (error.response) {
                    const finalErrors = Object.values(
                        error.response.data.errors
                    ).reduce((accum, next) => [...next, ...accum], []);

                    setError({ __html: finalErrors.join("<br>") });
                }
                console.log(error);
            });
    };

    return (
        <>
            <div className="h-screen flex justify-center items-center flex-col text-white p-4">
                <div className="flex flex-col gap-10">
                    <Link to={"/home"}>
                        <img src={logo} width={500} alt="" />
                    </Link>
                    {error.__html && (
                        <div
                            className="bg-red-500 rounded py-2 px-3 text-white"
                            dangerouslySetInnerHTML={error}
                        ></div>
                    )}
                    <form
                        onSubmit={onSubmit}
                        className="flex flex-col gap-3"
                        action=""
                        method="post"
                    >
                        <label htmlFor="">Direccion de correo</label>
                        <input
                            required
                            className="p-2 bg-transparent border rounded-md"
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                        <label htmlFor="">Contraseña</label>
                        <input
                            className="p-2 bg-transparent border rounded-md"
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                        <input
                            className="border rounded-md p-2 mt-5 hover:bg-white hover:text-black cursor-pointer"
                            type="submit"
                            value="Iniciar Sesion"
                        />
                        <Link
                            to={"/signup"}
                            className="text-specialblue self-end"
                        >
                            No estas registrado? Registrarse
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}
