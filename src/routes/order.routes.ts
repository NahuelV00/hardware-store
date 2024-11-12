import express from "express";
import { Response, NextFunction} from 'express'
import {checkAuth} from "../middleware/checkAuth";
import {CustomRequest} from "../types/types";
import {createOrderController} from "../controller/orderController";

const router = express.Router()

router.post('/', (req: CustomRequest, res: Response, next: NextFunction) => {
        checkAuth(req, res, next);
    },
    (req: CustomRequest, res: Response) => {
        createOrderController(req, res)
    }
)

export default router;