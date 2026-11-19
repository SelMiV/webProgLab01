import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiGrid, FiMessageCircle, FiShoppingBag, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "../../context/CartContext";
import menu from "../../data/menu.js";

// нижнее меню на телефоне
function BottomNav({ chatOpen, onToggleChat }) {
    const location = useLocation();
    const { totalCount } = useCart();
    const [catalogOpen, setCatalogOpen] = useState(false);   // панель каталога

    function openChat() {
        setCatalogOpen(false);
        onToggleChat();
    }

    function tabClass(active) {
        return "flex-1 flex flex-col items-center justify-center gap-1 text-[11px] " + (active ? "text-demix-dark" : "text-text");
    }

    return (
        <div className="lg:hidden">
            {/* панель с разделами каталога */}
            <AnimatePresence>
                {catalogOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.25 }}
                        className="fixed left-0 right-0 bottom-[60px] z-50 bg-white border-t border-line shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
                    >
                        <div className="flex justify-between items-center px-4 pt-4 pb-2">
                            <p className="font-bold">КАТАЛОГ</p>
                            <button className="text-2xl" onClick={() => setCatalogOpen(false)}>
                                <FiX />
                            </button>
                        </div>

                        <nav className="flex flex-col px-4 pb-2">
                            {menu.map((item) => (
                                <Link
                                    key={item.title}
                                    to={item.link}
                                    onClick={() => setCatalogOpen(false)}
                                    className={"py-3 border-b border-light " + (item.red ? "text-sale" : "")}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="fixed left-0 right-0 bottom-0 z-50 h-[60px] bg-white border-t border-line flex">
                <Link
                    to="/"
                    onClick={() => setCatalogOpen(false)}
                    className={tabClass(location.pathname === "/" && !catalogOpen && !chatOpen)}
                >
                    <FiHome className="text-[22px]" />
                    Главная
                </Link>

                <button
                    onClick={() => setCatalogOpen(!catalogOpen)}
                    className={tabClass(catalogOpen || (location.pathname.startsWith("/catalog") && !chatOpen))}
                >
                    <FiGrid className="text-[22px]" />
                    Каталог
                </button>

                <button onClick={openChat} className={"chat-tab " + tabClass(chatOpen)}>
                    <FiMessageCircle className="text-[22px]" />
                    Чат
                </button>

                <Link
                    to="/cart"
                    onClick={() => setCatalogOpen(false)}
                    className={tabClass(location.pathname === "/cart" && !catalogOpen && !chatOpen)}
                >
                    <span className="relative">
                        <FiShoppingBag className="text-[22px]" />
                        {totalCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-demix text-text text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {totalCount}
                            </span>
                        )}
                    </span>
                    Корзина
                </Link>
            </nav>
        </div>
    )
}

export default BottomNav;
