import { LinkEmptyList } from "./link-empty-list";
import { LinkItem } from "./link-item";
import { LinkListHeader } from "./link-list-header";
import { SpinnerIcon } from "@phosphor-icons/react/ssr";

export function LinkList({links, isLoading}: any) {
	return (
		<div className="bg-white w-full sm:min-w-[500px] p-6 sm:p-8 flex flex-col justify-center rounded-lg">
			<LinkListHeader />
			<div className="max-h-96 overflow-y-auto overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:rounded-none [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-thumb]:bg-blue-base pr-3">
			
				{isLoading ? (
					<div className="flex flex-col items-center justify-center mt-3">
						<SpinnerIcon className="animate-spin rounded-full h-6 w-6 border-grayscale-500" />
						<p className="text-xs text-grayscale-500 uppercase mt-3">Carregando Links...</p>
					</div>
				) : (
					<>
						{links && links.length === 0 ? (
							<LinkEmptyList />
						) : (
							links.map((link : any) => (
								<LinkItem
									key={link.id}
									id={link.id}
									shortLink={link.shortLink}
									originalLink={link.originalLink}
									accessCount={link.accessCount}
								/>
							))
						)}
					</>
				)}
			</div>
		</div>
	);
}
