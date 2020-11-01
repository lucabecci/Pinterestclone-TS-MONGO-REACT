import { Schema, model, Document, SchemaOptions, SchemaTimestampsConfig } from "mongoose";

const photoSchema: Schema = new Schema(
  {
    title: <SchemaOptions> {
      type: String,
      required: true,
    },
    description: <SchemaOptions> {
      type: String,
      required: true,
    },
    imagePath: <SchemaOptions> {
      type: String,
      required: true,
    },
  },
  {
    timestamps: <SchemaTimestampsConfig> true,
  }
);

interface IPhoto extends Document {
  title: string;
  description: string;
  imagePath: string;
}

export default model<IPhoto>("Photo", photoSchema);
