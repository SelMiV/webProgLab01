import { FaStar } from "react-icons/fa";

// звездочки рейтинга + количество отзывов
function Rating({ rating, reviews }) {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="flex items-center gap-1 text-[13px]">
            {stars.map((star) => (
                <FaStar
                    key={star}
                    className={star <= Math.round(rating) ? "text-demix" : "text-line"}
                />
            ))}
            <span className="text-gray ml-1">({reviews})</span>
        </div>
    )
}

export default Rating;
