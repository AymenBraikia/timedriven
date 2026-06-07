"use client";
import React, { useState, useEffect, useRef } from "react";
import Next from "./svg/next";

export default function List({ children, display }: { children: React.ReactNode; display: number }) {
	const childrenArray = React.Children.toArray(children);
	const N = childrenArray.length;

	const canLoop = N >= display && N > 0;

	const [index, set_index] = useState<number>(0);
	const [swipe, set_swipe] = useState<number>(canLoop ? N : 0);
	const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
	const isAnimating = useRef<boolean>(false);

	const extendedItems = canLoop ? [...childrenArray, ...childrenArray, ...childrenArray] : childrenArray;

	const handleNext = () => {
		if (!canLoop || isAnimating.current) return;
		setIsTransitioning(true);
		isAnimating.current = true;
		set_swipe((prev) => prev + 1);
		set_index((prev) => (prev + 1 != React.Children.count(children) ? prev + 1 : 0));
	};

	const handlePrev = () => {
		if (!canLoop || isAnimating.current) return;
		setIsTransitioning(true);
		isAnimating.current = true;
		set_swipe((prev) => prev - 1);
		set_index((prev) => (prev - 1 != -1 ? prev - 1 : React.Children.count(children) - 1));
	};

	const handleTransitionEnd = () => {
		if (!canLoop) return;
		isAnimating.current = false;

		if (swipe >= 2 * N) {
			setIsTransitioning(false);
			set_swipe(swipe - N);
		} else if (swipe <= N - 1) {
			setIsTransitioning(false);
			set_swipe(swipe + N);
		}
	};

	useEffect(() => {
		if (!isTransitioning) {
			let frame2: number;
			const frame1 = requestAnimationFrame(() => {
				frame2 = requestAnimationFrame(() => {
					setIsTransitioning(true);
				});
			});
			return () => {
				cancelAnimationFrame(frame1);
				if (frame2) cancelAnimationFrame(frame2);
			};
		}
	}, [isTransitioning]);

	return (
		<div className="relative w-full h-full overflow-hidden flex items-center py-20">
			<div
				onTransitionEnd={handleTransitionEnd}
				className={`flex gap-4 w-full ${isTransitioning ? "transition-transform duration-300 ease-in-out" : ""}`}
				style={{
					transform: `translateX(-${swipe * (100 / display)}%)`,
				}}
			>
				{extendedItems.map((child, globalIndex) => (
					<div key={`carousel-item-${globalIndex}`} /* Guaranteed to be unique */ className="shrink-0 px-0 w-full sm:w-(--card-width)" style={{ "--card-width": `calc(${100 / display}% - 16px)` } as React.CSSProperties}>
						{child}
					</div>
				))}
			</div>

			<div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex-center gap-4">
				<button aria-label="Previous" type="button" className={`cursor-pointer rotate-180 p-2 z-10 ${!canLoop ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handlePrev} disabled={!canLoop}>
					<Next classnames={"w-10"} clr="currentColor" />
				</button>
				{gen_dot(React.Children.count(children), index)}

				<button aria-label="Next" type="button" className={`cursor-pointer p-2 z-10 ${!canLoop ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleNext} disabled={!canLoop}>
					<Next classnames={"w-10"} clr="currentColor" />
				</button>
			</div>
		</div>
	);
}

function gen_dot(n: number, index: number): React.ReactElement[] {
	const elements: React.ReactElement[] = [];
	for (let i = 0; i < n; i++) elements.push(<div key={i} className={`w-1.5 aspect-square bg-foreground rounded-full transition-default  ${index == i ? "opacity-100 scale-100" : "opacity-40 scale-80"}`}></div>);
	return elements;
}
