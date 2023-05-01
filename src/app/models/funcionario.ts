import { Cargo } from './cargo';
export interface Funcionario {
    id?: number;
    nome: string;
    email: string;
    cpf: string;
    senha?: string;
    foto?:string
    idCargo:number
    cargo?:Cargo
    perfil?: string;
   
    
}
