// Get initial dark mode
export function getInitialColorMode() {
	if (typeof window === "undefined") return undefined;
	const root = window.document.documentElement;
	const initialColorMode = root.style.getPropertyValue("--initial-color-mode") as "light" | "dark";
	return initialColorMode;
}

const corners = ["topLeft", "topRight", "bottomRight", "bottomLeft"] as const;

/**
 * Draws a (rounded) rectangle using canvas context.
 *
 * @param ctx Context
 * @param x Top left x coordinate
 * @param y Top left y coordinate
 * @param width Width of the rectangle
 * @param height Height of the rectangle
 * @param radius Radius of corners, can also be per corner
 * @param fill Whether to fill the rectangle.
 * @param stroke Whether to stroke the rectangle.
 */
export function canvasDrawRectangle(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	radiusArg: number | { [corner in typeof corners[number]]: number } = 0,
	fill = false,
	stroke = true
) {
	let radius;
	if (typeof radiusArg === "number") {
		radius = {
			topLeft: radiusArg,
			topRight: radiusArg,
			bottomRight: radiusArg,
			bottomLeft: radiusArg,
		};
	} else {
		radius = { ...{ topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 }, ...radiusArg };
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.topLeft, y);
	ctx.lineTo(x + width - radius.topRight, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.topRight);
	ctx.lineTo(x + width, y + height - radius.bottomRight);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.bottomRight, y + height);
	ctx.lineTo(x + radius.bottomLeft, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bottomLeft);
	ctx.lineTo(x, y + radius.topLeft);
	ctx.quadraticCurveTo(x, y, x + radius.topLeft, y);
	ctx.closePath();
	if (fill) {
		ctx.fill();
	}
	if (stroke) {
		ctx.stroke();
	}
}

export const blockingSetInitialColorMode = `(function() {
	${setInferredColorMode.toString()}
	setInferredColorMode();
})()

// IIFE!
`;

function setInferredColorMode() {
	function getInferredtColorMode() {
		const persistedColorPreference = window.localStorage.getItem("theme");
		const hasPersistedPreference = typeof persistedColorPreference === "string";
		/**
		 * If the user has explicitly chosen light or dark,
		 * use it. Otherwise, this value will be null.
		 */
		if (hasPersistedPreference) {
			return persistedColorPreference;
		}

		/**
		 * If they haven't been explicit, check the media query
		 */
		const mql = window.matchMedia("(prefers-color-scheme: dark)");
		const hasMediaQueryPreference = typeof mql.matches === "boolean";

		if (hasMediaQueryPreference) {
			return mql.matches ? "dark" : "light";
		}

		/**
		 * If they are using a browser/OS that doesn't support
		 * color themes, default to 'light'.
		 */
		return "light";
	}

	const colorMode = getInferredtColorMode();
	const root = document.documentElement;
	root.style.setProperty("--initial-color-mode", colorMode);

	if (colorMode === "dark") document.documentElement.setAttribute("data-theme", "dark");
}
