import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Session {
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @prop({ required: true, default: true })
  valid: boolean;

  @prop({ required: true, default: false })
  isRefresh: boolean;
}

const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    timestamps: true,
  },
});

export default SessionModel;
