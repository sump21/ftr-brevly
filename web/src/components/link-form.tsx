import { z } from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { addLinks } from "../api/add-link";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as ReactHookForm from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner'
import { AxiosError } from "axios";

// @ts-ignore
const { useForm } = ReactHookForm;

const addLinkInput = z.object({
  originalLink: z.string().url("Informe uma url válida."),
  shortLink: z.string().regex(
		/^[a-zA-Z0-9]+$/, 
		"Informe uma url minúscula e sem espaços/caracteres especiais."
	),
});

type AddLinkInput = z.infer<typeof addLinkInput>;

export function LinkForm() {

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<AddLinkInput>({
		resolver: zodResolver(addLinkInput),
		defaultValues: {
			originalLink: "",
			shortLink: "",
		}
	});

	const queryClient = useQueryClient()

	const { mutate: addLinkMutation } = useMutation({
		mutationFn: addLinks,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['links'] })
			reset()
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error("Erro no cadastro", {
					description: error.response?.data.error,
				})
			}
		}
	})

async function handleSubmitForm(data: AddLinkInput) {
	addLinkMutation({
		originalLink: data.originalLink,
		shortLink: data.shortLink,
	})
}
	
	return (
		<div className="w-full sm:min-w-80 p-6 sm:p-8 flex flex-col justify-center bg-white rounded-lg">
			<h2 className="flex text-xl text-grayscale-600 mb-3">Novo link</h2>
			<form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col">
				<Label text="Link original" />
				<Input
					type="text"
					placeholder="http://exemplo.com.br"
					error={errors.originalLink?.message || ''}
					disabled={isSubmitting}
					{...register("originalLink")}
				/>


				<Label text="Link encurtado" />
				<Input
					prefix="brev.ly/"
					error={errors.shortLink?.message || ''}
					disabled={isSubmitting}
					{...register("shortLink")}
				/>

				<button
					type="submit"
					className="flex flex-col justify-center w-full h-12 p-5 mt-2 bg-blue-base text-white rounded-lg hover:bg-blue-dark transition"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Salvando..." : "Salvar link"}
				</button>
			</form>
		</div>
	);
}