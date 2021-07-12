<template>
  <div>
    <div class="row mb-3">
      <div class="col-sm-2">
        <router-link :to="{ name: 'AddProduct' }" class="btn btn-primary"
          >Add Product</router-link
        >
      </div>
    </div>
    <div v-if="loading">
      <div class="alert alert-info" role="alert">Loading...</div>
    </div>
    <div v-if="error">
      <div class="alert alert-info" role="alert">{error}</div>
    </div>
    <table v-else class="table table-hover">
      <thead>
        <tr>
          <td>title</td>
          <td>description</td>
          <td>price</td>
          <td colspan="2">Actions</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in products" :key="product.node.hypi.id">
          <td>{{ product.node.title }}</td>
          <td>{{ product.node.description }}</td>
          <td>{{ product.node.price }}</td>
          <td>
            <router-link
              :to="{
                name: 'EditProduct',
                params: { id: product.node.hypi.id },
              }"
              class="btn btn-success"
              >Edit</router-link
            >
          </td>
          <td>
            <button
              class="btn btn-danger btn-sm"
              @click.prevent="
                deleteProduct({
                  arcql: `hypi.id = '${product.node.hypi.id}'`,
                })
              "
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useResult } from "@vue/apollo-composable";
import { useRouter, useRoute } from "vue-router";

import { useProductsQuery, useDeleteMutation } from "../generated/graphql";
export default defineComponent({
  setup() {
    let products = ref();
    const router = useRouter();
    const route = useRoute();

    const { result, loading, error } = useProductsQuery({
      arcql: "*",
    });
    const {
      mutate: deleteProduct,
      loading: d_loading,
      error: d_error,
      onDone,
    } = useDeleteMutation({
      variables: {
        arcql: "",
      },
    });

    products = useResult(result, null, (data) => data?.find.edges);

    onDone((result) => {
      router.push({ name: "Products" });
      router.go(0);
    });

    return {
      deleteProduct,
      products,
      loading: loading || d_loading,
      error: error || d_error,
    };
  },
});
</script>