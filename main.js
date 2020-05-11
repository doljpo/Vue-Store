Vue.component('product', {
    template: `
    <div class="product">
        <div class="product-image">
            <a :href="imageLink" target="_blank">
                <img :src="image">
            </a>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p :class="{ 'line-through':  !onSale || !inStock }">On Sale!</p>
            <p v-if="inStock && onSale">In Stock</p>
            <p v-else style="text-decoration: line-through;">Out of Stock</p>

            <h2>Details</h2>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
                @mouseover="showProductVariant(index)" :style="{'background-color': variant.variantColor}">
            </div>
            <div>
                <span v-for="size in sizes" style="margin-right: 10px;">{{ size }}</span>
            </div>

            <button @click="addToCart" :disable="!inStock || !onSale"
                :class="{ disabledButton: !inStock || !onSale }">Add to Cart</button>
            <button @click="removeFromCart" :disable="cartIsEmpty" :class="{ disabledButton: cartIsEmpty }">Remove
                from Cart</button>
            <div class="cart">
                <p>Cart ({{ cart }})</p>
            </div>

        </div>
    </div>        
    `,
    data() {
        return {
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
        }
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
        }
    }
});

var app = new Vue({
    el: '#app'
})


//https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg