import ContentCard from "@/components/ContentCard";
import { useContentStore } from "@/stores/useContentStore";
import { useEffect } from "react";

function HomePage() {
  const contents = useContentStore((state) => state.contents);
  const searchQuery = useContentStore((state) => state.searchQuery);
  const isLoading = useContentStore((state) => state.isLoading);
  const fetchAllContents = useContentStore((state) => state.fetchAllContents);
  const sortBy = useContentStore((state) => state.sortBy);

  useEffect(() => {
    fetchAllContents();
  }, [searchQuery, fetchAllContents, sortBy]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {contents.length > 0 ? (
        contents.map((content) => (
          <ContentCard
            key={content.title}
            title={content.title}
            uploadedBy="Ankit Nayak"
            imageUrl={content.imageUrl}
            href={`/content/${content.id}`}
          />
        ))
      ) : (
        <div>No content found</div>
      )}
    </div>
  );
}

export default HomePage;
