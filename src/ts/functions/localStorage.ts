import { CartItem } from "../../models/Product";


export function saveToLs(cartItem: CartItem[]) {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }
  
  export function getFromLs(): CartItem[] {
    return JSON.parse(localStorage.getItem("cartItem") || "[]");
  }