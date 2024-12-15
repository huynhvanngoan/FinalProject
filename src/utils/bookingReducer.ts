// src/utils/booking-reducer.ts
import { BookingState, BookingActionType } from "@/types/booking";

export const bookingReducer = (
    state: BookingState,
    action: BookingActionType
): BookingState => {
    switch (action.type) {
        case "SET_DESTINATION":
            return { ...state, selectedDestination: action.payload };

        case "TOGGLE_SERVICE": {
            const newServices = new Set(state.selectedServices);
            if (action.payload.checked) {
                newServices.add(action.payload.serviceId);
            } else {
                newServices.delete(action.payload.serviceId);
            }
            return { ...state, selectedServices: newServices };
        }

        case "SET_TRAVELERS":
            return { ...state, travelers: action.payload };

        case "SET_TRAVEL_CLASS":
            return { ...state, travelClass: action.payload };

        case "SET_TOUR_TYPE":
            return { ...state, tourType: action.payload };

        case "SET_CHECK_IN_DATE":
            return { ...state, checkIn: action.payload };

        case "SET_CHECK_OUT_DATE":
            return { ...state, checkOut: action.payload };

        default:
            return state;
    }
};
