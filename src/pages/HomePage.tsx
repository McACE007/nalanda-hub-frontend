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
    fetchAllSubjects,
    fetchAllUnits,
    selectedSubject,
    selectedUnit,
    setSeletedSubject,
    setSeletedUnit,
    sortBy,
  } = useContentStore();

  useEffect(() => {
    fetchAllSemesters();
  }, [fetchAllSemesters]);

  useEffect(() => {
    fetchAllContents();
    fetchAllUnits(selectedSubject?.toString() || "");
    setSeletedUnit("");
  }, [fetchAllUnits, selectedSubject, fetchAllContents, setSeletedUnit]);

  useEffect(() => {
    fetchAllContents();
  }, [fetchAllContents, selectedUnit, sortBy]);

  useEffect(() => {
    fetchAllContents();
    fetchAllSubjects(selectedSemster?.toString() || "");
    setSeletedSubject("");
    setSeletedUnit("");
  }, [
    fetchAllContents,
    searchQuery,
    selectedSemster,
    fetchAllSubjects,
    setSeletedSubject,
    setSeletedUnit,
  ]);

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
