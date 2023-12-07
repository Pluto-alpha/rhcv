const Visitor = require('../models/Visitor');
const asyncHandler = require('express-async-handler')
//const { visiterValid } = require('../config/validator');

/**
 * @des Create Visitor
 * @route POST /api/v1/visitor
 * @access private
 */

const addVisitor = asyncHandler(async (req, res) => {
    try {
        return res.send("addvisitor")
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
        return res.send("GetAllvisitor")

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
        return res.send("GetVisitor")

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
        return res.send("updateVisitor")

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
        return res.send("deleteVisitor")

    } catch (err) {
        return res.status(500).json({ status: false, msg: 'Internal Server Error', err: err.message });
    }
});

module.exports = { addVisitor, GetAllvisitor, GetVisitor, updateVisitor, deleteVisitor }