import { motion } from "framer-motion";
import { useState } from "react";
import Logo from "../assets/logo-no-background.png";
import axiosClient from "../axios";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosClient.post("/contact", formData);
            setSuccess(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error("Error sending message:", error);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-4 py-8">
            <div className="flex justify-center mb-8">
                <img src={Logo} alt="Logo" />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Contáctanos
            </h1>

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Mensaje enviado exitosamente. ¡Gracias por tu feedback!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Asunto
                    </label>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                subject: e.target.value,
                            })
                        }
                        className="w-full px-4 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Mensaje
                    </label>
                    <textarea
                        value={formData.message}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                message: e.target.value,
                            })
                        }
                        className="w-full px-4 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white h-32"
                        required
                    ></textarea>
                </div>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-specialblue text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    {loading ? "Enviando..." : "Enviar mensaje"}
                </motion.button>
            </form>
        </div>
    );
}
