import { Link } from "react-router-dom";

// хлебные крошки
// items = [{ title: "Каталог", link: "/catalog" }, { title: "Брюки" }]
// у последнего пункта ссылки нет - это текущая страница
function Breadcrumbs({ items }) {
    return (
        <nav className="flex flex-wrap items-center gap-2 text-[13px] text-gray py-4">
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
