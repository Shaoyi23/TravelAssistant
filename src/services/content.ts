import { createClient } from "@supabase/supabase-js";
import type { Destination } from "./destinations";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Guide {
  id: number;
  title: string;
  description: string;
  author: string;
  author_id: number | null;
  read_time: string;
  publish_date: string;
  cover_image: string;
  tags: string[];
  views: number;
  likes: number;
  featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CommunityPost {
  id: number;
  author_name: string;
  author_avatar: string | null;
  author_verified: boolean;
  author_id: number | null;
  content: string;
  location: string | null;
  images: string[];
  likes: number;
  comments: number;
  shares: number;
  trending: boolean;
  is_active: boolean;
  created_at: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface SiteFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface UserFavorite {
  id: number;
  user_id: number;
  destination_id: number | null;
  destination_name: string;
  destination_location: string | null;
  destination_image: string | null;
  saved_date: string;
  created_at: string;
}

export interface UserTrip {
  id: number;
  user_id: number;
  destination: string;
  country: string;
  start_date: string | null;
  end_date: string | null;
  duration: string | null;
  status: string;
  photos_count: number;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserAchievement {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  icon: string;
  earned: boolean;
  earned_date: string | null;
  progress: string | null;
  created_at: string;
}

export const guidesService = {
  async getAll(): Promise<Guide[]> {
    const { data, error } = await supabase
      .from("guides")
      .select("*")
      .eq("is_published", true)
      .order("publish_date", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getFeatured(): Promise<Guide[]> {
    const { data, error } = await supabase
      .from("guides")
      .select("*")
      .eq("featured", true)
      .eq("is_published", true)
      .order("views", { ascending: false })
      .limit(2);

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Guide | null> {
    const { data, error } = await supabase
      .from("guides")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  },

  async search(query: string): Promise<Guide[]> {
    const { data, error } = await supabase
      .from("guides")
      .select("*")
      .eq("is_published", true)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order("publish_date", { ascending: false });

    if (error) throw error;
    return data || [];
  },
};

export const communityService = {
  async getAll(): Promise<CommunityPost[]> {
    const { data, error } = await supabase
      .from("community_posts")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getTrending(): Promise<CommunityPost[]> {
    const { data, error } = await supabase
      .from("community_posts")
      .select("*")
      .eq("trending", true)
      .eq("is_active", true)
      .order("likes", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<CommunityPost | null> {
    const { data, error } = await supabase
      .from("community_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  },
};

export const teamService = {
  async getAll(): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data || [];
  },
};

export const featuresService = {
  async getAll(): Promise<SiteFeature[]> {
    const { data, error } = await supabase
      .from("site_features")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data || [];
  },
};

export const userService = {
  async getFavorites(userId: string): Promise<UserFavorite[]> {
    const { data, error } = await supabase
      .from("user_favorites")
      .select("*")
      .eq("user_id", userId)
      .order("saved_date", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addFavorite(
    userId: string,
    destination: Pick<
      Destination,
      "id" | "name" | "location" | "image"
    >
  ): Promise<UserFavorite> {
    const { data, error } = await supabase
      .from("user_favorites")
      .insert({
        user_id: userId,
        destination_id: destination.id,
        destination_name: destination.name,
        destination_location: destination.location,
        destination_image: destination.image,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeFavorite(userId: string, favoriteId: string): Promise<void> {
    const { error } = await supabase
      .from("user_favorites")
      .delete()
      .eq("id", favoriteId)
      .eq("user_id", userId);

    if (error) throw error;
  },

  async getTrips(userId: string): Promise<UserTrip[]> {
    const { data, error } = await supabase
      .from("user_trips")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addTrip(
    userId: string,
    trip: Omit<UserTrip, "id" | "user_id" | "created_at" | "updated_at">
  ): Promise<UserTrip> {
    const { data, error } = await supabase
      .from("user_trips")
      .insert({
        user_id: userId,
        destination: trip.destination,
        country: trip.country,
        start_date: trip.start_date,
        end_date: trip.end_date,
        duration: trip.duration,
        status: trip.status,
        photos_count: trip.photos_count,
        cover_image: trip.cover_image,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAchievements(userId: string): Promise<UserAchievement[]> {
    const { data, error } = await supabase
      .from("user_achievements")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },
};
