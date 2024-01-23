import React, { useEffect, useState } from 'react';
import { Product } from '../Pages/Products';

interface CartContextProps {
    cart: Product[];
    addToCart: (product: Product) => void;
    filterProducts: () => Product[];
    products: Product[];
    handleOrder: (product: Product) => void;
}

export const CartContext = React.createContext<CartContextProps>({
    cart: [],
    addToCart: () => {},
    filterProducts: () => [],
    products: [],
    handleOrder: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const cartFromLocalStorage = localStorage.getItem('cart');

    const [cart, setCart] = useState<Product[]>(cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));

        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3333/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        console.log(filterProducts());
        fetchProducts();
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart([...cart, product])
    };

    function filterProducts(): Product[] {
        const filteredProducts = cart.reduce((acc, cartProduct) => {
            const product = products.find(product => product.id === cartProduct.id);
            if (product) acc.push(product);
            return acc;
        }, [] as Product[]);
    
        return filteredProducts;
    }

    const handleOrder = async (product: Product) => {
    try {
        const response = await fetch('http://localhost:3333/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                product_id: product.id,
                quantity: 1,
            }),
        });

        if (response.ok) {
            const order = {
                id: product.id,
                title: product.title,
            };

            const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');

            const updatedOrders = [...storedOrders, order];

            localStorage.setItem('orders', JSON.stringify(updatedOrders));

            setCart([]);
            alert('Pedido feito com sucesso!');
        } else {
            console.error('Erro ao fazer pedido:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao fazer pedido:', error);
    }
};

    return (
        <CartContext.Provider value={{ cart, addToCart, filterProducts, products, handleOrder }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;