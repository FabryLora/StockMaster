import { Skeleton } from "@mui/material";

export default function ProductLoadingVentas() {
    return (
        <div className="flex flex-row items-center justify-evenly">
            <Skeleton
                variant="rectangular"
                width={96}
                height={96}
                sx={{ bgcolor: "#2c2d2d" }}
            />
            <Skeleton variant="text" sx={{ bgcolor: "#2c2d2d" }} width={60} />
        </div>
    );
}
