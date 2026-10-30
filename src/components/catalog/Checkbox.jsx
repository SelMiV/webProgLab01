import { FiCheck } from "react-icons/fi";

function Checkbox({ title, count, checked, onChange, color }) {
    const disabled = count === 0 && !checked;

    return (
        <label className={"flex items-center gap-3 mb-3 text-[14px] " + (disabled ? "text-line cursor-default" : "cursor-pointer")}>
            <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className="hidden" />
            <span
                className={"w-6 h-6 shrink-0 border flex items-center justify-center " +
                    (checked ? "bg-demix border-demix" : disabled ? "bg-light border-light" : "border-line")}
            >
                {checked && <FiCheck className="text-[16px]" />}
            </span>

            {color && (
                <span className="w-5 h-5 shrink-0 rounded-full border border-line" style={{ background: color }}></span>
            )}
            <span>
                {title}
                {!disabled && <span className="text-gray"> ({count})</span>}
            </span>
        </label>
    )
}

export default Checkbox;
