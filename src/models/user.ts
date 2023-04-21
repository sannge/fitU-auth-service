import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  name: string;
  goal: string;
  gender: string;
  bodyType: string;
  height: { feet: string; inches: string };
  weight: { lb: string; decimal: string };
  dob: {
    month: string;
    day: string;
    year: string;
  };
  activityLevel: String;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  name: string;
  goal: string;
  gender: string;
  bodyType: string;
  height: { feet: string; inches: string };
  weight: { lb: string; decimal: string };
  dob: {
    month: string;
    day: string;
    year: string;
  };
  activityLevel: String;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    bodyType: {
      type: String,
      required: true,
    },
    height: {
      feet: { type: String, required: true },
      inches: { type: String, required: true },
    },
    weight: {
      lb: { type: String, required: true },
      decimal: { type: String, required: true },
    },
    dob: {
      month: { type: String, required: true },
      day: { type: String, required: true },
      year: { type: String, required: true },
    },
    activityLevel: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  // if (this.isModified("dob")) {
  //   const { month, day, year } = this.get("dob");
  //   let birthday = "";
  //   birthday += month + "/" + day + "/" + year;
  //   const date = new Date(birthday);
  //   this.set("dob", date);
  // }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
