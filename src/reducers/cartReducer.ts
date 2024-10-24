import { Product, CartItem } from '../types';

export interface CartState {
    cartItems: CartItem[];
}

export type CartAction =
    | { type: 'ADD_TO_CART'; product: Product }
    | { type: 'REMOVE_FROM_CART'; productId: number }
    | { type: 'CLEAR_CART' }
    | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number };

export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART':
            {
                const existingItem = state.cartItems.find(item => item.id === action.product.id);
                if (existingItem) {
                    return {
                        ...state,
                        cartItems: state.cartItems.map(item =>
                            item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    };
                } else {
                    return {
                        ...state,
                        cartItems: [...state.cartItems, { ...action.product, quantity: 1 }],
                    };
                }
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.productId),
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: [],
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.productId ? { ...item, quantity: action.quantity } : item
                ),
            };
        default:
            return state;
    }
};