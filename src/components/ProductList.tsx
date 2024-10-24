import React, { useContext } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { Product } from '../types';
import { CartContext } from '../contexts/CartContext';

interface ProductListProps {
  showProductDetail: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ showProductDetail }) => {
  const { data: products, loading, error } = useFetchProducts();
  const { dispatch } = useContext(CartContext);

  if (loading) {
    return <p className="text-center mt-8">Lädt...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Unsere Produkte</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {(products as Product[]).map((product) => (
            <div key={product.id} className='flex flex-col justify-between'>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    alt={product.title}
                    src={product.image}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">
                    {product.price}€
                  </p>
                </div>
              </div>
              <div className="mt-6 flex space-x-2">
                <button
                  onClick={() => dispatch({ type: 'ADD_TO_CART', product })}
                  className="relative flex-1 items-center justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  In den Warenkorb
                </button>
                <button
                  onClick={() => showProductDetail(product)}
                  className="relative flex-1 items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
