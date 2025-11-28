import { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const useCartContext = () => useContext