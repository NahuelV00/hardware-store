import {Response} from 'express'
import {CustomErrorImpl, CustomRequest, NewOrderProps, UpdateOrderStatusProps} from "../types/types";
import {createOrderService, updateStatusOrderService} from "../services/OrderService";
import {isAdmin} from "../services/authServices";

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

const updateStatusOrderController = async (req: CustomRequest, res: Response) => {
    const data: UpdateOrderStatusProps = req.body
    let orderId: string = req.params.orderId;
    let userId = req.userId;
    try {
        if (await isAdmin(userId as string)) {
            const modifiedOrder = await updateStatusOrderService(orderId, data.status);
            return res.status(200).json({
                success: true,
                message: "Order status modified correctly.",
                data: modifiedOrder,
            });
        }
        throw new CustomErrorImpl(404, "Unauthorized.");
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

export {createOrderController, updateStatusOrderController}