// const { default: axios } = require("axios")
import axios from "axios"
const url = "https://intl-merchant-api.qmdev.xyz"
// https://intl-merchant-api.qmdev.xyz/v1/customer/register
try{
    const res = await axios.get(`${url}/v1/customer/register`)
console.log(res.data)
}catch(e){
    console.log(e)
}
