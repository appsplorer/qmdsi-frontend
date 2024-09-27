import React, { useEffect } from "react";

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      new window.TradingView.widget({
        width: "100%",
        height: "500px",
        symbol: "BITSTAMP:BTCUSD",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_widget",
      });
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_widget"></div>
    </div>
  );
};

export default TradingViewWidget;
