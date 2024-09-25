import { Navigate, Outlet } from "react-router-dom";
import logo from "../assets/logo-no-background.png";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    const { userToken } = useStateContext();

    if (userToken) {
        return <Navigate to={"/"} />;
    }

    return (
        <div>
            <div className="h-screen flex justify-center items-center flex-col text-white p-4">
                <div className="flex flex-col gap-10">
                    <div>
                        <img src={logo} width={500} alt="" />
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
