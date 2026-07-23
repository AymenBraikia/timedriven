import { Order } from "./order";
import { Spare } from "./spare";
import { Watch } from "./watch";

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    password: string;

    cart: User_Cart;
    wish_list: User_Cart;
    ongoing_orders: Order[];
    fulfilled_orders: Order[];

    local_pickup: boolean;

    address: { country: string; address1: string | undefined; address2: string | undefined; postCode: string | undefined; city: string | undefined; phone: string | undefined };
    diff_address: { active: boolean; country: string; address1: string | undefined; address2: string | undefined; postCode: string | undefined; city: string | undefined; phone: string | undefined };
}

export interface UserData {
    cart: User_Cart;
    wish_list: User_Cart;
    ongoing_orders: Order[];
    fulfilled_orders: Order[];
    first_name: string;
    last_name: string;
    local_pickup: boolean;
    email: string;
    address: { country: string; address1: string | undefined; address2: string | undefined; postCode: string | undefined; city: string | undefined; phone: string | undefined };
    diff_address: { active: boolean; country: string; address1: string | undefined; address2: string | undefined; postCode: string | undefined; city: string | undefined; phone: string | undefined };
}

export type User_Cart = Cart_Item[];

export type Cart_Item = Watch_Item | Spare_Item;

interface Watch_Item extends Watch {
    quantity: number;
}
interface Spare_Item extends Spare {
    quantity: number;
}

export type UpdateUserProps = Partial<User>;
