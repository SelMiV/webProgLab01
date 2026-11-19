import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

// кнопка назад
function BackButton() {
    const navigate = useNavigate();

    function goBack() {
        // если сайт открыли сразу на этой странице, переодим на главную
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate("/");
        }
    }

    return (
        <button onClick={goBack} className="flex items-center gap-2 bg-light hover:bg-line rounded-full px-4 py-2 text-[14px] font-bold text-text">
            <FiArrowLeft /> Назад
        </button>
    )
}

export default BackButton;
