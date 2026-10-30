import { FiX } from "react-icons/fi";

import { formatPrice } from "../../utils/format";

// фильтр по цене
function PriceFilter({ min, max, from, to, onChange }) {
    // из текста поля берем только цифры: "4 563 ₽" -> 4563
    function getNumber(text) {
        return Number(text.replace(/\D/g, ""));
    }

    // где стоят кружки в процентах (0-100): между ними рисуем зеленую полоску
    const fromPercent = Math.min(Math.max((from - min) / (max - min) * 100, 0), 100);
    const toPercent = Math.min(Math.max((to - min) / (max - min) * 100, 0), 100);

    return (
        <div>
            <div className="flex gap-3 mb-4">
                <label className="text-[12px] text-gray">
                    От
                    <div className="relative mt-1">
                        <input
                            type="text"
                            inputMode="numeric"
                            value={formatPrice(from)}
                            onChange={(e) => onChange(getNumber(e.target.value), to)}
                            className="w-full border border-line px-3 py-2 text-[14px] text-text"
                        />
                        <button onClick={() => onChange(min, to)} className="absolute right-2 top-1/2 -translate-y-1/2">
                            <FiX />
                        </button>
                    </div>
                </label>
                <label className="text-[12px] text-gray">
                    До
                    <div className="relative mt-1">
                        <input
                            type="text"
                            inputMode="numeric"
                            value={formatPrice(to)}
                            onChange={(e) => onChange(from, getNumber(e.target.value))}
                            className="w-full border border-line px-3 py-2 text-[14px] text-text"
                        />
                        <button onClick={() => onChange(from, max)} className="absolute right-2 top-1/2 -translate-y-1/2">
                            <FiX />
                        </button>
                    </div>
                </label>
            </div>

            {/* два ползунка лежат друг на друге: левый кружок - "от", правый - "до" */}
            <div className="price-range">
                {/* серая линия, а на ней зеленая только между кружками */}
                <div className="price-range__line">
                    <div className="price-range__fill" style={{ left: fromPercent + "%", right: (100 - toPercent) + "%" }}></div>
                </div>
                <input
                    type="range"
                    className="price-range__input"
                    min={min}
                    max={max}
                    step={100}
                    value={from}
                    onChange={(e) => onChange(Math.min(Number(e.target.value), to), to)}
                />
                <input
                    type="range"
                    className="price-range__input"
                    min={min}
                    max={max}
                    step={100}
                    value={to}
                    onChange={(e) => onChange(from, Math.max(Number(e.target.value), from))}
                />
            </div>
        </div>
    )
}

export default PriceFilter;
