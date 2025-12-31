import express from "express"
import crypto from "crypto"

const app = express()
app.use(express.json())

const BOT_TOKEN = process.env.BOT_TOKEN

// 🔐 Telegram initData verification
function verifyTelegram(initData) {
  const secret = crypto
    .createHmac("sha256", "WebAppData")
    .update(BOT_TOKEN)
    .digest()

  const params = new URLSearchParams(initData)
  const hash = params.get("hash")
  params.delete("hash")

  const dataCheck = [...params.entries()]
    .sort()
    .map(([k, v]) => `${k}=${v}`)
    .join("\n")

  const hmac = crypto
    .createHmac("sha256", secret)
    .update(dataCheck)
    .digest("hex")

  return hmac === hash
}

app.post("/submit", (req, res) => {
  const { name, email, telegramUser, initData } = req.body

  if (!verifyTelegram(initData)) {
    return res.status(401).json({ error: "Invalid Telegram data" })
  }

  // ✅ Save to database here
  console.log("USER:", telegramUser.id)
  console.log("NAME:", name)
  console.log("EMAIL:", email)

  res.json({ ok: true })
})

app.listen(3000, () => {
  console.log("Backend running on port 3000")
})
