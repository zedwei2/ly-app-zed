import http from "@/utils/request";
import global from "@/utils/global";
import type { ModelInsQueryDTO } from "@/core/enum/model";

const baseURL = (global.service as any).twins;

const twinsService = {
  /**
   * 查询类别实例通用接口
   * @param data
   * @returns
   */
  getTwinsIns: (data: ModelInsQueryDTO) =>
    http.post(`${baseURL}/ngsi-ld/v1/entities/item/query`, data),

  /**
   * 查询患者统计数据
   * @returns
   */
  queryPatientStatic: () => http.get(`${baseURL}/patient/statistics`),

  /**
   * 查询预警人数趋势
   * @param type 趋势类型DAY, WEEK, MONTH,YEAR
   */
  queryWarningTrend: (type: string) =>
    http.get(`${baseURL}/patient/warning/trend`, { type: type }),

  /**
   * 查询预警数据分析
   * @param type 趋势类型DAY, WEEK, MONTH,YEAR
   * @param alertType 趋势类型HeartRate，SpO2，BloodPressure，RespiratoryRate，BloodSugar，Other
   */
  queryTypeStatic: (type: string, alertType: string) =>
    http.get(`${baseURL}/patient/type/statistics`, {
      type: type,
      alertType: alertType,
    }),

  /**
   * 取消关注关注
   * @param id 患者id
   */
  getUnsubscribe: (id: string) =>
    http.get(`${baseURL}/patient/unsubscribe`, { id: id }),

  /**
   * 取消关注关注
   * @param id 患者id
   */
  getSubscribe: (id: string) =>
    http.get(`${baseURL}/patient/subscribe`, { id: id }),
};

export default twinsService;
