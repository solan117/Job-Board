import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    },
    date: {type: Number, required: true}
});

JobApplicationSchema.index({jobId: 1});
JobApplicationSchema.index({companyId: 1});

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema)

export default JobApplication