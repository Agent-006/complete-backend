import jwt from "jsonwebtoken";

// authenticate an artist
export async function authArtistMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            throw new Error("Invalid Token!");
        }

        if (decoded.role !== "artist") {
            return res.status(403).json({
                success: false,
                message: "You don't have access to create a music",
            });
        }

        // attaching the decoded token to the request object
        req.user = decoded;

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            messsage: error.messsage,
        });
    }
}

// authenticate an artist
export async function authUserMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            throw new Error("Invalid Token!");
        }

        if (decoded.role !== "user" && decoded.role !== "artist") {
            return res.status(403).json({
                success: false,
                message: "You don't have access to perform this action",
            });
        }

        req.user = decoded;

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            messsage: error.messsage,
        });
    }
}
