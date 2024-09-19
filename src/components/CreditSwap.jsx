import { ArrowUpDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { customStyles } from "../styles";

// Fetch conversion rates function
const fetchConversionRates = async () => {
  try {
    const usdToGoldResponse = await axios.get(
      "API_URL_FOR_USD_TO_GOLD_CONVERSION"
    );
    return {
      usdToGoldRate: usdToGoldResponse.data.rate,
    };
  } catch (error) {
    console.error("Error fetching conversion rates:", error);
    return { usdToGoldRate: 1 };
  }
};

const CreditSwap = () => {
  const [conversionRates, setConversionRates] = useState({ usdToGoldRate: 1 });
  const [amount, setAmount] = useState(0.0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USDT");

  useEffect(() => {
    const getRates = async () => {
      const rates = await fetchConversionRates();
      setConversionRates(rates);
    };
    getRates();
  }, []);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (selectedOption, isFromCurrency) => {
    if (isFromCurrency) {
      setFromCurrency(selectedOption.value);
    } else {
      setToCurrency(selectedOption.value);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const CustomOption = (props) => {
    const { innerRef, innerProps, data } = props;
    return (
      <div ref={innerRef} {...innerProps} className="custom-option">
        <img
          src={data.image}
          alt=""
          style={{ width: "20px", marginRight: "10px" }}
        />
        {data.label}
      </div>
    );
  };

  const CustomSingleValue = (props) => {
    const { data } = props;
    return (
      <div className="custom-single-value">
        <img
          src={data.image}
          alt=""
          style={{ width: "20px", marginRight: "10px" }}
        />
        {data.label}
      </div>
    );
  };

  const currencyOptions = [
    { value: "USD", label: "USD", image: "https://via.placeholder.com/20" },
    { value: "EUR", label: "EUR", image: "https://via.placeholder.com/20" },
  ];

  const assetOptions = [
    {
      value: "USDT",
      label: "USDT",
      image:
        "https://w7.pngwing.com/pngs/113/18/png-transparent-tether-hd-logo-thumbnail.png",
    },
    { value: "QMGT", label: "QMGT", image: "https://via.placeholder.com/20" },
    {
      value: "ETHEREUM",
      label: "ETHEREUM",
      image: "https://via.placeholder.com/20",
    },
  ];

  const usdToGold = conversionRates.usdToGoldRate;
  const conversionAmount = amount * usdToGold;

  return (
    <div className="mt-4">
      <div className="w-full bg-accent rounded-md px-4 py-4 text-white flex items-center">
        <div className="w-1/2">
          <div className="flex gap-4 items-end">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-[80px] bg-transparent border-0 outline-none text-3xl"
            />
            <button className="text-secondary text-sm">MAX</button>
          </div>
          <div className="mt-2 text-secondary text-xs">Balance: $99.29</div>
        </div>
        <div className="w-1/2">
          <Select
            options={currencyOptions}
            components={{
              Option: CustomOption,
              SingleValue: CustomSingleValue,
            }}
            styles={customStyles}
            placeholder="Select Currency"
            onChange={(option) => handleCurrencyChange(option, true)}
            value={currencyOptions.find((opt) => opt.value === fromCurrency)}
          />
        </div>
      </div>
      <button
        className="p-1 -mt-2 m-auto border-primary border-2 rounded-full text-primary flex justify-between items-center absolute left-[50%] translate-x-[-50%]"
        onClick={handleSwap}
      >
        <ArrowUpDown />
      </button>
      <div className="w-full bg-accent rounded-md px-4 py-4 text-white flex items-center mt-4">
        <div className="w-1/2">
          <div className="flex gap-4 items-end">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-[80px] bg-transparent border-0 outline-none text-3xl"
            />
            <button className="text-secondary text-sm">MAX</button>
          </div>
          <div className="mt-2 text-secondary text-xs">Balance: $99.29</div>
        </div>
        <div className="w-1/2">
          <Select
            options={assetOptions}
            components={{
              Option: CustomOption,
              SingleValue: CustomSingleValue,
            }}
            styles={customStyles}
            placeholder="Select an option"
            onChange={(option) => handleCurrencyChange(option, false)}
            value={assetOptions.find((opt) => opt.value === toCurrency)}
          />
        </div>
      </div>
      <div className="mt-4 bg-accent opacity-30 text-white p-2 px-4 text-xm font-montserrat text-xs">
        <p className="flex justify-between">
          <span>Gold Price</span>
          <span className="text-white">{usdToGold}g per 1 USD</span>
        </p>
        <p className="flex justify-between mt-2">
          <span>Minimum Received</span>
          <span className="text-white">100 QMGT</span>
        </p>
        <p className="flex justify-between mt-2">
          <span>Price Impact</span>
          <span className="text-white">0.001</span>
        </p>
        <p className="flex justify-between mt-2">
          <span>Liquidity Provider Fee</span>
          <span className="text-white">0.000063 USDT</span>
        </p>
        <p className="flex justify-between mt-2">
          <span>Conversion Amount</span>
          <span className="text-white">{conversionAmount.toFixed(4)} g</span>
        </p>
      </div>
      <div>
        <button className="w-full h-[50px] bg-primary rounded mt-4 hover:bg-secondary">
          Purchase with Credit Card
        </button>
      </div>
    </div>
  );
};

export default CreditSwap;
