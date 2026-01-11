import { supabase } from "../utils/supabaseClient";

export interface Destination {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  tags: string[];
  rating: number;
  reviews: number;
  recommended: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FetchDestinationsOptions {
  searchQuery?: string;
  recommended?: boolean;
}

export const destinationsService = {
  async getAll(): Promise<Destination[]> {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching destinations:", error);
      throw new Error(error.message);
    }

    return data || [];
  },

  async getById(id: number): Promise<Destination | null> {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching destination:", error);
      throw new Error(error.message);
    }

    return data;
  },

  async getRecommended(): Promise<Destination[]> {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("recommended", true)
      .order("rating", { ascending: false });

    if (error) {
      console.error("Error fetching recommended destinations:", error);
      throw new Error(error.message);
    }

    return data || [];
  },

  async search(query: string): Promise<Destination[]> {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .or(
        `name.ilike.%${query}%,location.ilike.%${query}%,description.ilike.%${query}%`
      )
      .order("rating", { ascending: false });

    if (error) {
      console.error("Error searching destinations:", error);
      throw new Error(error.message);
    }

    return data || [];
  },

  async filterByTags(tags: string[]): Promise<Destination[]> {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .contains("tags", tags)
      .order("rating", { ascending: false });

    if (error) {
      console.error("Error filtering destinations by tags:", error);
      throw new Error(error.message);
    }

    return data || [];
  },

  async create(
    destination: Omit<Destination, "id" | "created_at" | "updated_at">
  ): Promise<Destination> {
    const { data, error } = await supabase
      .from("destinations")
      .insert(destination)
      .select()
      .single();

    if (error) {
      console.error("Error creating destination:", error);
      throw new Error(error.message);
    }

    return data;
  },

  async update(
    id: number,
    updates: Partial<Destination>
  ): Promise<Destination> {
    const { data, error } = await supabase
      .from("destinations")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating destination:", error);
      throw new Error(error.message);
    }

    return data;
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from("destinations").delete().eq("id", id);

    if (error) {
      console.error("Error deleting destination:", error);
      throw new Error(error.message);
    }
  },
};
