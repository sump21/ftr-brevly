import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { env } from "../env";
import { toast } from "sonner";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeLinks } from "../api/remove-link";
import { AxiosError } from "axios";

type LinkItemProps = {
  id: string;
  shortLink: string;
  originalLink: string;
  accessCount: number;
};

const onCopyLink = (shortLink: string) => {
  const linkFormat = `${env.VITE_FRONTEND_URL}/${shortLink}`
  toast.info("Link copiado com sucesso!", {
    description: `O link ${shortLink} foi copiado para a área de transferência.`,
  });
  navigator.clipboard.writeText(linkFormat);
};

const handleLinkClick = (shortLink: string) => {
  console.log(`Link clicado: ${shortLink}`);
  window.open(`/${shortLink}`, '_blank');
};

export function LinkItem({
  id,
  shortLink,
  originalLink,
  accessCount,
}: LinkItemProps) {
  const queryClient = useQueryClient()

  const { mutate: removeLinkMutation, isPending: isRemoving } = useMutation({
    mutationFn: removeLinks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success("Link removido com sucesso!", {
        description: `O link ${shortLink} foi removido.`,
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error("Erro ao remover link", {
          description: error.response?.data.error || "Erro desconhecido",
        });
      }
    }
  });

  const onDeleteLink = (id: string, shortLink: string) => {
    const result = confirm(`Você realmente quer apagar o link ${shortLink}?`);
    if (result) {
      removeLinkMutation({ id });
    }
  };

  return (
    <div
      key={id}
      className="flex items-center justify-between border-b border-grayscale-200 py-3"
    >
      <div className="w-1/2 flex items-center gap-2">
        <div className="w-full flex flex-col gap-1">
          <button
            onClick={() => handleLinkClick(shortLink)}
            className="text-md text-blue-base truncate hover:underline hover:cursor-pointer text-left"
          >
            {`${env.VITE_FRONTEND_URL}/${shortLink}`}
          </button>
          <span className="text-grayscale-500 text-sm">{originalLink}</span>
        </div>
      </div>

      <div className="w-1/2 flex flex-row justify-end items-center gap-1">
        <span className="text-grayscale-500 text-sm mr-2">{accessCount} acessos</span>

        <div className="h-8 p-2 bg-grayscale-200 rounded-md hover:outline hover:outline-1 hover:outline-blue-dark hover:cursor-pointer">
          <button
            onClick={() => onCopyLink(shortLink)}
            className="flex text-gray-500 h-full items-center content-center"
          >
            <CopyIcon size={16} className="fill-grayscale-500" />
          </button>
        </div>

        <div className="h-8 p-2 bg-grayscale-200 rounded-md hover:outline hover:outline-1 hover:outline-blue-dark hover:cursor-pointer">
          <button
            onClick={() => onDeleteLink(id, shortLink)}
            className="flex text-gray-500 h-full items-center content-center"
            disabled={isRemoving}
          >
            <TrashIcon size={16} className="fill-grayscale-500" />
          </button>
        </div>
      </div>
    </div>
  );
}