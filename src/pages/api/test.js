export default function handler(req, res) {
    console.log("Test API route hit");
    res.status(200).json({ message: "Success" });
}