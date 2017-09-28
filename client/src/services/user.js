import axios from "axios"

export const saveStock = symbol => axios.patch("/api/stocks/on", { symbol })

export const removeStock = symbol => axios.patch("/api/stocks/off", { symbol })
