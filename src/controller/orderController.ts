import {Response} from 'express'
import {
    CustomErrorImpl,
    CustomRequest,
    NewOrderProps,
    OrderStatus,
    UpdateOrderStatusProps
} from "../types/types";
import {
    createOrderService,
    getAllOrdersService,
    getOrderByIdService,
    updateStatusOrderService
} from "../services/OrderService";
import {isAdmin} from "../services/authServices";
import {Order} from "@prisma/client";

const getAllOrderController = async (req: CustomRequest, res: Response) => {
    const userId = req.userId
    if (!userId) return res.status(401).json({success: false, message: "Unauthorized"})
    try {
        if (await !isAdmin(userId as string)) {
            new CustomErrorImpl(404, "Unauthorized.");
        }
        const orders = await getAllOrdersService()
        return res.status(200).json({
            success: true,
            message: "Orders retrieved correctly.",
            data: orders,
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
        if(!userId) throw new Error("User id is required");
        const isAdminUser = await isAdmin(userId as string)

        const currentOrder = await getOrderByIdService(orderId)
        if (!currentOrder) {
            throw new CustomErrorImpl(404, "Order not found.")
        }

        validateOrderModificationPermissions(currentOrder, isAdminUser, userId, data.status)

        const modifiedOrder = await updateStatusOrderService(orderId, data.status)

        return res.status(200).json({
            success: true,
            message: "Order status modified correctly.",
            data: modifiedOrder,
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

const validateOrderModificationPermissions = (
    order: Order,
    isAdminUser: boolean,
    userId: string,
    status: OrderStatus
) => {
    if (!isAdminUser) {
        if (order.userId !== userId) {
            throw new CustomErrorImpl(403, "You can only cancel your own orders.");
        }
        if (order.status !== OrderStatus.PENDING) {
            throw new CustomErrorImpl(403, "You can only cancel orders that are in 'PENDING' status.");
        }
        if (status !== OrderStatus.CANCELLED) {
            throw new CustomErrorImpl(403, "You can only cancel orders.");
        }
    }
}

export {createOrderController, updateStatusOrderController, getAllOrderController}