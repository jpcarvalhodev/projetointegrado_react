import { useContext, useState } from 'react';
import { Product } from '../Pages/Products';
import { CartContext, CartProvider } from './CartContext';

const ProductsTable = () => {
    const { addToCart, products, handleOrder } = useContext(CartContext);
    const [filter, setFilter] = useState<string>('');
    const [nameFilter, priceFilter] = filter.split(',');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState<string>('');

    function handleAddToCart(product: Product) {
        addToCart(product);
    }

    if (!products) {
        return <p>Carregando...</p>;
    }

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes((nameFilter || '').toLowerCase()) &&
        (!priceFilter || product.price <= Number(priceFilter))
    );

    const sortedProducts = filteredProducts.sort((a, b) => 
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

    return (
        <CartProvider>
            <div>
                <label>
                    Filtrar por nome:
                    <input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
                </label>
                <label>
                    Filtrar por preço:
                    <select id='sortOrder' value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                </label>
            </div>
            <div>
                {sortedProducts
                .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((product) => (
                    <div key={product.id}>
                        <img src={product.image_url} alt={product.title} />
                        <h2>{product.title}</h2>
                        <p>${product.price}</p>
                        <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
                        <button onClick={() => handleOrder(product)}>Comprar Produto</button>
                    </div>
                ))}
            </div>
        </CartProvider>
    );
};

export default ProductsTable;