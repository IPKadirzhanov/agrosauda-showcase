export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      agro_shorts: {
        Row: {
          category: string | null
          comments_count: number
          created_at: string
          description: string | null
          id: string
          is_promoted: boolean
          likes_count: number
          product_id: string | null
          status: string
          thumbnail_url: string | null
          title: string
          updated_at: string
          user_id: string
          video_url: string
          views_count: number
        }
        Insert: {
          category?: string | null
          comments_count?: number
          created_at?: string
          description?: string | null
          id?: string
          is_promoted?: boolean
          likes_count?: number
          product_id?: string | null
          status?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          user_id: string
          video_url: string
          views_count?: number
        }
        Update: {
          category?: string | null
          comments_count?: number
          created_at?: string
          description?: string | null
          id?: string
          is_promoted?: boolean
          likes_count?: number
          product_id?: string | null
          status?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          video_url?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "agro_shorts_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      agro_shorts_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          short_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          short_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          short_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agro_shorts_comments_short_id_fkey"
            columns: ["short_id"]
            isOneToOne: false
            referencedRelation: "agro_shorts"
            referencedColumns: ["id"]
          },
        ]
      }
      agro_shorts_likes: {
        Row: {
          created_at: string
          id: string
          short_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          short_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          short_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agro_shorts_likes_short_id_fkey"
            columns: ["short_id"]
            isOneToOne: false
            referencedRelation: "agro_shorts"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_conversations: {
        Row: {
          agent_type: string
          created_at: string
          id: string
          language: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          agent_type: string
          created_at?: string
          id?: string
          language?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          agent_type?: string
          created_at?: string
          id?: string
          language?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ai_knowledge_base: {
        Row: {
          agent_type: string
          content: string
          created_at: string
          id: string
          is_active: boolean | null
          language: string
          tags: string[] | null
          topic: string
          updated_at: string
        }
        Insert: {
          agent_type: string
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          language?: string
          tags?: string[] | null
          topic: string
          updated_at?: string
        }
        Update: {
          agent_type?: string
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          language?: string
          tags?: string[] | null
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      broker_deals: {
        Row: {
          buyer_request_id: string | null
          created_at: string
          id: string
          logistics_status:
            | Database["public"]["Enums"]["logistics_status"]
            | null
          notes: string | null
          seller_request_id: string | null
          status: Database["public"]["Enums"]["broker_deal_status"] | null
          updated_at: string
        }
        Insert: {
          buyer_request_id?: string | null
          created_at?: string
          id?: string
          logistics_status?:
            | Database["public"]["Enums"]["logistics_status"]
            | null
          notes?: string | null
          seller_request_id?: string | null
          status?: Database["public"]["Enums"]["broker_deal_status"] | null
          updated_at?: string
        }
        Update: {
          buyer_request_id?: string | null
          created_at?: string
          id?: string
          logistics_status?:
            | Database["public"]["Enums"]["logistics_status"]
            | null
          notes?: string | null
          seller_request_id?: string | null
          status?: Database["public"]["Enums"]["broker_deal_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "broker_deals_buyer_request_id_fkey"
            columns: ["buyer_request_id"]
            isOneToOne: false
            referencedRelation: "broker_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broker_deals_seller_request_id_fkey"
            columns: ["seller_request_id"]
            isOneToOne: false
            referencedRelation: "broker_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      broker_requests: {
        Row: {
          claim_fee: number | null
          claimed_at: string | null
          claimed_by: string | null
          contact_email: string | null
          contact_name: string
          contact_phone: string | null
          created_at: string
          delivery_notes: string | null
          description: string | null
          id: string
          is_flagged: boolean | null
          location: string
          needs_delivery: boolean | null
          price_expectation: string | null
          product_type: string
          quantity: string
          request_type: Database["public"]["Enums"]["broker_request_type"]
          status: Database["public"]["Enums"]["broker_request_status"] | null
          trust_level: Database["public"]["Enums"]["trust_level"] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          claim_fee?: number | null
          claimed_at?: string | null
          claimed_by?: string | null
          contact_email?: string | null
          contact_name: string
          contact_phone?: string | null
          created_at?: string
          delivery_notes?: string | null
          description?: string | null
          id?: string
          is_flagged?: boolean | null
          location: string
          needs_delivery?: boolean | null
          price_expectation?: string | null
          product_type: string
          quantity: string
          request_type: Database["public"]["Enums"]["broker_request_type"]
          status?: Database["public"]["Enums"]["broker_request_status"] | null
          trust_level?: Database["public"]["Enums"]["trust_level"] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          claim_fee?: number | null
          claimed_at?: string | null
          claimed_by?: string | null
          contact_email?: string | null
          contact_name?: string
          contact_phone?: string | null
          created_at?: string
          delivery_notes?: string | null
          description?: string | null
          id?: string
          is_flagged?: boolean | null
          location?: string
          needs_delivery?: boolean | null
          price_expectation?: string | null
          product_type?: string
          quantity?: string
          request_type?: Database["public"]["Enums"]["broker_request_type"]
          status?: Database["public"]["Enums"]["broker_request_status"] | null
          trust_level?: Database["public"]["Enums"]["trust_level"] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          count: number | null
          created_at: string
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          count?: number | null
          created_at?: string
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          count?: number | null
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          duration: string | null
          id: string
          image: string | null
          instructor: string | null
          lessons: number | null
          level: string | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          image?: string | null
          instructor?: string | null
          lessons?: number | null
          level?: string | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          image?: string | null
          instructor?: string | null
          lessons?: number | null
          level?: string | null
          title?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          created_at: string
          email: string | null
          id: string
          message: string
          name: string
          phone: string | null
          product_id: string | null
          sender_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          message: string
          name: string
          phone?: string | null
          product_id?: string | null
          sender_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string
          name?: string
          phone?: string | null
          product_id?: string | null
          sender_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      news_articles: {
        Row: {
          category: string | null
          content: string | null
          created_at: string
          date: string | null
          excerpt: string | null
          id: string
          image: string | null
          read_time: string | null
          title: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string
          date?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          read_time?: string | null
          title: string
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string
          date?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          read_time?: string | null
          title?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category_slug: string
          condition: string
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          image: string | null
          location: string
          price: number
          seller_name: string
          seller_user_id: string | null
          specs: Json | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category_slug: string
          condition?: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          location: string
          price: number
          seller_name: string
          seller_user_id?: string | null
          specs?: Json | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category_slug?: string
          condition?: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          location?: string
          price?: number
          seller_name?: string
          seller_user_id?: string | null
          specs?: Json | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_type: string | null
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          phone: string | null
          preferred_language: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          account_type?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          account_type?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      regions: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      safe_deal_orders: {
        Row: {
          amount: number
          buyer_id: string | null
          created_at: string
          id: string
          product_id: string | null
          seller_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          buyer_id?: string | null
          created_at?: string
          id?: string
          product_id?: string | null
          seller_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          buyer_id?: string | null
          created_at?: string
          id?: string
          product_id?: string | null
          seller_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "safe_deal_orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      subsidy_programs: {
        Row: {
          amount: string | null
          category: string | null
          created_at: string
          deadline: string | null
          description: string | null
          documents_needed: string | null
          eligibility: string | null
          id: string
          is_active: boolean | null
          region: string | null
          requirements: string | null
          source_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          amount?: string | null
          category?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          documents_needed?: string | null
          eligibility?: string | null
          id?: string
          is_active?: boolean | null
          region?: string | null
          requirements?: string | null
          source_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          amount?: string | null
          category?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          documents_needed?: string | null
          eligibility?: string | null
          id?: string
          is_active?: boolean | null
          region?: string | null
          requirements?: string | null
          source_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_broker_request: {
        Args: { _broker_id: string; _request_id: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "broker" | "business"
      broker_deal_status:
        | "pending"
        | "in_negotiation"
        | "agreed"
        | "completed"
        | "cancelled"
      broker_request_status:
        | "active"
        | "in_negotiation"
        | "completed"
        | "cancelled"
        | "in_progress"
      broker_request_type: "sell" | "buy"
      logistics_status: "not_needed" | "planned" | "in_progress" | "delivered"
      trust_level: "new" | "active" | "verified"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "broker", "business"],
      broker_deal_status: [
        "pending",
        "in_negotiation",
        "agreed",
        "completed",
        "cancelled",
      ],
      broker_request_status: [
        "active",
        "in_negotiation",
        "completed",
        "cancelled",
        "in_progress",
      ],
      broker_request_type: ["sell", "buy"],
      logistics_status: ["not_needed", "planned", "in_progress", "delivered"],
      trust_level: ["new", "active", "verified"],
    },
  },
} as const
