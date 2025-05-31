import { DownloadSimpleIcon, SpinnerIcon } from "@phosphor-icons/react/ssr";
import { useMutation } from '@tanstack/react-query';
import { generateCsvLinks } from "../api/generate-csv-links";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function LinkListHeader() {
  const { mutate: generateCsvMutation, isPending: isGenerating } = useMutation({
    mutationFn: generateCsvLinks,
    onSuccess: (response) => {
      window.open(response.url, '_blank');
      toast.success("CSV gerado com sucesso!", {
        description: "O arquivo será baixado automaticamente.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error("Erro ao gerar CSV", {
          description: error.response?.data.error || "Erro desconhecido",
        });
      } else {
        toast.error("Erro ao gerar CSV", {
          description: "Erro interno do sistema",
        });
      }
    }
  });

  const handleDownloadCsv = () => {
    generateCsvMutation();
  };

  return (
    <div className="flex justify-between items-center border-b border-grayscale-200 pb-4">
      <h2 className="text-lg">Meus links</h2>
      <div className="h-8 p-2 bg-grayscale-200 rounded-md hover:outline hover:outline-1 hover:outline-blue-dark hover:cursor-pointer">
        <button
          type="button"
          onClick={handleDownloadCsv}
          disabled={isGenerating}
          className="flex text-gray-500 h-full items-center content-center disabled:opacity-50 disabled:cursor-not-allowed gap-1"
        >
          {isGenerating ? (
            <span className="animate-spin">
              <SpinnerIcon size={16} className="fill-grayscale-500" />
            </span>
          ) : (
            <DownloadSimpleIcon size={16} className="fill-grayscale-500" />
          )}
          <p className="text-xs font-semibold text-grayscale-500">
            Baixar CSV
          </p>
        </button>
      </div>
    </div>
  )
}
