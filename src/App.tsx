import { About } from "@modules/about/About.tsx";
import { Contacts } from "@modules/contacts/Contacts.tsx";
import { Home } from "@modules/home/Home.tsx";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";

// Routing for normal app state, without errors and after SSR hydration
function AppMainRounting() {
	const [location, setLocation] = useLocation();
	const [isContacts] = useRoute("/contacts");
	const [isAbout] = useRoute("/about");

	useLayoutEffect(() => {
		const section = location.slice(1) || "home";

		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}

		const target = document.getElementById(section);
		if (target) {
			// Важно: без smooth, чтобы не конфликтовать со snap и iOS
			target.scrollIntoView({
				block: "start",
				inline: "nearest",
				behavior: "auto",
			});
		}
	}, [location]);

	return (
		<>
			<Home />
			<About />
			<Contacts />
		</>
	);
}

export function App() {
	const [hydrationRender, setHydrationRender] = useState(false);

	// Needed this to prevent mismatch between SSR and first CSR renders.
	// First CSR render should be the same as SSR.
	useEffect(() => {
		setHydrationRender(false);
	}, []);

	if (hydrationRender) {
		return "loading...";
	}

	return <AppMainRounting />;
}
