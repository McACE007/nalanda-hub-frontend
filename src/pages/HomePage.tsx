import ContentCard from "@/components/ContentCard";
import { useContents } from "@/hooks/useContents";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function HomePage() {
  const { inView, ref } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useContents();

  useEffect(() => {
    fetchNextPage();
  }, [inView, fetchNextPage]);

  console.log("Reredndersfdsklksdjfsdf");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {data?.pages.map((page) =>
        page.data.map((content) => (
          <ContentCard
            key={content.title}
            title={content.title}
            uploadedBy="Ankit Nayak"
            imageUrl={content.imageUrl}
            href={`/content/${content.id}`}
          />
        ))
      )}

      <div ref={ref} className="py-6 text-center text-sm text-gray-500">
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Scroll to load more"
          : "No more contents"}
      </div>
    </div>
  );
}

export default HomePage;
