<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="box-card-header">
      <el-row type="flex" justify="space-between" style="align-items:center">
        <h1>Category</h1>
        <el-button type="primary" @click.prevent="openModal">Create New</el-button>
      </el-row>
    </div>
    <el-table
      :data="categories.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="#">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Parent" prop="parent">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.parent" v-text="parent_name(scope.row.parent)"></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Date" prop="date"></el-table-column>
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
            title="Are you sure to delete?"
            @onConfirm="handleDelete(scope.row.id)"
          >
            <el-button size="mini" type="danger" slot="reference">Delete</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <category-form v-if="modal" v-model="modal" :category="category" @save="onSaved" />
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import CategoryForm from "@/components/CategoryForm";
export default {
  components: { CategoryForm },
  computed: mapGetters(["categories"]),
  data() {
    return {
      search: "",
      modal: false,
      category: null
    };
  },
  methods: {
    parent_name(id) {
      const category = this.categories.find(c => c.id === id);
      return category ? category["name"] : "";
    },
    openModal() {
      this.category = null;
      this.modal = true;
    },
    handleEdit(index, row) {
      this.category = row;
      this.modal = true;
    },
    handleDelete(id) {
      this.$store.commit("REMOVE_CATEGORY", id);
    },
    onSaved() {
      this.modal = false;
    }
  }
};
</script>

<style>
</style>