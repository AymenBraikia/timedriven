"use client";

import { useAuth } from "@/app/(site)/context/authContext";
import addToCart from "@/app/server/add_to_cart";
import { useRouter } from "next/navigation";

export default function AtcBtn({ reference, children }: { reference: string; children?: React.ReactNode }) {
    const router = useRouter();
    const { session } = useAuth();

    return (
        <button
            onClick={() => (session ? addToCart(reference) : router.push("/auth/log_in"))}
            aria-label="add to cart"
            type="button"
            className="button w-full h-fit cursor-pointer p-4 active:scale-95 select-none transition-default flex-center"
        >
            {children ? children : "Add to cart"}
        </button>
    );
}
