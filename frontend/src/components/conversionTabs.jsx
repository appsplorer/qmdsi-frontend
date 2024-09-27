import QcaUsdt from "./QcaUsdt";
import QcaCrypto from "./QcaCrypto";
import QcaRwb from "./QcaRwb";

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
