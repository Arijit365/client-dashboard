
import express from 'express';
import {new_register_controller } from "../controller/user-registration.controller.js";

const router =  express.Router();

router.post("/registrationUser", new_register_controller);

export default router;