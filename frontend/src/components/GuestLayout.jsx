import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    const { userToken } = useStateContext();

    if (userToken) {
        return <Navigate to={"/"} />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}
