import { default as Live2dViewer } from './Live2dViewer';
import { ILive2DModelData, ILive2DModelMeta, IL2dModelHandel } from './types';
/**
 * @see https://docs.live2d.com/zh-CHS/cubism-sdk-manual/
 */
export type { ILive2DModelData };
/**
 * 用来方便配表管理不同模型怎么放在组件
 */
export type { ILive2DModelMeta };
/**
 * 用来创建实例
 */
export type { IL2dModelHandel };
/**
 * Live2D 在 React 中的渲染组件。
 */
export default Live2dViewer;
