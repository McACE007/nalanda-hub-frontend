import * as pdfjsLib from 'pdfjs-dist';

// Use local worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export const generatePDFThumbnail = async (file: File): Promise<Blob> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    
    fileReader.onload = async function() {
      try {
        const arrayBuffer = this.result as ArrayBuffer;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);
        
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas: canvas
        }).promise;
        
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            generateDocThumbnail(file).then(resolve);
          }
        }, 'image/jpeg', 0.8);
        
      } catch (error) {
        generateDocThumbnail(file).then(resolve);
      }
    };
    
    fileReader.onerror = () => generateDocThumbnail(file).then(resolve);
    fileReader.readAsArrayBuffer(file);
  });
};

export const generateDocThumbnail = async (file: File): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 300;
    canvas.height = 400;
    
    // Create a document-like thumbnail
    ctx!.fillStyle = '#ffffff';
    ctx!.fillRect(0, 0, 300, 400);
    
    ctx!.fillStyle = '#f3f4f6';
    ctx!.fillRect(20, 20, 260, 360);
    
    // Add border
    ctx!.strokeStyle = '#d1d5db';
    ctx!.lineWidth = 2;
    ctx!.strokeRect(20, 20, 260, 360);
    
    // Add file type indicator
    const fileType = file.type === 'application/pdf' ? 'PDF' : 'DOC';
    ctx!.fillStyle = '#374151';
    ctx!.font = 'bold 24px Arial';
    ctx!.textAlign = 'center';
    ctx!.fillText(fileType, 150, 180);
    
    // Add file name
    ctx!.font = '12px Arial';
    ctx!.fillStyle = '#6b7280';
    const fileName = file.name.length > 25 ? file.name.substring(0, 22) + '...' : file.name;
    ctx!.fillText(fileName, 150, 220);
    
    // Add file icon
    ctx!.fillStyle = '#3b82f6';
    ctx!.fillRect(130, 120, 40, 50);
    ctx!.fillStyle = '#ffffff';
    ctx!.font = '20px Arial';
    ctx!.fillText('📄', 150, 150);
    
    canvas.toBlob((blob) => {
      resolve(blob!);
    }, 'image/jpeg', 0.8);
  });
};