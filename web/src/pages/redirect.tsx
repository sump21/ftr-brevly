export function RedirectPage() {
	return (
		<div className="flex flex-col h-dvh w-full p-2 sm:max-w-[580px] mx-auto items-center justify-center sm:w-max">
			<div className="w-full flex flex-col items-center justify-center py-12 px-5 sm:py-16 sm:px-12 bg-white rounded-lg">
				<img src="images/Logo_Icon.png" alt="not-found" className="h-12 mb-4" />
				<span className="text-gray-600 text-xl font-bold mb-6 text-center">
					Redirecionando...
				</span>
				<span className="w-full text-md text-grayscale-500 text-center">
					O link será aberto automaticamente em alguns instantes.
					<br />
					Não foi redirecionado?{" "}
					<a href={"/"} className="text-blue-dark underline">
						Acesse aqui
					</a>
				</span>
			</div>
		</div>
	);
}
