// 心率预警到对应的名称、颜色等信息
export const HeartRateMappings = {
  Bradycardia: {
    name: "心率过慢",
    color: "#0377FB",
  },
  Tachycardia: {
    name: "心率过快",
    color: "#3CD495",
  },
  Arrhythmia: {
    name: "心率变化异常",
    color: "#FABD00",
  },
};

export const SpO2Mappings = {
  Hypoxemic: {
    name: "血氧饱和度过低",
    color: "#0377FB",
  },
  Oxygendesaturation: {
    name: "氧饱和度下降趋势异常",
    color: "#FABD00",
  },
};

export const attributeMappings = {
  HeartRate: {
    name: "心率",
    color: "#F5B763",
  },
  SpO2: {
    name: "血氧",
    color: "#61B8FF",
  },
  BloodPressure: {
    name: "血压",
    color: "#0066B1",
  },
  RespiratoryRate: {
    name: "呼吸频率",
    color: "#41DADF",
  },
  BloodSugar: {
    name: "血糖",
    color: "#FF4141",
  },
};

/**时间范围选择 */
export const DateRange = {
  DAY: "今天",
  WEEK: "本周",
  MONTH: "本月",
  YEAR: "今年",
};
/**预警类型 */
export const AlertTypeRange = {
  HeartRate: "心率预警",
  SpO2: "血氧浓度",
  BloodPressure: "血压预警",
  RespiratoryRate: "呼吸频率",
  BloodSugar: "血糖预警",
  Other: "其他预警",
};
