const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['Todo', 'InProgress', 'Completed']
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;