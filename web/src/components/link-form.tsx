import { z } from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { addLinks } from "../api/add-link";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner'

const addLinkInput = z.object({
  originalLink: z.string().url("Informe uma URL válida."),
  shortLink: z.string().regex(
			/^[a-zA-Z0-9_-]+$/,
			"Informe uma url minúscula e sem espaço/caracter especial.",
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
    onMutate: () => {
        toast.loading("Adicionando link...")
    },
    onSuccess: () => {
        toast.success("Link adicionado com sucesso!")
        reset()
        queryClient.invalidateQueries({ queryKey: ['links'] })
    },
    onError: (error) => {
        console.log(error)
        toast.error("Erro ao adicionar link")
    }
})

async function handleSubmitForm(data: AddLinkInput) {
    console.log(data)
    addLinkMutation({
        originalLink: data.originalLink,
        shortLink: data.shortLink,
    })
}

	
	return (
			<form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col">

				<Label text="Link original" />
				<Input
						type="text"
						placeholder="www.exemplo.com.br"
						onChange={(value) => (value)}
						error={errors.originalLink?.message || ''}
						disabled={false}
						{...register("originalLink")}
				/>


				<Label text="Link encurtado" />
<Input
    prefix="brev.ly/"
    onChange={(value) => (value)}
    error={errors.shortLink?.message || ''}
    disabled={false}
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
	);
}