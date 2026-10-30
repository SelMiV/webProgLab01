import { useState, useEffect } from "react";

// как useState, только значение сохраняется в LocalStorage
function useLocalStorage(key, startValue) {
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);

        if (saved) {
            return JSON.parse(saved);
        }

        return startValue;
    });

    // при каждом изменении сохраняем
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
