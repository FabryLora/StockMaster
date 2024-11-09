import { Skeleton } from "@mui/material";

export default function ProductLoading() {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-col justify-center items-center">
                <div className="bg-gray-800/50 rounded-xl p-4">
                    {/* Image placeholder */}
                    <Skeleton
                        variant="rectangular"
                        width={200}
                        height={200}
                        sx={{ bgcolor: "#2c2d2d", borderRadius: "12px" }}
                    />

                    {/* Title and price placeholders */}
                    <div className="mt-4 space-y-2">
                        <Skeleton
                            variant="text"
                            width={150}
                            sx={{ bgcolor: "#2c2d2d" }}
                        />
                        <Skeleton
                            variant="text"
                            width={100}
                            sx={{ bgcolor: "#2c2d2d" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
