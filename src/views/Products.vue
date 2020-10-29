<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="box-card-header">
      <el-row type="flex" justify="space-between" style="align-items:center">
        <h1>Products</h1>
        <el-button type="primary" @click.prevent="openModal">Create New</el-button>
      </el-row>
    </div>

    <el-table
      :data="products.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      lazy
    >
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="SKU" prop="sku"></el-table-column>
      <el-table-column label="Price" prop="price"></el-table-column>
      <el-table-column label="Category" prop="categories">
        <template slot-scope="scope">
          <el-tag v-for="(tag, i) in scope.row.categories" :key="'tag-'+i">{{category_name(tag)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Date" prop="createdAt">
        <template slot-scope="scope">{{new Date(scope.row.createdAt).toLocaleDateString()}}</template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button
            style="margin-right:5px;"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button>
          <el-popconfirm
            confirmButtonText="OK"
            cancelButtonText="No, Thanks"
            icon="el-icon-info"
            iconColor="red"
            title="Are you sure to delete this?"
            @onConfirm="handleDelete(scope.row.id)"
          >
            <el-button size="mini" type="danger" slot="reference">Delete</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <product-form v-model="productModal" @save="onSaved" :product="product" v-if="productModal" />
  </el-card>
</template>

<script>
import ProductForm from "@/components/ProductForm";
import { mapGetters } from "vuex";
export default {
  components: {
    ProductForm
  },
  data() {
    return {
      productModal: false,
      search: "",
      product: null
    };
  },
  computed: mapGetters(["products", "categories"]),
  methods: {
    category_name(id) {
      if (!id) return "";
      const category = this.categories.find(c => c.id === id);
      return category ? category["name"] : "";
    },
    openModal() {
      this.product = null;
      this.productModal = true;
    },
    handleEdit(index, row) {
      this.product = row;
      this.productModal = true;
    },
    handleDelete(id) {
      this.$store.commit("REMOVE_PRODUCT", id);
    },
    onSaved() {
      this.productModal = false;
    }
  }
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 5px;
}
</style>