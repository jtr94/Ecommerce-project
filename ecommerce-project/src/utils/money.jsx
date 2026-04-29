export const formatMoney = (moneyCents) => {
    return `$${(moneyCents / 100).toFixed(2)}`
}