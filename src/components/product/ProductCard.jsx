import { useState, useRef } from "react";
import { Link } from "react-router-dom"
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";

import Rating from "../ui/Rating";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";

// карточка товара
function ProductCard({ product, showMenu }) {
    const { cart, addToCart } = useCart();
    const cardRef = useRef(null);
    const [height, setHeight] = useState(0);      // высота карточки, чтобы соседние не сдвигались
    const [hover, setHover] = useState(false);
    const [image, setImage] = useState(0);        // номер фото
    const [size, setSize] = useState(null);       // выбранный размер
    const [error, setError] = useState(false);    // нажали "В корзину" без размера
    const [added, setAdded] = useState(false);
    const [count, setCount] = useState(1);        // сколько штук положить в корзину
    const [opened, setOpened] = useState(false);  // открыта шторка (телефон)

    // в предпросмотре только первые 6 фото
    const images = product.images.slice(0, 6);

    const link = `/product/${product.id}`;
    const menuOpen = showMenu && hover;

    // товар уже в корзине
    const inCart = cart.some((item) => item.product.id === product.id);

    function handleEnter() {
        if (window.innerWidth >= 768) {
            setHeight(cardRef.current.offsetHeight);
            setHover(true);
        }
    }

    function handleLeave() {
        setHover(false);
        setImage(0);
        setSize(null);
        setError(false);
        setAdded(false);
        setCount(1);
    }

    // пролистывание фоток мышкой
    function handleMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const part = (e.clientX - rect.left) / rect.width;
        const index = Math.floor(part * images.length);
        setImage(Math.min(Math.max(index, 0), images.length - 1));
    }

    function chooseSize(s) {
        setSize(s);
        setError(false);
    }

    function changeCount(number) {
        if (number < 1 || number > 10) return;
        setCount(number);
        setAdded(false);
    }

    // закрываем шторку и сбрасываем выбор
    function closeSheet() {
        setOpened(false);
        setSize(null);
        setError(false);
        setAdded(false);
        setCount(1);
    }

    function handleAdd() {
        if (!size) {
            setError(true);
            return;
        }
        addToCart(product, size, count);
        setAdded(true);

        if (opened) {
            setTimeout(closeSheet, 700);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            ref={cardRef}
            className={"relative h-full " + (menuOpen ? "z-20" : "")}
            style={menuOpen ? { height: height } : {}}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <div
                className={"flex flex-col " +
                    (menuOpen ? "absolute -top-3 -left-3 -right-3 p-3 bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)]" : "h-full")}
            >
                <div className="relative bg-light overflow-hidden" onMouseMove={handleMove}>
                    <Link to={link}>
                        <img
                            src={images[image]}
                            alt={product.name}
                            className="w-full aspect-[3/4] object-cover"
                        />
                    </Link>

                    {/* точки какое фото сейчас */}
                    {hover && (
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                            {images.map((img, index) => (
                                <span
                                    key={img}
                                    className={"w-1.5 h-1.5 rounded-full " + (index === image ? "bg-text" : "bg-line")}
                                ></span>
                            ))}
                        </div>
                    )}
                </div>

                <Link to={link} className="mt-3 text-[14px] hover:text-demix-dark">
                    {product.name}
                </Link>

                {/* рейтинг и цена внизу карточки */}
                <div className="mt-auto">
                    <div className="mt-1">
                        <Rating rating={product.rating} reviews={product.reviews} />
                    </div>

                    <div className="flex items-center flex-wrap gap-2 mt-2 mb-3 md:mb-0">
                        <p className="font-bold text-[18px]">
                            {formatPrice(product.price)}
                        </p>
                    </div>
                </div>

                {/* на телефоне кнопка открывает шторку */}
                {showMenu && (
                    <button
                        onClick={() => setOpened(true)}
                        className={"md:hidden py-2 rounded-full font-bold uppercase text-[13px] " + (inCart ? "bg-text text-white" : "bg-demix")}
                    >
                        {inCart ? "В корзине" : "В корзину"}
                    </button>
                )}

                {/* меню при наведении размеры и кнопка в корзину*/}
                {menuOpen && (
                    <div className="pt-3 pb-1">
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
                            {product.sizes.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => chooseSize(s)}
                                    className={"border-b-2 " + (size === s ? "border-demix" : "border-transparent hover:border-line")}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {error && <p className="text-sale text-[13px] mt-2">Выберите размер</p>}

                        <div className="flex gap-3 mt-4">
                            {/* количество */}
                            <div className="flex items-center border border-line rounded-full">
                                <button
                                    className="w-9 h-full flex items-center justify-center disabled:opacity-30"
                                    disabled={count === 1}
                                    onClick={() => changeCount(count - 1)}
                                >
                                    <FiMinus />
                                </button>
                                <span className="w-6 text-center font-bold">{count}</span>
                                <button
                                    className="w-9 h-full flex items-center justify-center disabled:opacity-30"
                                    disabled={count === 10}
                                    onClick={() => changeCount(count + 1)}
                                >
                                    <FiPlus />
                                </button>
                            </div>

                            <button
                                onClick={handleAdd}
                                className="flex-1 py-3 rounded-full bg-demix hover:bg-demix-hover font-bold uppercase text-[12px] md:text-[14px] transition"
                            >
                                {added ? "Добавлено" : "В корзину"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* шторка снизу на телефоне (createPortal - рисуем в конце body, поверх всего) */}
            {createPortal(
                <AnimatePresence>
                    {opened && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="md:hidden fixed inset-0 z-[70] bg-black/40 flex items-end"
                            onClick={(e) => { if (e.target === e.currentTarget) closeSheet(); }}
                        >
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ duration: 0.25 }}
                                className="w-full bg-white rounded-t-2xl px-4 pt-5 pb-6"
                            >
                                <p className="font-bold text-[18px] mb-4">{product.name}</p>

                                {/* размер */}
                                <p className="text-[14px] mb-2">Размер</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {product.sizes.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => chooseSize(s)}
                                            className={"h-11 border rounded text-[14px] " + (size === s ? "border-text bg-text text-white" : "border-line")}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>

                                {error && <p className="text-sale text-[13px] mt-2">Выберите размер</p>}

                                <div className="flex gap-3 mt-5">
                                    {/* количество */}
                                    <div className="flex items-center border border-line rounded-full">
                                        <button
                                            className="w-11 h-full flex items-center justify-center disabled:opacity-30"
                                            disabled={count === 1}
                                            onClick={() => changeCount(count - 1)}
                                        >
                                            <FiMinus />
                                        </button>
                                        <span className="w-6 text-center font-bold">{count}</span>
                                        <button
                                            className="w-11 h-full flex items-center justify-center disabled:opacity-30"
                                            disabled={count === 10}
                                            onClick={() => changeCount(count + 1)}
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>

                                    <button onClick={handleAdd} className="flex-1 py-4 rounded-full bg-demix font-bold uppercase">
                                        {added ? "Добавлено" : "В корзину"}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </motion.div>
    )
}

export default ProductCard;
