const courses = [
    { id: 1, name: "Mathematics", teacher: "Ruben", time: "2pm" },
    { id: 2, name: "Literature", teacher: "Jennifer", time: "10am" },
    { id: 3, name: "English", teacher: "Mohmmad", time: "12pm" },
]

const getCourse = (req, res) => {
    return res.json(courses)
}

const createCourse = (req, res) => {
    return res.send("course has been added")
}

const updateCourse = (req, res) => {
    return res.send("course is updated successfully")
}

const deleteCourse = (req, res) => {
    return res.send("course has been deleted")

}

module.exports = {getCourse, createCourse, updateCourse, deleteCourse}