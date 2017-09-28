import axios from "axios"

const iexUrl =
  "https://api.iextrading.com/1.0/stock/market/batch?symbols=SYMBOLS&types=chart&range=1y"

export const getStock = async symbols => {
  const data = (await axios.get(iexUrl.replace("SYMBOLS", symbols))).data
  return data[symbols[0]].chart ? data : null
}
