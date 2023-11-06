import { ref } from "vue";
import type { Ref } from "vue";
import type { RouteLocationNormalizedLoaded, Router } from "vue-router";
import env from "@/config/env";
import defaultPng from "@/static/patient-list/touxiang.png";

/**
 * 全局配置信息
 *
 * 开发环境下，获取的env中的配置
 *
 */

/** 服务地址 */
export const SERVER_URL = env.appUrl;
/** 接口地址 */
export const API_URL = env.apiBaseUrl;
/** 图片地址 */
export const IMG_URL = SERVER_URL + "/upload";
/** 文件下载地址 */
export const DOWNLOAD_URL = SERVER_URL + "/download";

/** 全局变量实体bean */
export interface GlobalDTO {
  /** 存放当前系统登录后的相关信息 */
  current?: {
    /** 当前登录用户 */
    user?: any;
    /** 当前使用语言，默认中文 */
    language?: string;
    /** token秘钥信息 */
    token?: string;
    /** 当前用户角色列表信息 */
    roles?: [];
  };
  /** 后端api服务地址 */
  service?: {
    /**
     * 平台服务(系统默认服务，当调用api时没有指定服务就使用此服务)
     * --
     * 存放组织机构、用户、角色等模块
     */
    platform?: string;
    /**
     * 基础服务
     * --
     * 字典
     */
    base?: string;
    /** 日志服务 */
    log?: string;
    /** 消息服务
     * --
     *  存放通知、邮件、消息等信息
     */
    message?: string;
    /** 孪生体服务 */
    twins?: string;
    /** 工作流服务 */
    workflow?: string;
    /** 数据源服务 */
    etlEngine?: string;
    /** 算法服务 */
    algorithm?: string;
    /** 时序服务 */
    analysis?: string;
    /**孪生数据服务 */
    openApi?: string;
    /** 模型训练服务 */
    trainEngine?: string;
    /** 文件预览服务 */
    previewFile?: string;
    /**圜晖三维服务 */
    draftingee?: string;
  };
  /** 存放一些url地址信息，例：文件地址、其他第三方系统地址等 */
  urls?: {
    /** 文件服务路径 */
    fileUrl?: string;
    /** openapi系统路径 */
    openapi?: string;
    /** mlflow系统路径 */
    mlflow?: string;
    /** 文件下载路径 */
    downloadUrl?: string;
  };
  /** 默认配置 */
  default?: {
    /** 默认语言环境 */
    language?: string;
    /** 默认首页路由路径 */
    homePath?: string;
    /** 默认头像地址 */
    portraitUrl?: string;
    /** 提示弹框等待时间，单位秒 */
    modalDuration?: number;
  };
  /** 控件配置 */
  component?: {
    /** 分页控件 */
    pagination?: {
      /** 分页最大页码数 */
      pageSizeMaxNumber?: number;
      /** 默认页码 */
      defaultPageSize?: number;
      /** 默认页码列表配置 */
      pageSizeOptions?: string[];
      /** 只有一页时是否隐藏分页器 */
      hideOnSinglePage?: boolean;
    };
    /** 表格控件 */
    table?: {
      /** 表格最大宽度设置，内容超过宽度显示省略号 */
      maxWidth?: string;
    };
  };
  /** 系统级别 */
  system?: {
    /** 系统标题 */
    title: string;
    /** 系统接口请求超时时间，单位毫秒 */
    timeout?: number;
  };
  /** VueRouter对象 */
  router?: Router;
  /** vue跳转的路由对象*/
  route?: RouteLocationNormalizedLoaded;
  /** 页面跳转路由传参 */
  routeParam?: Ref<{
    [paramName: string]: any;
  }>;
  /** 不依赖后端服务，前端单独调试模式，不会鉴权 */
  debugMode?: boolean;
  /** 存放所有通用注入器编码 */
  provideKeys?: {
    /** 页面导航标签对象编码 */
    dtmPage: Symbol;
    /** 页面导航标签key */
    dtmPageKey: string;
    /** 导航tab刷新函数key */
    dtmPageRefresh: Symbol;
    /** 模型定义对象信息key */
    modelDefKey: Symbol;
  };
}

/** 存放全局变量 */
export const global: GlobalDTO = {
  current: {
    roles: [],
  },
  service: {
    // 默认服务地址
    platform: API_URL + "/platform-service",
    base: API_URL + "/basicdata-service",
    log: API_URL + "/logs-service",
    message: API_URL + "/message-service",
    twins: API_URL + "/twins-service",
    workflow: API_URL + "/workflow-service",
    etlEngine: API_URL + "/etl-engine",
    algorithm: API_URL + "/algorithm-engine",
    analysis: API_URL + "/analysis-engine",
    trainEngine: API_URL + "/train-engine",
    previewFile: API_URL + "/fileview/onlinePreview",
  },
  urls: {
    fileUrl: IMG_URL,
    downloadUrl: DOWNLOAD_URL,
  },
  default: {
    language: "cn_zh",
    // homePath: "/login",
    modalDuration: 3,
    portraitUrl: defaultPng,
  },
  component: {
    pagination: {
      defaultPageSize: 10,
      pageSizeMaxNumber: 2147483647,
      pageSizeOptions: ["10", "20", "50", "100"],
      hideOnSinglePage: false,
    },
    table: {
      maxWidth: "300px",
    },
  },
  system: {
    title: "",
    // 设置超时时间为5分钟
    timeout: 1000 * 60 * 5,
  },
  routeParam: ref({}),
  provideKeys: {
    dtmPage: Symbol("dtmPage"),
    dtmPageKey: "dtm_page_key",
    dtmPageRefresh: Symbol("dtmPageRefresh"),
    modelDefKey: Symbol("modelDefKey"),
  },
};
export default global;
