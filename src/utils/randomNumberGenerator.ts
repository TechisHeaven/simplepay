import crypto from "node:crypto";

export function randomNumberGenerator() {
  let randomNumber;
  do {
    const bytes = crypto.randomBytes(7); // 8 bytes = 64 bits, enough for a 16-digit number
    const hexString = bytes.toString("hex");
    randomNumber = parseInt(hexString, 16);
  } while (randomNumber < Math.pow(10, 15) || randomNumber >= Math.pow(10, 16)); // Ensure the number is at least 15 digits long

  const verificationCode = randomNumber.toString().padStart(16, "0");
  return verificationCode;
}
