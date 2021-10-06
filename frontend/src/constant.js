export const BASE_API_URL = "/api/v1"
export const MIN = 1
export const MAX = 5000
export const STATUS_ORDER = ["Processing", "Shipped", "Delivered"]
export const CATEGORIES = [
  "Laptop", "Phone", "Tablet", "Watch", "Headphone"
]

export const BANNERS = [
  {
    src: "./images/banner_01.jpg",
    altText: "Slide 1",
  },
  {
    src: "./images/banner_02.jpg",
    altText: "Slide 2",
  },
  {
    src: "./images/banner_03.jpg",
    altText: "Slide 3",
  },
  {
    src: "./images/banner_04.jpg",
    altText: "Slide 4",
  },
  {
    src: "./images/banner_05.jpg",
    altText: "Slide 5",
  },
  {
    src: "./images/banner_06.jpg",
    altText: "Slide 6",
  },
];

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