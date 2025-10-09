import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import APOD from './components/APOD'
import MarsPhotos from './components/MarsPhotos'

function App() {
  // const [amount, setAmount] = useState(0)
  // const [from, setFrom] = useState("USD")
  // const [to, setTo] = useState("INR")
  // const [convertedAmount, setConvertedAmount] = useState(0)
  
  // const currencyInfo = useCurrencyInfo(from)
  // const options = Object.keys(currencyInfo)

  // const swap = () => {
  //   setFrom(to);
  //   setTo(from);
  //   setConvertedAmount(amount)
  //   setAmount(convertedAmount)
  // }
  
  // const convert = () => {
  //   setConvertedAmount(amount * currencyInfo[to])
  // }

  // // Add this check
  // if (options.length === 0) {
  //   return <div className='bg-red-600'>Loading currencies...</div>
  // }

  return (
    <>
      {/* //<div className='bg-red-600'>Currency converter</div> */}
      {/* <InputBox
        className='bg-blue-700'
        label="From"
        amount={amount}
        currencyOptions={options}
        onChangeAmount={(amount) => setAmount(amount)}
        onCurrencyChange={(currency) => setFrom(currency)}
        selectCurrency={from}
      />
      <button onClick={swap}>Swap</button>
      <InputBox
        className='bg-blue-700'
        label="To"
        amount={convertedAmount}
        currencyOptions={options}
        selectCurrency={to}
        onCurrencyChange={(currency) => setTo(currency)}
        amountDisable={true}
      />
      <button onClick={convert}>Convert</button> */}
      <APOD />
      {/* <MarsPhotos /> */}
    </>
  )
}

export default App
