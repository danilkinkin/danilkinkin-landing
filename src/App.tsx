import { About } from "@modules/about/About.tsx";
import { Contacts } from "@modules/contacts/Contacts.tsx";
import { Home } from "@modules/home/Home.tsx";
import { useAppRoutingSync } from "@services/navigation/useAppRoutingSync.tsx";
import { useEffect, useState } from "react";

// Routing for normal app state, without errors and after SSR hydration
function AppMainRounting() {
	useAppRoutingSync();

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
