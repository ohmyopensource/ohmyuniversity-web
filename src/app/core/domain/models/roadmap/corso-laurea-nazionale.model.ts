export interface CorsoLaureaNazionale {
  id: string;
  annoAccademico: number;
  ateneoNome: string;
  area: string | null;
  gruppoNome: string | null;
  classeLaureaCod: string;
  classeLaureaDes: string | null;
  nomeCorso: string;
  tipoCorso: string;
  provincia: string | null;
  comune: string | null;
  accesso: string | null;
  didattica: string | null;
  linkRicerca: string;
}
