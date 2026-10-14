import products from "../../data/products.js"
import ProductCard from "../../components/product/ProductCard.jsx"

function Catalog () {
    return (
        <div className="grid grid-cols-3 gap-6 justify-between">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    )
}

export default Catalog;