import ContentCard from "@/components/ContentCard";
import pdfThumbnail from "../assets/pdf_thumnail.png";

function HomePage() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <ContentCard
            key={index}
            title="Intro to Computer Science sdfsdf sdfsd fsdf sdf sdfsdf sdfsdf sdfsdf sdfsd sdfsd"
            uploadedBy="Ankit Nayak"
            imageUrl={pdfThumbnail}
            href={`/content/${index}`}
          />
        ))}
    </div>
  );
}

export default HomePage;
