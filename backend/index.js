const express = require("express");
const cors = require("cors");
require("./config");

const {
  ComplaintSchema,
  UserSchema,
  AssignedComplaint,
  MessageSchema,
} = require("./Schema");
const app = express();
const PORT = 8000;

/**************************************** */
app.use(express.json());
app.use(cors());
/********************************************** */

/******************message *******************************/
app.post("/messages", async (req, res) => {
  try {
    const { name, message, complaintId } = req.body;
    const messageData = new MessageSchema({
      name,
      message,
      complaintId,
    });
    const messageSaved = await messageData.save();
    res.status(200).json(messageSaved);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.get("/messages/:complaintId", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const messages = await MessageSchema.find({ complaintId }).sort(
      "-createdAt"
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});

/***********for signup user************************************** */

app.post("/SignUp", async (req, res) => {
  const user = new UserSchema(req.body);
  try {
    const resultUser = await user.save();
    res.send(resultUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

//////////////////////for login user///////////////////
app.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User doesn`t exists" });
  }
  if (user.email === email && user.password === password) {
    res.json(user);
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

//////////////////////////for fetching agent in admin portal///////////////
app.get("/AgentUsers", async (req, res) => {
  try {
    const { userType } = req.params;
    const users = await UserSchema.find({ userType: "Agent" });
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//////////////////////////for fetching ordinary user in admin portal///////////////
app.get("/OrdinaryUsers", async (req, res) => {
  try {
    const users = await UserSchema.find({ userType: "Ordinary" });
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//////////////////////////for fetching ordinary user in admin portal///////////////
app.get("/AgentUsers", async (req, res) => {
  try {
    // const { userType } = req.params;
    const agentUsers = await UserSchema.find({ userType: "Agent" });
    if (agentUsers.length === 0) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res.status(200).json(agentUsers);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//////////////////displaying agent with id/////////////////
app.get("/AgentUsers/:agentId", async (req, res) => {
  try {
    const { agentId } = req.params;
    const user = await UserSchema.findOne({ _id: agentId });
    if (user.userType === "Agent") {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
////////////for deleting the user from admin portal////////////////
app.delete("/OrdinaryUsers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserSchema.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      await UserSchema.deleteOne({ _id: id });
      await ComplaintSchema.deleteOne({ userId: id });
      return res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

///////////////complaint register by user and its status checking///////////////
app.post("/Complaint/:id", async (req, res) => {
  const UserId = req.params.id;
  try {
    const user = await UserSchema.findById(UserId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const complaint = new ComplaintSchema(req.body);
      let resultComplaint = await complaint.save();
      res.send(resultComplaint).status(200);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register complaint" });
  }
});

/////////////////for the all complaints made by the single user/////////////
app.get("/status/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const comment = await ComplaintSchema.find({ userId: userId });
      res.json(comment);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

/////////////status of complaint in admin page/////////////////////////////////////////
app.get("/status", async (req, res) => {
  try {
    const complaint = await ComplaintSchema.find();
    res.json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve Complaints" });
  }
});

////////////Assigned complaint by admin//////////////////
app.post("/assignedComplaints", (req, res) => {
  try {
    const assignedComplaint = req.body;
    AssignedComplaint.create(assignedComplaint);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add assigned complaint" });
  }
});

////////////////complaints in agent homepage////////////////////
app.get("/allcomplaints/:agentId", async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const complaints = await AssignedComplaint.find({ agentId: agentId });

    // Fetch all complaintIds from the complaints
    const complaintIds = complaints.map((complaint) => complaint.complaintId);

    // Fetch the corresponding complaints with their names and cities
    const complaintDetails = await ComplaintSchema.find({
      _id: { $in: complaintIds },
    });

    // Merge the complaint details into the complaints array
    const updatedComplaints = complaints.map((complaint) => {
      const complaintDetail = complaintDetails.find(
        (detail) => detail._id.toString() === complaint.complaintId.toString()
      );
      return {
        ...complaint,
        name: complaintDetail.name,
        city: complaintDetail.city,
        state: complaintDetail.state,
        address: complaintDetail.address,
        pincode: complaintDetail.pincode,
        comment: complaintDetail.comment,
      };
    });
    res.json(updatedComplaints);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get complaints" });
  }
});

////////////////////updating the user profile by admin/////////////////////////////

app.put("/user/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, email, phone } = req.body;
    const user = await UserSchema.findByIdAndUpdate(
      _id,
      { name, email, phone },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the user" });
  }
});

////////////////updating the complaint from the agent/////////////////////////////
app.put("/complaint/:complaintId", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;
    if (!complaintId || !status) {
      return res.status(400).json({ error: "Missing complaintId or status" });
    }

    const updatedComplaint = await ComplaintSchema.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );

    const assigned = await AssignedComplaint.findOneAndUpdate(
      {complaintId: complaintId},
      { status },
      { new: true }
    );

    if (!updatedComplaint && !assigned) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json(updatedComplaint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update complaint" });
  }
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));