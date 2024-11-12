import express from "express";
import { Response, NextFunction} from 'express'
import {checkAuth} from "../middleware/checkAuth";
import {CustomRequest} from "../types/types";
import {createOrderController, updateStatusOrderController} from "../controller/orderController";

const router = express.Router()

router.post('/', (req: CustomRequest, res: Response, next: NextFunction) => {
        checkAuth(req, res, next);
    },
    (req: CustomRequest, res: Response) => {
        createOrderController(req, res)
    }
)

router.patch('/:orderId', (req: CustomRequest, res: Response, next: NextFunction) => {
        checkAuth(req, res, next);
    },
    (req: CustomRequest, res: Response) => {
        updateStatusOrderController(req, res)
    }
)

export default router;