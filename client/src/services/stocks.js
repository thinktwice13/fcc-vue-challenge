import axios from "axios"

const iexUrl =
  "https://api.iextrading.com/1.0/stock/market/batch?symbols=SYMBOLS&types=chart&range=1y"

export const getStock = async symbol =>
  (await axios.get(iexUrl.replace("SYMBOLS", symbol))).data