// выбор размера
function SizeSelect({ sizes, selected, onSelect }) {
    return (
        <div>
            <p className="text-[14px] mb-2">Размер</p>

            <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => onSelect(size)}
                        className={
                            "min-w-12 h-10 px-2 border text-[14px] " +
                            (selected === size ? "border-text bg-text text-white" : "border-line hover:border-text")
                        }
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SizeSelect;
