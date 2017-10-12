import axios from "axios"
import io from "socket.io-client"

const socket = io("https://ws-api.iextrading.com/1.0/stocks/market")

socket.on("message", message => console.log(message))

const iexUrl =
  "https://api.iextrading.com/1.0/stock/market/batch?symbols=SYMBOLS&types=chart&range=1y"

export const getStock = async symbols => {
  const data = (await axios.get(iexUrl.replace("SYMBOLS", symbols))).data
  return data[symbols[0]].chart ? data : null
}

export const socketSubscribe = symbols => {
  socket.on("connect", () => {
    console.log("Subscribed to", symbols.toString())
    socket.emit("subscribe", symbols.toString())
  })
}
export const socketUnsubscribe = symbol => {
  socket.on("connect", () => {
    console.log("Unsubscribed from", symbol)
    socket.emit("unsubscribe", symbol)
  })
}
