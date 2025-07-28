import React, { useEffect, useRef, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { Stage } from "@pixi/react";
import Live2dModel from "./Live2dModel";
import type { IL2dModelHandel, ILive2DModelData } from "./types";
import { Live2DModel as PixiLive2DModel, InternalModel } from "pixi-live2d-display-mulmotion";

const Live2DViewer: React.FC<IL2dModelHandel> = ({ modelMeta, motion, expression }) => {
	const wrapRef = useRef<HTMLDivElement>(null);
	const live2dModel = useRef<PixiLive2DModel<InternalModel>>(null);

	const [modelData, setModelData] = useState<ILive2DModelData | undefined>();
	const [stageWidth, setStageWidth] = useState(0);
	const [stageHeight, setStageHeight] = useState(0);

	useEffect(() => {
		const fetchModel = async () => {
			try {
				const response = await fetch(modelMeta.assetUrl);
				if (!response.ok) {
					throw new Error(`Failed to fetch model: ${response.statusText}`);
				}
				const data = await response.json();
				data.url = modelMeta.assetUrl;
				setModelData(data);
			} catch (error) {
				console.error("Error loading Live2D model:", error);
			}
		};
		fetchModel();
	}, [modelMeta.assetUrl]);

	useEffect(() => {
		const handleResize = () => {
			if (wrapRef.current) {
				setStageWidth(wrapRef.current.clientWidth);
				setStageHeight(wrapRef.current.clientHeight);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleModelReady = useCallback(() => {
		console.log("Model is ready!");
	}, []);

	useEffect(() => {
		console.log(motion);

		if (live2dModel.current && motion) {
			live2dModel.current.motion(motion);
		}
	}, [motion]);

	useEffect(() => {
		console.log(expression);

		if (live2dModel.current && expression) {
			live2dModel.current.expression(expression);
		}
	}, [expression]);

	const live2dX = stageWidth / 2 + modelMeta.l2dPosX;
	const live2dY = stageHeight / 2 + modelMeta.l2dPosY;
	const baseScale = 0.1;
	const live2dScaleX = baseScale * modelMeta.l2dscaleX;
	const live2dScaleY = baseScale * modelMeta.l2dscaleY;

	return (
		<Box
			ref={wrapRef}
			sx={{
				width: modelMeta.width || "100%",
				height: modelMeta.height || "100%",
				backgroundColor: "#f0f0f0",
				borderRadius: 1,
				overflow: "hidden",
				position: "relative",
			}}
		>
			{modelData && stageWidth > 0 && stageHeight > 0 && (
				<Stage
					width={stageWidth}
					height={stageHeight}
					options={{ backgroundAlpha: 0, antialias: true, autoDensity: true }}
				>
					<Live2dModel
						ref={live2dModel}
						modelData={modelData}
						x={live2dX}
						y={live2dY}
						scaleX={live2dScaleX}
						scaleY={live2dScaleY}
						onReady={handleModelReady}
					/>
				</Stage>
			)}
		</Box>
	);
};

export default Live2DViewer;