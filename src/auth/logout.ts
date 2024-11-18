import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        res.setHeader(
            "Set-Cookie",
            `auth-token=; HttpOnly; Path=/; Max-Age=0` // Xóa token
        );
        return res.status(200).json({ message: "Logout successful" });
    }

    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
