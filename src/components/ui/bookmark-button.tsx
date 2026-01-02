"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Bookmark, Loader2 } from "lucide-react";

interface BookmarkButtonProps {
  websiteSlug: string;
  variant?: "default" | "icon";
  className?: string;
}

export function BookmarkButton({ websiteSlug, variant = "default", className = "" }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkBookmark = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", user.id)
        .eq("website_slug", websiteSlug)
        .single();

      setIsBookmarked(!!data);
      setLoading(false);
    };

    checkBookmark();
  }, [websiteSlug, supabase]);

  const handleToggle = async () => {
    if (!userId) {
      router.push("/auth/signin");
      return;
    }

    setToggling(true);

    if (isBookmarked) {
      await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", userId)
        .eq("website_slug", websiteSlug);
      setIsBookmarked(false);
    } else {
      await supabase
        .from("bookmarks")
        .insert({
          user_id: userId,
          website_slug: websiteSlug,
        });
      setIsBookmarked(true);
    }

    setToggling(false);
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleToggle}
        disabled={loading || toggling}
        className={`p-2 rounded-[8px] transition-colors disabled:opacity-50 ${
          isBookmarked 
            ? "bg-primary/10 text-primary" 
            : "bg-ui-2 hover:bg-ui-3 text-text-secondary hover:text-text-primary"
        } ${className}`}
      >
        {toggling ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading || toggling}
      className={`w-full py-4 ${
        isBookmarked 
          ? "bg-primary text-white" 
          : "bg-[#FF3D00] hover:bg-[#E63700] text-white"
      } text-[14px] md:text-[16px] font-semibold rounded-[12px] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 ${className}`}
    >
      {toggling ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
      )}
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
