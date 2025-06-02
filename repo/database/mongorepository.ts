import { Entity } from "@/domain/entity";
import {
    Collection,
    Filter,
    ObjectId,
    OptionalUnlessRequiredId,
    WithId,
  } from "mongodb";
import { Repository } from "../repository";
  
export class MongoRepository<T extends Entity<ObjectId>> implements Repository<T, ObjectId> {
    protected collection: Collection<T>;
  
    constructor(collection: Collection<T>) {
      this.collection = collection;
    }
  
    async findById(id: ObjectId): Promise<T | null> {
      const filter: Filter<T> = { _id: id } as Filter<T>;
      return await this.collection.findOne(filter) as T;
    }

  
    async findAll(): Promise<T[]> {
      return await this.collection.find().toArray() as T[];
    }
  
    async save(entity: Omit<T, "_id">): Promise<T> {
      const result = await this.collection.insertOne(entity as OptionalUnlessRequiredId<T>);
      return {
        ...entity,
        _id: result.insertedId as ObjectId
      } as T;
    }
  
    async update(id: ObjectId, entity: Partial<T>): Promise<T> {
      const filter: Filter<T> = { _id: id } as Filter<T>;
      await this.collection.updateOne(filter, { $set: entity });
      const updated = await this.findById(id);
      if (!updated) throw new Error("Entity not found after update");
      return updated as T;
    }
  
    async delete(id: ObjectId): Promise<void> {
      const filter: Filter<T> = { _id: id } as Filter<T>;
      await this.collection.deleteOne(filter);
    }
  }
  