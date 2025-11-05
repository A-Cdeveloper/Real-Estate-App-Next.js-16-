import BackButton from "@/components/frontend/BackButton";
import NewsDate from "@/components/frontend/news/detail/NewsDate";
import NewsImage from "@/components/frontend/news/detail/NewsImage";
import LatestNews from "@/components/frontend/news/LatestNews";
import LatestNewsSkeleton from "@/components/frontend/skeletons/LatestNewsSkeleton";
import { Typography } from "@/components/ui/typography";
import { getNewsById } from "@/lib/queries/news";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Params = Promise<{ id: string }>;

const NewsDetailPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  let newsItem;
  try {
    newsItem = await getNewsById(id);
  } catch {
    notFound();
  }

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12">
      <BackButton href="/news" label="Back to News" className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <Typography variant="h1" className="mb-4">
              {newsItem.title}
            </Typography>
            <NewsDate date={newsItem.createdAt} className="mb-4" />
          </div>
          <NewsImage
            newsItem={newsItem}
            className="w-full h-[400px] md:h-[500px]"
          />
          <Typography
            variant="p"
            className="text-muted-foreground leading-relaxed whitespace-pre-line"
          >
            {newsItem.description}
          </Typography>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Suspense
            fallback={
              <LatestNewsSkeleton
                showTitle={true}
                showButton={false}
                itemsCount={7}
                className="h-auto overflow-visible"
              />
            }
          >
            <LatestNews
              count={7}
              className="h-auto overflow-visible"
              showButton={false}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default NewsDetailPage;
