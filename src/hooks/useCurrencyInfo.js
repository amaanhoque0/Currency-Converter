import {useState, useEffect} from 'react'

function useCurrencyInfo(currency) {
    const [data,setData]=useState({})
    useEffect(()=>{
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
        )
        .then((res)=>res.json())
        .then((res)=>setData(res[currency]))    //the key value of the response return by the api, is the value for {currency} set in the fetch, so we will try to access the {currency index} of the Response Object
        
    },[currency])
  return data
}

export default useCurrencyInfo


/*<-------------------------------------------->
        Ex- we are calling the above api for 'inr'
          {
            "date": "2023-10-23",
            "inr": {
                "00": 0.18396175,
                "1inch": 0.044475505,
                "aave": 0.0001503418,
                "abt": 0.17783876,
                "ach": 0.87635955,
                "acs": 5.68868609,
                "ada": 0.045317627,
                .
                .
                .
            }
          }

          here we see that the api can has 2 key-value pairs in the response object, 'date', 'inr'. So, we will only be using the 'inr', so we are calling res[inr], to access only that value(object containing all price conversion metrics) from the entire object
        <-------------------------------------------->*/