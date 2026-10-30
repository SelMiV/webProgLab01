import { useState, useEffect } from "react";

function useHideOnScroll() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let lastY = window.scrollY;

        function handleScroll() {
            const y = window.scrollY;

            if (Math.abs(y - lastY) < 10) return;

            setHidden(y > lastY && y > 100);
            lastY = y;
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return hidden;
}

export default useHideOnScroll;
