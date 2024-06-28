import { defineStore } from 'pinia'
import { message } from 'ant-design-vue';

export const useCartStore = defineStore('cart', {
    state: () => {
        const storedCartItems = localStorage.getItem("cartItems");
        return { 
            cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
            cartTotalQuantity: 0,
            cartTotalAmount: 0, 
        }
    },
    getters: {
        itemsCount: (state) => state.cartItems.length,
        
    },
    actions: {
        addToCart(productAdded : any) {
            const itemIndex = this.cartItems.findIndex((item : any) => item._id === productAdded._id);
            if (itemIndex >= 0) {
                this.cartItems[itemIndex].cartQuantity += 1;
                message.success(`increased ${this.cartItems[itemIndex].name} cart quantity`);
            } else {
                const tempProduct = { ...productAdded, cartQuantity: 1 };
                this.cartItems.push(tempProduct);
                message.success(`${productAdded.name} added to cart`);
            }
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        },
        removeItemFromCart (productRemove : any) {
            const nextCartItems = this.cartItems.filter(
                (cartItem : any) => cartItem._id !== productRemove._id 
            );
            this.cartItems = nextCartItems
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems))
            message.error(`${productRemove.name} removed from cart`);
        },
        decreaseCart(productdecreased : any){
            const itemIndex = this.cartItems.findIndex(
                (cartItem : any) => cartItem._id === productdecreased._id
            )
            if (this.cartItems[itemIndex].cartQuantity > 1){
                this.cartItems[itemIndex].cartQuantity -= 1;
            }
            else if (this.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = this.cartItems.filter(
                    (cartItem : any) => cartItem._id !== productdecreased._id 
                );
                this.cartItems = nextCartItems
            }
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems))
        },
        increaseCart(productincreased : any){
            const itemIndex = this.cartItems.findIndex(
                (cartItem : any) => cartItem._id === productincreased._id
            )
                this.cartItems[itemIndex].cartQuantity += 1;
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems))
        },
        ClearCart(){
            this.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems))
        },
        getTotals () {
            let {total, quantity} = this.cartItems.reduce(
                (cartTotal : any, cartItem : any) => {
                    const {price, cartQuantity} = cartItem;
                    const itemTotal = price * cartQuantity;
                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );
            this.cartTotalAmount = total;
            this.cartTotalQuantity = quantity;
        }
    },
});
