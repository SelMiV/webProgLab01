import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FiTruck, FiRefreshCw, FiChevronDown } from "react-icons/fi";

import products, { baseProducts } from "../../data/products.js"
import Breadcrumbs from "../../components/ui/Breadcrumbs.jsx";
import Rating from "../../components/ui/Rating.jsx";
import SizeSelect from "../../components/product/SizeSelect.jsx";
import ProductCard from "../../components/product/ProductCard.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { formatPrice, getDiscount } from "../../utils/format.js";

// названия характеристик на русском
const specNames = {
    gender: "Пол",
    season: "Сезон",
    material: "Материал",
    color: "Цвет",
    country: "Страна производства",
};

function Product() {
        const { id } = useParams();
        const product = products.find((product) => product.id === Number(id));
        const [searchParams, setSearchParams] = useSearchParams();

        const { addToCart } = useCart();
        const [size, setSize] = useState(null);
        const [error, setError] = useState(false);
        const [added, setAdded] = useState(false);
        const [openTab, setOpenTab] = useState("description");

        if (!product) {
            return (
                <div className="py-20 text-center">
                    <h1 className="text-3xl font-bold">Товар не найден</h1>
                    <Link to="/catalog" className="inline-block mt-6 bg-demix px-8 py-3 font-bold">В каталог</Link>
                </div>
            )
        }

        const discount = getDiscount(product.price, product.oldprice);

        // все цвета товара: основной + другие (если есть)
        const allColors = [{ name: product.specifications.color, images: product.images }];
        if (product.colors) allColors.push(...product.colors);

        let color = Number(searchParams.get("color")) || 0;
        if (color >= allColors.length) color = 0;
        const images = allColors[color].images;

        // похожие товары - той же категории
        // берем товары без повторов, того же пола, и убираем этот же товар
        const similar = baseProducts.filter((p) =>
            p.category === product.category &&
            p.specifications.gender === product.specifications.gender &&
            p.images[0] !== product.images[0]
        );

        function handleAdd() {
            if (!size) {
                setError(true);
                return;
            }
            addToCart({
                ...product,
                colorIndex: color,
                images: images,
                specifications: { ...product.specifications, color: allColors[color].name }
            }, size);
            setAdded(true);
        }

    return (
        <div>
            <Breadcrumbs
                items={[
                    { title: "Каталог", link: "/catalog" },
                    { title: product.category, link: "/catalog/" + product.category },
                    { title: product.name },
                ]}
            />

            <div className="flex flex-col lg:flex-row w-full gap-10">
                <div className="hidden md:grid grid-cols-2 gap-3 lg:w-[60%]">
                    {images.map((image) => (
                        <img
                            key={image}
                            src={image}
                            alt={product.name}
                            className="w-full aspect-[3/4] object-cover bg-light"
                        />
                    ))}
                </div>

                {/* на телефоне - слайдером */}
                <div className="md:hidden -mx-4">
                    <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
                        {images.map((image) => (
                            <SwiperSlide key={image}>
                                <img src={image} alt={product.name} className="w-full aspect-[3/4] object-cover bg-light" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="lg:w-[40%] lg:sticky lg:top-[120px] self-start flex flex-col gap-5">
                    <h1 className="text-[26px] font-bold leading-tight">{product.name}</h1>

                    <div className="flex items-center gap-4">
                        <Rating rating={product.rating} reviews={product.reviews} />
                        <p className="text-gray text-[13px]">Артикул: {String(product.id).padStart(6, "0")}</p>
                    </div>

                    <div className="flex items-end gap-3">
                        <p className={"text-[32px] font-bold " + (discount > 0 ? "text-sale" : "")}>
                            {formatPrice(product.price)}
                        </p>
                        {discount > 0 && (
                            <>
                                <p className="text-gray line-through text-[18px] mb-1">{formatPrice(product.oldprice)}</p>
                                <p className="bg-sale text-white text-[13px] font-bold px-2 py-1 mb-2">-{discount}%</p>
                            </>
                        )}
                    </div>

                    <p className="text-[14px]">
                        Цвет: <span className="text-gray">{allColors[color].name}</span>
                    </p>

                    {/* мини-фото цветов */}
                    {allColors.length > 1 && (
                        <div className="flex gap-2 -mt-2">
                            {allColors.map((c, index) => (
                                <button
                                    key={c.name}
                                    onClick={() => setSearchParams(index > 0 ? { color: index } : {}, { replace: true })}
                                    title={c.name}
                                    className="relative group/color"
                                >
                                    <img src={c.images[0]} alt={c.name} className="w-14 h-[74px] object-cover bg-light" />
                                    <span
                                        className={"absolute bottom-0 left-0 h-[3px] bg-demix transition-all duration-300 " +
                                            (index === color ? "w-full" : "w-0 group-hover/color:w-full")}
                                    ></span>
                                </button>
                            ))}
                        </div>
                    )}

                    <SizeSelect
                        sizes={product.sizes}
                        selected={size}
                        onSelect={(s) => { setSize(s); setError(false); setAdded(false); }}
                    />
                    {error && <p className="text-sale text-[13px] -mt-3">Выберите размер</p>}

                    {added ? (
                        <Link to="/cart" className="bg-text text-white text-center py-4 font-bold uppercase">
                            Товар в корзине - перейти
                        </Link>
                    ) : (
                        <button onClick={handleAdd} className="bg-demix hover:bg-demix-hover py-4 font-bold uppercase transition">
                            Добавить в корзину
                        </button>
                    )}

                    <div className="bg-light p-4 text-[14px] flex flex-col gap-3">
                        <p className="flex items-center gap-3"><FiTruck /> Доставка 1-3 дня, бесплатно от 3000 ₽</p>
                        <p className="flex items-center gap-3"><FiRefreshCw /> Возврат в течение 30 дней</p>
                    </div>

                    {/* описание и характеристики */}
                    <div className="border-t border-line">
                        <button
                            className="w-full flex justify-between items-center py-4 font-bold"
                            onClick={() => setOpenTab(openTab === "description" ? "" : "description")}
                        >
                            Описание
                            <FiChevronDown className={openTab === "description" ? "rotate-180 transition" : "transition"} />
                        </button>
                        {openTab === "description" && (
                            <p className="text-[14px] text-gray pb-4 leading-relaxed">{product.description}</p>
                        )}
                    </div>

                    <div className="border-t border-b border-line">
                        <button
                            className="w-full flex justify-between items-center py-4 font-bold"
                            onClick={() => setOpenTab(openTab === "specs" ? "" : "specs")}
                        >
                            Характеристики
                            <FiChevronDown className={openTab === "specs" ? "rotate-180 transition" : "transition"} />
                        </button>
                        {openTab === "specs" && (
                            <div className="pb-4 text-[14px]">
                                {Object.keys(product.specifications).map((key) => (
                                    <div key={key} className="flex justify-between py-1 border-b border-dashed border-line">
                                        <span className="text-gray">{specNames[key]}</span>
                                        {/* цвет - тот, что выбран */}
                                        <span>{key === "color" ? allColors[color].name : product.specifications[key]}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* похожие товары */}
            {similar.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-[28px] font-black uppercase mb-6">Похожие товары</h2>

                    <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={16}
                        slidesPerView={2}
                        breakpoints={{ 768: { slidesPerView: 3 }, 1280: { slidesPerView: 5 } }}
                    >
                        {similar.map((p) => (
                            <SwiperSlide key={p.id}>
                                <ProductCard product={p} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    )
}

// сброс размера
function ProductPage() {
    const { id } = useParams();
    return <Product key={id} />
}

export default ProductPage;
