/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    user: any; // Thông tin người dùng (ví dụ: tên, email)
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Hàm xử lý đăng nhập
    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error("Login failed");
            const data = await response.json();

            setUser(data.user);
            setIsAuthenticated(true);
            // Lưu token vào cookies/localStorage nếu cần
        } catch (err) {
            console.error(err);
        }
    };

    // Hàm xử lý logout
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        // Xóa token nếu lưu trong cookies/localStorage
    };

    // Kiểm tra token khi lần đầu load trang
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/auth/me"); // API để lấy thông tin user
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    setIsAuthenticated(true);
                }
            } catch (err) {
                console.error(err);
                logout();
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook để sử dụng AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
