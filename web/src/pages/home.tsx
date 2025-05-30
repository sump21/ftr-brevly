import { LinkForm } from "../components/link-form";
import { LinkList } from "../components/link-list";

export function HomePage() {
	return (
		<div className="flex flex-col h-dvh w-full mx-auto items-center justify-center content-center sm:w-max sm:items-start">
			<div className="mb-4 px-2 sm:px-4">
				<a href="/" title="brev.ly">
					<img src="/images/Logo.png" alt="brev.ly" className="h-7" />
				</a>
			</div>
			<div className="flex flex-col w-full sm:w-fit p-2 sm:p-4 gap-2 sm:gap-4 h-auto  sm:flex-row items-start">
				<LinkForm />

				<LinkList />
			</div>
		</div>
	);
}
