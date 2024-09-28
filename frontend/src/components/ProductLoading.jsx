import { Skeleton } from "@mui/material";

export default function ProductLoading() {
    return (
        <div>
            <Skeleton
                variant="rectangular"
                width={80}
                height={80}
                sx={{ bgcolor: "#2c2d2d" }}
            />
            <Skeleton variant="text" sx={{ bgcolor: "#2c2d2d" }} />
        </div>
    );
}
