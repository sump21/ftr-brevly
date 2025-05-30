import { LinkEmptyList } from "./link-empty-list";
import { LinkItem } from "./link-item";
import { LinkListHeader } from "./link-list-header";

export function LinkList({links, isLoading}: any) {
	return (
		<div className="bg-white w-full sm:min-w-[500px] p-6 sm:p-8 flex flex-col justify-center rounded-lg">
			<LinkListHeader />
			
			{isLoading ? (
				<div className="flex flex-col items-center justify-center">
					<div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-grayscale-500"></div>
					<p className="text-xs text-grayscale-500 uppercase mt-3">Carregando Links...</p>
				</div>
			) : (
				<>
					{links && links.length === 0 ? (
						<LinkEmptyList />
					) : (
						links.map((link) => (
							<LinkItem
								key={link.id}
								id={link.id}
								shortLink={link.shortLink}
								originalLink={link.originalLink}
								accessCount={link.accessCount}
								onCopy={() => navigator.clipboard.writeText(link.shortLink)}
								onDelete={() => console.log('Deletar', link.id)}
							/>
						))
					)}
				</>
			)}
		</div>
	);
}
