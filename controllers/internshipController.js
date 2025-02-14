const internshipModel = require('../models/internshipModel');
const companyModel = require('../models/companyModel');
const validation = require('../validator/validation');
const moment = require('moment');

//Create internship:
const postInternship = async function (req, res) {
    try {
        const companyId = req.params.companyId;
        //Check if the provided 'companyId' is a valid ObjectId format
        if (!validation.checkObjectId(companyId)) {
            return res.status(400).send({ status: false, message: "Invalid companyId" });
        }

        const isExistcompany = await companyModel.findById(companyId);
        //if provided companyId company doesn't exist
        if (!validation.isEmpty(isExistcompany)) {
            return res.status(404).send({ status: false, message: "Company not found" });
        }

        //Check authorization
        if (isExistcompany._id != req.decodedToken.companyID) {
            return res.status(403).send({ status: false, message: "Unauthorized to post internship details" });
        }

        let data = req.body;
        if (!validation.isEmpty(data)) {
            return res.status(400).send({ status: false, message: "Provide data to post internship" });
        }

        //Destructure mandatory fields from request body
        const { category, position, internshipType, skillsRequired, eligibility, duration, location, applicationDeadline,
            numberOfOpenings, stipend, status } = data;

        //Validate mandatory details
        if (!validation.checkData(category)) {
            return res.status(400).send({ status: false, message: "Category is required" });
        }

        if (!validation.checkData(position)) {
            return res.status(400).send({ status: false, message: "Position is required" });
        }

        //if position of this company's internship already exist
        const isExistPosition = await internshipModel.findOne({ companyId: companyId, position: position });
        if (isExistPosition) {
            return res.status(409).send({ status: false, message: "An internship with the same position already exists for this company" });
        }

        if (!validation.checkData(skillsRequired)) {
            return res.status(400).send({ status: false, message: "SkillsRequired is required" });
        }

        if (!validation.checkData(eligibility)) {
            return res.status(400).send({ status: false, message: "Eligibility is required" });
        }

        if (!validation.checkData(duration)) {
            return res.status(400).send({ status: false, message: "Duration is required" });
        }

        if (location) {
            if (!validation.checkData(location.state)) {
                return res.status(400).send({ status: false, message: "State is required" })
            }

            if (!validation.checkData(location.city)) {
                return res.status(400).send({ status: false, message: "City is required" });
            }
        }

        if (!validation.checkData(applicationDeadline)) {
            return res.status(400).send({ status: false, message: "ApplicationDeadline is required" });
        }

        //Parsing the lastDateofAppling using moment.js in 'YYYY-MM-DD' format.
        const lastDateofApplying = moment(applicationDeadline, 'YYYY-MM-DD');

        //Checking is the parsed date isvalid
        if (!lastDateofApplying.isValid()) {
            return res.status(400).send({ status: false, message: "Invalid date format" });
        }

        //Get the current date
        const currentDate = moment();
        if (!lastDateofApplying.isAfter(currentDate)) {
            return res.status(400).send({ status: false, message: "Application deadline must be in the future." })
        }

        if (!numberOfOpenings) {
            return res.status(400).send({ status: false, message: "NumberOfOpenings is required" });
        }

        //numberOfOpenings should be a valid numeric value
        if (!validation.validateInput(numberOfOpenings)) {
            return res.status(400).send({ status: false, message: "Invalid numberOfOpenings" });
        }

        if (!validation.checkData(stipend)) {
            return res.status(400).send({ status: false, message: "Stipend is required" });
        }

        //Split the stipend string into minimum and maximum stipend values
        const [minimumStipend, maximumStipend] = stipend.split('-');


        if (isNaN(minimumStipend) || isNaN(maximumStipend)) {
            return res.status(400).send({ status: false, message: "Invalid stipend format" })
        }

        //Structure of internship show in database
        const newInternship = {
            companyId: isExistcompany,
            category,
            position,
            internshipType,
            skillsRequired,
            eligibility,
            duration,
            location,
            applicationDeadline: lastDateofApplying,
            numberOfOpenings,
            stipend: `${minimumStipend}-${maximumStipend}`,
            status
        }

        const createInternship = await internshipModel.create(newInternship);

        return res.status(201).send({ status: true, message: "Internship successfully posted", data: createInternship });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

//Update internship:
const updateInternship = async function (req, res) {
    try {
        const internshipId = req.params.internshipId;
        //Check if the provided 'internshipId' is a valid ObjectId format
        if (!validation.checkObjectId(internshipId)) {
            return res.status(400).send({ status: false, message: "Invalid internshipId" });
        }

        const isExistInternship = await internshipModel.findById( internshipId );
        if (!isExistInternship) {
            return res.status(404).send({ status: false, message: "Internship not found" });
        }

        //Check if the logged-in company is authorized to update the internship details
        if (isExistInternship.companyId != req.decodedToken.companyID) {
            return res.status(403).send({ status: false, message: "Unauthorized to update internship details" });
        }

        const data = req.body;
        //Check if request body is empty 
        if (!validation.isEmpty(data)) {
            return res.status(400).send({ status: false, message: "No fields provided for update" });
        }

        //Destructure mandatory fields from request body
        const { status, internshipType, duration, } = data;

        //Validate mandatory fields
        if (status) {
            if (!["active", "closed"].includes(status)) {
                return res.status(400).send({ status: false, message: "Invalid status value" })
            }
        }

        if (internshipType) {
            if (!["remote", "wfh", "wfo"].includes(internshipType)) {
                return res.status(400).send({ status: false, message: "Invalid internshipType value" })
            }
        }

        const updatedField = {
            status,
            internshipType,
            duration
        };

        //Update the internship
        const updatedInternship = await internshipModel.findOneAndUpdate({ _id: internshipId }, updatedField, { new: true });

        return res.status(200).send({ status: true, message: "Updated Succesfully", data: updatedInternship })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

//Get internship:
const getInternship = async function (req, res) {
    try {
        const filter = req.query;
        let fetchInternship;
        //If no query parameters provided by the student
        if (!validation.isEmpty(filter)) {
            fetchInternship = await internshipModel.find({ status: "active" }).populate('companyId');
        } else {
            const query = { status: "active" };
            //If student provides query parameters
            if (filter.category) { query.category = filter.category };
            if (filter.internshipType) { query.internshipType = filter.internshipType };
            if (filter.location) {
                if (filter.location.state) query['location.state'] = filter.location.state;
                if (filter.location.city) query['location.city'] = filter.location.city;
            }

            //Get all internships based on the provided query
            fetchInternship = await internshipModel.find(query).populate('companyId');
        }
        //Format the response to include company name along with other internship details
        const formattedInternships = fetchInternship.map(internship => {
            return {
                By: internship.companyId.companyName, 
                category: internship.category,
                position: internship.position,
                internshipType: internship.internshipType,
                skillsRequired: internship.skillsRequired,
                eligibility: internship.eligibility,
                duration: internship.duration,
                location: internship.location,
                applicationDeadline: internship.applicationDeadline,
                numberOfOpenings: internship.numberOfOpenings,
                stipend: internship.stipend,
                status: internship.status
            };
        });


        return res.status(200).send({ status: true, message: "Successfully fetched internships", data: formattedInternships });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

//Get internship by id:
const getInternshipById = async function (req, res) {
    try {
        //Extracted internshipId from request parameters
        const internshipId = req.params.internshipId;
        if (!validation.checkObjectId(internshipId)) {
            return res.status(400).send({ status: false, message: "Invalid internshipId" });
        }

        const isexistInternship = await internshipModel.findById(internshipId);
        if (!isexistInternship) {
            return res.status(400).send({ status: false, message: "Internship not found" });
        }

         //Check if the internship is active
        if (isexistInternship.status !== 'active') {
            return res.status(400).send({ status: false, message: "internship is closed" })
        }

        return res.status(200).send({ status: true, message: "Successfully fetched", data: isexistInternship })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}
module.exports = { postInternship, updateInternship, getInternship, getInternshipById }