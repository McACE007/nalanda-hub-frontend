import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Loader2, User, Mail, Building, X } from "lucide-react";
import { Button } from "./ui/button";

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserProfileModal({ open, onOpenChange }: UserProfileModalProps) {
  const { data: userProfile, isLoading, error } = useUserProfile();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">User Profile</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">
            Failed to load profile information
          </div>
        )}

        {userProfile && (
          <div className="space-y-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-lg">
                  {userProfile.fullName?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{userProfile.fullName}</h3>
                <Badge variant={userProfile.role === "MOD" ? "default" : "secondary"}>
                  {userProfile.role}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-600">{userProfile.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Building className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Branch</p>
                  <p className="text-sm text-gray-600">{userProfile.Branch.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Building className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Branch Duration</p>
                  <p className="text-sm text-gray-600">{userProfile.Branch.duration} years</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">User ID</p>
                  <p className="text-sm text-gray-600">#{userProfile.id}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}