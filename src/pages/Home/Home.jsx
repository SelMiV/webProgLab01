import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiPlay, FiPause, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { baseProducts } from "../../data/products.js";
import ProductCard from "../../components/product/ProductCard.jsx";

// баннеры для большого слайдера (картинки лежат в public/banners)
// buttons - кнопки "Для него" / "Для нее" поверх баннера
const slides = [
    { image: "/banners/12_10-rotator-dv.webp", link: "/catalog?season=Зима", buttons: true },
    { image: "/banners/01_10-rotator-dv.webp", link: "/catalog/Верхняя одежда" },
    { image: "/banners/fuel-dv-2.webp", link: "/catalog/Обувь" },
    { image: "/banners/4kbns-dv.webp", link: "/catalog" },
];

// вкладки с товарами: Его зима / Ее зима / Для нее
const tabs = [
    { title: "Его зима", gender: "Мужской", winter: true },
    { title: "Ее зима", gender: "Женский", winter: true },
    { title: "Для нее", gender: "Женский", winter: false },
];

// актуальное
const trends = [
    { title: "Кроссовки", image: "/banners/trend-1.webp", link: "/catalog/Обувь" },
    { title: "Верхняя одежда", image: "/banners/trend-2.webp", link: "/catalog/Верхняя одежда" },
    { title: "Толстовки", image: "/banners/trend-3.webp", link: "/catalog/Толстовки и худи" },
    { title: "Брюки", image: "/banners/trend-4.webp", link: "/catalog/Брюки" },
];

// виды спорта
const sports = [
    { title: "Спортивный стиль", image: "/banners/more1.webp", link: "/catalog?sport=Спортивный стиль" },
    { title: "Тренинг", image: "/banners/more2.webp", link: "/catalog?sport=Фитнес и тренинг" },
    { title: "Бег", image: "/banners/more3.webp", link: "/catalog?sport=Бег" },
    { title: "Фитнес", image: "/banners/more4.webp", link: "/catalog?sport=Фитнес и тренинг" },
    { title: "Футбол", image: "/banners/football-trends.jpg", link: "/catalog" },
    { title: "Плавание", image: "/banners/swimming.jpg", link: "/catalog" },
    { title: "Баскетбол", image: "/banners/basketball.jpg", link: "/catalog" },
    { title: "Танцы", image: "/banners/dance-demix.jpg", link: "/catalog" },
];

// зеленая полоса прокрутки под слайдерами (ее можно тянуть мышкой)
const scrollbarStyle = {
    "--swiper-scrollbar-sides-offset": "20%",
    "--swiper-scrollbar-bottom": "0px",
    "--swiper-scrollbar-size": "3px",
    "--swiper-scrollbar-border-radius": "0",
    "--swiper-scrollbar-bg-color": "#eeeeee",
    "--swiper-scrollbar-drag-bg-color": "#bad532",
};

// анимация появления блоков при прокрутке
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

