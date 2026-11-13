import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useLocalStorage("cart", []);

    // одна строка корзины = товар + цвет + размер
    function isSame(item, product, size) {
        return item.product.id === product.id &&
            item.product.specifications.color === product.specifications.color &&
            item.size === size;
    }

    function addToCart(product, size, count = 1) {
        const item = cart.find((item) => isSame(item, product, size));

        if (item) {
            // такой товар такого цвета и размера уже есть - увеличиваем количество (не больше 10)
            changeCount(product, size, Math.min(item.count + count, 10));
        } else {
            setCart([...cart, { product: product, size: size, count: count }]);
        }
    }

    function changeCount(product, size, count) {
        if (count < 1 || count > 10) return;

        setCart(cart.map((item) =>
            isSame(item, product, size) ? { ...item, count: count } : item
        ));
    }

    function removeFromCart(product, size) {
        setCart(cart.filter((item) => !isSame(item, product, size)));
    }

    function clearCart() {
        setCart([]);
    }

    // общее количество товаров
    const totalCount = cart.reduce((sum, item) => sum + item.count, 0);

    // сумма к оплате
    const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.count, 0);

    // сумма без скидок
    const fullPrice = cart.reduce((sum, item) => sum + (item.product.oldprice || item.product.price) * item.count, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            changeCount,
            removeFromCart,
            clearCart,
            totalCount,
            totalPrice,
            fullPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    return useContext(CartContext);
}
