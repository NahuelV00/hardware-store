import prismadb from "../config/db";
import {OrderStatus} from "@prisma/client";
import {CustomErrorImpl} from "../types/types";

const createOrderService = async (userId: string,
                                  items: { productId: string; quantity: number }[],
                                  address?: string | undefined,
                                  shippingMethod?: string | undefined) => {

    const orderItems = await Promise.all(items.map(async (item: { productId: string, quantity: number }) => {
        const product = await prismadb.product.findUnique({
            where: {id: item.productId},
            include: {stock: true}
        })
        if (!product) throw new CustomErrorImpl(200, `Product with ID: ${item.productId} not found`)
        if (!product.stock || product.stock.quantity < item.quantity) {
            throw new CustomErrorImpl(200,`Insufficient stock for product ${product.name}`);
        }
        await prismadb.stock.update({
            where: {productId: item.productId},
            data: {quantity: product.stock.quantity - item.quantity}
        })
        return {
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
            totalPrice: product.price * item.quantity
        }
    }))

    const totalAmount = orderItems.reduce((acc, item) => acc + item.totalPrice, 0)

    const order = await prismadb.order.create({
        data: {
            userId,
            orderItems: {
                create: orderItems
            },
            totalAmount,
            status: OrderStatus.PENDING,
            address,
            shippingMethod
        },
        include: {orderItems: true}
    })

    return order
}

export {createOrderService}