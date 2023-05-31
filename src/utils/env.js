const liveHost = "https://us-central1-fooddelivery-b9acf.cloudfunctions.net";
const localHost = "http://127.0.0.1:5001/fooddelivery-b9acf/us-central1";
export const isDevelopment = process.env.NODE_ENV === "development";
export const host = isDevelopment ? localHost : liveHost;
