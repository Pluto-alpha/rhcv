const Visitor = require('../models/Visitor');
const asyncHandler = require('express-async-handler');
const { visiterValid } = require('../config/validator');

/**
 * @des Create Visitor
 * @route POST /api/v1/visitor
 * @access private
 */

const addVisitor = asyncHandler(async (req, res) => {
    try {
        const { type, passNo, fatherName, advocateName, address, mobile, email, idProofType, idProofNo, validUpTo, validOn } = req.body;
        const visitorAvail = await Visitor.findOne({ $or: [{ email }, { mobile }] });
        if (visitorAvail) {
            return res.status(400).json({ msg: 'Visiter is already exist' })
        }
        const { error } = visiterValid.validate(req.body, { abortEarly: false, });
        if (error) {
            return res.status(400).json({ success: false, msg: error.details[0] });
        }
        const visitor = await Visitor.create({
            type,
            passNo,
            fatherName,
            advocateName,
            address,
            mobile,
            email,
            idProofType,
            idProofNo,
            validUpTo,
            validOn,
        });
        if (visitor) {
            return res.status(200).json({ visitor, msg: 'Visitor created successfully' })
        } else {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
})
/**
 * @des Get All Visitor
 * @route GET /api/v1/visitor
 * @access private
 */

const GetAllvisitor = asyncHandler(async (req, res) => {
    try {
        const visitor = await Visitor.find({});
        if (!visitor) {
            return res.status(404).json(visitor, "message: Visitors list not found")
        } else {
            return res.status(200).json(visitor);
        }
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});
/**
 * @des Get single Visitor
 * @route GET /api/v1/visitor:id
 * @access private
 */

const GetVisitor = asyncHandler(async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" })
        } else {
            return res.status(200).json(visitor);
        }
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});
/**
 * @des Update Visitor
 * @route PUT /api/v1/visitor:id
 * @access private
 */

const updateVisitor = asyncHandler(async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" })
        }
        const updatedvisitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        return res.status(200).json({ updatedvisitor, message: 'Visitor updated successfully' })
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});
/**
 * @des Delete Visitor
 * @route DELETE /api/v1/visitor:id
 * @access private
 */

const deleteVisitor = asyncHandler(async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" })
        }
        await Visitor.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: 'Visitor deleted successfully' });
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});

module.exports = { addVisitor, GetAllvisitor, GetVisitor, updateVisitor, deleteVisitor }