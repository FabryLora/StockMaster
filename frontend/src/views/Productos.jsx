import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useMemo, useState } from "react";
import AddProductItem from "../components/AddProductItem.jsx";
import ProductItem from "../components/ProductItem.jsx";
import ProductLoading from "../components/ProductLoading.jsx";
import { useStateContext } from "../contexts/ContextProvider.jsx";

const sortOptions = [
    { name: "A-Z", value: "A-Z", current: true },
    { name: "Z-A", value: "Z-A", current: false },

    { name: "Precio: alto a bajo", value: "priceDesc", current: false },
    { name: "Precio: bajo a alto", value: "priceAsc", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

// Create a pagination component to reuse
const PaginationControls = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <div className="flex justify-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-4 py-2 rounded-lg ${
                        currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-800/50 text-white hover:bg-gray-700"
                    }`}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default function Productos() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortName, setSortName] = useState("Ordenar");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 11;

    const { products, loading, categories } = useStateContext();

    // Aplicar filtrado y ordenamiento en una variable computada
    const filteredAndSortedProducts = useMemo(() => {
        // Primero filtrar por término de búsqueda y categoría
        let result = products.filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesCategory =
                !selectedCategory || product.type === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        // Luego aplicar el ordenamiento
        switch (sortName) {
            case "A-Z":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "Precio: bajo a alto":
                result.sort((a, b) => a.price - b.price);
                break;
            case "Precio: alto a bajo":
                result.sort((a, b) => b.price - a.price);
                break;
        }

        return result;
    }, [products, searchTerm, sortName, selectedCategory]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return filteredAndSortedProducts.slice(startIndex, endIndex);
    }, [filteredAndSortedProducts, currentPage]);

    const totalPages = Math.ceil(
        filteredAndSortedProducts.length / productsPerPage
    );

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (event) => {
        const option = event.target.value;
        switch (option) {
            case "A-Z":
                setSortName("A-Z");
                break;
            case "Z-A":
                setSortName("Z-A");
                break;
            case "priceAsc":
                setSortName("Precio: bajo a alto");
                break;
            case "priceDesc":
                setSortName("Precio: alto a bajo");
                break;
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div>
                {/* Mobile filter dialog */}

                <main className="px-3">
                    <div className="flex items-baseline justify-between border-b border-gray-200/10 pb-6 pt-10">
                        <h1 className="text-4xl font-bold tracking-tight text-white bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Productos
                        </h1>

                        <div className="flex items-center gap-4">
                            <Menu
                                as="div"
                                className="relative inline-block text-left"
                            >
                                <MenuButton className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-gray-300 bg-gray-800/50 rounded-lg transition-colors">
                                    {sortName}
                                    <ChevronDownIcon className="h-5 w-5" />
                                </MenuButton>

                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1 ">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <button
                                                    onClick={handleSort}
                                                    value={option.value}
                                                    className={classNames(
                                                        option.current
                                                            ? "font-medium text-white"
                                                            : "text-white",
                                                        "block px-4 py-2 text-sm data-[focus]:bg-gray-500 rounded-md w-full"
                                                    )}
                                                >
                                                    {option.name}
                                                </button>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>

                    <section
                        aria-labelledby="products-heading"
                        className="pb-24 pt-6"
                    >
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block space-y-6">
                                <div className="space-y-4">
                                    <input
                                        className="w-full px-4 py-2 bg-gray-800/50 rounded-lg border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        placeholder="Buscar producto..."
                                    />

                                    <select
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        className="w-full px-4 py-2 bg-gray-800/50 rounded-lg border-0 text-white focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option
                                            value=""
                                            className="text-gray-900"
                                        >
                                            Todas las categorías
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.category_name}
                                                className="text-gray-900"
                                            >
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <PaginationControls
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                                    <AddProductItem />
                                    {loading ? (
                                        <>
                                            <ProductLoading />
                                            <ProductLoading />
                                            <ProductLoading />
                                        </>
                                    ) : (
                                        paginatedProducts.map((product) => (
                                            <ProductItem
                                                product={product}
                                                key={product.id}
                                            />
                                        ))
                                    )}
                                </div>

                                <div className="mt-8">
                                    <PaginationControls
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
