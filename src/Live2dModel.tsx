import { forwardRef, useEffect, useState } from "react";
import { PixiComponent } from "@pixi/react";
import {
	BatchRenderer,
	extensions,
	Extract,
	TickerPlugin,
	Ticker,
} from "pixi.js";
import { InternalModel, Live2DModel } from "pixi-live2d-display-mulmotion";
import type { ILive2DModelData } from "./types";

extensions.add(TickerPlugin, Extract, BatchRenderer);

interface Live2dModelProps {
	x?: number;
	y?: number;
	scaleX?: number;
	scaleY?: number;
	modelData: ILive2DModelData;
	onReady?: () => void;
	model: Live2DModel<InternalModel>;
}

const Component = PixiComponent<Omit<Live2dModelProps, 'modelData' | 'onReady'>, Live2DModel<InternalModel>>("Live2dModel", {
	create: (props) => {
		return props.model;
	},
	applyProps: (instance, _oldProps, newProps) => {
		const { x, y, scaleX, scaleY } = newProps;

		instance.x = x ?? 0;
		instance.y = y ?? 0;
		instance.scale.set(scaleX ?? 0.1, scaleY ?? 0.1);
	},
});

const Live2dModel = forwardRef<
	Live2DModel<InternalModel>,
	Omit<Live2dModelProps, 'model'>
>((props, ref) => {
	const [model, setModel] = useState<Live2DModel<InternalModel>>();

	useEffect(() => {
		let _model: Live2DModel<InternalModel>;

		const func = async () => {
			const { modelData, onReady } = props;
			if (!modelData) return;

			_model = await Live2DModel.from(modelData, {
				autoFocus: false,
				autoHitTest: false,
				ticker: Ticker.shared,
			});
			setModel(_model);
			if (onReady) {
				onReady();
			}
		};

		func();

		return () => {
			if (_model) {
				_model.destroy();
			}
			setModel(undefined);
		};
	}, [props.modelData, props.onReady]);

	return model ? <Component {...props} model={model} ref={ref} /> : null;
});
Live2dModel.displayName = "Live2dModel";

export default Live2dModel;