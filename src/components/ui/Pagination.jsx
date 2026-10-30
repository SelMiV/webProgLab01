import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// пагинация: кнопки страниц считаются от количества товаров,
// поэтому при смене фильтра их количество меняется само
function Pagination({ page, pagesCount, onChange }) {
    if (pagesCount <= 1) return null;

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-10">
            <button
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-light disabled:opacity-30"
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
            >
                <FiChevronLeft />
            </button>

            {pages.map((number) => (
                <button
                    key={number}
                    onClick={() => onChange(number)}
                    className={
                        "w-10 h-10 rounded-full font-bold " +
                        (number === page ? "bg-demix" : "hover:bg-light")
                    }
                >
                    {number}
                </button>
            ))}

            <button
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-light disabled:opacity-30"
                disabled={page === pagesCount}
                onClick={() => onChange(page + 1)}
            >
                <FiChevronRight />
            </button>
        </div>
    )
}

export default Pagination;
