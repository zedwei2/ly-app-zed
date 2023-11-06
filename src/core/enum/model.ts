import type { BaseDTO } from "./base";

/** 排序类型 */
export enum SortType {
  /** 升序 */
  ASC = "ASC",
  /** 降序 */
  DESC = "DESC",
}

/** 模型实例查询实体类 */
export enum ModelInsQueryType {
  /** 等于 */
  EQUALS = "EQ",
  /** 模糊匹配 */
  LIKE = "LIKE",
  /** 包含 */
  BETWEEN = "BETWEEN",
  /** 包含 */
  IN = "IN",
  /** 不包含 */
  NIN = "NIN",
}

/** 排序条件实体类 */
export interface SortDTO {
  /** 排序栏位属性编码 */
  propertyCode: string;
  /** 升序降序配置 */
  type: SortType;
}

/** 模型实例查询实体类 */
export interface ModelInsQueryDTO extends BaseDTO {
  /** form对象code */
  modelCode: string;
  /** 过滤条件数组 */
  propertyFilters?: ModelInsFilterDTO[];
  /** 排序信息 */
  sort?: SortDTO[];
}

/** 模型实例查询条件过滤实体类 */
export interface ModelInsFilterDTO {
  /** 过滤属性编码 */
  propertyCode?: string;
  /** 过滤类型 等于 EQ 模糊 LIKE */
  propertyType?: ModelInsQueryType;
  /** 过滤属性值 */
  propertyValue?: string;
  /** 排序条件 */
}
