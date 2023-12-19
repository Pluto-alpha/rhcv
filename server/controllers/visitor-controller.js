const Visitor = require('../models/Visitor');
const asyncHandler = require('express-async-handler');
const { visiterValid } = require('../config/validator');
const path = require('path');
const fs = require('fs')
const generatePdf = require('../config/generatePdf');
const mongoose = require('mongoose');

/**
 * @des Create Visitor
 * @route POST /api/v1/visitor
 * @access private
 */

const addVisitor = asyncHandler(async (req, res) => {
    try {
        const { type, passNo, visitorName, fatherName, advocateName, address, mobile, email, idProofType, idProofNo, validUpTo, validOn } = req.body;
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
            visitorName,
            fatherName,
            advocateName,
            address,
            mobile,
            email,
            idProofType,
            idProofNo,
            validUpTo,
            validOn,
            user_id: req.user.id,
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
        const visitor = await Visitor.find({ user_id: req.user.id }).sort({ createdAt: -1 });
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
 * @route GET /api/v1/visitor/:id
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
 * @route PUT /api/v1/visitor/:id
 * @access private
 */

const updateVisitor = asyncHandler(async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" })
        }
        if (visitor.user_id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User cannot have permission to update other visitor' });
        }
        const updatedVisitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        return res.status(200).json({ updatedVisitor, message: 'Visitor updated successfully' })
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});
/**
 * @des Delete Visitor
 * @route DELETE /api/v1/visitor/:id
 * @access private
 */

const deleteVisitor = asyncHandler(async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" })
        }
        if (visitor.user_id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User cannot have permission to delete other visitor' });
        }
        await Visitor.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: 'Visitor deleted successfully' });
    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});

/**
 * @des Create Visitor pass
 * @route GET /visitor/generate-pass/:id
 * @access private
 */
const visitorPass = asyncHandler(async (req, res) => {
    try {
        const visitorId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(visitorId)) {
            return res.status(400).json({ success: false, msg: 'Invalid visitor ID' });
        }
        const visitor = await Visitor.findById(visitorId);
        if (!visitor) {
            return res.status(404).send('Visitor not found');
        }
        const fileName = `PASS-NO-${visitor.passNo}.pdf`;
        const url = `http://localhost:5001/static/${fileName}`;
        const pdfBuffer = await generatePdf(visitor);
        const filePath = path.resolve(__dirname, `../public/${fileName}`);
        fs.writeFileSync(filePath, pdfBuffer);
        const response = {
            success: true,
            msg: 'File Download successful',
            downloadUrl: url,
        };
        res.status(200).json(response);
        //res.download(filePath, fileName);  
    } catch (err) {
        res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});


module.exports = { addVisitor, GetAllvisitor, GetVisitor, updateVisitor, deleteVisitor, visitorPass }