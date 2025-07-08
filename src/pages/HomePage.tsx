import ContentCard from "@/components/ContentCard";
import { useContentStore } from "@/stores/useContentStore";
import { useEffect } from "react";

function HomePage() {
  const {
    fetchAllContents,
    isLoading,
    contents,
    fetchAllSemesters,
    selectedSemster,
    searchQuery,
  } = useContentStore();

  useEffect(() => {
    fetchAllContents();
    fetchAllSemesters();
  }, [fetchAllContents, fetchAllSemesters, selectedSemster]);

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
