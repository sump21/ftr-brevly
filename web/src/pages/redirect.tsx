import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LogoIcon } from "../shared/logo-icon";
import { getLink } from '../api/get-link';
import { incrementCountLink } from '../api/increment-count-link';

export function RedirectPage() {
  const { shortLink } = useParams<{ shortLink: string }>();
  const navigate = useNavigate();
  const [originalLink, setOriginalLink] = useState<string>('');
  const hasIncrementedRef = useRef(false);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const handleRedirect = async () => {
      if (isProcessingRef.current) {
        return;
      }

      if (!shortLink) {
        setTimeout(() => {
          navigate('/not_found');
        }, 2000);
        return;
      }

      isProcessingRef.current = true;

      try {
        const linkData = await getLink({ shortLink });
        setOriginalLink(linkData.originalLink);

        if (!hasIncrementedRef.current) {
          await incrementCountLink({ id: linkData.id });
          hasIncrementedRef.current = true;
        }

        setTimeout(() => {
          window.location.href = linkData.originalLink;
        }, 2000);

      } catch (error) {
        setTimeout(() => {
          navigate('/not_found');
        }, 2000);
      } finally {
        isProcessingRef.current = false;
      }
    };

    handleRedirect();
  }, [shortLink, navigate]);

  return (
    <div className="flex flex-col h-dvh w-full p-2 sm:max-w-[580px] mx-auto items-center justify-center sm:w-max">
      <div className="w-full flex flex-col items-center justify-center py-12 px-5 sm:py-16 sm:px-12 bg-white rounded-lg">
        <LogoIcon className="h-12 mb-4" />
        <span className="text-gray-600 text-xl font-bold mb-6 text-center">
          Redirecionando...
        </span>
        <span className="w-full text-md text-grayscale-500 text-center">
          O link será aberto automaticamente em alguns instantes.
          <br />
          Não foi redirecionado?{" "}
          <a 
            href={originalLink || "/"} 
            className="text-blue-dark underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acesse aqui
          </a>
        </span>
      </div>
    </div>
  );
}
