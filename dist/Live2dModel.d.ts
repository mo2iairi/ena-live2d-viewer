import { InternalModel, Live2DModel } from 'pixi-live2d-display-mulmotion';
import { ILive2DModelData } from './types';
interface Live2dModelProps {
    x?: number;
    y?: number;
    scaleX?: number;
    scaleY?: number;
    modelData: ILive2DModelData;
    onReady?: () => void;
    model: Live2DModel<InternalModel>;
}
declare const Live2dModel: import('react').ForwardRefExoticComponent<Omit<Live2dModelProps, "model"> & import('react').RefAttributes<Live2DModel<InternalModel>>>;
export default Live2dModel;
