import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { CheckIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';

const CartPage: React.FC = () => {
  const { cartItems, dispatch } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold mb-4">Dein Warenkorb ist leer</h2>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Warenkorb</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          {/* Warenkorbübersicht */}
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Produkte in deinem Warenkorb
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cartItems.map((item, itemIdx) => (
                <li key={item.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                              {item.title}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{item.category}</p>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{item.price}€</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${itemIdx}`} className="sr-only">
                          Menge, {item.title}
                        </label>
                        <select
                          id={`quantity-${itemIdx}`}
                          name={`quantity-${itemIdx}`}
                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                          defaultValue={item.quantity}
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', productId: item.id, quantity: item.quantity })}
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => dispatch({ type: 'REMOVE_FROM_CART', productId: item.id })}
                          >
                            <span className="sr-only">Entfernen</span>
                            <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      <CheckIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-green-500" />
                      <span>Auf Lager</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Bestellübersicht */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Bestellübersicht
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Zwischensumme</dt>
                <dd className="text-sm font-medium text-gray-900">{totalPrice.toFixed(2)}€</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Versandkosten</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Erfahren Sie mehr über die Versandkostenberechnung</span>
                    <QuestionMarkCircleIcon aria-hidden="true" className="h-5 w-5" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">Kostenlos</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Steuern</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Erfahren Sie mehr über die Steuerberechnung</span>
                    <QuestionMarkCircleIcon aria-hidden="true" className="h-5 w-5" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">Inklusive</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Gesamtsumme</dt>
                <dd className="text-base font-medium text-gray-900">{totalPrice.toFixed(2)}€</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="button"
                className="w-full rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Zur Kasse
              </button>
            </div>
            <div className="mt-4">
              <button
                className="w-full rounded-md border border-transparent bg-red-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
              >
                Warenkorb leeren
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
