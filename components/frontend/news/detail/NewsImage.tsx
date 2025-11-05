import { cn } from "@/lib/utils";
import Image from "next/image";
import { News } from "@prisma/client";

const NewsImage = ({
  newsItem,
  className,
  newsImageClassName,
}: {
  newsItem: News;
  className?: string;
  newsImageClassName?: string;
}) => {
  const { image, title } = newsItem;
  if (!image) {
    return null;
  }
  return (
    <div
      className={cn("relative overflow-hidden rounded-lg bg-muted", className)}
    >
      <Image
        src={image}
        alt={title}
        fill
        className={cn("object-cover", newsImageClassName)}
        priority
        unoptimized
      />
    </div>
  );
};

export default NewsImage;
