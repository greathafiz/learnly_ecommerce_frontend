<template>
  <div class="container mx-auto p-6 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-extrabold mb-6 text-center text-blue-800">
      Product List
    </h1>

    <!-- Add Product Form -->
    <div
      v-if="isAuthenticated"
      class="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-lg"
    >
      <h2 class="text-2xl font-semibold mb-4 text-blue-700">
        {{ isEditing ? "Edit Product" : "Add Product" }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <input
          v-model="productForm.name"
          placeholder="Name"
          class="mb-3 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="productForm.description"
          placeholder="Description"
          class="mb-3 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model.number="productForm.price"
          placeholder="Price"
          type="number"
          class="mb-3 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="productForm.imageURL"
          placeholder="Image URL"
          class="mb-3 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          v-if="isEditing"
          @click="cancelEdit"
          type="button"
          class="bg-red-500 text-white py-2 px-4 rounded-lg w-full hover:bg-red-600 mt-3"
        >
          Cancel Edit
        </button>
        <button
          type="submit"
          class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 mt-3"
        >
          {{ isEditing ? "Update Product" : "Add Product" }}
        </button>
      </form>
    </div>

    <input
      v-model="search"
      placeholder="Search products"
      class="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div
      v-if="filteredProducts.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="product in filteredProducts"
        :key="product._id"
        class="p-6 bg-white border border-gray-200 rounded-lg shadow-lg"
      >
        <h2 class="text-xl font-semibold mb-3 text-gray-800">
          {{ product.name }}
        </h2>
        <p class="mb-3 text-gray-600">{{ product.description }}</p>
        <p class="text-lg font-bold mb-3 text-blue-700">N{{ product.price }}</p>
        <img
          :src="product.imageURL"
          alt="Product image"
          class="w-full h-48 object-cover rounded-lg mb-3"
        />
        <button
          @click="viewProduct(product)"
          class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
        >
          View Details
        </button>

        <!-- Edit and Delete Buttons -->
        <div
          v-if="isAuthenticated && product.createdBy._id === user._id"
          class="mt-4 flex space-x-2"
        >
          <button
            @click="editProduct(product)"
            class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex-1"
          >
            Edit
          </button>
          <button
            @click="deleteProduct(product._id)"
            class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      <p>No products found</p>
    </div>

    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="selectedProduct = null"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import ProductModal from "@/components/ProductModal.vue";

const toast = useToast();
const store = useStore();
const search = ref("");
const selectedProduct = ref(null);
const productForm = ref({
  id: null,
  name: "",
  description: "",
  price: "",
  imageURL: "",
});
const isEditing = ref(false);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const user = computed(() => store.getters.getUser);

const products = computed(() => store.state.products || []);

const filteredProducts = computed(() => {
  const products = store.state.products;
  if (!products) {
    return [];
  }
  return products.filter((product) =>
    product.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
const fetchProducts = async () => {
  try {
    await store.dispatch("fetchProducts");
  } catch (error) {
    toast.error("Failed to fetch products");
  }
};

onMounted(() => {
  fetchProducts();
});

const viewProduct = (product) => {
  selectedProduct.value = product;
};

const resetForm = () => {
  productForm.value = {
    id: null,
    name: "",
    description: "",
    price: "",
    imageURL: "",
  };
  isEditing.value = false;
};

const addProduct = async () => {
  try {
    const { id, ...productWithoutId } = productForm.value;
    const newProduct = await store.dispatch("addProduct", productWithoutId);
    toast.success("Product added successfully");
    // Update the local products list
    store.commit("addProduct", newProduct);
    resetForm();
  } catch (error) {
    handleError(error, "adding");
  }
};

const updateProduct = async () => {
  try {
    const updatedProduct = await store.dispatch(
      "updateProduct",
      productForm.value
    );
    toast.success("Product updated successfully");
    // Update the local products list
    store.commit("updateProduct", updatedProduct);
    resetForm();
  } catch (error) {
    handleError(error, "updating");
  }
};

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await updateProduct();
    } else {
      await addProduct();
    }
  } catch (error) {
    console.error("Error handling form submission:", error);
  }
};

const editProduct = (product) => {
  isEditing.value = true;
  productForm.value = { ...product, id: product._id }; // Use _id here
};

const cancelEdit = () => {
  isEditing.value = false;
  resetForm();
};

const deleteProduct = async (productId) => {
  try {
    await store.dispatch("deleteProduct", productId);
    toast.success("Product deleted successfully");
    await fetchProducts();
  } catch (error) {
    handleError(error, "deleting");
  }
};

const handleError = (error, action) => {
  console.error(`Error ${action} product:`, error);
  if (error.response && error.response.data) {
    toast.error(error.response.data.error || `Failed to ${action} product`);
  } else {
    toast.error(`An unexpected error occurred while ${action} the product`);
  }
};
</script>
