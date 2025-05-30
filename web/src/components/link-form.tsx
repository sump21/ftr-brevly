import { WarningIcon } from "@phosphor-icons/react";

export function LinkForm() {
	return (
		<div className="w-full sm:min-w-96 p-6 sm:p-8 flex flex-col justify-center bg-white rounded-lg">
			<h2 className="flex text-xl text-grayscale-600 mb-3">Novo link</h2>
			<form className="flex flex-col">
				<div>
					<span className="flex text-xs uppercase text-grayscale-500 mb-2">
						Link Original
					</span>
					<input
						type="text"
						placeholder="www.exemplo.com.br"
						className={
							"w-full h-12 border border-grayscale-300 rounded-lg p-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-base placeholder:text-grayscale-400"
						}
					/>
					<span className="flex items-start gap-2">
						<WarningIcon size={16} className="fill-danger" />
						<p className="text-sm text-grayscale-500">Error message</p>
					</span>
				</div>

				<div>
					<span className="text-xs uppercase text-grayscale-500">
						Link Encurtado
					</span>
					<div className="flex items-center border border-grayscale-300 rounded-md px-4 mb-2 focus-within:ring-2 focus-within:ring-blue-base">
						<span className="text-grayscale-400">brev.ly/</span>
						<input
							type="text"
							className="w-full h-12 outline-none border-none bg-transparent"
						/>
					</div>
					<span className="flex items-start gap-2">
						<WarningIcon size={16} className="fill-danger" />
						<p className="text-sm text-grayscale-500">Error message</p>
					</span>
				</div>

				<button
					type="submit"
					className="flex flex-col justify-center w-full h-12 p-5 mt-2 bg-blue-base text-white rounded-lg hover:bg-blue-dark transition"
				>
					Salvar link
				</button>
			</form>
		</div>
	);
}
