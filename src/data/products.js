import puh1 from "../assets/images/puh1/puh1.jpg"
import puh2 from "../assets/images/puh1/puh2.jpg"
import puh3 from "../assets/images/puh1/puh3.jpg"
import puh4 from "../assets/images/puh1/puh4.jpg"

import puh11 from "../assets/images/puh2/puh11.jpg"
import puh22 from "../assets/images/puh2/puh22.jpg"
import puh33 from "../assets/images/puh2/puh33.jpg"
import puh44 from "../assets/images/puh2/puh44.jpg"
const products = [
    {
        id: 1,
        name: "ПУХОВИК НЕПРОМОКАЕМЫЙ МУЖСКОЙ",
        category: "Верхняя одежда",
        type: "Пуховики",

        price: 6999,
        oldprice: 0,

        rating: 5,
        reviews: 1,

        images:[
            puh1,
            puh2,
            puh3,
            puh4
        ],

        description: " ",
        
        specifications: {
            gender: " ",
            season: " ",
            material: " ",
            country: ""
        },

        sizes: [46, 48, 50, 52, 54]
    },
    {

        id: 2,
        name: "ПУХОВИК МУЖСКОЙ",
        category: "Верхняя одежда",
        type: "Пуховики",

        price: 9999,
        oldprice: 0,

        rating: 4.5,
        reviews: 69,

        images:[
            puh11,
            puh22,
            puh33,
            puh44
        ],

        description: " ",
        
        specifications: {
            gender: " ",
            season: " ",
            material: " ",
            country: ""
        },

        sizes: [46, 48, 50, 52, 54]
    },
    {
        id: 3,
        name: "ПУХОВИК НЕПРОМОКАЕМЫЙ МУЖСКОЙ",
        category: "Верхняя одежда",
        type: "Пуховики",

        price: 62999,
        oldprice: 0,

        rating: 5,
        reviews: 1,

        images:[
            puh1,
            puh2,
            puh3,
            puh4
        ],

        description: " ",
        
        specifications: {
            gender: " ",
            season: " ",
            material: " ",
            country: ""
        },

        sizes: [46, 48, 50, 52, 54]
    },
    {

        id: 4,
        name: "ПУХОВИК МУЖСКОЙ",
        category: "Верхняя одежда",
        type: "Пуховики",

        price: 19999,
        oldprice: 0,

        rating: 4.5,
        reviews: 69,

        images:[
            puh11,
            puh22,
            puh33,
            puh44
        ],

        description: " ",
        
        specifications: {
            gender: " ",
            season: " ",
            material: " ",
            country: ""
        },

        sizes: [46, 48, 50, 52, 54]
    }
]

export default products;