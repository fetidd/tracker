export enum Styles {
	PRIMARY,
	SECONDARY,
	ACCENT,
	NEUTRAL,
	INFO,
	SUCCESS,
	WARNING,
	ERROR
}

export type Style = keyof typeof Styles