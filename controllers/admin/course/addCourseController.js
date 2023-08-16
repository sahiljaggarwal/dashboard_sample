const Course = require('../../../models/Course')

async function addCourse(req, res){
    try {
        const {coverPicture, name, description, mainCourse} = req.body
        const addCourse = await new Course({
            coverPicture,
            name,
            description,
            mainCourse
        })
        await addCourse.save()
        return res.status(201).json({message: "Course Add Successfully", success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error", success: false})
    }
}

module.exports = addCourse