import { DownloadSimpleIcon } from "@phosphor-icons/react/ssr";

export function LinkListHeader() {
  return (
    <div className="flex justify-between items-center border-b border-grayscale-200 pb-4">
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
  )
}