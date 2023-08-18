const express = require("express");
const {
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob,
  showStats,
} = require("../Controllers/jobs");
const testUser = require("../middleware/testUser");
const router = express.Router();

router.route("/").get(getAllJobs).post(testUser,createJob);
router.route('/stats').get(showStats);
router.route("/:id").get(getJob).delete(testUser , deleteJob).patch(testUser,updateJob);

module.exports =  router ;