function Home() {
    const [swiper, setSwiper] = useState(null);     // большой слайдер (чтобы управлять им кнопками)
    const [activeSlide, setActiveSlide] = useState(0);
    const [playing, setPlaying] = useState(true);   // листается сам или стоит на паузе
    const [tab, setTab] = useState(0);              // открытая вкладка

    // параллакс: картинка баннера едет медленнее, чем страница
    const parallaxRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
    const parallaxY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    // хиты - 10 товаров с большим количеством отзывов (берем товары без повторов)
    const hits = [...baseProducts].sort((a, b) => b.reviews - a.reviews).slice(0, 10);

    // товары для открытой вкладки
    const tabProducts = baseProducts.filter((p) =>
        p.specifications.gender === tabs[tab].gender && (!tabs[tab].winter || p.specifications.season === "Зима")
    );

    // пауза / плей
    function togglePlay() {
        if (playing) {
            swiper.autoplay.stop();
        } else {
            swiper.autoplay.start();
        }
        setPlaying(!playing);
    }

    return (
        <div>
            {/* большой слайдер на всю ширину экрана */}
            <div className="relative w-screen left-1/2 -translate-x-1/2">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop
                    onSwiper={setSwiper}
                    onSlideChange={(s) => setActiveSlide(s.realIndex)}
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.image}>
                            <div className="relative">
                                <Link to={slide.link}>
                                    <img src={slide.image} alt="Баннер" className="w-full aspect-[8/3] object-cover min-h-[220px]" />
                                </Link>

                                {slide.buttons && (
                                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
                                        <Link to="/catalog?gender=Мужской" className="bg-white rounded-full px-6 py-3 text-[14px] font-bold uppercase whitespace-nowrap hover:bg-demix">
                                            Для него
                                        </Link>
                                        <Link to="/catalog?gender=Женский" className="bg-white rounded-full px-6 py-3 text-[14px] font-bold uppercase whitespace-nowrap hover:bg-demix">
                                            Для нее
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* стрелки */}
                <button
                    onClick={() => swiper.slidePrev()}
                    className="hidden md:flex absolute z-10 left-20 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white items-center justify-center"
                >
                    <FiChevronLeft />
                </button>
                <button
                    onClick={() => swiper.slideNext()}
                    className="hidden md:flex absolute z-10 right-20 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white items-center justify-center"
                >
                    <FiChevronRight />
                </button>

                {/* плей/пауза и точки */}
                <div className="absolute z-10 bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 rounded-full px-4 py-2">
                    <button onClick={togglePlay} className="text-white text-[12px]">
                        {playing ? <FiPause /> : <FiPlay />}
                    </button>
                    {slides.map((slide, index) => (
                        <button
                            key={slide.image}
                            onClick={() => swiper.slideToLoop(index)}
                            className={"w-2 h-2 rounded-full " + (index === activeSlide ? "bg-demix" : "bg-white")}
                        ></button>
                    ))}
                </div>
            </div>

            {/* вкладки: его зима / ее зима / для нее */}
            <motion.section {...fadeUp} className="mt-16">
                <div className="flex gap-6 mb-6 overflow-x-auto">
                    {tabs.map((item, index) => (
                        <button
                            key={item.title}
                            onClick={() => setTab(index)}
                            className={"text-[20px] font-bold uppercase whitespace-nowrap border-b-[3px] " +
                                (index === tab ? "border-demix" : "border-transparent hover:border-line")}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>

                <Swiper
                    key={tab}
                    modules={[Scrollbar]}
                    scrollbar={{ draggable: true }}
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{ 1024: { slidesPerView: 4 } }}
                    className="!pb-10"
                    style={scrollbarStyle}
                >
                    {tabProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.section>

            {/* новая коллекция зимней одежды */}
            <motion.section {...fadeUp} className="mt-16">
                {/* большой баннер с параллаксом */}
                <Link to="/catalog?season=Зима" ref={parallaxRef} className="relative block overflow-hidden aspect-[17/4] min-h-[160px]">
                    <motion.img
                        src="/banners/banner-new-collection-winter-dv.webp"
                        alt="Новая коллекция зимней одежды"
                        style={{ y: parallaxY }}
                        className="absolute left-0 -top-[15%] w-full h-[130%] object-cover"
                    />
                </Link>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <Link to="/catalog?gender=Мужской&season=Зима" className="relative block overflow-hidden group">
                        <img src="/banners/banner-new-collection-winter-man-dv.webp" alt="Мужчинам" className="w-full group-hover:scale-105 transition duration-700" />
                        <span className="absolute left-6 bottom-6 font-logo italic font-black text-white text-[32px] md:text-[40px] uppercase">Мужчинам</span>
                    </Link>
                    <Link to="/catalog?gender=Женский&season=Зима" className="relative block overflow-hidden group">
                        <img src="/banners/banner-new-collection-winter-woman-dv.webp" alt="Женщинам" className="w-full group-hover:scale-105 transition duration-700" />
                        <span className="absolute left-6 bottom-6 font-logo italic font-black text-white text-[32px] md:text-[40px] uppercase">Женщинам</span>
                    </Link>
                </div>
            </motion.section>

            {/* хиты продаж */}
            <motion.section {...fadeUp} className="mt-16">
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-[28px] md:text-[36px] font-black uppercase">Хиты продаж</h2>
                    <Link to="/catalog" className="text-[14px] underline hover:text-demix-dark">Смотреть все</Link>
                </div>

                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{ 768: { slidesPerView: 3 }, 1280: { slidesPerView: 5 } }}
                >
                    {hits.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.section>

            {/* актуальное */}
            <motion.section {...fadeUp} className="mt-16">
                <h2 className="text-[28px] md:text-[36px] font-black uppercase mb-6">Актуальное</h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {trends.map((item) => (
                        <Link key={item.title} to={item.link} className="block group">
                            <div className="overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full aspect-square object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <p className="mt-4 text-center font-bold uppercase group-hover:text-demix-dark">{item.title}</p>
                        </Link>
                    ))}
                </div>
            </motion.section>

            {/* виды спорта: слайдер, листается свайпом или полосой снизу */}
            <motion.section {...fadeUp} className="mt-16">
                <h2 className="text-[28px] md:text-[36px] font-black uppercase mb-6">Виды спорта</h2>

                <Swiper
                    modules={[Scrollbar]}
                    scrollbar={{ draggable: true }}
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{ 1024: { slidesPerView: 4 } }}
                    className="!pb-10"
                    style={scrollbarStyle}
                >
                    {sports.map((sport) => (
                        <SwiperSlide key={sport.title}>
                            <Link to={sport.link} className="block group">
                                <div className="overflow-hidden">
                                    <img src={sport.image} alt={sport.title} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-500" />
                                </div>
                                <p className="mt-4 text-center font-bold uppercase group-hover:text-demix-dark">{sport.title}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.section>
        </div>
    )
}

export default Home;
