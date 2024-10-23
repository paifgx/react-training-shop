import React, { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import { Product } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'productDetail' | 'cart'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const showHome = () => setView('home');
  const showCart = () => setView('cart');
  const showProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setView('productDetail');
  };

  return (
    <CartProvider>
      <Header showHome={showHome} showCart={showCart} />
      {view === 'home' && <ProductList showProductDetail={showProductDetail} />}
      {view === 'productDetail' && selectedProduct && (
        <ProductDetail product={selectedProduct} />
      )}
      {view === 'cart' && <CartPage />}
    </CartProvider>
  );
};

export default App;
