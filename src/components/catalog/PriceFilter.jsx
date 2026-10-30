import { FiX } from "react-icons/fi";

// фильтр по цене: два поля "От" и "До" и ползунок с двумя кружками
// стили ползунка в styles/filters.css (по БЭМ)
function PriceFilter({ min, max, from, to, onChange }) {
    return (
        <div>
            <div className="flex gap-3 mb-4">
                <label className="text-[12px] text-gray">
                    От
                    <div className="relative mt-1">
                        <input
                            type="number"
                            value={from}
                            onChange={(e) => onChange(Number(e.target.value), to)}
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
                            type="number"
                            value={to}
                            onChange={(e) => onChange(from, Number(e.target.value))}
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
                <div className="price-range__line"></div>
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
