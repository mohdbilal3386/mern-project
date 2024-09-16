import { model, Schema } from "mongoose";

interface userTypes {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  token: string;
}

const userSchema = new Schema<userTypes>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: { type: String, required: true, minlength: 6 },
  token: String,
});

export const User = model<userTypes>("User", userSchema);
