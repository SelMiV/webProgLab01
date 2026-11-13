import { Link } from "react-router-dom";

import BackButton from "./BackButton";

// хлебные крошки
function Breadcrumbs({ items }) {
    return (
        <nav className="flex flex-wrap items-center gap-2 text-[13px] text-gray py-4">
            <span className="mr-4"><BackButton /></span>
            <Link to="/" className="hover:text-text">Главная</Link>

            {items.map((item) => (
                <span key={item.title} className="flex items-center gap-2">
                    <span>/</span>
                    {item.link ? (
                        <Link to={item.link} className="hover:text-text">{item.title}</Link>
                    ) : (
                        <span className="text-text">{item.title}</span>
                    )}
                </span>
            ))}
        </nav>
    )
}

export default Breadcrumbs;
