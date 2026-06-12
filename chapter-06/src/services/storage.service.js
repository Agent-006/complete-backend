import ImageKit from "@imagekit/nodejs";

const Client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export default async function uploadFile(file) {
    const result = await Client.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "complete-backend/sporify",
    });

    return result;
}
