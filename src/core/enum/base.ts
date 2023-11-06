/**
 * 所有DTO实体的基类
 */
export interface BaseDTO {
  /** 创建人 */
  creator?: number;
  /** 创建时间 */
  createTime?: Date;
  /** 修改人 */
  updater?: number;
  /** 最后更新时间 */
  updateTime?: Date;
  /** 查询页码 */
  pageNo?: number;
  /** 查询数量 */
  pageSize?: number;
}
