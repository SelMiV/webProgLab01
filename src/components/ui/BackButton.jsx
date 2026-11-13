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
        <button onClick={goBack} className="flex items-center gap-1 text-[13px] text-text hover:text-demix-dark">
            <FiArrowLeft /> Назад
        </button>
    )
}

export default BackButton;
