import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import { userStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const { setCurrentUser, setUserToken } = userStateContext();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState({ __html: "" });

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });

        axiosClient
            .post("/signup", {
                name: name,
                email,
                password,
                password_confirmation: passwordConfirmation,
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
                    console.log(finalErrors);
                    setError({ __html: finalErrors.join("<br>") });
                }
                console.log(error);
            });
    };

    return (
        <>
            {error.__html && (
                <div
                    className="bg-red-500 rounded py-2 px-3 text-white"
                    dangerouslySetInnerHTML={error}
                ></div>
            )}
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-3"
                action="#"
                method="POST"
            >
                <input type="hidden" name="remember" defaultValue={true} />
                <label htmlFor="name">Nombre de usuario</label>

                <input
                    className="p-2 bg-transparent border rounded-md"
                    type="text"
                    required
                    name="name"
                    id="name"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                />
                <label htmlFor="email">Direccion de correo</label>

                <input
                    className="p-2 bg-transparent border rounded-md"
                    type="email"
                    required
                    name="email"
                    id="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <label htmlFor="password">Contraseña</label>

                <input
                    className="p-2 bg-transparent border rounded-md"
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <label htmlFor="password-confirmation">
                    Confirmar contraseña
                </label>

                <input
                    className="p-2 bg-transparent border rounded-md"
                    type="password"
                    name="password_confirmation"
                    required
                    id="password-confirmation"
                    value={passwordConfirmation}
                    onChange={(ev) => setPasswordConfirmation(ev.target.value)}
                />
                <input
                    className="border rounded-md p-2 mt-5 hover:bg-white hover:text-black cursor-pointer"
                    type="submit"
                    value="Registrarse"
                />
                <Link to={"/login"} className="text-specialblue self-end">
                    Ya estas registrado? Iniciar Sesion
                </Link>
            </form>
        </>
    );
}
