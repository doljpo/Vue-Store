var eventBus = new Vue();


Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },
    template: `
    <div>
            
        <ul>
            <span class="tab" :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs" @click="selectedTab = tab" :key="tab">
                    {{ tab }}
            </span>
        </ul>
        

        <div v-show="selectedTab === 'Reviews'">
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul v-else>
                <li v-for="review in reviews">
                    <p>Name: {{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>Review: {{ review.review }}</p>
                    <p>Recommend: {{ review.recommend }}</p>
                </li>
            </ul>
        </div>

        <div v-show="selectedTab === 'Make a Review'">
            <product-review></product-review>
        </div>        
    
  </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
});

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            <p>
                <label for="name">Name: </label>
                <input id="name" v-model="name" placeholder="name">
            </p>
            <p>
                <label for="review">Review: </label>
                <textarea id="review" v-model="review" placeholder="review"></textarea>
            </p>
            <p>
                <label for="rating">Rating: </label>
                <select id="rating" v-model.number="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </p>

            <p>Would you recommend this product?</p>

            <label> Yes
                <input type="radio" value="Yes" v-model="recommend"/>
            </label>
            <label> No
                <input type="radio" value="No" v-model="recommend"/>
            </label>            

            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = [];

            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
{/* <product-review @review-submitted="addReview"></product-review> */}
                eventBus.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
            }
            else {
                if (!this.name) this.errors.push("Name is required.");
                if (!this.review) this.errors.push("Review is required.");
                if (!this.rating) this.errors.push("Rating is required.");
                if (!this.recommend) this.errors.push("Recommend is required.");
            }
        }
    }
});

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

        <product-tabs :reviews="reviews"></product-tabs>
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
            sizes: ["P", "M", "G"],
            reviews: []
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        });
    }
    ,
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
        },
        addReview(productReview) {
            this.reviews.push(productReview);
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