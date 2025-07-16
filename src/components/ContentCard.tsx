import { Link } from "react-router-dom";

type ContentCardProps = {
  title: string;
  uploadedBy: string;
  uploadedDate?: Date;
  imageUrl: string;
  href: string;
};

function ContentCard({
  title,
  uploadedBy,
  uploadedDate = new Date(),
  imageUrl,
  href,
}: ContentCardProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300 group">
      <Link to={href} className="block h-full">
        {/* Image */}
        <div className="h-[180px] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col px-3 py-2 gap-1 h-[80px] justify-between">
          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
            {title}
          </h3>

          {/* Footer Info */}
          <div className="flex justify-between text-xs text-gray-500">
            <span className="truncate max-w-[80px]">{uploadedBy}</span>
            <span>
              {uploadedDate.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ContentCard;
