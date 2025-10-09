// src/context/usePromotions.js

import { useContext } from 'react';
import PromotionContext from './PromotionContext'; // Importamos el objeto Contexto

// EL HOOK PERSONALIZADO AHORA VIVE AQUÍ
export const usePromotions = () => {
  // Este hook permite a cualquier componente acceder a los valores del PromotionContext
  return useContext(PromotionContext);
};