import jwt from "jsonwebtoken"

export const validateToken = (token, req, res) => {
  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing" })
  } else {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      if (Date.now() >= payload.exp * 1000) {
        return res.status(401).send({ error: "Token expired" })
      }
      req.user = payload.id

      return true
    } catch (error) {
      return res.status(401).json({ error: error })
    }
  }
}
