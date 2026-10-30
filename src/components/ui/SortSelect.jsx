import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { LuArrowDownUp } from "react-icons/lu";

// варианты сортировки как на demix.ru
const sortOptions = [
    { value: "popular", title: "По популярности" },
    { value: "cheap", title: "Сначала дешевле" },
    { value: "expensive", title: "Сначала дороже" },
    { value: "rating", title: "По рейтингу отзывов" },
    { value: "new", title: "Сначала новинки" },
    { value: "discount", title: "По убыванию скидки" },
];

// свой выпадающий список вместо обычного select
function SortSelect({ sort, onChange }) {
    const [open, setOpen] = useState(false);

    const current = sortOptions.find((option) => option.value === sort);

    function choose(value) {
        onChange(value);
        setOpen(false);
    }

    return (
        <div className="relative" onMouseLeave={() => setOpen(false)}>
            <button onClick={() => setOpen(!open)} className="flex items-center gap-3 text-[15px] py-2">
                {current.title}
                <LuArrowDownUp className="text-[20px]" />
            </button>

            {/* видно только 4 пункта, остальные - прокруткой. Зеленая полоса прокрутки - в styles/filters.css */}
            {open && (
                <div className="sort-select__list absolute right-0 top-full w-[260px] max-h-[192px] overflow-y-auto bg-white shadow-lg z-20">
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => choose(option.value)}
                            className="w-full h-12 shrink-0 flex justify-between items-center px-5 text-left text-[15px] hover:bg-light"
                        >
                            {option.title}
                            {option.value === sort && <FiCheck />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SortSelect;
