<template>
  <el-dialog
    width="35%"
    :title="`${editing?'Update':'Add New'} Category`"
    :visible.sync="value"
    :before-close="closeModal"
    append-to-body
    destroy-on-close
  >
    <el-form :model="form" :rules="rules" ref="category">
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name" placeholder="eg. Unilever"></el-input>
      </el-form-item>

      <el-form-item label="Parent (Optional)" prop="parent">
        <el-select v-model="form.parent" placeholder="Select Parent" style="width:100%;">
          <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModal">Cancel</el-button>
      <el-button type="success" @click="save">Save</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { nanoid } from "nanoid";
export default {
  props: {
    value: {
      required: true
    },
    category: {
      default: null,
      type: Object
    }
  },
  mounted() {
    if (this.category) {
      this.form = this.category;
      this.editing = true;
    }
  },
  data() {
    return {
      form: {},
      editing: false,
      rules: {
        name: [
          {
            required: true,
            message: "Category Name is Required.",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters({
      categories: "categories"
    })
  },
  methods: {
    closeModal() {
      this.$emit("input", false);
      this.editing = false;
    },
    save() {
      this.$refs.category.validate(valid => {
        if (!valid) return false;
        if (this.editing) {
          this.$store.dispatch("updateCategory", this.form);
          this.closeModal();
        } else {
          const data = {
            id: nanoid(10),
            ...this.form,
            date: new Date().toLocaleDateString()
          };
          this.$store.dispatch("createCategory", data);
          this.$emit("save", data);
        }
        this.formReset();
      });
    },
    formReset() {
      this.$refs["category"].resetFields();
      this.form = {};
    }
  }
};
</script>