import { Schema, model } from 'mongoose';

// Interface for data type validation
interface LogEntry {
  data: {
    _id: Schema.Types.ObjectId;
    title: string;
    genre: string;
  };
  user: string;
  type: string;
}

// Define the schema
const logEntrySchema = new Schema<LogEntry>({
  data: {
      _id: { type: Schema.Types.ObjectId, required: true }, // Explicitly define _id as string
      title: { type: String, required: true },
      genre: { type: String, required: true },
  },
  user: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

// Create the model
const LogEntryModel = model<LogEntry>('LogEntry', logEntrySchema);

export default LogEntryModel;