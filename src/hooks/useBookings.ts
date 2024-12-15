// src/hooks/use-booking-form.ts
import { useReducer, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONSTANTS } from "@/utils/constants";
import {
    BookingFormSchema,
    BookingFormSchemaType,
} from "@/schemaValidations/booking.schema";
import { bookingReducer } from "@/utils/bookingReducer";

export const useBookingForm = () => {
    const [state, dispatch] = useReducer(bookingReducer, {
        selectedDestination: "",
        selectedServices: new Set<string>(),
        travelers: 1,
        travelClass: "standard",
        tourType: "",
        checkIn: undefined,
        checkOut: undefined,
    });

    const form = useForm<BookingFormSchemaType>({
        resolver: zodResolver(BookingFormSchema),
        defaultValues: {
            travelers: 1,
            travelClass: "standard",
        },
    });

    const handleDestinationChange = useCallback(
        (destination: string) => {
            dispatch({ type: "SET_DESTINATION", payload: destination });
            form.setValue("destination", destination);
        },
        [form]
    );

    const handleServiceChange = useCallback(
        (serviceId: string, checked: boolean) => {
            dispatch({
                type: "TOGGLE_SERVICE",
                payload: { serviceId, checked },
            });
        },
        []
    );

    const selectedServiceDetails = useMemo(
        () =>
            CONSTANTS.CUSTOM_SERVICES.filter((service) =>
                state.selectedServices.has(service.id)
            ),
        [state.selectedServices]
    );

    return {
        form,
        state,
        handleDestinationChange,
        handleServiceChange,
        selectedServiceDetails,
        dispatch,
    };
};
