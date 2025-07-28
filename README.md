# Ena Live2D Viewer

一个用于在 React 应用中展示 Live2D 模型的组件。

## 特性

本组件基于 React、Pixi.js 和 pixi-live2d-display-mulmotion 构建。

- 只需一个组件即可将 Live2D 模型添加到你的 React 项目中。
- 支持自定义视图尺寸、模型位置、缩放大小。
- 从指定的 URL 异步加载 *.model3.json 文件。

## 安装

你可以直接通过 Git URL 将此仓库作为 npm 依赖项进行安装。在你的 package.json 文件中，添加以下内容：

``` json
"dependencies": {
	"react": "^18.2.0",
	"react-dom": "^18.2.0",
	"ena-live2d-viewer": "git+https://github.com/mo2iairi/ena-live2d-viewer.git"
},
```

然后运行安装命令：

``` bash
pnpm install
```

## 用法

``` tsx
import React from "react";
import Live2dViewer from 'ena-live2d-viewer';

function App() {
	return (
		<Live2dViewer 
			modelMeta={{
			width: 500,
			height: 500,
			l2dPosX: 0,
			l2dPosY: 50,
			l2dscaleX: 1.2,
			l2dscaleY: 1.2,
			assetUrl: "models/sub_enachild_t03/sub_enachild_t03.model3.json", 
			}}
			motion={motion}
				expression={expression}
		/>
		</div>
	);
}

export default App;
```

## 模型资源路径

资源结构示例：
```
└── models/
	└── char1/
		├── char1.model3.json
		├── char1.moc3
		├── char1.physics3.json
		├── expressions/
		├── motions/
		└── textures/
```

## 许可证

Apache License 2.0@mo2iairi
