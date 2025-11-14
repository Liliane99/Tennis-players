import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ _id: false })
export class CountrySchema {
  @Prop({ required: true })
  picture: string;

  @Prop({ required: true })
  code: string;
}

@Schema({ _id: false })
export class DataSchema {
  @Prop({ required: true })
  rank: number;

  @Prop({ required: true })
  points: number;

  @Prop({ required: true })
  weight: number; 

  @Prop({ required: true })
  height: number; 

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, type: [Number] })
  last: number[]; 
}

export type PlayerDocument = PlayerSchema & Document;

@Schema({ 
  timestamps: true,
  collection: 'players'
})
export class PlayerSchema {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  firstname: string; 

  @Prop({ required: true })
  lastname: string; 

  @Prop({ required: true, unique: true })
  shortname: string; 
  @Prop({ 
    required: true, 
    enum: ['M', 'F'],
    type: String
  })
  sex: 'M' | 'F'; 

  @Prop({ required: true })
  picture: string;

  @Prop({ required: true, type: CountrySchema })
  country: CountrySchema;

  @Prop({ required: true, type: DataSchema })
  data: DataSchema;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PlayerMongoSchema = SchemaFactory.createForClass(PlayerSchema);
