import { AuthProvider } from "@/app/(site)/context/authContext";
import { CartProvider } from "@/app/(site)/context/cartContext";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import type { UserData } from "@/types/user";

export default function AuthShell({ session, children }: { session: UserData | undefined; children: React.ReactNode }) {
    return (
        <AuthProvider initialSession={session}>
            <CartProvider>
                <Header />
                <div className="min-h-full flex-center flex-col max-w-dvw overflow-x-hidden pt-20">
                    <style>{`
						.bg-background {
							backdrop-filter: url(#liquid-frosted) blur(4px);
							-webkit-backdrop-filter: url(#liquid-frosted) blur(4px);
							background-color: var(--clr-glass);
							}
							`}</style>
                    {children}
                    <Footer />
                </div>
            </CartProvider>
        </AuthProvider>
    );
}
