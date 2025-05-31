import { LinkIcon } from "@phosphor-icons/react/ssr";

export function LinkEmptyList() {
  return (
    <div className="flex flex-col items-center justify-center py-4 px-6">
      <LinkIcon size={28} color="#74798B" />
      <p className="text-xs text-grayscale-500 uppercase mt-3">
        Ainda não existem links cadastrados
      </p>
    </div>
  )
}