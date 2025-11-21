export default function auth(req, res, next) {
  if (req.headers["x-admin-token"] == "1234") {
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
}
