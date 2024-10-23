import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

interface HeaderProps {
  showHome: () => void;
  showCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ showHome, showCart }) => {
  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <button onClick={showHome}>
          <h1 className="text-3xl font-bold text-gray-900">Mein Shop</h1>
        </button>
        <button onClick={showCart} className="flex items-center">
          <span className="mr-2 text-gray-700">Warenkorb</span>
          <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white">
            {totalItems}
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
