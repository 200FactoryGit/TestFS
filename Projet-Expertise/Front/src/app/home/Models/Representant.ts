import {Client} from "./Client";

export class Representant {
  id: number;
  clientid: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  observation: string;
  qualite: string;
  departement: string;
  client: Client;
}
