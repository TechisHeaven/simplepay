export function formatMoney(amount: number) {
  // Convert the number to a string
  let amountStr = String(amount);
  // Split the string into parts separated by the decimal point (if any)
  let parts = amountStr.split(".");
  // Get the integer part
  let integerPart = parts[0];
  // Get the fractional part (if any)
  let fractionalPart = parts.length > 1 ? "." + parts[1] : "";
  // Add commas to the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Concatenate the integer and fractional parts (if any)
  return integerPart + fractionalPart;
}
