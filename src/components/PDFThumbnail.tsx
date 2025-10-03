import { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { Loader2, FileText } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFThumbnailProps {
  url: string;
  width?: number;
  height?: number;
  className?: string;
}

export function PDFThumbnail({ 
  url, 
  width = 200, 
  height = 250, 
  className = "" 
}: PDFThumbnailProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        setLoading(true);
        setError(false);

        const pdf = await pdfjs.getDocument(url).promise;
        const page = await pdf.getPage(1);
        
        const viewport = page.getViewport({ scale: 1 });
        const scale = Math.min(width / viewport.width, height / viewport.height);
        const scaledViewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          throw new Error('Could not get canvas context');
        }

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        await page.render({
          canvasContext: context,
          viewport: scaledViewport,
        }).promise;

        const thumbnailUrl = canvas.toDataURL('image/png');
        setThumbnail(thumbnailUrl);
      } catch (err) {
        console.error('Error generating PDF thumbnail:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      generateThumbnail();
    }
  }, [url, width, height]);

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width, height }}
      >
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          <span className="text-xs text-gray-500">Loading PDF...</span>
        </div>
      </div>
    );
  }

  if (error || !thumbnail) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width, height }}
      >
        <div className="flex flex-col items-center space-y-2">
          <FileText className="w-8 h-8 text-gray-400" />
          <span className="text-xs text-gray-500">PDF Preview</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={thumbnail}
      alt="PDF Thumbnail"
      className={`object-cover ${className}`}
      style={{ width, height }}
    />
  );
}