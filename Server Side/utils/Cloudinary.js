import { v2 as cloudinary } from "cloudinary";

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

export async function uploadStream(buffer) {
  try {
    console.log("Start uploading to Cloudinary");
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: "posts",
        transformation: {
          width: 700,
          height: 500,
          crop: "fill", // You can adjust the crop mode as needed
          quality: "auto:best",
        },
      };
      const theTransformStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          console.log("Upload stream callback invoked");
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            // Reject the promise with the error
            return reject(error);
          }
          console.log("Upload successful. Result:", result);
          // Resolve the promise with the secure_url
          resolve(result.secure_url);
        }
      );

      // Handle errors on the stream
      theTransformStream.on("error", (error) => {
        console.error("Error in upload stream:", error);
        // Reject the promise with the error
        reject(error);
      });

      // Log when the stream ends
      theTransformStream.on("finish", () => {
        console.log("Stream finished");
      });

      theTransformStream.end(buffer);

      // ... (existing code)
    });
  } catch (error) {
    console.error("Unexpected error in uploadStream:", error);
    // Handle the error, you might want to log it or return a default value
    return /* default value or handle the error */;
  }
}
