<template>
  <el-dialog
    :title="editing?'Update Product':'Create Product'"
    :visible.sync="value"
    :before-close="closeModal"
  >
    <el-form :model="form" :rules="rules" ref="productForm">
      <el-row type="flex" :gutter="25">
        <el-col>
          <el-form-item label="Name" prop="name">
            <el-input v-model="form.name" placeholder="eg. Lux"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="SKU" prop="sku">
            <el-input v-model="form.sku" placeholder="eg. SKU-1234"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-checkbox v-model="form.stockable">Stockable</el-checkbox>
      <el-row type="flex" :gutter="25">
        <el-col>
          <el-form-item label="Product Category" prop="categories">
            <el-select
              v-model="form.categories"
              placeholder="Select Product Category"
              style="width:100%;"
              multiple
            >
              <el-option
                v-for="(item, i) in categoryWithButton"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
                ref="categorySelect"
              >
                <template v-if="i===0">
                  <span class="is-align-center">
                    <el-button
                      size="small"
                      style="width:100%"
                      @click.prevent="categoryModal=true"
                    >{{ item.name }}</el-button>
                  </span>
                </template>
                <span v-else>{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="Price" prop="price">
            <el-input
              type="number"
              placeholder="price"
              prefix-icon="el-icon-money"
              v-model="form.price"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Description" prop="description">
        <el-input type="textarea" v-model="form.description" placeholder="Product Description..."></el-input>
      </el-form-item>
    </el-form>
    <category-form v-model="categoryModal" @save="onCategorySaved" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModal">Cancel</el-button>
      <el-button type="success" @click="save">{{editing?'Update':'Save'}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import CategoryForm from "./CategoryForm";
import { mapGetters } from "vuex";
export default {
  components: {
    CategoryForm
  },
  props: {
    value: {
      required: true
    },
    product: {
      type: Object,
      default: null
    }
  },
  mounted() {
    if (this.product) {
      this.form = this.product;
      this.editing = true;
    }
  },
  data() {
    return {
      categoryModal: false,
      form: {
        stockable: false
      },
      editing: false,
      rules: {
        name: [
          {
            required: true,
            message: "Name is Required.",
            trigger: "blur"
          }
        ],
        categories: [
          {
            required: true,
            message: "Category is Required.",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "Price is Required.",
            trigger: "blur"
          }
        ],
        sku: [
          {
            required: true,
            message: "SKU is Required.",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters({
      categories: "categories"
    }),
    categoryWithButton() {
      return [
        { id: "xx", name: "Create New", disabled: true },
        ...this.categories
      ];
    }
  },
  methods: {
    closeModal() {
      this.$emit("input", false);
      this.editing = false;
    },
    onCategorySaved(category) {
      this.categoryModal = false;
      this.form.categories = [...this.form.categories, category.id];
      // @todo trigger focus on select element
      //   this.$refs["categorySelect"].focus();
    },
    save() {
      this.$refs["productForm"].validate(valid => {
        if (!valid) return false;
        if (this.editing) {
          this.$store.dispatch("updateProduct", this.form);
          this.closeModal();
        } else {
          this.$store.dispatch("createProduct", this.form);
          this.$emit("save", false);
          this.formReset();
        }
      });
    },
    formReset() {
      this.$refs["productForm"].resetFields();
      this.form = { stockable: false };
    }
  }
};
</script>