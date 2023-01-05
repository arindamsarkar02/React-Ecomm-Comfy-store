export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number / 100)
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type]) //here we are accessing the object properties dynamically
    if (type === 'colors') {
        unique = unique.flat(1);//flattening as the 'colors' property is an array itself
    }
    return ['all', ...new Set(unique)] //this returns an array of unique elements with 'all' as 1st element
}
