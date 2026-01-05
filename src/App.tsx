import { useEffect, useState } from "react";
import { useRoute } from "wouter";

// Routing for normal app state, without errors and after SSR hydration
function AppMainRounting() {
	const [isContacts] = useRoute("/contacts");
	const [isAbout] = useRoute("/about");

	if (isContacts) {
		return "Contacts Page";
	}

	if (isAbout) {
		return "About Page";
	}

	return "Danilkinkin Site";
}

export function App() {
	const [hydrationRender, setHydrationRender] = useState(true);

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
