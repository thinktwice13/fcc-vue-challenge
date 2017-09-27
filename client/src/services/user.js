import axios from "axios"

export const saveStock = async symbol => {
  const res = await axios.patch("/api/stocks/on", { symbol })
}
