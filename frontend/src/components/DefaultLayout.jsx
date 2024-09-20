import { Link, Navigate, Outlet } from "react-router-dom";
import logo from "../../public/logo-no-background.png";
import { userStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const { currentUser, userToken } = userStateContext();

    if (!userToken) {
        return <Navigate to={"login"} />;
    }
    return (
        <>
            <header className="text-white font-gothic text-lg">
                <nav className="grid grid-cols-3 justify-items-center items-center p-2 shadow-md shadow-gray-700">
                    <ul className="w-full flex justify-evenly">
                        <Link>Productos</Link>
                        <Link>Ventas</Link>
                        {/* <Link>{currentUser.name}</Link>
                        <Link>{currentUser.email}</Link> */}
                    </ul>
                    <Link>
                        <img src={logo} width={400} alt="" />
                    </Link>
                    <ul className="w-full flex justify-evenly">
                        <Link>Gestor de Ventas</Link>
                        <Link>Gestor de Productos</Link>
                    </ul>
                </nav>
            </header>
            <body>
                <Outlet />
            </body>
        </>
    );
}
