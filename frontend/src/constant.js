export const BASE_API_URL = "/api/v1"
export const MIN = 1
export const MAX = 5000
export const STATUS_ORDER = ["Processing", "Shipped", "Delivered"]
export const CATEGORIES = [
  "Laptop", "Phone", "Tablet", "Watch", "Headphone"
]
export const RATINGS = [5, 4, 3, 2, 1]

export const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const configFormData = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}