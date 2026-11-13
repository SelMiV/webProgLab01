import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiCheckCircle } from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import CartItem from "../../components/cart/CartItem";
import BackButton from "../../components/ui/BackButton";
import { formatPrice } from "../../utils/format";

function Cart() {
    const { cart, totalCount, totalPrice, fullPrice, clearCart } = useCart();
    const [ordered, setOrdered] = useState(false);     // заказ оформлен

    // после оформления заказа показываем сообщение и очищаем корзину
    function handleOrder() {
        setOrdered(true);
        clearCart();
    }

    // заказ оформлен
    if (ordered) {
        return (
            <div className="flex flex-col items-center text-center py-20">
                <FiCheckCircle className="text-[80px] text-demix" />
                <h1 className="text-[28px] font-black uppercase mt-6">Заказ оформлен</h1>
                <p className="text-gray mt-2">Спасибо за покупку! Мы скоро свяжемся с вами</p>
                <Link to="/catalog" className="mt-6 bg-demix hover:bg-demix-hover px-10 py-3 font-bold uppercase">
                    Продолжить покупки
                </Link>
            </div>
        )
    }

    // пустая корзина
    if (cart.length === 0) {
        return (
            <div>
                <div className="py-4"><BackButton /></div>

                <div className="flex flex-col items-center text-center py-20">
                    <FiShoppingBag className="text-[80px] text-line" />
                    <h1 className="text-[28px] font-black uppercase mt-6">Корзина пуста</h1>
                    <p className="text-gray mt-2">Загляните в каталог - там много интересного</p>
                    <Link to="/catalog" className="mt-6 bg-demix hover:bg-demix-hover px-10 py-3 font-bold uppercase">
                        Перейти в каталог
                    </Link>
                </div>
            </div>
        )
    }

    // доставка бесплатная от 3000
    const delivery = totalPrice >= 3000 ? 0 : 299;

    return (
        <div>
            <div className="py-4"><BackButton /></div>

            <div className="flex items-end gap-4">
                <h1 className="text-[32px] md:text-[40px] font-black uppercase">Корзина</h1>
                <p className="text-gray mb-2">{totalCount} шт.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 mt-4">
                <div className="flex-1">
                    {cart.map((item) => (
                        <CartItem key={item.product.id + "-" + item.product.specifications.color + "-" + item.size} item={item} />
                    ))}

                    <button onClick={clearCart} className="mt-4 text-[14px] text-gray underline hover:text-sale">
                        Очистить корзину
                    </button>
                </div>

                <div className="lg:w-[360px] bg-light p-6 self-start lg:sticky lg:top-[120px]">
                    <p className="text-[20px] font-bold mb-4">Ваш заказ</p>

                    <div className="flex justify-between text-[14px] mb-2">
                        <span>Товары ({totalCount})</span>
                        <span>{formatPrice(fullPrice)}</span>
                    </div>

                    {fullPrice > totalPrice && (
                        <div className="flex justify-between text-[14px] mb-2 text-sale">
                            <span>Скидка</span>
                            <span>-{formatPrice(fullPrice - totalPrice)}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-[14px] mb-4">
                        <span>Доставка</span>
                        <span>{delivery === 0 ? "бесплатно" : formatPrice(delivery)}</span>
                    </div>

                    <div className="flex justify-between text-[22px] font-bold border-t border-line pt-4">
                        <span>Итого</span>
                        <span>{formatPrice(totalPrice + delivery)}</span>
                    </div>

                    {delivery > 0 && (
                        <p className="text-[13px] text-gray mt-2">
                            Добавьте товаров еще на {formatPrice(3000 - totalPrice)} для бесплатной доставки
                        </p>
                    )}

                    <button onClick={handleOrder} className="w-full mt-6 bg-demix hover:bg-demix-hover py-4 font-bold uppercase">
                        Оформить заказ
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart;
