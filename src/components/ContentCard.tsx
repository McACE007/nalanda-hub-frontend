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
    <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group max-w-sm">
      <Link to={href} className="block h-full">
        {/* Image Container with 16:9 aspect ratio */}
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>

          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              {/* Avatar placeholder */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                {uploadedBy.charAt(0).toUpperCase()}
              </div>
              <span className="truncate max-w-[100px] font-medium">
                {uploadedBy}
              </span>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
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
