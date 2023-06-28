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

// Commonly used tailwind classes
export const css = {
	menuListItem: "flex gap-2 items-center w-fit",
	menuCard: "p-3 w-[200px]",
	scrollingDiv: "overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded",
	outletCard: "p-3 grow overflow-auto",
	outletLayout: "flex gap-2 m-2 h-[89vh]",
	table: "w-full min-w-max table-auto text-left",
	
}