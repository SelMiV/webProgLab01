import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "../../context/CartContext";
import useHideOnScroll from "../../hooks/useHideOnScroll";
import { baseProducts } from "../../data/products.js";
import menu from "../../data/menu.js";

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
    const [mega, setMega] = useState("");
    const hidden = useHideOnScroll();
    const location = useLocation();
    const navigate = useNavigate();

    // кнопка назад на телефоне
    function goBack() {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate("/");
        }
    }

    function closeMega() {
        setMega("");
    }

    return (
        <header
            className={"bg-white text-text font-medium sticky top-0 z-40 transition-transform duration-300 " + (hidden ? "-translate-y-full" : "")}
            onMouseLeave={closeMega}
        >
            <div className="border-t border-b border-line">
                <div className="flex flex-row justify-between items-center max-w-[1360px] h-[60px] mx-auto px-4">
                    {/* на телефоне стрелка назад вместо логотипа */}
                    {location.pathname !== "/" && (
                        <button onClick={goBack} title="Назад" className="lg:hidden text-2xl">
                            <FiArrowLeft />
                        </button>
                    )}

                    <Link
                        to="/"
                        className={"font-logo italic font-black text-3xl tracking-tight hover:text-demix-dark " +
                            (location.pathname !== "/" ? "hidden lg:block" : "")}
                    >
                        DEMIX
                    </Link>

                    <nav className="hidden lg:flex gap-8 text-[15px] self-stretch">
                        {menu.map((item) => (
                            <Link
                                key={item.title}
                                to={item.link}
                                onMouseEnter={() => setMega(item.mega || "")}
                                onClick={closeMega}
                                className="relative flex items-center group"
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
                    <Link to="/cart" className="relative text-2xl hover:text-demix-dark hidden lg:block">
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

        </header>
    )
}

export default Header;
