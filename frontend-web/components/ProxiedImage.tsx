import Image, { ImageProps } from "next/image";

export default function ProxiedImage({
  src,
  alt,
  ...rest
}: Readonly<ImageProps>) {
  if (typeof src !== "string" || !src.startsWith("http")) {
    // Option 1: fallback to default rendering for static imports
    return <Image src={src} alt={alt} {...rest} />;
  }
  const proxyUrl = `/api/image-proxy?imageUrl=${encodeURIComponent(src)}`;
  return <Image src={proxyUrl} alt={alt} {...rest} />;
}
