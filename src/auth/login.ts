import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        // Kiểm tra thông tin đăng nhập (giả sử xác thực thành công)
        if (email === "admin@example.com" && password === "password") {
            res.setHeader(
                "Set-Cookie",
                `auth-token=123456; HttpOnly; Path=/; Max-Age=3600`
            );
            return res.status(200).json({ message: "Login successful" });
        }

        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
