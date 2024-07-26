import Student from '../schemas/studentSchema.js'; // Adjust the path to your Student model

// Controller to create a new student
export const createStudent = async (req, res) => {
  try {
    const { name, studentId, email, phone, branch, year } = req.body;

    // Create a new student document
    const newStudent = new Student({
      name,
      studentId,
      email,
      phone,
      branch,
      year,
    });

    // Save the student document to the database
    const savedStudent = await newStudent.save();

    // Respond with the created student
    res.status(201).json({
      message: 'Student created successfully',
      student: savedStudent,
    });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
