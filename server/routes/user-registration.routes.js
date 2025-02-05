
import express from 'express';
import {new_register_controller , existing_customer_check_controller} from "../controller/user-registration.controller.js";

const router =  express.Router();

router.post("/registrationUser", new_register_controller);
router.get("/checkUser",existing_customer_check_controller);

export default router;