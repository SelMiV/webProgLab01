import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-white text-gray-800 font-semibold">
            <div className="flex flex-row justify-end h-[40px] items-center text-[14px]">
                <p>8 (800) 777-77-57</p>
                <p>24/7</p>
                <p>Магазины</p>
                <p>Кострома</p>
            </div>
            <div className="border-t border-b">
                <div className="flex flex-row justify-between items-center max-w-[1360px] h-[60px] mx-auto">
                    <Link to="/" className="hover:text-green-400 text-gray-800 font-bold text-3xl">DEMIX</Link>

                    <nav className="flex gap-6">
                        <Link to="/catalog" className="hover:text-green-400">НОВИНКИ</Link>
                        <Link to="/catalog" className="hover:text-green-400">МУЖЧИНАМ</Link>
                        <Link to="/catalog" className="hover:text-green-400">ЖЕНЩИНАМ</Link>
                        <Link to="/catalog" className="hover:text-green-400">ДЕТЯМ</Link>
                        <Link to="/catalog" className="hover:text-green-400">ВИДЫ СПОРТА</Link>
                        <Link to="/catalog" className="hover:text-green-400">СКИДКИ</Link>
                        <Link to="/catalog" className="hover:text-green-400">АКЦИИ</Link>
                        <Link to="/catalog" className="hover:text-green-400">DEMIX CLUB</Link>
                    </nav>

                    <Link to="/" className="hover:text-green-400 text-gray-800 font-bold text-3xm">корзина</Link>
                </div>
            </div>
        </header>
    )
}
export default Header;