import User from "../models/User.js";

export const getStudents = async (req, res) => {
  try {
    const students = await User.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addNewStudent = async (req, res) => {
  // Monthly Fee
  const Fee = (Number(req.body.quarterFee) / 3).toString();
  const newStudent = new User({
    name: req.body.name,
    parentName: req.body.parentName,
    parentPhone: req.body.parentPhone,
    class: req.body.class,
    monthlyFee: req.body.monthlyFee,
    quarterFee: req.body.quarterFee,
    annualFee: req.body.annualFee,
    dayAdmission: req.body.dayAdmission,
    typeCourse: req.body.typeCourse,
    isPaid: req.body.isPaid,
  });
  newStudent.save((err) => {
    if (err) {
      res.status(500).send("Error saving");
    } else {
      res.status(200).send(newStudent);
    }
  });
};

export const updateStudent = async (req, res) => {
  const id = req.params.id;

  User.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      parentName: req.body.parentName,
      parentPhone: req.body.parentPhone,
      class: req.body.class,
      monthlyFee: req.body.monthlyFee,
      quarterFee: req.body.quarterFee,
      annualFee: req.body.annualFee,
      dayAdmission: req.body.dayAdmission,
      typeCourse: req.body.typeCourse,
      isPaid: req.body.isPaid,
    },
    { new: true },
    (err, updatedStudent) => {
      if (err) {
        res.status(500).send("Error updating student");
      } else {
        res.status(200).send(updatedStudent);
      }
    }
  );
};

export const deleteStudent = async (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, (err) => {
    if (err) {
      res.status(500).send("Error deleting student");
    } else {
      res.status(200).send("Student deleted");
    }
  });
};
