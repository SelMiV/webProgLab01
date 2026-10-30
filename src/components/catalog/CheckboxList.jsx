import { useState } from "react";

import Checkbox from "./Checkbox";

// colors если передать, рядом с названием рисуется цветной кружок (для выбора цвета)
function CheckboxList({ options, checked, onToggle, colors }) {
    const [showAll, setShowAll] = useState(false);

    const visible = showAll ? options : options.slice(0, 6);

    return (
        <div>
            {visible.map((option) => (
                <Checkbox
                    key={option.value}
                    title={option.value}
                    count={option.count}
                    color={colors ? colors[option.value] : null}
                    checked={checked.includes(option.value)}
                    onChange={() => onToggle(option.value)}
                />
            ))}

            {options.length > 6 && (
                <button onClick={() => setShowAll(!showAll)} className="text-[14px] underline hover:text-demix-dark">
                    {showAll ? "Скрыть" : "Показать ещё"}
                </button>
            )}
        </div>
    )
}

export default CheckboxList;
