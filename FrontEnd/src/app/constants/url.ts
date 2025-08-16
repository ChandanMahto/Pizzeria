import { environment } from "src/environments/environment";

const BASE_URL = environment.production ? '' : 'http://localhost:3000';

export const PIZZA_URL = BASE_URL + '/pizza';
export const ADD_TO_CART_URL = PIZZA_URL + '/addToCart';
export const ORDER_PIZZA = PIZZA_URL + '/orderpizza';
export const INGREDIENTS = PIZZA_URL + '/buildyourpizza';
export const ADD_INGREDIENTS = PIZZA_URL + '/addIngredientsPriceToCart';
export const DELETE_INGREDIENTS = PIZZA_URL + '/deleteIngredientsFromCart';
export const ADD_CART_URL = PIZZA_URL + '/addCart';
export const CART_URL = PIZZA_URL + '/cart';
export const REMOVE_CART_URL = PIZZA_URL + '/remove';
export const ADD_QUANTITY_CART_URL = PIZZA_URL + '/addQuantity';
export const REMOVE_QUANTITY_CART_URL = PIZZA_URL + '/minusQuantity';


