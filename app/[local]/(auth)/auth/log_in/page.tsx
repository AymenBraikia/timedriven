"use client";

import { use, useState } from "react";
import Link from "next/link";
import Logo from "@/app/components/svg/logo";
import Input from "@/app/components/elements/input";
import { useRouter } from "next/navigation";
import Log_in from "../actions/log_in";

export default function LoginPage({ searchParams }: { searchParams: Promise<{ redirect?: string }> }) {
    const params = use(searchParams);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        try {
            const result = await Log_in(formData);

            if (result.success) return router.push(result.redirect || "/");
            else {
                setIsSubmitting(false);
                return setError(result.error || "Something went wrong. Please try again.");
            }
        } catch {
            setIsSubmitting(false);
            setError("Something went wrong. Please try again.");
        }
    }

    return (
        <div className="relative flex-center flex-col gap-4 rounded-2xl border border-(--bg-primary) p-8 sm:p-10">
            <div className="flex-center">
                <Link aria-label="home page" href={"/"}>
                    <Logo classnames="w-20 sm:w-25" />
                </Link>
            </div>

            <h1 className="text-center font-secondary">Log in your account</h1>
            <p className="text-sm leading-relaxed text-secondary">Save the pieces you&apos;re watching, track offers, and check out faster next time.</p>

            <form onSubmit={handleSubmit} className="flex-center flex-col gap-6 w-full" noValidate>
                <input type="hidden" name="recordId" value={params.redirect} />
                
                <Input placeholder="Jordan@timedriven.com" name="email" type="email" required label="Email" />

                <Input placeholder="At least 8 characters" name="password" type="password" required label="password" />

                <button type="submit" disabled={isSubmitting} className={`button w-full rounded-lg py-3 font-medium transition-default ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}>
                    {isSubmitting ? "Logging you in..." : "Log in"}
                </button>
            </form>

            <p className="text-center text-sm text-secondary">
                Don't have an account?{" "}
                <Link href="/auth/sign_up" className="font-medium text-primary underline underline-offset-2">
                    Sign up
                </Link>
            </p>

            <div className={`fixed right-0 bottom-4 text-sm transition-default bg-secondary p-4 ${error ? "-translate-x-4" : "translate-x-full"}`}>{error}</div>
        </div>
    );
}
