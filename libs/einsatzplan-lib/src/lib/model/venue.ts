import {ID} from "@einsatzplan/einsatzplan-lib/types/ID.type";
import {Address} from "./address";

export interface Venue {
  id: ID<'Venue'>;
  name: string;
  address: Address;
  directions?: string | undefined;
}
