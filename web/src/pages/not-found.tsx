import { NotFound } from "../shared/not-found";

export function NotFoundPage() {
	return (
		<div className="flex flex-col h-dvh w-full p-2 sm:max-w-[580px] mx-auto items-center justify-center sm:w-max">
			<div className="w-full flex flex-col items-center justify-center py-12 px-5 sm:py-16 sm:px-12 bg-white rounded-lg">
				<NotFound className="h-16 sm:h-20 mb-4"/>
				<span className="text-gray-600 text-xl font-bold mb-6 text-center">
					Link não encontrado
				</span>
				<span className="w-full text-md text-grayscale-500 text-center">
					O link que você está tentando acessar não existe, foi removido ou é
					uma URL inválida. Saiba mais em{" "}
					<a href={"/"} className="text-blue-dark underline">
						brev.ly
					</a>
					.
				</span>
			</div>
		</div>
	);
}
