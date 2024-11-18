import { Fields } from "./fields";

export const userFields: Fields[] = [
    {
        name: "profilePic",
        label: "Profile Picture",
        type: "file",
        placeholder: "Upload profile picture",
        required: true,
        icon: "mdi:account-circle-outline", // Icon for profile picture
    },
    {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter email address",
        required: true,
        icon: "mdi:email-outline", // Icon for email
    },
    {
        name: "first_name",
        label: "First Name",
        type: "text",
        placeholder: "Enter first name",
        required: true,
        icon: "mdi:account-outline", // Icon for first name
    },
    {
        name: "last_name",
        label: "Last Name",
        type: "text",
        placeholder: "Enter last name",
        required: true,
        icon: "mdi:account-outline", // Icon for last name
    },
    {
        name: "bio",
        label: "Bio",
        type: "text",
        placeholder: "Enter user bio",
        required: false,
        icon: "mdi:book-outline", // Icon for bio
    },
];

export const tourFields: Fields[] = [
    {
        name: "thumbnail",
        label: "Thumbnail",
        type: "text",
        placeholder: "Enter thumbnail URL",
        required: true,
        icon: "mdi:image-outline", // Icon for thumbnail
    },
    {
        name: "title",
        label: "Title",
        type: "text",
        placeholder: "Enter tour title",
        required: true,
        icon: "mdi:format-title", // Icon for title
    },
    {
        name: "location",
        label: "Location",
        type: "text",
        placeholder: "Enter tour location",
        required: true,
        icon: "mdi:map-marker-outline", // Icon for location
    },
    {
        name: "price",
        label: "Price",
        type: "text",
        placeholder: "Enter tour price",
        required: true,
        icon: "mdi:currency-usd", // Icon for price
    },
    {
        name: "startDate",
        label: "Start Date",
        type: "date",
        required: true,
        icon: "mdi:calendar-outline", // Icon for start date
    },
    {
        name: "duration",
        label: "Duration (days)",
        type: "text",
        placeholder: "Enter tour duration in days",
        required: true,
        icon: "mdi:timer-outline", // Icon for duration
    },
    {
        name: "rating",
        label: "Rating",
        type: "select",
        options: [
            { value: "1", label: "1 Star" },
            { value: "2", label: "2 Stars" },
            { value: "3", label: "3 Stars" },
            { value: "4", label: "4 Stars" },
            { value: "5", label: "5 Stars" },
        ],
        required: true,
        icon: "mdi:star-outline", // Icon for rating
    },
    {
        name: "description",
        label: "Description",
        type: "text",
        placeholder: "Enter tour description",
        required: true,
        icon: "mdi:comment-outline", // Icon for description
    },
];
