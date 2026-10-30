import { useState, useEffect } from "react";

// листаем страницу вниз - возвращает true (шапку прячем),
// чуть-чуть подняли вверх - false (шапка снова появляется)
function useHideOnScroll() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let lastY = window.scrollY;

        function handleScroll() {
            const y = window.scrollY;

            // совсем маленькие движения не считаем
            if (Math.abs(y - lastY) < 10) return;

            // вниз - прячем, вверх - показываем. В самом верху страницы шапка видна всегда
            setHidden(y > lastY && y > 100);
            lastY = y;
        }

        window.addEventListener("scroll", handleScroll);

        // когда компонент убирается со страницы - снимаем обработчик
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return hidden;
}

export default useHideOnScroll;
