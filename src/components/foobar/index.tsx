import { useRouter } from "next/router";
import { useEffect } from "react";

import { FoobarHintWrapper } from "./styled";

import { IS_DEV } from "@/config";
import { FoobarStoreType, useFoobarStore, FOOBAR_PAGES } from "@/domains/Foobar";
import { logConsoleMessages } from "@/domains/Foobar/console";
import { useCustomPlausible } from "@/domains/Plausible";
import { Space } from "@/styles/layouts";
import { LinkTo } from "@/styles/typography";
import { useHasMounted } from "@/utils/hooks";

function checkIfAllAchievementsAreDone(completed: FoobarStoreType["foobarData"]["completed"]) {
	const allPages = Object.values(FOOBAR_PAGES);
	if (completed.length !== allPages.length) return false;

	return allPages.every((page) => completed.includes(page));
}

function addFoobarToLocalStorage() {
	localStorage.setItem("foobar", "/foobar/localforage");
}

const foobarDataSelector = (state: FoobarStoreType) => ({
	foobarStoreData: state.foobarData,
	setFoobarStoreData: state.setFoobarData,
});

export const Foobar = () => {
	const { asPath: path, pathname } = useRouter();
	const hasMounted = useHasMounted();
	const plausibleEvent = useCustomPlausible();
	const { foobarStoreData, setFoobarStoreData } = useFoobarStore(foobarDataSelector);
	const { completed, visitedPages } = foobarStoreData;

	useEffect(() => {
		// Add functions for Foobar badges
		addFoobarToLocalStorage();
		// @ts-expect-error add custom function
		window.hack = () => {
			// eslint-disable-next-line no-console
			console.warn("/foobar/hack");
		};

		if (!IS_DEV) logConsoleMessages();
	}, []);

	useEffect(() => {
		// @ts-expect-error add custom fn
		window.logStatus = () => {
			// eslint-disable-next-line no-console
			console.log("🐶 here's your data:", `\n\n${JSON.stringify(foobarStoreData, null, 2)}`);
		};
	}, [foobarStoreData]);

	useEffect(() => {
		let pageName = path;
		if (pathname === "/404") pageName = "/404";

		if (!visitedPages?.includes(pageName)) {
			setFoobarStoreData({
				visitedPages: [...visitedPages, pageName],
			});
		}

		// for the `navigator` achievement
		if (visitedPages.length >= 5 && !completed.includes(FOOBAR_PAGES.navigator)) {
			plausibleEvent("foobar", { props: { achievement: FOOBAR_PAGES.navigator } });
			setFoobarStoreData({
				completed: [...completed, FOOBAR_PAGES.navigator],
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [completed, visitedPages, path, pathname]);

	useEffect(() => {
		// for the `completed` achievement
		if (checkIfAllAchievementsAreDone(completed)) {
			plausibleEvent("foobar", { props: { achievement: "completed" } });
			setFoobarStoreData({
				allAchievements: true,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [completed]);

	return hasMounted && foobarStoreData.unlocked ? (
		<FoobarHintWrapper>
			<code>
				<LinkTo href="/foobar" style={{ border: "none" }}>
					resume /foobar
				</LinkTo>
			</code>
			<Space $size={10} />
		</FoobarHintWrapper>
	) : null;
};

export const FOOBAR_SOURCE_COMMENT = `



<!-- 


████████████████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████
████888████888██████████888█888█████████████████████████████████████████████
████888████888██████████888█888█████████████████████████████████████████████
████888████888██████████888█888█████████████████████████████████████████████
████8888888888██.d88b.██888█888██.d88b.█████████████████████████████████████
████888████888█d8P██Y8b█888█888█d88""88b████████████████████████████████████
████888████888█88888888█888█888█888██888████████████████████████████████████
████888████888█Y8b.█████888█888█Y88..88P████████████████████████████████████
████888████888██"Y8888██888█888██"Y88P"█████████████████████████████████████
████████████████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████
████888888b.██████████████████████████████888████d8b██.d888██████████888████
████888██"88b█████████████████████████████888████Y8P█d88P"███████████888████
████888██.88P█████████████████████████████888████████888█████████████888████
████8888888K.███.d88b.███8888b.██888██888█888888█888█888888█888██888█888████
████888██"Y88b█d8P██Y8b█████"88b█888██888█888████888█888████888██888█888████
████888████888█88888888█.d888888█888██888█888████888█888████888██888█888████
████888███d88P█Y8b.█████888██888█Y88b█888█Y88b.██888█888████Y88b█888█888████
████8888888P"███"Y8888██"Y888888██"Y88888██"Y888█888█888█████"Y88888█888████
████████████████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████
████888b████888███████████████████████888██888██████████████████████████████
████8888b███888███████████████████████888██888██████████████████████████████
████88888b██888███████████████████████888██888██████████████████████████████
████888Y88b█888██.d88b.██888d888██.d88888██888██████████████████████████████
████888█Y88b888█d8P██Y8b█888P"███d88"█888██888██████████████████████████████
████888██Y88888█88888888█888█████888██888██Y8P██████████████████████████████
████888███Y8888█Y8b.█████888█████Y88b█888███████████████████████████████████
████888████Y888██"Y8888██888██████"Y88888██888██████████████████████████████
████████████████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████
████(...and robots)█████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████
████                                               █████████████████████████
████  Welcome to my corner of the internet!        █████████████████████████
████                                               █████████████████████████
████  Here's what you might be looking for:        █████████████████████████
████  /foobar/source-code                          █████████████████████████
████                                               █████████████████████████
████                                               █████████████████████████
████  psst. you might wanna check the console ;)   █████████████████████████
████                                               █████████████████████████
████  GLHF!                                        █████████████████████████
████                                               █████████████████████████
████████████████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████


-->
`;
