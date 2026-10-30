import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "../../context/CartContext";
import useHideOnScroll from "../../hooks/useHideOnScroll";
import { baseProducts } from "../../data/products.js";

const menu = [
    { title: "МУЖЧИНАМ", link: "/catalog?gender=Мужской", mega: "men" },
    { title: "ЖЕНЩИНАМ", link: "/catalog?gender=Женский", mega: "women" },
    { title: "ДЕТЯМ", link: "/catalog?gender=Мужской", mega: "kids" },
    { title: "ВИДЫ СПОРТА", link: "/catalog", mega: "sport" },
    { title: "СКИДКИ", link: "/catalog?sale=1", red: true },
    { title: "АКЦИИ", link: "/catalog?sale=1" },
];

function makeMenu(gender) {
    const list = baseProducts.filter((p) => p.specifications.gender === gender);
    const clothes = [...new Set(list.filter((p) => p.category !== "Обувь").map((p) => p.category))];
    const shoes = [...new Set(list.filter((p) => p.category === "Обувь").map((p) => p.type))];

    return [
        {
            title: "ОДЕЖДА",
            link: `/catalog?gender=${gender}&section=Одежда`,
            links: [
                { title: "Новинки", link: `/catalog?gender=${gender}&new=1` },
                ...clothes.map((c) => ({ title: c, link: `/catalog/${c}?gender=${gender}` })),
            ],
        },
        {
            title: "ОБУВЬ",
            link: `/catalog/Обувь?gender=${gender}`,
            links: shoes.map((t) => ({ title: t, link: `/catalog/Обувь?gender=${gender}` })),
        },
        {
            title: "ПОДБОРКИ",
            link: `/catalog?gender=${gender}`,
            links: [
                { title: "Все товары", link: `/catalog?gender=${gender}` },
                { title: "Скидки", link: `/catalog?gender=${gender}&sale=1` },
            ],
        },
    ];
}


const megaMenus = {
    men: { columns: makeMenu("Мужской"), image: "/banners/menu-m.png", link: "/catalog?gender=Мужской&season=Зима" },
    women: { columns: makeMenu("Женский"), image: "/banners/menu-w.png", link: "/catalog?gender=Женский&season=Зима" },
    kids: { columns: makeMenu("Мужской") },
};

const sportMenu = [
    { title: "СПОРТИВНЫЙ СТИЛЬ", image: "/banners/sport_img_1.jpg" },
    { title: "ТРЕНИНГ", image: "/banners/sport_img_3.png" },
    { title: "ФИТНЕС", image: "/banners/sport_img_4.png" },
    { title: "БЕГ", image: "/banners/sport_img_2.png" },
    { title: "ФУТБОЛ", image: "/banners/sport_img_5.png" },
];
const otherSports = ["Плавание", "Баскетбол", "Волейбол", "Пилатес и йога"];

function Header() {
    const { totalCount } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mega, setMega] = useState("");
    const hidden = useHideOnScroll();

    function closeMega() {
        setMega("");
    }

    return (
        <header
            className={"bg-white text-text font-medium sticky top-0 z-40 transition-transform duration-300 " + (hidden ? "-translate-y-full" : "")}
            onMouseLeave={closeMega}
        >
            {/* верхняя полоска */}
            <div className="hidden md:block">
                <div className="flex flex-row justify-end gap-6 h-[40px] items-center text-[14px] max-w-[1360px] mx-auto px-4">
                    <a href="tel:88007777757" className="hover:text-demix-dark">
                        8 (800) 777-77-57 <span className="bg-light text-demix-dark text-[12px] px-1">24/7</span>
                    </a>
                </div>
            </div>

            <div className="border-t border-b border-line">
                <div className="flex flex-row justify-between items-center max-w-[1360px] h-[60px] mx-auto px-4">
                    {/* кнопка меню на телефоне */}
                    <button className="lg:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>

                    <Link to="/" className="font-logo italic font-black text-3xl tracking-tight hover:text-demix-dark">
                        DEMIX
                    </Link>

                    <nav className="hidden lg:flex gap-8 text-[15px] self-stretch">
                        {menu.map((item) => (
                            <Link
                                key={item.title}
                                to={item.link}
                                onMouseEnter={() => setMega(item.mega || "")}
                                onClick={closeMega}
                                className={"relative flex items-center group " + (item.red ? "text-sale" : "")}
                            >
                                {item.title}
                                <span
                                    className={"absolute left-0 bottom-0 h-[3px] bg-demix transition-all duration-300 " +
                                        (item.mega && mega === item.mega ? "w-full" : "w-0 group-hover:w-full")}
                                ></span>
                            </Link>
                        ))}
                    </nav>

                    {/* корзина: если в ней что-то есть зеленый кружок с количеством */}
                    <Link to="/cart" className="relative text-2xl hover:text-demix-dark">
                        <FiShoppingBag />
                        {totalCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-demix text-text text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {totalCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* мега меню мужчины женщины*/}
            <AnimatePresence>
                {megaMenus[mega] && (
                    <motion.div
                        key={mega}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-line shadow-lg"
                    >
                        <div className="flex justify-between max-w-[1360px] mx-auto px-4 py-8">
                            <div className="flex gap-20">
                                {megaMenus[mega].columns.map((column) => (
                                    <div key={column.title}>
                                        <Link to={column.link} onClick={closeMega} className="block font-bold mb-4 hover:text-demix-dark">
                                            {column.title}
                                        </Link>
                                        {column.links.map((link) => (
                                            <Link
                                                key={link.title}
                                                to={link.link}
                                                onClick={closeMega}
                                                className="block mb-3 font-normal hover:text-demix-dark"
                                            >
                                                {link.title}
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {megaMenus[mega].image && (
                                <Link to={megaMenus[mega].link} onClick={closeMega}>
                                    <img src={megaMenus[mega].image} alt="Зима 2026" className="w-[210px] h-[320px] object-cover" />
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* мега меню "виды спорта */}
            <AnimatePresence>
                {mega === "sport" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-line shadow-lg"
                    >
                        <div className="flex gap-8 max-w-[1360px] mx-auto px-4 py-8">
                            {sportMenu.map((sport) => (
                                <Link key={sport.title} to="/catalog" onClick={closeMega} className="group">
                                    <p className="font-bold mb-4 group-hover:text-demix-dark">{sport.title}</p>
                                    <img src={sport.image} alt={sport.title} className="w-[180px] h-[180px] object-cover" />
                                </Link>
                            ))}

                            <div className="pt-10">
                                {otherSports.map((sport) => (
                                    <Link
                                        key={sport}
                                        to="/catalog"
                                        onClick={closeMega}
                                        className="block mb-3 font-normal text-gray hover:text-text"
                                    >
                                        {sport}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* меню на телефоне */}
            {menuOpen && (
                <nav className="lg:hidden flex flex-col bg-white border-b border-line px-4 py-2">
                    {menu.map((item) => (
                        <Link
                            key={item.title}
                            to={item.link}
                            onClick={() => setMenuOpen(false)}
                            className={"py-3 border-b border-light " + (item.red ? "text-sale" : "")}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
            )}

        </header>
    )
}

export default Header;
