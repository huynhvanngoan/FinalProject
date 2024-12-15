// utils/calculatePrice.ts
import { differenceInDays } from "date-fns";
import { CONSTANTS } from "@/utils/constants";
import { BookingFormSchemaType } from "@/schemaValidations/booking.schema";

export const calculateTotalPrice = (
    formValues: BookingFormSchemaType,
    selectedServices: Set<string>
) => {
    let baseTourCost = 75;

    if (formValues.tourType && formValues.checkIn && formValues.checkOut) {
        const tourType = CONSTANTS.TOUR_TYPES.find(
            (t) => t.value === formValues.tourType
        );
        const basePricePerPerson =
            CONSTANTS.TOUR_CLASS_PRICES[formValues.travelClass] || 0;
        const tourDuration = Math.max(
            1,
            differenceInDays(formValues.checkOut, formValues.checkIn) + 1
        );

        baseTourCost = Math.max(
            0,
            basePricePerPerson *
                formValues.travelers *
                tourDuration *
                (tourType?.multiplier || 1.0)
        );
    }

    const servicesCost = CONSTANTS.CUSTOM_SERVICES.filter((service) =>
        selectedServices.has(service.id)
    ).reduce((total, service) => total + service.price, 0);

    return {
        baseTourCost: Math.round(baseTourCost),
        servicesCost: servicesCost,
        totalCost: Math.round(baseTourCost + servicesCost),
    };
};
