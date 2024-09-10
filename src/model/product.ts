import { Schema, model } from "mongoose";

interface productType {
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  thumbnail: string;
  images: string[];
}

const productSchema = new Schema<productType>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: {
    type: Number,
    required: true,
    min: [0, "wrong min  discount"],
    max: [50, "wrong max  discount"],
  },
  rating: {
    type: Number,
    required: true,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
  },
  brand: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
});

export const Product = model<productType>("Product", productSchema);
