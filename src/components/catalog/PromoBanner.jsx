// баннер акции "1+1=3" над товарами в каталоге (как на demix.ru)
function PromoBanner() {
    return (
        <div
            className="mt-6 h-[126px] bg-cover bg-[position:45%_bottom] text-white pl-6 md:pl-9 flex flex-col justify-center"
            style={{ backgroundImage: "url(/banners/branch-dv.webp)" }}
        >
            <p className="text-[20px] md:text-[24px] font-black uppercase">1+1=3 на всё при покупке куртки</p>
            <p className="text-[14px] font-medium mt-1">Покупай 3 – плати за 2!</p>
        </div>
    )
}

export default PromoBanner;
