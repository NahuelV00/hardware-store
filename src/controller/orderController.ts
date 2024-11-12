import {Response} from 'express'
import {CustomErrorImpl, CustomRequest, NewOrderProps} from "../types/types";
import {createOrderService} from "../services/OrderService";

const createOrderController = async (req: CustomRequest, res: Response) => {
    const data: NewOrderProps = req.body
    const userId = req.userId
    if (!userId) return res.status(401).json({
            success: false,
            message: "Unauthorized",
        }
    )
    try {
        const newOrder = await createOrderService(userId, data.items, data.address, data.shippingMethod)
        return res.status(201).json({
            success: true,
            message: "Order created",
            data: newOrder,
        });
    } catch (error) {
        if (error instanceof CustomErrorImpl) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
}

export {createOrderController}