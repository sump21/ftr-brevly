import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";
import { RedirectPage } from "./pages/redirect";

const queryClient = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route index element={<HomePage />} />
					<Route path="/:shortUrl" element={<RedirectPage />} />
					<Route path="/not-found" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
