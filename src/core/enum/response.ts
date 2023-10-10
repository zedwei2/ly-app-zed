/**
 * 数据接口响应实体
 */
export interface ResponseDTO {
  /**
   * 响应状态码
   * 为200 时表示成功
   */
  errno?: number;

  /**
   * 错误描述信息
   * 当接口通讯或业务出现异常时返回对应的错误描述信息(已在后端处理过国际化的)
   */
  errmsg?: string;

  /**
   * 接口响应时的时间戳
   */
  timestamp?: number;

  /**
   * 业务数据
   */
  data?: any;
}

export enum ResponseCode {
  SUCCESS = 200,
}
