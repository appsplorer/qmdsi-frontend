const [phpAmount, setPhpAmount] = useState("");
const [loading, setLoading] = useState(false);

const handlePhpAmountChange = (e) => {
  setPhpAmount(e.target.value);
};

const handlePurchase = async () => {
  if (!phpAmount || parseFloat(phpAmount) <= 0) {
    toast.error("Please enter a valid PHP amount");
    return;
  }

  setLoading(true);
  try {
    const response = await depositFiat({ amount: parseFloat(phpAmount) });
    console.log("Deposit response:", response);
    toast.success("Initiated, You will be redirected in few minutes!");
    setPhpAmount("");

    if (response.url) {
      window.location.href = response.url;
    } else {
      toast.warn("Redirect URL not provided in the response");
    }
  } catch (error) {
    toast.error(error?.detail || "Deposit failed");
  } finally {
    setLoading(false);
  }
};
