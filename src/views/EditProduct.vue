<template>
  <div class="container">
    <div v-if="loading">
      <div class="alert alert-info" role="alert">Loading...</div>
    </div>
    <div v-if="error">
      <div class="alert alert-danger" role="alert">{error}</div>
    </div>
    <div v-if="product" class="card">
      <div class="card-header">
        <h3>Edit Product</h3>
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
              name="title"
              id="title"
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
              id="description"
              name="description"
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
              name="price"
              id="price"
              v-model="price"
            />
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="editTheProduct()">
            Save Product
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-info" role="alert">
        Not such product with this id
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useResult } from "@vue/apollo-composable";
import {
  Product,
  useGetProductQuery,
  useUpdateProductsMutation,
} from "../generated/graphql";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    let product = ref();
    const title = ref("");
    const description = ref("");
    const price = ref(0);

    const { result, loading, error } = useGetProductQuery({
      id: route.params.id.toString(),
    });

    product = useResult(result, null, (data) => data?.get);

    watch(product, (product, prev) => {
      title.value = (product as Product).title;
      description.value = (product as Product).description;
      price.value = (product as Product).price || 0;

    });

    const {
      mutate: editProduct,
      loading: d_loading,
      error: d_error,
      onDone,
    } = useUpdateProductsMutation({
      variables: {
        values: {
          Product: [{}],
        },
      },
    });
    onDone((result) => {
      router.push({ name: "Products" });
      // router.go(0);
    });
    return {
      product,
      title,
      description,
      price,
      loading: loading || d_loading,
      error: error || d_error,
      editProduct,
    };
  },
  methods: {
    editTheProduct() {
      console.log(this.title);
            console.log(this.description);
      console.log(this.price);

      this.editProduct({
        values: {
          Product: [
            {
              hypi: {
                id: this.$route.params.id.toString(),
              },
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