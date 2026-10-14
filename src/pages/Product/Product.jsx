import { useParams } from "react-router-dom"
import products from "../../data/products.js"
import { BsYinYang } from "react-icons/bs";
import { CgEdeitFlipV } from "react-icons/cg";


function Product() {
        const { id } = useParams();
        const product = products.find((product) => product.id === Number(id));

        if (!product) {
            return <h1>Товар не найден</h1>
        }
    
    return (
        <div className="flex w-full pr-8">
            <div className="grid grid-cols-2 gap-3">
                {product.images.map((image) => (
                    <img 
                        key={image} 
                        src={image} 
                        alt={product.name}
                    />
                ))}
            </div>
            <div className="w-[710px] pl-10">
                <p>{product.name}</p>

                <p>рейтинг {product.rating}</p>

                <p>отзывы {product.reviews}</p>

                <p>цена {product.price}</p>

                {product.sizes.map((size) => (
                    <p key={size}>{size}</p>
                ))}

                <p>описание {product.description}</p>
            </div>
        </div>
    )
}

export default Product;