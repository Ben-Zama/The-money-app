export function formatCurrency(amount) {
  let symbol = "";
  if (amount > 0) symbol = "+";
  else if (amount < 0) symbol = "-";

  const currency = "$";

  const removeMinus = Math.abs(amount);

  const formattedAmount = removeMinus.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return ` ${symbol} ${currency} ${formattedAmount} `;
}
