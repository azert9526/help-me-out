import { Entity } from "./entity";

export enum Roles {
  user, admin
}

export interface User<ID> extends Entity<ID> {
  name: string;
  password: string;
  email: string;
  role: Roles;
}
