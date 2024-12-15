/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const CheckoutForm = ({ amount }: { amount: number }) => {
    const pathname = usePathname()
    const [_, locale] = pathname.split("/")
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: convertToSubcurrency(amount),
            }),
        })
            .then((res: any) => res.json())
            .then((data: any) => setClientSecret(data.clientSecret));
    }, [amount]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/${locale}/payment-success?amount=${amount}`,
            },
        });
        if (error) {
            setErrorMessage(error.message);
        } else {
        }
        setLoading(false);
    };

    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2 ">
            {clientSecret && <PaymentElement />}

            {errorMessage && <div>{errorMessage}</div>}
            <Button
                disabled={!stripe || loading}
                type="submit"
                className="w-full py-5 rounded-full bg-primary text-white hover:scale-105 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
            >
                {!loading ? `Pay $${amount}` : "Processing..."}
            </Button>
        </form>
    );
};

export default CheckoutForm;
