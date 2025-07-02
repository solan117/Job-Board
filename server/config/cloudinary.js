import {v2 as cloudinary} from "cloudinary";

const connectCloudinary = async () => {
    const {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
        console.error("❌ Cloudinary config missing environment variables.");
        console.error("CLOUDINARY_CLOUD_NAME:", CLOUDINARY_CLOUD_NAME);
        console.error("CLOUDINARY_API_KEY:", CLOUDINARY_API_KEY);
        console.error("CLOUDINARY_API_SECRET:", CLOUDINARY_API_SECRET ? "✔️ Present" : "❌ Missing");
        throw new Error("Missing Cloudinary configuration");
    }

    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
    });

    console.log("✅ Cloudinary configured successfully");
};

export default connectCloudinary;
