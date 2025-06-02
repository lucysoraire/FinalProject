const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_SECRET_KEY || "my_super_secret_key_1234567890123456"; // 32 chars

const encrypt = (text) => {
  const iv = crypto.randomBytes(16); // Generar IV único cada vez
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`; // ✅ backticks
};

const decrypt = (data) => {
  const [ivHex, encryptedData] = data.split(":");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    Buffer.from(ivHex, "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encrypt, decrypt };
