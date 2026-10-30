import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center text-center py-24">
            <p className="font-logo italic font-black text-[120px] leading-none text-demix">404</p>
            <h1 className="text-[28px] font-black uppercase mt-4">Страница не найдена</h1>
            <p className="text-gray mt-2">Возможно, ее удалили или в адресе ошибка</p>
            <Link to="/" className="mt-6 bg-demix hover:bg-demix-hover px-10 py-3 font-bold uppercase">
                На главную
            </Link>
        </div>
    )
}

export default NotFound;
