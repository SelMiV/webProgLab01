import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

// блок фильтра
function FilterBlock({ title, children }) {
    const [open, setOpen] = useState(true);

    return (
        <div className="border-b border-line py-4">
            <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center font-bold uppercase text-[14px]">
                {title}
                {open ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {open && <div className="mt-4">{children}</div>}
        </div>
    )
}

export default FilterBlock;
