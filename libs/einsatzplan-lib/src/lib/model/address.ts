import {ID} from "@einsatzplan/einsatzplan-lib/types/ID.type";

export interface Address {
  id: ID<'Address'>;
  street: string;
  zip: string;
  city: string;
  country: string;
}
