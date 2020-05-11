var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/green-socks.jpg',
        imageLink: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
        onSale: true,
        details: [
            "80% cotton",
            "20% polyester",
            "Gender-neutral"
        ],
        variants: [
            {
                variantId: 1234,
                variantColor: 'Green',
                variantImage: './assets/green-socks.jpg'
            },
            {
                variantId: 4321,
                variantColor: 'Blue',
                variantImage: './assets/blue-socks.jpg'
            }
        ],
        sizes: ["P", "M", "G"],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart++;
        },

        removeFromCart() {
            if (this.cart > 0)
                this.cart--;
        },

        showProductVariant(variantColor) {
            this.image = variantColor;
        }
    }
})


//https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg