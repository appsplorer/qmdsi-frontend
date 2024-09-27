import QcaUsdt from "../components/QcaUsdt";
import QcaCrypto from "../components/QcaCrypto";
import QcaRwb from "../components/QcaRwb";

export const conversionTabs = [
  {
    label: "Convert to USDT",
    component: <QcaUsdt />,
  },
  {
    label: "Convert to CRYPTO",
    component: <QcaCrypto />,
  },
  {
    label: "Convert to RWB",
    component: <QcaRwb />,
  },
];
