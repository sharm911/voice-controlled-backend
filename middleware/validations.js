const { check } = require("express-validator");

exports.registerUser = () => [
  check("fullName", "Full Name is required").not().isEmpty().isString(),
  check("email", "Enter Valid Email").isEmail(),
  check("password", "Password Minimum Length should be 5").isLength({ min: 5 }),
];

exports.loginUser = () => [
  check("email", "Enter Valid Email").isEmail(),
  check("password", "Password is required").exists(),
];

exports.CreateRoom = () => [
  check("name", "Name is required").not().isEmpty().isString(),
  check("type", "Room Type is required and must be string").not().isEmpty().isString(),
  check("roomOwner", "Room Owner is required and must be string").not().isEmpty().isString(),
];

exports.addDevice = () => [
  check("name", "Name is required").not().isEmpty().isString(),
  check("type", "Room Type is required and must be string").not().isEmpty().isString(),
  check("roomId", "Room Id is required and must be string").not().isEmpty().isString(),
  check("status", "Status is required and must be string").not().isEmpty().isString(),
];

exports.createRoutine = () => [
  check("name", "Name is required").not().isEmpty().isString(),
  check("time", "Routine time is required").not().isEmpty(),
  check("schedule", "Schedule (Ex. Monday, Tuesday..) is required").not().isEmpty().isString(),
  check("isEnabled", "Routine enabled value is required").not().isEmpty().isBoolean(),
  check("deviceId", "Device Id is required and must be Integer").not().isEmpty().isInt(),
  check("actionId", "Action Id is required and must be Integer").not().isEmpty().isInt(),
];