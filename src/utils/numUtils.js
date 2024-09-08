export const compactNumberFormat = (number) => {
    const formatter = Intl.NumberFormat('en', {
        notation: 'compact',
    })

    return formatter.format(number || 0)
}
