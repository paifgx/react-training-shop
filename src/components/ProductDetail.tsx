'use client'

import React, { useState, useContext } from 'react';
import { Product } from '../types';
import { CartContext } from '../contexts/CartContext';
import { CheckIcon, QuestionMarkCircleIcon, ShieldCheckIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const { title, description, price, category, image } = product;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Produktdetails */}
        <div className="lg:max-w-lg lg:self-end">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              <li>
                <div className="flex items-center text-sm">
                  <a href="#" className="font-medium text-gray-500 hover:text-gray-900">
                    {category}
                  </a>
                </div>
              </li>
            </ol>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Produktinformationen
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">{price}€</p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{description}</p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-green-500" />
              <p className="ml-2 text-sm text-gray-500">Auf Lager und versandbereit</p>
            </div>
          </section>
        </div>

        {/* Produktbild */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              alt={title}
              src={image}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Produktformular */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Produktoptionen
            </h2>

            <form>
              <div className="mt-10">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  aria-label="Produkt in den Warenkorb legen"
                  onClick={() => addToCart(product)}
                >
                  In den Warenkorb
                </button>
              </div>

              <div className="mt-6 text-center">
                <a href="#" className="group inline-flex text-base font-medium">
                  <ShieldCheckIcon
                    aria-hidden="true"
                    className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                  <span className="text-gray-500 hover:text-gray-700">Lebenslange Garantie</span>
                </a>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
