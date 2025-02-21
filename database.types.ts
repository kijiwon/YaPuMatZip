export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "ballpark-info": {
        Row: {
          id: number
          lat: number
          lng: number
          stadium: string
          stadium_id: string
          team: string
          tips: Json | null
        }
        Insert: {
          id?: number
          lat: number
          lng: number
          stadium: string
          stadium_id: string
          team: string
          tips?: Json | null
        }
        Update: {
          id?: number
          lat?: number
          lng?: number
          stadium?: string
          stadium_id?: string
          team?: string
          tips?: Json | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string
          deleted_at: string | null
          id: number
          place: string
          stadium_id: string
          updated_at: string | null
          user_email: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          deleted_at?: string | null
          id?: number
          place: string
          stadium_id: string
          updated_at?: string | null
          user_email: string
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          deleted_at?: string | null
          id?: number
          place?: string
          stadium_id?: string
          updated_at?: string | null
          user_email?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_place_fkey"
            columns: ["place"]
            isOneToOne: false
            referencedRelation: "yapu-place"
            referencedColumns: ["name"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          id: string
          liked_place: Json | null
          name: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          id: string
          liked_place?: Json | null
          name?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          id?: string
          liked_place?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      "recommended-menus": {
        Row: {
          id: number
          menu_name: string
          place_id: string
          price: string
        }
        Insert: {
          id?: number
          menu_name: string
          place_id: string
          price: string
        }
        Update: {
          id?: number
          menu_name?: string
          place_id?: string
          price?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommended_menus_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "yapu-place"
            referencedColumns: ["name"]
          },
        ]
      }
      "yapu-place": {
        Row: {
          category: string | null
          food_type: string
          id: number
          info: string | null
          inside_stadium: boolean | null
          is_delivery_or_takeout_available: string | null
          lat: number | null
          liked_user_ids: Json | null
          lng: number | null
          location: string
          name: string
          stadium_id: string
        }
        Insert: {
          category?: string | null
          food_type: string
          id?: number
          info?: string | null
          inside_stadium?: boolean | null
          is_delivery_or_takeout_available?: string | null
          lat?: number | null
          liked_user_ids?: Json | null
          lng?: number | null
          location: string
          name: string
          stadium_id: string
        }
        Update: {
          category?: string | null
          food_type?: string
          id?: number
          info?: string | null
          inside_stadium?: boolean | null
          is_delivery_or_takeout_available?: string | null
          lat?: number | null
          liked_user_ids?: Json | null
          lng?: number | null
          location?: string
          name?: string
          stadium_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "yapu-place_stadium_id_fkey"
            columns: ["stadium_id"]
            isOneToOne: false
            referencedRelation: "ballpark-info"
            referencedColumns: ["stadium_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
