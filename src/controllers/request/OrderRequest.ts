export class OrderRequest {
    userId: number;
    address: Address
    products: OrderItemDto[] //array with product id's and quantities
}
class Address {
    region: string;
    city: string;
    street: string;
    numOfBuild: string;
}
export class OrderItemDto {
    productId:number
    quantity:number
}
