const localeByCurrency: Record<string, string> = {
  EUR: "de-DE",
  USD: "en-US",
  GBP: "en-GB",
};

export function formatPrice(amount: number, currencyCode = "USD"): string {
  const locale = localeByCurrency[currencyCode] ?? "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}
