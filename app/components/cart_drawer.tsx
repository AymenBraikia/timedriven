import { ActionDispatch, RefObject } from "react";
import Cross from "./svg/cross";
import Info from "./svg/info";
type UIAction = { type: "OPEN_NAV" } | { type: "CLOSE_NAV" } | { type: "OPEN_CART" } | { type: "CLOSE_CART" } | { type: "TOGGLE_LANG" } | { type: "SET_GLASSY"; payload: boolean };

export default function Cart_drawer({ dispatch, ui, ref }: { ref: RefObject<HTMLDivElement | null>; dispatch: ActionDispatch<[action: UIAction]>; ui: { isCartOpen: boolean } }) {
	return (
		<div
			ref={ref}
			className={`liquid-glass w-dvw lg:w-[30dvw] h-dvh fixed top-0 right-0 flex flex-col justify-start items-start gap-4 p-4 md:gap-16 md:p-16 font-secondary transition-default ${ui.isCartOpen ? "translate-x-0" : "translate-x-full"}`}
			onClick={(e) => e.stopPropagation()}
		>
			<div className="flex justify-between items-center w-full h-1/10">
				<h3 className="title5 md:title3">YOUR COLLECTION</h3>
				<button aria-label="close cart" type="button" className="button2 p-1" onClick={() => dispatch({ type: "CLOSE_CART" })}>
					<Cross classnames={"w-16"} />
				</button>
			</div>

			<div className="flex-center flex-col gap-4 w-full h-7/10 md:h-4/5 font-sans text-secondary">
				<Info classnames={"w-18"} />
				<h5 className="title5 flex-center text-center">Your horological collection is empty.</h5>
			</div>

			<div className="flex flex-wrap justify-between items-center gap-4 w-full h-2/10 md:h-1/10">
				<div className="flex justify-between items-center w-full">
					<h5 className="title5">SUBTOTAL VALUE</h5>
					<h5 className="title5">{format(0)}</h5>
				</div>
				<button aria-label="proceed to secure settlement" type="button" className="button px-2 py-4 md:p-auto w-full flex-center title5">
					Proceed to secure settlement
				</button>
			</div>
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
