import { useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { FiSliders } from "react-icons/fi";
import { BsGrid, BsGrid3X3GapFill } from "react-icons/bs";

import products from "../../data/products.js"
import ProductCard from "../../components/product/ProductCard.jsx"
import Breadcrumbs from "../../components/ui/Breadcrumbs.jsx";
import Pagination from "../../components/ui/Pagination.jsx";
import SortSelect from "../../components/ui/SortSelect.jsx";
import FilterBlock from "../../components/catalog/FilterBlock.jsx";
import Checkbox from "../../components/catalog/Checkbox.jsx";
import CheckboxList from "../../components/catalog/CheckboxList.jsx";
import PriceFilter from "../../components/catalog/PriceFilter.jsx";
import PromoBanner from "../../components/catalog/PromoBanner.jsx";
import { productsWord, getDiscount } from "../../utils/format.js";
import useHideOnScroll from "../../hooks/useHideOnScroll.js";
import useLocalStorage from "../../hooks/useLocalStorage.js";

// блоки фильтров с чекбоксами (field - поле товара)
const filterGroups = [
    { field: "gender", title: "Пол" },
    { field: "sport", title: "Вид спорта" },
    { field: "category", title: "Категория" },
    { field: "type", title: "Тип товара" },
    { field: "kind", title: "Вид товара" },
];
// эти блоки идут после цены и размера
const filterGroups2 = [
    { field: "clasp", title: "Застежка" },
    { field: "materialType", title: "Материал" },
    { field: "fabric", title: "Тип ткани" },
    { field: "season", title: "Сезон" },
];

// цвета кружков в фильтре "Цвет"
const colors = {
    "черный": "#000000",
    "темно-серый": "#555555",
    "болотный": "#5b5e3b",
    "бежевый": "#d9cbb4",
    "кофейный": "#6f4e37",
    "кремовый": "#f3ead8",
};

// пункт для примера, товаров с ним у нас нет - поэтому он будет серым
const emptyOptions = {
    category: ["Аксессуары"],
};

// сколько товаров на одной странице
const perPage = 12;

// самая маленькая и самая большая цена (для ползунка)
const minPrice = Math.min(...products.map((p) => p.price));
const maxPrice = Math.max(...products.map((p) => p.price));

// значение поля товара: сначала ищем в самом товаре, потом в характеристиках (цвет, сезон)
function getValue(product, field) {
    return product[field] || product.specifications[field];
}

// все варианты для блока фильтра (сначала те, где товаров больше) + пустые пункты для примера
function getValues(field) {
    const values = products.map((product) => getValue(product, field));
    const unique = [...new Set(values)];
    unique.sort((a, b) => values.filter((v) => v === b).length - values.filter((v) => v === a).length);
    return [...unique, ...(emptyOptions[field] || [])];
}

function Catalog () {
    const { type } = useParams();                       // категория из адреса: /catalog/Брюки
    const [searchParams, setSearchParams] = useSearchParams();

    const [sort, setSort] = useState("popular");
    const [tiles, setTiles] = useLocalStorage("tiles", 3);
    const headerHidden = useHideOnScroll();             // листаем вниз - полоска с фильтрами прячется вместе с шапкой

    // фильтры. Начальные значения берем из адреса (так работают ссылки из меню)
    const [showFilters, setShowFilters] = useState(window.innerWidth >= 1024);  // на телефоне сначала скрыты
    const [onlyNew, setOnlyNew] = useState(searchParams.get("new") === "1");
    const [onlySale, setOnlySale] = useState(searchParams.get("sale") === "1");
    const [priceFrom, setPriceFrom] = useState(minPrice);
    const [priceTo, setPriceTo] = useState(maxPrice);
    const [sizes, setSizes] = useState([]);
    // выбранные пункты в блоках: { category: ["Брюки", "Обувь"], sport: [], ... }
    // пол, сезон и вид спорта тоже можно передать в адресе: /catalog?gender=Мужской&season=Зима (так работают баннеры на главной)
    const gender = searchParams.get("gender");
    const season = searchParams.get("season");
    const sport = searchParams.get("sport");
    // раздел "Одежда" из меню - все категории, кроме обуви
    const section = searchParams.get("section");
    const clothes = [...new Set(products.map((p) => p.category))].filter((c) => c !== "Обувь");
    const [checked, setChecked] = useState({
        category: type ? [type] : section === "Одежда" ? clothes : [],
        gender: gender ? [gender] : [],
        season: season ? [season] : [],
        sport: sport ? [sport] : [],
    });

    // номер страницы храним в адресе (?page=2)
    const page = Number(searchParams.get("page")) || 1;

    // 1. фильтруем
    // skip - какой фильтр не учитывать. Нужно для цифр в скобках:
    // в блоке считаем товары по всем остальным фильтрам, кроме самого этого блока
    function filterProducts(skip) {
        let result = products;
        if (onlyNew && skip !== "new") result = result.filter((product) => product.isNew);
        if (onlySale && skip !== "sale") result = result.filter((product) => product.oldprice > 0);
        result = result.filter((product) => product.price >= priceFrom && product.price <= priceTo);
        if (sizes.length > 0 && skip !== "sizes") {
            // товар подходит, если у него есть хотя бы один из выбранных размеров
            result = result.filter((product) => product.sizes.some((size) => sizes.includes(size)));
        }
        // блоки с чекбоксами: если в блоке что-то выбрано, оставляем товары с одним из выбранных значений
        for (const field in checked) {
            if (field !== skip && checked[field].length > 0) {
                result = result.filter((product) => checked[field].includes(getValue(product, field)));
            }
        }
        return result;
    }

    let list = filterProducts("");

    // варианты блока и сколько товаров у каждого с учетом других фильтров: [{ value: "Брюки", count: 8 }]
    function getOptions(field) {
        const base = filterProducts(field);
        const options = getValues(field).map((value) => ({
            value: value,
            count: base.filter((product) => getValue(product, field) === value).length,
        }));
        // пустые (серые) пункты - в конец списка
        return options.sort((a, b) => (b.count > 0) - (a.count > 0));
    }

    // показываем только размеры, которые есть у подходящих товаров (и уже выбранные), по порядку
    // parseFloat - потому что бывают размеры вида "42-44" (берем первое число), при равенстве "42" раньше "42-44"
    const sizesInList = [...new Set([...filterProducts("sizes").flatMap((product) => product.sizes), ...sizes])]
        .sort((a, b) => parseFloat(a) - parseFloat(b) || String(a).length - String(b).length);

    // 2. сортируем (делаем копию, чтобы не менять исходный массив)
    // "по популярности" - оставляем порядок как в списке товаров,
    list = [...list];
    if (sort === "cheap") list.sort((a, b) => a.price - b.price);
    if (sort === "expensive") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "new") list.sort((a, b) => b.isNew - a.isNew);
    if (sort === "discount") list.sort((a, b) => getDiscount(b.price, b.oldprice) - getDiscount(a.price, a.oldprice));

    // 3. делим на страницы
    const pagesCount = Math.ceil(list.length / perPage);
    const pageProducts = list.slice((page - 1) * perPage, page * perPage);

    // заголовок страницы
    let title = "Каталог";
    if (gender === "Мужской") title = "Мужчинам";
    if (gender === "Женский") title = "Женщинам";
    if (season === "Зима") title = "Зимняя одежда";
    if (season === "Зима" && gender === "Мужской") title = "Мужская зимняя одежда";
    if (season === "Зима" && gender === "Женский") title = "Женская зимняя одежда";
    if (checked.category && checked.category.length === 1) title = checked.category[0];
    if (section) title = section;
    if (onlyNew) title = "Новинки";
    if (onlySale) title = "Скидки";

    // хлебные крошки: Главная / Мужчинам / Одежда (или Главная / Каталог / Брюки)
    let crumbs = [{ title: title }];
    if (type || section) {
        let parent = { title: "Каталог", link: "/catalog" };
        if (gender === "Мужской") parent = { title: "Мужчинам", link: "/catalog?gender=Мужской" };
        if (gender === "Женский") parent = { title: "Женщинам", link: "/catalog?gender=Женский" };
        crumbs = [parent, { title: type || section }];
    }

    // при смене фильтра возвращаемся на первую страницу
    function goFirstPage() {
        searchParams.delete("page");
        setSearchParams(searchParams);
    }

    function changePage(number) {
        setSearchParams({ ...Object.fromEntries(searchParams), page: number });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // отметить / снять пункт в блоке (можно выбрать несколько пунктов сразу)
    function toggleChecked(field, value) {
        const old = checked[field] || [];
        const next = old.includes(value) ? old.filter((v) => v !== value) : [...old, value];
        setChecked({ ...checked, [field]: next });
        goFirstPage();
    }

    function toggleSize(size) {
        if (sizes.includes(size)) {
            setSizes(sizes.filter((s) => s !== size));
        } else {
            setSizes([...sizes, size]);
        }
        goFirstPage();
    }

    function changePrice(from, to) {
        setPriceFrom(from);
        setPriceTo(to);
        goFirstPage();
    }

    function resetFilters() {
        setOnlyNew(false);
        setOnlySale(false);
        setPriceFrom(minPrice);
        setPriceTo(maxPrice);
        setSizes([]);
        // пол из адреса (Мужчинам / Женщинам) остается, его в фильтрах не переключить
        setChecked(gender ? { gender: [gender] } : {});
        goFirstPage();
    }

    function changeSort(value) {
        setSort(value);
        goFirstPage();
    }

    // блок фильтра с чекбоксами
    function renderGroup(group) {
        return (
            <FilterBlock key={group.field} title={group.title}>
                <CheckboxList
                    options={getOptions(group.field)}
                    checked={checked[group.field] || []}
                    onToggle={(value) => toggleChecked(group.field, value)}
                />
            </FilterBlock>
        );
    }

    return (
        <div>
            <Breadcrumbs items={crumbs} />

            <h1 className="text-[32px] md:text-[40px] font-black uppercase">
                {title} <span className="text-gray text-[18px] font-medium">{list.length} {productsWord(list.length)}</span>
            </h1>

            <PromoBanner />

            {/* полоска "Скрыть фильтры" и сортировка - прилипает под шапкой,
                листаем вниз - уезжает вверх вместе с шапкой, вверх - выезжает обратно */}
            <div className={"sticky z-30 bg-white flex justify-between items-center py-3 mt-4 transition-all duration-300 " +
                (headerHidden ? "top-0 -translate-y-full" : "top-[60px] md:top-[100px]")}>
                <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 font-bold text-[15px]">
                    <FiSliders className="text-[20px]" />
                    {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
                </button>

                <div className="flex items-center gap-6">
                    {/* сколько плиток в ряд: 3 или 4 */}
                    <div className="flex items-center gap-2 text-[20px]">
                        <button onClick={() => setTiles(3)} className={tiles === 3 ? "text-text" : "text-line hover:text-gray"}>
                            <BsGrid />
                        </button>
                        <button onClick={() => setTiles(4)} className={tiles === 4 ? "text-text" : "text-line hover:text-gray"}>
                            <BsGrid3X3GapFill />
                        </button>
                    </div>

                    <SortSelect sort={sort} onChange={changeSort} />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 mt-4">
                {/* фильтры */}
                {showFilters && (
                    <aside className="lg:w-[260px] shrink-0">
                        <div className="border-b border-line pb-2">
                            <Checkbox
                                title="Новинки"
                                count={filterProducts("new").filter((p) => p.isNew).length}
                                checked={onlyNew}
                                onChange={() => { setOnlyNew(!onlyNew); goFirstPage(); }}
                            />
                            <Checkbox
                                title="Скидки"
                                count={filterProducts("sale").filter((p) => p.oldprice > 0).length}
                                checked={onlySale}
                                onChange={() => { setOnlySale(!onlySale); goFirstPage(); }}
                            />
                        </div>

                        {/* блок "Пол" не показываем, если пол уже выбран (меню, баннер) */}
                        {filterGroups.filter((group) => !(group.field === "gender" && gender)).map(renderGroup)}

                        <FilterBlock title="Цена">
                            <PriceFilter min={minPrice} max={maxPrice} from={priceFrom} to={priceTo} onChange={changePrice} />
                        </FilterBlock>

                        <FilterBlock title="Размер (RUS)">
                            <div className="grid grid-cols-3 gap-2">
                                {sizesInList.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => toggleSize(size)}
                                        className={
                                            "h-10 border rounded text-[13px] font-bold " +
                                            (sizes.includes(size) ? "border-text bg-text text-white" : "border-line hover:border-text")
                                        }
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </FilterBlock>

                        <FilterBlock title="Цвет">
                            <CheckboxList
                                options={getOptions("color")}
                                checked={checked.color || []}
                                onToggle={(value) => toggleChecked("color", value)}
                                colors={colors}
                            />
                        </FilterBlock>

                        {filterGroups2.map(renderGroup)}

                        <button onClick={resetFilters} className="w-full mt-4 py-3 bg-light hover:bg-line font-bold text-[14px]">
                            Сбросить все
                        </button>
                    </aside>
                )}

                <div className="flex-1">
                    {list.length === 0 && (
                        <p className="text-gray py-10">По этим фильтрам товаров нет.</p>
                    )}

                    <div className={"grid gap-x-4 gap-y-8 " + (tiles === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4")}>
                        {pageProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                showMenu
                            />
                        ))}
                    </div>

                    <Pagination page={page} pagesCount={pagesCount} onChange={changePage} />
                </div>
            </div>
        </div>
    )
}

// когда переходим по ссылке из меню (например, с "Брюки" на "Скидки"),
// каталог рисуется заново, и фильтры берутся из нового адреса.
// номер страницы при этом не считается - иначе фильтры сбрасывались бы при листании
function CatalogPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    params.delete("page");

    return <Catalog key={location.pathname + params.toString()} />;
}

export default CatalogPage;
