import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function Profile() {
    const { currentUser, updateUserProfile } = useStateContext();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setErrors({});
        setSuccessMessage("");
        setLoading(true);

        const dataToUpdate = {
            name: formData.name,
            email: formData.email,
            ...(formData.password && {
                password: formData.password,
                password_confirmation: formData.password_confirmation,
            }),
        };

        updateUserProfile(dataToUpdate)
            .then(() => {
                setFormData((prev) => ({
                    ...prev,
                    password: "",
                    password_confirmation: "",
                }));
                setSuccessMessage("Perfil actualizado exitosamente");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.message;
                const errorTranslations = {
                    "The name field is required.": {
                        name: "El nombre es requerido",
                    },
                    "The email field is required.": {
                        email: "El correo electrónico es requerido",
                    },
                    "The password field is required.": {
                        password: "La contraseña es requerida",
                    },
                    "The password confirmation does not match": {
                        password_confirmation: "Las contraseñas no coinciden",
                    },
                    "The password must be at least 8 characters": {
                        password:
                            "La contraseña debe tener al menos 8 caracteres",
                    },
                    "The email must be a valid email address": {
                        email: "El correo electrónico no es válido",
                    },
                };

                const translatedError = errorTranslations[errorMessage] || {
                    general: errorMessage,
                };
                setErrors(translatedError);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-57px)]">
            <div className="bg-[#292f33] p-6 rounded-lg w-full max-w-md">
                <h2 className="text-2xl text-white mb-4">Editar Perfil</h2>
                {successMessage && (
                    <div className="bg-green-500 text-white p-3 rounded mb-4">
                        {successMessage}
                    </div>
                )}
                {errors.general && (
                    <div className="bg-red-500 text-white p-3 rounded mb-4">
                        {errors.general}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-white block mb-1">Nombre</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full p-2 rounded bg-defaultbg text-white"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="text-white block mb-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="w-full p-2 rounded bg-defaultbg text-white"
                        />
                        {errors.email && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="text-white block mb-1">
                            Nueva Contraseña (opcional)
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="w-full p-2 rounded bg-defaultbg text-white"
                        />
                    </div>
                    <div>
                        <label className="text-white block mb-1">
                            Confirmar Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            value={formData.password_confirmation}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password_confirmation: e.target.value,
                                })
                            }
                            className="w-full p-2 rounded bg-defaultbg text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-specialblue text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {loading ? "Actualizando..." : "Actualizar Perfil"}
                    </button>
                </form>
            </div>
        </div>
    );
}
