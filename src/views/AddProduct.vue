<template>
  <div class="container">
    <div v-if="loading">
      <div class="alert alert-info" role="alert">Loading...</div>
    </div>
    <div v-if="error">
      <div class="alert alert-danger" role="alert">{error}</div>
    </div>
    <div v-else class="card">
      <div class="card-header">
        <h3>Add Product</h3>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <label for="product-title" class="col-sm-2 col-form-label"
            >Title</label
          >
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              name="product-title"
              id="product-title"
              v-model="title"
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="product-description" class="col-sm-2 col-form-label"
            >Description</label
          >
          <div class="col-sm-10">
            <textarea
              class="form-control"
              id="product-description"
              name="product-description"
              v-model="description"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div class="row mb-3">
          <label for="product-price" class="col-sm-2 col-form-label"
            >Price</label
          >
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              name="product-price"
              id="product-price"
              v-model="price"
            />
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="addNewProduct()">
            Add Product
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUpdateProductsMutation } from "../generated/graphql";

export default defineComponent({
  setup() {
    const title = ref("");
    const description = ref("");
    const price = ref(0);
    const success = ref("");

    const router = useRouter();
    const route = useRoute();

    const {
      mutate: addProduct,
      loading,
      error,
      onDone,
    } = useUpdateProductsMutation({
      variables: {
        values: {
          Product: [
            {
              title: title.value,
              description: description.value,
              price: price.value,
            },
          ],
        },
      },
    });
    onDone((result) => {
      router.push({ name: "Products" });
      // router.go(0);
    });

    return {
      title,
      description,
      price,
      success,
      addProduct,
      loading,
      error,
      onDone,
    };
  },
  methods: {
    addNewProduct() {
      this.addProduct({
        values: {
          Product: [
            {
              title: this.title,
              description: this.description,
              price: this.price,
            },
          ],
        },
      });
    },
  },
});
</script>