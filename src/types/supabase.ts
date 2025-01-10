export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          name: string
          type: 'client' | 'vendor'
          email: string
          phone: string | null
          company: string
          address: string | null
          city: string | null
          country: string | null
          tax_id: string | null
          status: 'active' | 'inactive' | 'pending'
          website: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['clients']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['clients']['Insert']>
      }
      // Add other table definitions as needed
    }
  }
}