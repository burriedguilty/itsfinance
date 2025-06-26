import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

export async function loadPublicFileAsFormData(filePath: string): Promise<{ formData: FormData; mimeType: string }> {
  // Remove leading slash if present
  const cleanPath = filePath.replace(/^\//, '');
  const absolutePath = path.join(process.cwd(), 'public', cleanPath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  const buffer = fs.readFileSync(absolutePath);
  const mimeType = mime.lookup(absolutePath) || 'application/octet-stream';
  const fileName = path.basename(absolutePath);

  const formData = new FormData();
  const blob = new Blob([buffer], { type: mimeType });
  formData.append('file', blob, fileName);
  formData.append('purpose', 'image-generation');

  return { formData, mimeType };
}
