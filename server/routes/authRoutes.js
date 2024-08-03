import express from "express";
import { adminLogin ,studentLogin,validateAdminToken} from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/admin", adminLogin);

authRoutes.post('/student',  studentLogin);

authRoutes.get("/vadmin",validateAdminToken)


export default authRoutes;
