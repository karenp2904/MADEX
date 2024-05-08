export interface IUsuario {
    id_usuario: number;
    nombre_usuario: string;
    apellido_usuario: string;
    correo: string;
    contraseña: string;
    tipo_documento: string;
    telefono: string;
    idRol: number;
    nitEmpresa: string;
    nombreEmpresa: string;
    razonSocial: string | null;
    cargo: string;
    rubro: string;
  }