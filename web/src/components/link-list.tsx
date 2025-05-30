import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react";

export function LinkList() {
	return (
		<div className="bg-white w-full sm:min-w-[500px] p-6 sm:p-8 flex flex-col justify-center rounded-lg">
			<div className="flex justify-between items-center mb-4 border-b border-grayscale-200 pb-4">
				<h2 className="text-lg">Meus links</h2>
				<div className="h-8 p-2 bg-grayscale-200 rounded-md hover:outline hover:outline-1 hover:outline-blue-dark hover:cursor-pointer">
					<button
						type="button"
						className="flex text-gray-500 h-full items-center content-center"
					>
						<DownloadSimpleIcon size={16} className="fill-grayscale-500 mr-1" />
						<p className="text-xs font-semibold text-grayscale-500">
							Baixar CSV
						</p>
					</button>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center py-4 px-6">
				<LinkIcon size={28} color="#74798B" />
				<p className="text-xs text-grayscale-500 uppercase mt-3">
					Ainda não existem links cadastrados
				</p>
			</div>
		</div>
	);
}
