import { Schema, model, InferSchemaType } from 'mongoose'

const noteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    title: { type: String, require: true },
    text: { type: String },
  },
  // createdAt & updatedAt auto by mongoDB
  { timestamps: true }
)

type NoteType = InferSchemaType<typeof noteSchema>

export default model<NoteType>('Note', noteSchema)
