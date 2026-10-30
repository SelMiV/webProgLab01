// товары взяты с demix.ru (названия, цены, фото)
// фото лежат в public/products/<номер папки>/

import descriptions from "./descriptions.js"

// разные товары (сначала мужские, потом женские)
const baseProducts = [
    {
        id: 1,
        name: "Кроссовки утепленные мужские Sprinter Verse",
        category: "Обувь",
        type: "Кроссовки",

        // для фильтров в каталоге
        sport: "Спортивный стиль",
        kind: "Кроссовки утепленные",
        clasp: "Шнуровка",
        materialType: "Синтетический",
        fabric: "Текстиль",

        price: 5499,
        oldprice: 0,

        rating: 4.8,
        reviews: 36,
        isNew: true,

        images: [
            "/products/1/1.jpg",
            "/products/1/2.jpg",
            "/products/1/3.jpg",
            "/products/1/4.jpg",
            "/products/1/5.jpg",
            "/products/1/6.jpg"
        ],

        // другие цвета этого товара (мини-фото под ценой)
        colors: [
            {
                name: "болотный",
                images: [
                    "/products/1-bolotny/1.jpg",
                    "/products/1-bolotny/2.jpg",
                    "/products/1-bolotny/3.jpg",
                    "/products/1-bolotny/4.jpg",
                    "/products/1-bolotny/5.jpg",
                    "/products/1-bolotny/6.jpg"
                ]
            }
        ],

        description: descriptions.shoes,

        specifications: {
            gender: "Мужской",
            season: "Зима",
            material: "Текстиль, синтетическая кожа, резина",
            color: "черный",
            country: "Вьетнам"
        },

        sizes: [40, 41, 42, 43, 44, 45, 46]
    },
    {
        id: 2,
        name: "Куртка утепленная мужская",
        category: "Верхняя одежда",
        type: "Куртки",

        // для фильтров в каталоге
        sport: "Спортивный стиль",
        kind: "Куртки утепленные",
        clasp: "Молния",
        materialType: "Полиэстер",
        fabric: "Текстиль",

        price: 5999,
        oldprice: 0,

        rating: 4.6,
        reviews: 4,
        isNew: false,

        images: [
            "/products/2/1.jpg",
            "/products/2/2.jpg",
            "/products/2/3.jpg",
            "/products/2/4.jpg",
            "/products/2/5.jpg",
            "/products/2/6.jpg",
            "/products/2/7.jpg",
            "/products/2/8.jpg",
            "/products/2/9.jpg",
            "/products/2/10.jpg",
            "/products/2/11.jpg"
        ],

        // другие цвета этого товара (мини-фото под ценой)
        colors: [
            {
                name: "ореховый",
                images: [
                    "/products/2-orehovyj/1.jpg"
                ]
            },
            {
                name: "зеленый",
                images: [
                    "/products/2-zelenyj/1.jpg"
                ]
            }
        ],

        description: descriptions.jackets,

        specifications: {
            gender: "Мужской",
            season: "Зима",
            material: "Полиэстер 100%, утеплитель синтепух",
            color: "черный",
            country: "Китай"
        },

        sizes: [44, 46, 48, 50, 52, 54, 56]
    },
    {
        id: 3,
        name: "Брюки флисовые мужские Discover",
        category: "Брюки",
        type: "Брюки",

        // для фильтров в каталоге
        sport: "Фитнес и тренинг",
        kind: "Брюки спортивные",
        clasp: "Без застежки",
        materialType: "Смесовый",
        fabric: "Трикотаж",

        price: 3499,
        oldprice: 0,

        rating: 4.9,
        reviews: 4,
        isNew: false,

        images: [
            "/products/3/1.jpg",
            "/products/3/2.jpg",
            "/products/3/3.jpg",
            "/products/3/4.jpg",
            "/products/3/5.jpg",
            "/products/3/6.jpg"
        ],

        // другие цвета этого товара (мини-фото под ценой)
        colors: [
            {
                name: "темно-серый",
                images: [
                    "/products/3-temno-seryj/1.jpg"
                ]
            }
        ],

        description: descriptions.pants,

        specifications: {
            gender: "Мужской",
            season: "Всесезон",
            material: "Полиэстер, хлопок",
            color: "черный",
            country: "Вьетнам"
        },

        sizes: [44, 46, 48, 50, 52, 54]
    },
    {
        id: 4,
        name: "Брюки мужские",
        category: "Брюки",
        type: "Брюки",

        // для фильтров в каталоге
        sport: "Фитнес и тренинг",
        kind: "Брюки спортивные",
        clasp: "Без застежки",
        materialType: "Хлопок с синтетикой",
        fabric: "Трикотаж",

        price: 2499,
        oldprice: 0,

        rating: 4.7,
        reviews: 16,
        isNew: true,

        images: [
            "/products/4/1.jpg",
            "/products/4/2.jpg",
            "/products/4/3.jpg",
            "/products/4/4.jpg",
            "/products/4/5.jpg"
        ],

        description: descriptions.pants,

        specifications: {
            gender: "Мужской",
            season: "Всесезон",
            material: "Полиэстер, хлопок",
            color: "черный",
            country: "Вьетнам"
        },

        sizes: [44, 46, 48, 50, 52, 54]
    },
    {
        id: 5,
        name: "Пуховик непромокаемый мужской",
        category: "Верхняя одежда",
        type: "Пуховики",

        // для фильтров в каталоге
        sport: "Спортивный стиль",
        kind: "Пуховики",
        clasp: "Молния",
        materialType: "Полиэстер",
        fabric: "Текстиль",

        price: 6999,
        oldprice: 0,

        rating: 4.8,
        reviews: 17,
        isNew: false,

        images: [
            "/products/6/1.jpg",
            "/products/6/2.jpg",
            "/products/6/3.jpg",
            "/products/6/4.jpg",
            "/products/6/5.jpg",
            "/products/6/6.jpg"
        ],

        description: descriptions.jackets,

        specifications: {
            gender: "Мужской",
            season: "Зима",
            material: "Полиэстер 100%, утеплитель синтепух",
            color: "черный",
            country: "Китай"
        },

        sizes: [44, 46, 48, 50, 52, 54, 56]
    },
    {
        id: 6,
        name: "Джемпер флисовый мужской",
        category: "Толстовки и худи",
        type: "Толстовки и худи",

        // для фильтров в каталоге
        sport: "Фитнес и тренинг",
        kind: "Джемперы",
        clasp: "Молния",
        materialType: "Полиэстер",
        fabric: "Флис",

        price: 1999,
        oldprice: 0,

        rating: 5,
        reviews: 28,
        isNew: true,

        images: [
            "/products/10/1.jpg",
            "/products/10/2.jpg",
            "/products/10/3.jpg",
            "/products/10/4.jpg",
            "/products/10/5.jpg"
        ],

        description: descriptions.hoodies,

        specifications: {
            gender: "Мужской",
            season: "Демисезон",
            material: "Полиэстер 100% (флис)",
            color: "черный",
            country: "Узбекистан"
        },

        sizes: [44, 46, 48, 50, 52, 54]
    },
    {
        id: 7,
        name: "Худи мужское Discover",
        category: "Толстовки и худи",
        type: "Толстовки и худи",

        // для фильтров в каталоге
        sport: "Спортивный стиль",
        kind: "Худи",
        clasp: "Без застежки",
        materialType: "Полиэстер",
        fabric: "Флис",

        price: 3999,
        oldprice: 0,

        rating: 4.9,
        reviews: 1,
        isNew: true,

        images: [
            "/products/13/1.jpg",
            "/products/13/2.jpg",
            "/products/13/3.jpg",
            "/products/13/4.jpg",
            "/products/13/5.jpg",
            "/products/13/6.jpg"
        ],

        description: descriptions.hoodies,

        specifications: {
            gender: "Мужской",
            season: "Демисезон",
            material: "Полиэстер 100% (флис)",
            color: "темно-серый",
            country: "Узбекистан"
        },

        sizes: [44, 46, 48, 50, 52, 54]
    },
    {
        id: 8,
        name: "Пуховик мужской Demix",
        category: "Верхняя одежда",
        type: "Пуховики",

        // для фильтров в каталоге
        sport: "Спортивный стиль",
        kind: "Пуховики",
        clasp: "Молния",
        materialType: "Полиэстер",
        fabric: "Текстиль",

        price: 11999,
        oldprice: 14999,

        rating: 0,
        reviews: 0,
        isNew: false,

        images: [
            "/products/15/1.jpg",
            "/products/15/2.jpg",
            "/products/15/3.jpg",
            "/products/15/4.jpg",
            "/products/15/5.jpg",
            "/products/15/6.jpg"
        ],

        // другие цвета этого товара (мини-фото под ценой)
        colors: [
            {
                name: "темно-серый",
                images: [
                    "/products/15-temno-seryj/1.jpg",
                    "/products/15-temno-seryj/2.jpg",
                    "/products/15-temno-seryj/3.jpg",
                    "/products/15-temno-seryj/4.jpg",
                    "/products/15-temno-seryj/5.jpg",
                    "/products/15-temno-seryj/6.jpg"
                ]
            }
        ],

        description: descriptions.jackets,

        specifications: {
            gender: "Мужской",
            season: "Зима",
            material: "Полиэстер 100%, утеплитель синтепух",
            color: "черный",
            country: "Китай"
        },

        sizes: [44, 46, 48, 50, 52, 54, 56]
    },
    {
        id: 9,
        name: "Пуховик мужской Demix",
        category: "Верхняя одежда",
        type: "Пуховики",

        // для фильтров в каталоге
        sport: "Спортивный стиль",
        kind: "Пуховики",
        clasp: "Молния",
        materialType: "Полиэстер",
        fabric: "Текстиль",

        price: 7999,
        oldprice: 9999,

        rating: 4.9,
        reviews: 22,
        isNew: false,

        images: [
            "/products/18/1.jpg",
            "/products/18/2.jpg",
            "/products/18/3.jpg",
            "/products/18/4.jpg",
            "/products/18/5.jpg",
            "/products/18/6.jpg"
        ],

        // другие цвета этого товара (мини-фото под ценой)
        colors: [
            {
                name: "черный",
                images: [
                    "/products/18-chernyj/1.jpg"
                ]
            }
        ],

        description: descriptions.jackets,

        specifications: {
            gender: "Мужской",
            season: "Зима",
            material: "Полиэстер 100%, утеплитель синтепух",
            color: "болотный",
            country: "Китай"
        },

        sizes: [44, 46, 48, 50, 52, 54, 56]
    },
    {
        id: 10,
        name: "Кроссовки мужские Ucrazy Enrblast 3",
        category: "Обувь",
        type: "Кроссовки",

        // для фильтров в каталоге
        sport: "Бег",
        kind: "Кроссовки",
        clasp: "Шнуровка",
        materialType: "Синтетический",
        fabric: "Текстиль",

        price: 8999,
        oldprice: 0,

        rating: 5,
        reviews: 49,
        isNew: false,

        images: [
            "/products/20/1.jpg",
            "/products/20/2.jpg",
            "/products/20/3.jpg",
            "/products/20/4.jpg",
            "/products/20/5.jpg",
            "/products/20/6.jpg"
        ],

        description: descriptions.shoes,

        specifications: {
            gender: "Мужской",
            season: "Зима",
            material: "Текстиль, синтетическая кожа, резина",
            color: "черный",
            country: "Вьетнам"
        },

        sizes: [40, 41, 42, 43, 44, 45, 46]
    },

    // женские товары
    {
        id: 11,
        name: "Пуховик женский",
        category: "Верхняя одежда",
        type: "Пуховики",

        // для фильтров в каталоге
        sport: "Спортивный стиль",
        kind: "Пуховики",
        clasp: "Молния",
        materialType: "Полиэстер",
        fabric: "Текстиль",

        price: 7199,
        oldprice: 8999,

        rating: 4.8,
        reviews: 5,
        isNew: false,

        images: [
            "/products/w1/1.jpg",
            "/products/w1/2.jpg",
            "/products/w1/3.jpg",
            "/products/w1/4.jpg",
            "/products/w1/5.jpg",
            "/products/w1/6.jpg"
        ],

        description: descriptions.jackets,

        specifications: {
            gender: "Женский",
            season: "Зима",
            material: "Полиэстер 100%, утеплитель пух и перо",
            color: "черный",
            country: "Китай"
        },

        sizes: ["38-40", "42-44", "46-48", "50-52", "54-56"]
    },
    {
        id: 12,
        name: "Кроссовки утепленные женские Sp Gypsy 4 Slipon Ny",
        category: "Обувь",
        type: "Кроссовки",

        // для фильтров в каталоге
        sport: "Спортивный стиль",
        kind: "Кроссовки утепленные",
        clasp: "Без застежки",
        materialType: "Синтетический",
        fabric: "Текстиль",

        price: 4999,
        oldprice: 0,

        rating: 5,
        reviews: 1,
        isNew: true,

        images: [
            "/products/w2/1.jpg",
            "/products/w2/2.jpg",
            "/products/w2/3.jpg",
            "/products/w2/4.jpg",
            "/products/w2/5.jpg",
            "/products/w2/6.jpg"
        ],

        description: descriptions.shoes,

        specifications: {
            gender: "Женский",
            season: "Зима",
            material: "Текстиль, резина",
            color: "черный",
            country: "Вьетнам"
        },

        sizes: [36.5, 37, 37.5, 38, 38.5, 39, 40, 41]
    },
    {
        id: 13,
        name: "Кроссовки утепленные женские Tiara 2",
        category: "Обувь",
        type: "Кроссовки",

        // для фильтров в каталоге
        sport: "Спортивный стиль",
        kind: "Кроссовки утепленные",
        clasp: "Шнуровка",
        materialType: "Синтетический",
        fabric: "Текстиль",

        price: 7999,
        oldprice: 0,

        rating: 0,
        reviews: 0,
        isNew: true,

        images: [
            "/products/w3/1.jpg",
            "/products/w3/2.jpg",
            "/products/w3/3.jpg",
            "/products/w3/4.jpg",
            "/products/w3/5.jpg",
            "/products/w3/6.jpg"
        ],

        description: descriptions.shoes,

        specifications: {
            gender: "Женский",
            season: "Зима",
            material: "Текстиль, синтетическая кожа, резина",
            color: "бежевый",
            country: "Вьетнам"
        },

        sizes: [36.5, 37, 37.5, 38, 38.5, 39, 40, 41]
    },
    {
        id: 14,
        name: "Кроссовки утепленные женские Fuel",
        category: "Обувь",
        type: "Кроссовки",

        // для фильтров в каталоге
        sport: "Спортивный стиль",
        kind: "Кроссовки утепленные",
        clasp: "Шнуровка",
        materialType: "Синтетический",
        fabric: "Текстиль",

        price: 9999,
        oldprice: 0,

        rating: 0,
        reviews: 0,
        isNew: true,

        images: [
            "/products/w4/1.jpg",
            "/products/w4/2.jpg",
            "/products/w4/3.jpg",
            "/products/w4/4.jpg",
            "/products/w4/5.jpg",
            "/products/w4/6.jpg"
        ],

        description: descriptions.shoes,

        specifications: {
            gender: "Женский",
            season: "Зима",
            material: "Текстиль, синтетическая кожа, резина",
            color: "кофейный",
            country: "Вьетнам"
        },

        sizes: [36.5, 37, 37.5, 38, 38.5, 39, 40, 41]
    },
    {
        id: 15,
        name: "Пуховик женский",
        category: "Верхняя одежда",
        type: "Пуховики",

        // для фильтров в каталоге
        sport: "Спортивный стиль",
        kind: "Пуховики",
        clasp: "Молния",
        materialType: "Полиэстер",
        fabric: "Текстиль",

        price: 11199,
        oldprice: 13999,

        rating: 5,
        reviews: 1,
        isNew: false,

        images: [
            "/products/w5/1.jpg",
            "/products/w5/2.jpg",
            "/products/w5/3.jpg",
            "/products/w5/4.jpg",
            "/products/w5/5.jpg",
            "/products/w5/6.jpg"
        ],

        description: descriptions.jackets,

        specifications: {
            gender: "Женский",
            season: "Зима",
            material: "Полиэстер 100%, утеплитель пух и перо",
            color: "кремовый",
            country: "Китай"
        },

        sizes: [40, 42, 44, 46, 48, 50, 52]
    }
]

// чтобы в каталоге было много товаров (и работала пагинация),
// повторяем эти товары 4 раза. У каждой копии свой id
const products = [];

for (let i = 0; i < 4; i++) {
    baseProducts.forEach((product) => {
        products.push({ ...product, id: product.id + i * baseProducts.length });
    });
}

// разные товары без повторов (для главной и "похожих")
export { baseProducts };

export default products;
