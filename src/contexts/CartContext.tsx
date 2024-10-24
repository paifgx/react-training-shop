import React, { createContext, useEffect, useReducer } from 'react';
import { CartItem } from '../types';
import { cartReducer, CartState, CartAction } from '../reducers/cartReducer';

interface CartContextType {
  cartItems: CartItem[];
  dispatch: React.Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  dispatch: () => {},
});

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};