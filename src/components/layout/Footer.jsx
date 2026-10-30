import { Link } from "react-router-dom";
import { FaVk, FaTelegramPlane, FaOdnoklassniki } from "react-icons/fa";

const columns = [
    {
        title: "Покупателям",
        links: ["Доставка и оплата", "Самовывоз", "Обмен и возврат", "Оплата частями"],
    },
    {
        title: "О компании",
        links: ["О бренде", "Технологии Demix", "Вакансии"],
    },
    {
        title: "Каталог",
        links: ["Верхняя одежда", "Толстовки и худи", "Брюки", "Обувь"],
    },
];

function Footer() {
    return (
        <footer className="bg-light mt-16">
            <div className="max-w-[1360px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                {columns.map((column) => (
                    <div key={column.title}>
                        <p className="font-bold mb-4">{column.title}</p>

                        {column.links.map((link) => (
                            <Link
                                key={link}
                                to={column.title === "Каталог" ? "/catalog/" + link : "/"}
                                className="block text-gray text-[14px] mb-2 hover:text-text"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>
                ))}

                <div>
                    <p className="font-bold mb-4">Контакты</p>
                    <p className="text-[20px] font-bold">8 (800) 777-77-57</p>
                    <p className="text-gray text-[14px] mb-4">Бесплатно по России, 24/7</p>
                    <p className="text-gray text-[14px] mb-4">support@demix.ru</p>

                    <div className="flex gap-3 text-xl">
                        <FaVk className="cursor-pointer hover:text-demix-dark" />
                        <FaTelegramPlane className="cursor-pointer hover:text-demix-dark" />
                        <FaOdnoklassniki className="cursor-pointer hover:text-demix-dark" />
                    </div>
                </div>
            </div>

            <div className="border-t border-line">
                <p className="max-w-[1360px] mx-auto px-4 py-4 text-[13px] text-gray">
                    © 2026 Demix 
                </p>
            </div>
        </footer>
    )
}
export default Footer
