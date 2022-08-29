<template>
  <div>
    <!-- <el-calendar v-model="value" />
    <el-button>{{ $t('Home.submit') }}</el-button> -->
    <el-button @click="handleAdd">添加数据</el-button>
    <el-button @click="handlePut">修改数据</el-button>
    <el-button @click="handleDelete">删除数据</el-button>
    <el-button @click="handleGet">查询</el-button>
    <el-button @click="handleGetALl">查询所有</el-button>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
// const value = ref(new Date());
import db, { IUser } from '../../db';

const handleAdd = () => {
  db.add<IUser>('user', { name: '张三', age: 18 } as IUser);
};
const handlePut = () => {
  db.put<IUser>('user', { id: 10, name: '张三', age: 18 });
};
const handleDelete = () => {
  db.delete('user', 9);
};
const handleGet = () => {
  db.get<IUser>('user', 900);
};
const handleGetALl = () => {
  db.getAll<IUser>('user');
};
</script>

<style lang="less" scoped></style>
