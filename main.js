var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        brand: 'Vue Mastery',
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
                variantImage: './assets/green-socks.jpg',
                variantImageLink: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                variantQuantity: 10
            },
            {
                variantId: 4321,
                variantColor: 'Blue',
                variantImage: './assets/blue-socks.jpg',
                variantImageLink: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0
            }
        ],
        selectedVariant: 0,
        sizes: ["P", "M", "G"],
        cart: 0
    },
    computed: {
        cartIsEmpty() {
            return this.cart <= 0;
        },
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        imageLink() {
            return this.variants[this.selectedVariant].variantImageLink;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        }
    },
    methods: {
        addToCart() {
            this.cart++;
        },

        removeFromCart() {
            if (this.cart > 0)
                this.cart--;
        },

        showProductVariant(index) {
            this.selectedVariant = index;
            console.log(this.selectedVariant);            
        }
    }
})


//https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg