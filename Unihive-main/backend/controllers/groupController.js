// backend/controllers/groupController.js
import Group from '../models/groupModel.js';
import User from '../models/userModel.js';

// Create a group
export const createGroup = async (req, res) => {
  const { groupName, participants } = req.body;

  try {
    // Check if participants exist (including the creator)
    const user = await User.findById(participants[0]);  // Assuming the first participant is the creator

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const newGroup = new Group({
      name: groupName,
      createdBy: participants[0],
      members: participants,  // Add members to the group
    });

    const savedGroup = await newGroup.save();

    // Add group to the user's groups
    user.groups.push(savedGroup._id);
    await user.save();

    res.status(201).json(savedGroup);  // Return the created group
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get group details
export const getGroupDetails = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('members', 'username');
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
