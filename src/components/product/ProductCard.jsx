import { Link } from "react-router-dom"

function ProductCard ({ product }) {
    return (
        <Link to={`/product/${product.id}`}>
            <div className="flex flex-col w-70  border-2">
                <img 
                    src={product.images[0]}
                    alt={product.name}
                    className=" "
                />

                <h2>{product.name}</h2>

                <p>{product.price} ₽ </p>
            </div>
        </Link>
    )
}

export default ProductCard;