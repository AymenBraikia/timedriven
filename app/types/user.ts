import { Spare } from "./spare";
import { Watch } from "./watch";

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    password: string;

    cart: User_Cart;
    wish_list: User_Cart;
}

export interface UserData {
    cart: User_Cart;
    wish_list: User_Cart;
    name: string;
    email: string;
}

export type User_Cart = Cart_Item[];

export type Cart_Item = Watch_Item | Spare_Item;

interface Watch_Item extends Watch {
    quantity: number;
}
interface Spare_Item extends Spare {
    quantity: number;
}
