import pdfThumbnail from "../assets/pdf_thumnail.png";
import ContentCard from "@/components/ContentCard";
function HomeLayout() {
  return (
    <div className="h-screen flex flex-row relative">
      <aside className="bg-green-500 h-[calc(100%-56px)] w-60 fixed left-0 top-14"></aside>
      <header className="bg-amber-400 w-full h-14 fixed top-0 left-0"></header>
      <main className="ml-60 mt-14 p-6 flex flex-wrap gap-4">
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <ContentCard
              title="Into to computer sciece"
              uploadedBy="Ankit Nayak"
              imageUrl={pdfThumbnail}
              href={`/content/${index}`}
            />
          ))}
      </main>
    </div>
  );
}

export default HomeLayout;
