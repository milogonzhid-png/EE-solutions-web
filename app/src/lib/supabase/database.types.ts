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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      clientes: {
        Row: {
          actualizado_en: string
          correo: string | null
          creado_en: string
          direccion: string | null
          dominio: string | null
          estado: Database["public"]["Enums"]["estado_proyecto"]
          fase: Database["public"]["Enums"]["fase_proyecto"]
          fecha_inicio: string | null
          giro: string | null
          id: string
          mantenimiento: boolean
          nombre_comercial: string
          notas: string | null
          paquete: Database["public"]["Enums"]["paquete_servicio"] | null
          perfil: Database["public"]["Enums"]["perfil_cliente"] | null
          slug: string
          whatsapp: string | null
        }
        Insert: {
          actualizado_en?: string
          correo?: string | null
          creado_en?: string
          direccion?: string | null
          dominio?: string | null
          estado?: Database["public"]["Enums"]["estado_proyecto"]
          fase?: Database["public"]["Enums"]["fase_proyecto"]
          fecha_inicio?: string | null
          giro?: string | null
          id?: string
          mantenimiento?: boolean
          nombre_comercial: string
          notas?: string | null
          paquete?: Database["public"]["Enums"]["paquete_servicio"] | null
          perfil?: Database["public"]["Enums"]["perfil_cliente"] | null
          slug: string
          whatsapp?: string | null
        }
        Update: {
          actualizado_en?: string
          correo?: string | null
          creado_en?: string
          direccion?: string | null
          dominio?: string | null
          estado?: Database["public"]["Enums"]["estado_proyecto"]
          fase?: Database["public"]["Enums"]["fase_proyecto"]
          fecha_inicio?: string | null
          giro?: string | null
          id?: string
          mantenimiento?: boolean
          nombre_comercial?: string
          notas?: string | null
          paquete?: Database["public"]["Enums"]["paquete_servicio"] | null
          perfil?: Database["public"]["Enums"]["perfil_cliente"] | null
          slug?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      cobros: {
        Row: {
          cliente_id: string
          creado_en: string
          estado_pago: Database["public"]["Enums"]["estado_pago"]
          fecha_emision: string
          fecha_pago: string | null
          folio: string
          id: string
          monto_mensual_centavos: number
          monto_setup_centavos: number
        }
        Insert: {
          cliente_id: string
          creado_en?: string
          estado_pago?: Database["public"]["Enums"]["estado_pago"]
          fecha_emision?: string
          fecha_pago?: string | null
          folio: string
          id?: string
          monto_mensual_centavos?: number
          monto_setup_centavos?: number
        }
        Update: {
          cliente_id?: string
          creado_en?: string
          estado_pago?: Database["public"]["Enums"]["estado_pago"]
          fecha_emision?: string
          fecha_pago?: string | null
          folio?: string
          id?: string
          monto_mensual_centavos?: number
          monto_setup_centavos?: number
        }
        Relationships: [
          {
            foreignKeyName: "cobros_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      departamentos: {
        Row: {
          cluster: string
          dueno_de: string | null
          nombre: string
          responde_por: string | null
          slug: Database["public"]["Enums"]["departamento_slug"]
        }
        Insert: {
          cluster: string
          dueno_de?: string | null
          nombre: string
          responde_por?: string | null
          slug: Database["public"]["Enums"]["departamento_slug"]
        }
        Update: {
          cluster?: string
          dueno_de?: string | null
          nombre?: string
          responde_por?: string | null
          slug?: Database["public"]["Enums"]["departamento_slug"]
        }
        Relationships: []
      }
      entregables_cliente: {
        Row: {
          actualizado_en: string
          cliente_id: string
          creado_en: string
          id: string
          nombre: string
          storage_path: string | null
          tipo: Database["public"]["Enums"]["tipo_entregable"]
          url_externa: string | null
        }
        Insert: {
          actualizado_en?: string
          cliente_id: string
          creado_en?: string
          id?: string
          nombre: string
          storage_path?: string | null
          tipo: Database["public"]["Enums"]["tipo_entregable"]
          url_externa?: string | null
        }
        Update: {
          actualizado_en?: string
          cliente_id?: string
          creado_en?: string
          id?: string
          nombre?: string
          storage_path?: string | null
          tipo?: Database["public"]["Enums"]["tipo_entregable"]
          url_externa?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entregables_cliente_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      gastos: {
        Row: {
          categoria: string
          creado_en: string
          descripcion: string
          fecha: string
          id: string
          monto_centavos: number
          recurrente: boolean
        }
        Insert: {
          categoria: string
          creado_en?: string
          descripcion: string
          fecha?: string
          id?: string
          monto_centavos: number
          recurrente?: boolean
        }
        Update: {
          categoria?: string
          creado_en?: string
          descripcion?: string
          fecha?: string
          id?: string
          monto_centavos?: number
          recurrente?: boolean
        }
        Relationships: []
      }
      pendientes: {
        Row: {
          cliente_id: string | null
          creado_en: string
          depende_de: Database["public"]["Enums"]["responsable_pendiente"]
          descripcion: string
          fase: Database["public"]["Enums"]["fase_proyecto"] | null
          id: string
          responsable: Database["public"]["Enums"]["departamento_slug"] | null
          resuelto: boolean
          resuelto_en: string | null
        }
        Insert: {
          cliente_id?: string | null
          creado_en?: string
          depende_de?: Database["public"]["Enums"]["responsable_pendiente"]
          descripcion: string
          fase?: Database["public"]["Enums"]["fase_proyecto"] | null
          id?: string
          responsable?: Database["public"]["Enums"]["departamento_slug"] | null
          resuelto?: boolean
          resuelto_en?: string | null
        }
        Update: {
          cliente_id?: string | null
          creado_en?: string
          depende_de?: Database["public"]["Enums"]["responsable_pendiente"]
          descripcion?: string
          fase?: Database["public"]["Enums"]["fase_proyecto"] | null
          id?: string
          responsable?: Database["public"]["Enums"]["departamento_slug"] | null
          resuelto?: boolean
          resuelto_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pendientes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          cliente_id: string | null
          creado_en: string
          id: string
          nombre_completo: string
          rol: Database["public"]["Enums"]["rol_usuario"]
        }
        Insert: {
          cliente_id?: string | null
          creado_en?: string
          id: string
          nombre_completo: string
          rol?: Database["public"]["Enums"]["rol_usuario"]
        }
        Update: {
          cliente_id?: string | null
          creado_en?: string
          id?: string
          nombre_completo?: string
          rol?: Database["public"]["Enums"]["rol_usuario"]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      reportes_semanales: {
        Row: {
          creado_en: string
          id: string
          resumen: string | null
          semana_fin: string
          semana_inicio: string
          visto_gerencia: boolean
          visto_gerencia_en: string | null
        }
        Insert: {
          creado_en?: string
          id?: string
          resumen?: string | null
          semana_fin: string
          semana_inicio: string
          visto_gerencia?: boolean
          visto_gerencia_en?: string | null
        }
        Update: {
          creado_en?: string
          id?: string
          resumen?: string | null
          semana_fin?: string
          semana_inicio?: string
          visto_gerencia?: boolean
          visto_gerencia_en?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      departamento_slug:
        | "ventas"
        | "marketing"
        | "diseno"
        | "ingenieria"
        | "producto-ia"
        | "finanzas"
        | "legal"
        | "datos"
        | "operaciones"
        | "contratacion"
        | "soporte"
        | "people"
        | "gerencia"
      estado_pago: "pendiente" | "parcial" | "pagado"
      estado_proyecto: "activo" | "pausado" | "entregado" | "archivado"
      fase_proyecto: "1" | "2" | "3" | "4" | "5" | "6"
      paquete_servicio: "esencial" | "completo"
      perfil_cliente: "1" | "2" | "3"
      responsable_pendiente: "nosotros" | "cliente"
      rol_usuario: "admin" | "cliente"
      tipo_entregable:
        | "ficha_pago"
        | "bienvenida"
        | "agreement"
        | "demo_web"
        | "otro"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database["public"]

export type Tables<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Row"]
export type TablesInsert<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Update"]
export type Enums<T extends keyof DefaultSchema["Enums"]> =
  DefaultSchema["Enums"][T]
