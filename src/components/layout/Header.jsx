import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="flex justify-between items-center px-5 bg-blue-500 h-16 text-white">
            <Link to="/" className="hover:text-gray-500 font-bold text-3xl">OZON</Link>

            <nav className="flex gap-6">
                <Link to="/catalog" className="hover:text-gray-500">Каталог</Link>
                <Link to="/cart" className="hover:text-gray-500">Корзина</Link>
            </nav>
        </header>
    )
}
export default Header;