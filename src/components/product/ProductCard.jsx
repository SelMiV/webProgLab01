import { useState, useRef } from "react";
import { Link } from "react-router-dom"
import { motion } from "framer-motion";

import Rating from "../ui/Rating";
import { useCart } from "../../context/CartContext";
import { formatPrice, getDiscount } from "../../utils/format";

// карточка товара
// фото листаются, если водить мышкой по фото влево-вправо
// showMenu - при наведении снизу появляется меню с размерами и кнопкой "В корзину" (как на demix.ru)
function ProductCard({ product, showMenu }) {
    const { addToCart } = useCart();
    const cardRef = useRef(null);
    const [height, setHeight] = useState(0);      // высота карточки, чтобы соседние не сдвигались
    const [hover, setHover] = useState(false);
    const [image, setImage] = useState(0);        // номер фото
    const [color, setColor] = useState(0);        // номер выбранного цвета
    const [size, setSize] = useState(null);       // выбранный размер
    const [error, setError] = useState(false);    // нажали "В корзину" без размера
    const [added, setAdded] = useState(false);

    const discount = getDiscount(product.price, product.oldprice);

    // все цвета товара: основной + другие (если есть)
    const allColors = [{ name: product.specifications.color, images: product.images }];
    if (product.colors) allColors.push(...product.colors);

    // в предпросмотре только первые 6 фото выбранного цвета
    const images = allColors[color].images.slice(0, 6);

    // ссылка на страницу товара сразу с выбранным цветом (?color=1)
    const link = color > 0 ? `/product/${product.id}?color=${color}` : `/product/${product.id}`;
    const menuOpen = showMenu && hover;

    function handleEnter() {
        // на телефоне наведения нет, меню не показываем
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
    }

    // какая часть фото под мышкой - такое фото и показываем
    function handleMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const part = (e.clientX - rect.left) / rect.width;
        const index = Math.floor(part * images.length);
        setImage(Math.min(Math.max(index, 0), images.length - 1));
    }

    function chooseColor(index) {
        setColor(index);
        setImage(0);
    }

    function chooseSize(s) {
        setSize(s);
        setError(false);
    }

    function handleAdd() {
        if (!size) {
            setError(true);
            return;
        }
        // в корзину кладем фото, название и номер выбранного цвета
        addToCart({
            ...product,
            colorIndex: color,
            images: allColors[color].images,
            specifications: { ...product.specifications, color: allColors[color].name }
        }, size);
        setAdded(true);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            ref={cardRef}
            className={"relative " + (menuOpen ? "z-20" : "")}
            style={menuOpen ? { height: height } : {}}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {/* при наведении карточка "всплывает" поверх соседних: белый фон, тень и меню снизу */}
            <div
                className={"flex flex-col " +
                    (menuOpen ? "absolute -top-3 -left-3 -right-3 p-3 bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)]" : "")}
            >
                <div className="relative bg-light overflow-hidden" onMouseMove={handleMove}>
                    <Link to={link}>
                        <img
                            src={images[image]}
                            alt={product.name}
                            className="w-full aspect-[3/4] object-cover"
                        />
                    </Link>

                    {/* точки - какое фото сейчас */}
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

                {product.reviews > 0 && (
                    <div className="mt-1">
                        <Rating rating={product.rating} reviews={product.reviews} />
                    </div>
                )}

                <div className="flex items-center gap-2 mt-2">
                    <p className={"font-bold text-[18px] " + (discount > 0 ? "text-sale" : "")}>
                        {formatPrice(product.price)}
                    </p>
                    {discount > 0 && (
                        <>
                            <p className="text-gray line-through text-[14px]">{formatPrice(product.oldprice)}</p>
                            <span className="border border-sale text-sale text-[12px] font-bold px-1">-{discount}%</span>
                        </>
                    )}
                </div>

                {/* меню при наведении: размеры и кнопка "В корзину" */}
                {menuOpen && (
                    <div className="pt-3 pb-1">
                        {/* мини-фото других цветов: при наведении зеленая полоска снизу, по клику меняется цвет */}
                        {allColors.length > 1 && (
                            <div className="flex gap-2 mb-3">
                                {allColors.map((c, index) => (
                                    <button key={c.name} onClick={() => chooseColor(index)} title={c.name} className="relative group/color">
                                        <img src={c.images[0]} alt={c.name} className="w-12 h-16 object-cover bg-light" />
                                        <span
                                            className={"absolute bottom-0 left-0 h-[3px] bg-demix transition-all duration-300 " +
                                                (index === color ? "w-full" : "w-0 group-hover/color:w-full")}
                                        ></span>
                                    </button>
                                ))}
                            </div>
                        )}

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

                        <button
                            onClick={handleAdd}
                            className="w-full mt-4 py-3 rounded-full bg-demix hover:bg-demix-hover font-bold uppercase text-[14px] transition"
                        >
                            {added ? "Добавлено" : "В корзину"}
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default ProductCard;
