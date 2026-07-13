"use client";
import React, { useState, useEffect, useRef } from "react";
import Next from "./svg/next";

interface Breakpoints {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

export default function List({ children, display }: { children: React.ReactNode; display: number | Breakpoints }) {
    const childrenArray = React.Children.toArray(children);
    const N = childrenArray.length;

    const [currentDisplay, setCurrentDisplay] = useState<number>(() => {
        if (typeof display === "number") return display;
        return display.base || 1;
    });

    useEffect(() => {
        if (typeof display === "number") return;

        const handleResize = () => {
            const width = window.innerWidth;
            let computed = display.base || 1;

            if (width >= 1280 && display.xl) computed = display.xl;
            else if (width >= 1024 && display.lg) computed = display.lg;
            else if (width >= 768 && display.md) computed = display.md;
            else if (width >= 640 && display.sm) computed = display.sm;

            setCurrentDisplay(computed);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [display]);

    const canLoop = N >= currentDisplay && N > 0;

    const [index, set_index] = useState<number>(0);
    const [swipe, set_swipe] = useState<number>(canLoop ? N : 0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
    const isAnimating = useRef<boolean>(false);
    const prevDisplay = useRef<number>(currentDisplay);

    useEffect(() => {
        if (prevDisplay.current !== currentDisplay) {
            set_swipe(canLoop ? index + N : index);
            prevDisplay.current = currentDisplay;
        }
    }, [currentDisplay, canLoop, N, index]);

    const extendedItems = canLoop ? [...childrenArray, ...childrenArray, ...childrenArray] : childrenArray;

    const handleNext = () => {
        if (!canLoop || isAnimating.current) return;
        setIsTransitioning(true);
        isAnimating.current = true;
        set_swipe((prev) => prev + 1);
        set_index((prev) => (prev + 1 !== N ? prev + 1 : 0));
    };

    const handlePrev = () => {
        if (!canLoop || isAnimating.current) return;
        setIsTransitioning(true);
        isAnimating.current = true;
        set_swipe((prev) => prev - 1);
        set_index((prev) => (prev - 1 !== -1 ? prev - 1 : N - 1));
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
        <div className="relative w-full h-full overflow-hidden flex items-start justify-center flex-col gap-4">
            <div
                onTransitionEnd={handleTransitionEnd}
                className={`flex gap-4 w-full h-full ${isTransitioning ? "transition-transform duration-300 ease-in-out" : ""}`}
                style={{
                    transform: `translateX(-${swipe * (100 / currentDisplay)}%)`,
                }}
            >
                {extendedItems.map((child, globalIndex) => (
                    <div key={`carousel-item-${globalIndex}`} className="shrink-0" style={{ width: `calc(${100 / currentDisplay}% - 16px)` }}>
                        {child}
                    </div>
                ))}
            </div>

            <div className="flex-center gap-4 w-full">
                <button aria-label="Previous" type="button" className={`cursor-pointer button2 flex-center rotate-180 p-2 z-10 ${!canLoop ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handlePrev} disabled={!canLoop}>
                    <Next classnames={"w-10"} clr="currentColor" />
                </button>
                {gen_dot(N, index)}

                <button aria-label="Next" type="button" className={`cursor-pointer button2 flex-center p-2 z-10 ${!canLoop ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleNext} disabled={!canLoop}>
                    <Next classnames={"w-10"} clr="currentColor" />
                </button>
            </div>
        </div>
    );
}

function gen_dot(n: number, index: number): React.ReactElement[] {
    const elements: React.ReactElement[] = [];
    for (let i = 0; i < n; i++) {
        elements.push(<div key={i} className={`w-1.5 aspect-square bg-foreground rounded-full transition-all duration-200 ${index === i ? "opacity-100 scale-100" : "opacity-40 scale-75"}`} />);
    }
    return elements;
}
