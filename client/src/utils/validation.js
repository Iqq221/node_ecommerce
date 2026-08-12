export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateAccount({ name, email, password }, { requirePassword = true } = {}) {
    if (name !== undefined && name.trim().length < 2) return "Please enter a name with at least 2 characters."
    if (!email.trim()) return "Email address is required."
    if (!emailPattern.test(email.trim())) return "Enter a valid email address."
    if (requirePassword) {
        if (!password) return "Password is required."
        if (password.length < 8) return "Password must be at least 8 characters long."
    }
    return ""
}

export function validateProduct({ name, price, category, description, stock, image }, { imageRequired = false } = {}) {
    if (name.trim().length < 3) return "Product name must be at least 3 characters long."
    if (!Number.isFinite(Number(price)) || Number(price) <= 0) return "Price must be a number greater than 0."
    if (category.trim().length < 2) return "Please enter a valid product category."
    if (description.trim().length < 10) return "Description must be at least 10 characters long."
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) return "Stock must be a whole number of 0 or more."
    if (image) {
        if (!image.type.startsWith("image/")) return "Please select a valid image file."
        if (image.size > 5 * 1024 * 1024) return "Image must be smaller than 5 MB."
    } else if (imageRequired) return "Please select a product image."
    return ""
}
