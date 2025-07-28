import { useState, useEffect } from "react";
import Live2dViewer from '../src/Live2dViewer';
import type { SelectChangeEvent } from "@mui/material";
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

interface ModelOptions {
	expressions: string[];
	motions: string[];
}

function App() {
	const modelPath = "models/sub_enachild_t03/sub_enachild_t03.model3.json";
	const assetUrl = `${import.meta.env.BASE_URL}${modelPath}`;
	const motionsPath = "/models/BuildMotionData.json"
	const motionsAssetUrl = `${import.meta.env.BASE_URL}${motionsPath}`;
	const [motion, setMotion] = useState("");
	const [expression, setExpression] = useState("");
	const [motionsList, setMotionsList] = useState<string[]>([]);
	const [expressionsList, setExpressionsList] = useState<string[]>([]);

	useEffect(() => {
		const fetchOptions = async () => {
			try {
				const response = await fetch(motionsAssetUrl);
				const data: ModelOptions = await response.json();

				setMotionsList(data.motions || []);
				setExpressionsList(data.expressions || []);

				if (data.motions && data.motions.length > 0) {
					const idleMotion = 'idle';
					setMotion(idleMotion);
				}

			} catch (error) {
				console.error("Failed to load model options:", error);
			}
		};

		fetchOptions();
	}, []);

	const handleMotionChange = (event: SelectChangeEvent) => {
		setMotion(event.target.value as string);
	};

	const handleExpressionChange = (event: SelectChangeEvent) => {
		setExpression(event.target.value as string);
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 2 }}>
			<Live2dViewer
				modelMeta={{
					width: 180,
					height: 260,
					l2dPosX: -150,
					l2dPosY: -220,
					l2dscaleX: 1,
					l2dscaleY: 1,
					assetUrl: assetUrl,
				}}
				motion={motion}
				expression={expression}
			/>
			<Box sx={{ display: 'flex', gap: 2, width: '100%', maxWidth: '600px' }}>
				{/* 动作选择器 */}
				<FormControl fullWidth>
					<InputLabel id="motion-select-label">Motion</InputLabel>
					<Select
						labelId="motion-select-label"
						id="motion-select"
						value={motion}
						label="Motion"
						onChange={handleMotionChange}
					>
						<MenuItem value="idle">
							<em>IDLE</em>
						</MenuItem>
						{motionsList.map((motionName) => (
							<MenuItem key={motionName} value={motionName}>
								{motionName}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				{/* 表情选择器 */}
				<FormControl fullWidth>
					<InputLabel id="expression-select-label">Expression</InputLabel>
					<Select
						labelId="expression-select-label"
						id="expression-select"
						value={expression}
						label="Expression"
						onChange={handleExpressionChange}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{expressionsList.map((expressionName) => (
							<MenuItem key={expressionName} value={expressionName}>
								{expressionName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
		</Box>
	);
}

export default App;