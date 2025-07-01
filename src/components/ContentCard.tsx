import { Link } from "react-router-dom";

type ContentCardProps = {
  title: string;
  uploadedBy: string;
  uploadedDate?: Date;
  imageUrl: string;
  href: string;
};

function ContentCard({ title, uploadedBy, imageUrl, href }: ContentCardProps) {
  return (
    <div className="h-72 w-[182px] p-2 shadow-xl rounded-md">
      <Link to={href}>
        <div className="h-56 w-full">
          <img src={imageUrl} className="w-full h-full object-cover"></img>
        </div>
        <div className="flex flex-col text-center gap-1.5">
          <div className="text-sm">{title}</div>
          <div className="flex text-xs text-gray-400 justify-between">
            <div className="">{uploadedBy}</div>
            <div className="">{Date.now()}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ContentCard;
