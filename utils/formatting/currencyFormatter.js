export const formatCurrency = (amtValue, currency) => {
    const amountInCents = parseFloat(amtValue)
    const amountInDollars = (amountInCents / 100).toFixed(2)
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(amountInDollars)
    return formatted;
}