import { useContent } from "@/hooks/useContent";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, FileText, ArrowLeft } from "lucide-react";

function ContentDetailsPage() {
  const params = useParams();
  const contentId = Number(params.contentId);
  const { data: response, isLoading, error } = useContent(contentId);

  const content = response?.data;

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Content Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The content you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => window.history.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {content.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs">
                    {content.Uploader.fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{content.Uploader.fullName}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Uploaded {formatDate(content.uploadedDate)}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <Badge variant={content.status ? "default" : "secondary"}>
                {content.status ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-0 flex flex-col gap-6">
        {/* Breadcrumb-style Academic Path */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex flex-col items-center md:flex-row md:items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium">{content.Branch.name}</span>
            <span>›</span>
            <span className="font-medium">{content.Semester.name}</span>
            <span>›</span>
            <span className="font-medium">{content.Subject.name}</span>
            <span>›</span>
            <span className="font-medium text-blue-600">
              {content.Unit.name}
            </span>
          </div>
        </div>

        {/* PDF Viewer */}
        {content.File && content.File.url.toLowerCase().includes(".pdf") && (
          <div>
            <Card className="h-full">
              <CardContent className="h-[calc(100%-4rem)] p-0">
                <div className="h-full border-t">
                  <iframe
                    src={`${content.File.url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                    className="w-full h-full"
                    title="PDF Preview"
                    style={{ minHeight: "600px" }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Left Panel - Content Information */}
        <div className="space-y-6">
          {/* Description Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Description</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {content.description || "No description available."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ContentDetailsPage;
