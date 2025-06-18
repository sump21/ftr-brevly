import { useQuery } from "@tanstack/react-query";
import { LinkForm } from "../components/link-form";
import { LinkList } from "../components/link-list";
import { Logo } from "../shared/logo";
import { getLinks } from "../api/get-links";

export function HomePage() {
  const { 
    data, 
    isLoading, 
  } = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  });

	return (
		<div className="flex flex-col h-dvh w-full items-center justify-center">
			<div className="mb-4">
				<a href="/" title="brev.ly">
					<Logo className="h-7" />
				</a>
			</div>
			
			<div className="w-full max-w-6xl mx-auto px-4">
				<div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
					<div className="w-full sm:w-96 flex-shrink-0">
						<LinkForm />
					</div>

					<div className="w-full sm:flex-1 min-w-0">
						<LinkList links={data?.links} isLoading={isLoading} />
					</div>
				</div>
			</div>
		</div>
	);
}
