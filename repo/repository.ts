import { Entity } from "@/domain/entity";

export interface Repository<T extends Entity<ID>, ID> {
    findById(id: ID): Promise<T | null>;
    findAll(): Promise<T[]>;
    save(entity: T): Promise<T>;
    update(id: ID, entity: Partial<T>): Promise<T>;
    delete(id: ID): Promise<void>;
}


  