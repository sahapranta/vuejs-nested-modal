<template>
  <div>
    <el-row type="flex" justify="center">
      <el-card>
        <h1>Hello Nested Modal</h1>
        <el-divider>
          <i class="el-icon-star-on"></i>
        </el-divider>
        <router-link to="/products">
          <el-button style="margin-right:20px;" type="info" plain>Products</el-button>
        </router-link>
        <router-link to="/categories">
          <el-button type="success" plain>Categories</el-button>
        </router-link>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>