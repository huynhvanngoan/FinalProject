export const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(dateString));
};

export const formatLink = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Loại bỏ ký tự đặc biệt
        .replace(/\s+/g, "-"); // Thay khoảng trắng bằng dấu gạch nối
};
