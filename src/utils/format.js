// форматирование цены
export function formatPrice(price) {
    return price.toLocaleString("ru-RU") + " ₽";
}

// склонение слова товар
export function productsWord(count) {
    const last = count % 10;
    const lastTwo = count % 100;

    if (last === 1 && lastTwo !== 11) return "товар";
    if (last >= 2 && last <= 4 && (lastTwo < 10 || lastTwo >= 20)) return "товара";
    return "товаров";
}

// процент скидки
export function getDiscount(price, oldprice) {
    if (!oldprice) return 0;
    return Math.round((1 - price / oldprice) * 100);
}
