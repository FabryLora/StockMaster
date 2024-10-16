/* import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import AddProductItem from "../components/AddProductItem.jsx";
import ProductItem from "../components/ProductItem.jsx";
import ProductLoading from "../components/ProductLoading.jsx";

export default function Productos() {
    //SI QUIERO USAR LA DATA EN MAS DE UN COMPONENTE ES MEJOR HACER EL PROCEDIMIENTO EN EL CONTEXT PROVIDER
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/product").then(({ data }) => {
            setProducts(data.data);
            setFilteredProducts(data.data);
            setLoading(false);
        });
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filtrar productos que coincidan con el valor de búsqueda
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="text-white flex w-full flex-col justify-center mt-10 gap-20">
            <form
                className="flex gap-3 w-full justify-center"
                action=""
                method="post"
            >
                <input
                    className="bg-transparent border rounded-md w-1/3 p-2"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Buscar producto..."
                />
            </form>

            <div className="flex flex-row gap-4 p-3">
                {loading ? (
                    <>
                        <ProductLoading />
                        <ProductLoading />
                        <ProductLoading />
                    </>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductItem product={product} key={product.id} />
                    ))
                )}

                <AddProductItem />
            </div>
        </div>
    );
}
 */
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import AddProductItem from "../components/AddProductItem.jsx";
import ProductItem from "../components/ProductItem.jsx";
import ProductLoading from "../components/ProductLoading.jsx";

const sortOptions = [
    { name: "A-Z", value: "A-Z", current: true },
    { name: "Z-A", value: "Z-A", current: false },

    { name: "Precio: bajo a alto", value: "priceDesc", current: false },
    { name: "Precio: alto a bajo", value: "priceAsc", current: false },
];
const subCategories = [
    { name: "Totes", href: "#" },
    { name: "Backpacks", href: "#" },
    { name: "Travel Bags", href: "#" },
    { name: "Hip Bags", href: "#" },
    { name: "Laptop Sleeves", href: "#" },
];
const filters = [
    {
        id: "color",
        name: "Color",
        options: [
            { value: "white", label: "White", checked: false },
            { value: "beige", label: "Beige", checked: false },
            { value: "blue", label: "Blue", checked: true },
            { value: "brown", label: "Brown", checked: false },
            { value: "green", label: "Green", checked: false },
            { value: "purple", label: "Purple", checked: false },
        ],
    },
    {
        id: "category",
        name: "Categoria",
        options: [
            { value: "Telas", label: "Telas", checked: false },
            { value: "Lanas", label: "Lanas", checked: false },
        ],
    },
    {
        id: "size",
        name: "Size",
        options: [
            { value: "2l", label: "2L", checked: false },
            { value: "6l", label: "6L", checked: false },
            { value: "12l", label: "12L", checked: false },
            { value: "18l", label: "18L", checked: false },
            { value: "20l", label: "20L", checked: false },
            { value: "40l", label: "40L", checked: true },
        ],
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Productos() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/product").then(({ data }) => {
            setProducts(data.data);
            setFilteredProducts(data.data);
            setLoading(false);
        });
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filtrar productos que coincidan con el valor de búsqueda
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleSort = (event) => {
        const option = event.target.value;

        let sortedProducts = [...filteredProducts]; // Clonar los productos filtrados

        switch (option) {
            case "A-Z":
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "priceAsc":
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case "priceDesc":
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredProducts(sortedProducts);
    };

    return (
        <div className="">
            <div>
                {/* Mobile filter dialog */}
                <Dialog
                    open={mobileFiltersOpen}
                    onClose={setMobileFiltersOpen}
                    className="relative z-40 lg:hidden"
                >
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-white">
                                    Filters
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-white"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon
                                        aria-hidden="true"
                                        className="h-6 w-6"
                                    />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>
                                <ul
                                    role="list"
                                    className="px-2 py-3 font-medium text-white"
                                >
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a
                                                href={category.href}
                                                className="block px-2 py-3"
                                            >
                                                {category.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure
                                        key={section.id}
                                        as="div"
                                        className="border-t border-gray-200 px-4 py-6"
                                    >
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-white hover:text-white">
                                                <span className="font-medium text-white">
                                                    {section.name}
                                                </span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon
                                                        aria-hidden="true"
                                                        className="h-5 w-5 group-data-[open]:hidden"
                                                    />
                                                    <MinusIcon
                                                        aria-hidden="true"
                                                        className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                                                    />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map(
                                                    (option, optionIdx) => (
                                                        <div
                                                            key={option.value}
                                                            className="flex items-center"
                                                        >
                                                            <input
                                                                defaultValue={
                                                                    option.value
                                                                }
                                                                defaultChecked={
                                                                    option.checked
                                                                }
                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-white focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                className="ml-3 min-w-0 flex-1 text-white"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="px-3">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                        <h1 className="text-4xl font-bold tracking-tight text-white">
                            Productos
                        </h1>

                        <div className="flex items-center">
                            <Menu
                                as="div"
                                className="relative inline-block text-left"
                            >
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-white hover:text-gray-300">
                                        Ordenar
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-white group-hover:text-gray-300"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1 ">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <button
                                                    onClick={handleSort}
                                                    value={option.value}
                                                    className={classNames(
                                                        option.current
                                                            ? "font-medium text-black"
                                                            : "text-black",
                                                        "block px-4 py-2 text-sm data-[focus]:bg-gray-100 w-full"
                                                    )}
                                                >
                                                    {option.name}
                                                </button>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <button
                                type="button"
                                className="-m-2 ml-5 p-2 text-white hover:text-gray-500 sm:ml-7"
                            >
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-white hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                />
                            </button>
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
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul
                                    role="list"
                                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-white"
                                >
                                    <input
                                        className="bg-transparent rounded-md w-full"
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        placeholder="Buscar producto..."
                                    />
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure
                                        key={section.id}
                                        as="div"
                                        className="border-b border-gray-200 py-6"
                                    >
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-transparent py-3 text-sm text-white hover:text-gray-500">
                                                <span className="font-medium text-white">
                                                    {section.name}
                                                </span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon
                                                        aria-hidden="true"
                                                        className="h-5 w-5 group-data-[open]:hidden"
                                                    />
                                                    <MinusIcon
                                                        aria-hidden="true"
                                                        className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                                                    />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {section.options.map(
                                                    (option, optionIdx) => (
                                                        <div
                                                            key={option.value}
                                                            className="flex items-center"
                                                        >
                                                            <input
                                                                defaultValue={
                                                                    option.value
                                                                }
                                                                defaultChecked={
                                                                    option.checked
                                                                }
                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-white focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                className="ml-3 text-sm text-white"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3 text-white">
                                <div className="flex flex-wrap gap-4 p-3">
                                    <AddProductItem />
                                    {loading ? (
                                        <>
                                            <ProductLoading />
                                            <ProductLoading />
                                            <ProductLoading />
                                        </>
                                    ) : (
                                        filteredProducts.map((product) => (
                                            <ProductItem
                                                product={product}
                                                key={product.id}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
