import Cross from "@/app/components/svg/cross";
import decrease_cart from "@/app/server/cart_decrease";
import increase_cart from "@/app/server/cart_increase";
import revmove_from_cart from "@/app/server/remove_cart";
import { Cart_Item } from "@/types/user";
import Image from "next/image";

export default function Item_Display({ brand, model, slug, price, quantity, images, reference }: Cart_Item) {
    return (
        <div className="flex justify-between items-center w-full gap-4 min-h-40 h-40 border-b-foreground border-b py-4 font-secondary">
            <button type="button" className="button2 p-0" onClick={() => revmove_from_cart(reference)}>
                <Cross classnames="w-8" />
            </button>

            <div className="relative aspect-square h-full max-h-40 max-w-40">
                <Image fill src={images[0]} alt={slug} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" />
            </div>

            <p className="capitalize w-100 h-full flex justify-start items-center text-sm">{brand + " " + model}</p>

            <p className="w-30 text-xl">{format(price)}</p>

            <div className="flex-center">
                <button onClick={() => quantity < 10 && increase_cart(reference)} className={`button aspect-square w-10 p-0 h-fit font-bold text-xl ${quantity < 10 ? "" : "brightness-75 cursor-not-allowed"}`}>
                    +
                </button>
                <p className="aspect-square w-10 flex-center text-xl font-medium cursor-default">{quantity}</p>
                <button onClick={() => quantity > 1 && decrease_cart(reference)} className={`button aspect-square w-10 p-0 h-fit font-bold text-xl ${quantity > 1 ? "" : "brightness-75 cursor-not-allowed"}`}>
                    -
                </button>
            </div>

            <p className="w-40 text-xl">{format(price * quantity)}</p>
        </div>
    );
}

const intl = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
});
function format(n: number): string {
    return intl.format(n);
}
