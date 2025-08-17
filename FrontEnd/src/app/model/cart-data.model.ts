export interface CartDataModel {
  Id: string,
  qty: number,
  name: string,
  price: number,
  description: string,
  image: string,
  pizzaCheck: boolean,
  ingTotalPrice?: number,
  ingId?: Array<Number>,
  ingName?: Array<string>
}