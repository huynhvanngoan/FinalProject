// src/types/booking.ts
export type BookingState = {
    selectedDestination: string;
    selectedServices: Set<string>;
    travelers: number;
    travelClass: string;
    tourType: string;
    checkIn?: Date;
    checkOut?: Date;
};

export type BookingActionType =
    | { type: "SET_DESTINATION"; payload: string }
    | {
          type: "TOGGLE_SERVICE";
          payload: { serviceId: string; checked: boolean };
      }
    | { type: "SET_TRAVELERS"; payload: number }
    | { type: "SET_TRAVEL_CLASS"; payload: string }
    | { type: "SET_TOUR_TYPE"; payload: string }
    | { type: "SET_CHECK_IN_DATE"; payload: Date }
    | { type: "SET_CHECK_OUT_DATE"; payload: Date };

export type Booking = {
    location: string; // Giá trị được chọn từ danh sách locations
    number_of_travelers: string; // Số lượng khách du lịch (chuỗi nếu nhập dưới dạng text)
    tour_type: string; // Giá trị được chọn từ TOUR_TYPES
    travel_class: string; // Giá trị được chọn từ TOUR_CLASS_PRICES
    checkin_date: string; // Ngày check-in, định dạng ngày dưới dạng chuỗi
    checkout_date: string; // Ngày check-out, định dạng ngày dưới dạng chuỗi
    full_name: string; // Tên đầy đủ của người đặt tour
    email: string; // Địa chỉ email của người đặt tour
    phone_number: string; // Số điện thoại của người đặt tour
    passport_number: string; // Số hộ chiếu của người đặt tour
    nationality: string; // Quốc tịch của người đặt tour
    dietary_restrictions?: string; // Hạn chế về ăn uống (không bắt buộc)
    emergency_name: string; // Tên người liên hệ khẩn cấp
    emergency_phone: string; // Số điện thoại người liên hệ khẩn cấp
};

export type AdminBooking = {
    id: string;
    tourId: string;
    userId: string;
    status: string;
};
