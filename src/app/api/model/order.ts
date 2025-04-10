/**
 * My API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { User } from './user';
import { Cart } from './cart';


export interface Order { 
    id?: number;
    orderDate?: string;
    orderAddress?: string;
    carts?: Array<Cart>;
    status?: Order.StatusEnum;
    user?: User;
}
export namespace Order {
    export type StatusEnum = 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';
    export const StatusEnum = {
        Pending: 'PENDING' as StatusEnum,
        Shipped: 'SHIPPED' as StatusEnum,
        Delivered: 'DELIVERED' as StatusEnum,
        Canceled: 'CANCELED' as StatusEnum
    };
}


