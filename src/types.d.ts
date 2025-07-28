export interface ILive2DModelData {
	Version: number;
	FileReferences: {
		Moc: string;
		Textures: string[];
		Physics?: string;
		Motions?: {
			[group: string]: {
				Name: string;
				File: string;
				FadeInTime?: number;
				FadeOutTime?: number;
			}[];
		};
		Expressions?: {
			Name: string;
			File: string;
		}[];
	};
	Groups?: {
		Target: string;
		Name: string;
		Ids: string[];
	}[];
	url: string;
}

export interface ILive2DModelMeta {
	width: number;
	height: number;
	l2dPosX: number;
	l2dPosY: number;
	l2dscaleX: number;
	l2dscaleY: number;
	assetUrl: string;
}

export interface IL2dModelHandel {
	modelMeta: ILive2DModelMeta;
	motion?: string;
	expression?: string;
}