import { useQuery } from "@tanstack/react-query";
import { LinkForm } from "../components/link-form";
import { LinkList } from "../components/link-list";
import { Logo } from "../shared/logo";
import { api, queryKeys } from "../api";

export function HomePage() {
  const { 
    data, 
    isLoading, 
  } = useQuery({
    queryKey: queryKeys.links,
    queryFn: api.getLinks,
  });

	return (
		<div className="flex flex-col h-dvh w-full mx-auto items-center justify-center content-center sm:w-max sm:items-start">
			<div className="mb-4 sm:ml-4">
				<a href="/" title="brev.ly">
					<Logo className="h-7" />
				</a>
			</div>
			<div className="flex flex-col w-full sm:w-fit p-2 sm:p-4 gap-2 sm:gap-4 h-auto  sm:flex-row items-start">
				<LinkForm />

				<LinkList links={data?.links} isLoading={isLoading} />
			</div>
		</div>
	);
}
