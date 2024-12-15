import { BookingFormSchemaKey } from "@/schemaValidations/booking.schema";

export const languages = [
    {
        code: "en",
        name: "English",
        country_code: "en",
        flag: "emojione:flag-for-us-outlying-islands",
    },
    {
        code: "vi",
        name: "Tiếng Việt",
        country_code: "vi",
        flag: "emojione:flag-for-vietnam",
    },
];

export const navbarItems = [
    {
        title: "home",
        url: "/",
        icon: "mdi:home",
    },
    {
        title: "about-us",
        url: "/about-us",
        icon: "mdi:information",
    },
    {
        title: "destination",
        url: "/destination",
        icon: "mdi:map-marker",
    },
    {
        title: "our-tour",
        url: "/our-tour",
        icon: "mdi:earth",
    },
    {
        title: "blog",
        url: "/blog",
        icon: "mdi:pencil",
    },
    {
        title: "contact-us",
        url: "/contact-us",
        icon: "mdi:phone",
    },
];

export const CONSTANTS = {
    MAX_BOOKING_MONTHS: 6,
    TOUR_CLASS_PRICES: {
        standard: 500,
        premium: 800,
        luxury: 1200,
    },
    TOUR_TYPES: [
        { value: "cultural", label: "Cultural Tour", multiplier: 1.0 },
        { value: "adventure", label: "Adventure Trip", multiplier: 1.2 },
        { value: "beach", label: "Beach Vacation", multiplier: 1.1 },
        { value: "historical", label: "Historical Tour", multiplier: 1.0 },
        { value: "nature", label: "Nature Expedition", multiplier: 1.3 },
    ],
    CUSTOM_SERVICES: [
        {
            id: "healthCoverage",
            name: "Comprehensive Travel Health Insurance",
            price: 250,
            description: "Full medical coverage and emergency assistance",
        },
        {
            id: "travelInsurance",
            name: "Comprehensive Travel Protection",
            price: 150,
            description:
                "Trip cancellation, interruption, and baggage protection",
        },
        {
            id: "guidedTours",
            name: "Professional Local Guide",
            price: 100,
            description: "Expert local guide for in-depth tour experiences",
        },
        {
            id: "transportPackage",
            name: "Private Transportation Package",
            price: 200,
            description: "Comfortable private transfers throughout the tour",
        },
    ],
    FORM_INPUTS: [
        {
            name: "fullName",
            label: "Full Name",
            placeholder: "Enter full name",
            icon: "mdi:account",
            type: "text",
        },
        {
            name: "email",
            label: "Email",
            placeholder: "Enter email address",
            icon: "mdi:email",
            type: "email",
        },
        {
            name: "phoneNumber",
            label: "Phone Number",
            placeholder: "Enter phone number",
            icon: "mdi:phone",
            type: "tel",
        },
        {
            name: "passportNumber",
            label: "Passport Number",
            placeholder: "Enter passport number",
            icon: "mdi:passport",
            type: "text",
        },
        {
            name: "nationality",
            label: "Nationality",
            placeholder: "Enter nationality",
            type: "text",
            icon: "ph:globe-hemisphere-east-bold", // Icon cho Nationality
        },
        {
            name: "dietaryRestrictions",
            label: "Dietary Restrictions",
            placeholder: "Any dietary requirements?",
            type: "text",
            icon: "mdi:food-off", // Icon cho Dietary Restrictions
        },
        {
            name: "emergencyContactName",
            label: "Emergency Contact Name",
            placeholder: "Enter emergency contact name",
            type: "text",
            icon: "ic:baseline-contact-phone", // Icon cho Emergency Contact
        },
        {
            name: "emergencyContactPhone",
            label: "Emergency Contact Phone",
            placeholder: "Enter emergency contact phone",
            icon: "mdi:phone",
            type: "tel",
        },
    ],
};

export const formSelectConfigs: Array<{
    name: BookingFormSchemaKey;
    label: string;
    placeholder: string;
    options: { value: string; label: string }[];
}> = [
    {
        name: "tourType",
        label: "Tour Type",
        placeholder: "Select Tour Type",
        options: CONSTANTS.TOUR_TYPES.map((type) => ({
            value: type.value,
            label: type.label,
        })),
    },
    {
        name: "travelClass",
        label: "Travel Class",
        placeholder: "Select Travel Class",
        options: Object.keys(CONSTANTS.TOUR_CLASS_PRICES).map((classType) => ({
            value: classType,
            label: `${classType.charAt(0).toUpperCase()}${classType.slice(
                1
            )} Class`,
        })),
    },
];
