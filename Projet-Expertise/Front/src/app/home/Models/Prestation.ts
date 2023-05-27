
import {Branche} from "./Branche";
import {Type} from "./Type";
import {Image} from "./Image";
import {Representant} from "./Representant";
import {User} from "./User";
import {Decompte} from "./Decompte";

export class Prestation {
  id: number;
  datedebutmission: Date;
  assure: string;
  datesinistre: Date;
  dateexpertise: Date;
  gouvernorat: string;
  estimation: number;
  numeropolice: string;
  referencecompte: string;
  idtype: number;
  idbranche: number;
  idrepresentant: number;
  representant: Representant;
  branche: Branche;
  type: Type;
  images: Image[];
  createdat :  Date;
  tiers: string;
  expert: User;
  montant: Decompte;
  identifiant: string;
  refInterneClient: string;
  methodeReceptionMission: string;
  numeroPoliceTier: string;
  avisTechnique: string;
}
