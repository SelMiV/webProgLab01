import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";

// одна строка в корзине
function CartItem({ item }) {
    const { changeCount, removeFromCart } = useCart();
    const product = item.product;
    // ссылка на товар
    const link = product.colorIndex > 0 ? `/product/${product.id}?color=${product.colorIndex}` : `/product/${product.id}`;

    return (
        <div className="flex gap-4 py-5 border-b border-line">
            <Link to={link} className="shrink-0">
                <img src={product.images[0]} alt={product.name} className="w-[100px] md:w-[130px] aspect-[3/4] object-cover bg-light" />
            </Link>

            <div className="flex-1 flex flex-col gap-1">
                <Link to={link} className="font-medium hover:text-demix-dark">
                    {product.name}
                </Link>
                <p className="text-gray text-[13px]">Цвет: {product.specifications.color}</p>
                <p className="text-gray text-[13px]">Размер: {item.size}</p>
                <p className="text-gray text-[13px]">{formatPrice(product.price)} / шт.</p>

                <div className="flex items-center justify-between mt-auto pt-3">
                    <div className="flex items-center border border-line">
                        <button
                            className="w-9 h-9 flex items-center justify-center hover:bg-light disabled:opacity-30"
                            disabled={item.count === 1}
                            onClick={() => changeCount(product, item.size, item.count - 1)}
                        >
                            <FiMinus />
                        </button>
                        <span className="w-10 text-center font-bold">{item.count}</span>
                        <button
                            className="w-9 h-9 flex items-center justify-center hover:bg-light disabled:opacity-30"
                            disabled={item.count === 10}
                            onClick={() => changeCount(product, item.size, item.count + 1)}
                        >
                            <FiPlus />
                        </button>
                    </div>

                    <p className="font-bold text-[18px]">{formatPrice(product.price * item.count)}</p>
                </div>
            </div>

            <button
                className="self-start text-gray hover:text-sale text-xl"
                title="Удалить"
                onClick={() => removeFromCart(product, item.size)}
            >
                <FiTrash2 />
            </button>
        </div>
    )
}

export default CartItem;
