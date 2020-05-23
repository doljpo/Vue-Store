Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `       
        <div>
            <h2>Details</h2>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>    
    `
});

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <a :href="imageLink" target="_blank">
                <img :src="image">
            </a>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p :class="{ 'line-through': !inStock }">On Sale!</p>
            <p v-if="inStock">In Stock</p>
            <p v-else style="text-decoration: line-through;">Out of Stock</p>

            <product-details :details="details"></product-details>

            <p>User is premium? {{ premium }}</p>
            <p>Shipping: {{ shipping }}</p>

            <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
                @mouseover="showProductVariant(index)" :style="{'background-color': variant.variantColor}">
            </div>
            <div>
                <span v-for="size in sizes" style="margin-right: 10px;">{{ size }}</span>
            </div>

            <button @click="addToCart" :disable="!inStock"
                :class="{ disabledButton: !inStock }">Add to Cart</button>
            <button @click="removeFromCart" :disable="cartIsEmpty" :class="{ disabledButton: cartIsEmpty }">Remove
                from Cart</button>

        </div>
    </div>        
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
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
            sizes: ["P", "M", "G"]
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
            return this.variants[this.selectedVariant].variantQuantity > 0;
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return "2.99";
            }
        }
    },
    methods: {
        addToCart() {
            if (this.inStock)
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },

        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },

        showProductVariant(index) {
            this.selectedVariant = index;
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            this.cart.splice(this.cart.indexOf(id), 1);
        }
    }
})


//https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg