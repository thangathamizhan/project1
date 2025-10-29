import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userData',
    required: true,
  }, assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true

  }
  , fileUrl: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now(

    )
  }, grade: { type: Number ,default: null },
  feedBack: { type: String , default: '' }
});

const Assignmentschema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now() },
  submissionCount: [submissionSchema],
  totalStudent: { type: Number, default: 0 }
});
const assignmentModel = mongoose.model('Assignment', Assignmentschema)
export default assignmentModel