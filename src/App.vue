<template>
  <el-container>
    <el-header>
      <router-link to="/home">
        <el-button style="margin-right:20px;" type="danger" plain>Home</el-button>
      </router-link>
      <router-link to="/products">
        <el-button style="margin-right:20px;" type="info" plain>Products</el-button>
      </router-link>
      <router-link to="/categories">
        <el-button type="success" plain>Categories</el-button>
      </router-link>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
</style>