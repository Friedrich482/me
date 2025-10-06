const extractImageUrls = (content: string) => {
  if (!content) return [];

  const imgRegex = /\[<img[^>]*src=["']([^"']+)["'][^>]*\/>\]/g;
  const urls = [];
  let match;

  while ((match = imgRegex.exec(content)) !== null) {
    const url = match[1];
    if (url && (url.startsWith("http") || url.startsWith("/"))) {
      urls.push(url);
    }
  }

  return urls;
};

export default extractImageUrls;
