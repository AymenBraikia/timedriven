import { Spare } from "./spare";
import { Watch } from "./watch";

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    password: string;

    cart: { watches: Watch[]; spares: Spare[] };
}
