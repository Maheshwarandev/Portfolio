import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure pdfjs worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export function PdfCanvasPreview({ pdfUrl, previewImage, title }) {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If we have a direct image preview, no need to parse PDF canvas
    if (previewImage) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(false);

    const renderPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        if (!isMounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { willReadFrequently: true });

        // Scale page to fit high DPI
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const desiredWidth = 800; // Crisp rendering width
        const scale = desiredWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;
        if (isMounted) {
          setLoading(false);
        }
      } catch (err) {
        console.warn('PDF canvas render failed:', err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    if (pdfUrl) {
      renderPdf();
    }

    return () => {
      isMounted = false;
    };
  }, [pdfUrl, previewImage]);

  if (previewImage) {
    return (
      <img 
        src={previewImage} 
        alt={title} 
        className="w-full h-full object-contain object-center rounded-xl bg-zinc-950 p-1" 
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-zinc-950 rounded-xl overflow-hidden p-1">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 text-zinc-500 font-mono text-xs animate-pulse">
          Loading certificate canvas...
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className={`w-full h-full object-contain object-center transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`} 
      />
      {error && !loading && (
        <div className="text-zinc-500 font-mono text-xs text-center p-4">
          Certificate Preview
        </div>
      )}
    </div>
  );
}
export default PdfCanvasPreview;
