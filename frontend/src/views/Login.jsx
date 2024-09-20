import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
    return (
        <form className="flex flex-col gap-3" action="" method="post">
            <label htmlFor="">Direccion de correo</label>
            <input
                className="p-2 bg-transparent border rounded-md"
                type="email"
                name="email"
                id=""
            />
            <label htmlFor="">Contraseña</label>
            <input
                className="p-2 bg-transparent border rounded-md"
                type="password"
                name="password"
                id=""
            />
            <input
                className="border rounded-md p-2 mt-5 hover:bg-white hover:text-black cursor-pointer"
                type="submit"
                value="Iniciar Sesion"
            />
            <Link to={"/signup"} className="text-specialblue self-end">
                No estas registrado? Registrarse
            </Link>
        </form>
    );
}
