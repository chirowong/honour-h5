<template>
  <Header title="首页" :hasBack="false">
    <div class="home-contain">
      <template v-if="categories && categories.length > 0">
        <el-row class="box-card" v-for="(category,index) in categories" v-bind:key="category.id">
            <el-col :span="12">
              <div class="grid-content chinese-name">{{category.categoryName}}</div>
              <div class="grid-content eng-name">{{category.englishName}}</div>
              <div class="grid-content grid-query"><el-button size="mini" class="query-btn" @click='goQuery(category.id)'>查询</el-button></div>
            </el-col>
            <el-col :span="12">
              <img :src="categoryIcons[index]" class="image"/>
             </el-col>
        </el-row>
      </template>
    </div>
  </Header>
</template>

<script>
import {queryCategories} from '../../api/home'
import baseUrl from '../../api/env'

export default {
  data () {
    return {
      categories: null,
      categoryIcons: []
    }
  },
  created: function () {
    let me = this
    me.queryCategories()
  },
  methods: {
    goQuery (id) {
      this.$router.push({path: '/query', query: { id: id }})
    },
    queryCategories () {
      let me = this
      queryCategories(function (categories) {
        me.categories = categories
        for (let i = 0; i < categories.length; i++) {
          me.categoryIcons.push(baseUrl + categories[i].categoryIcon)
        }
        console.log(categories)
      })
    }
  }
}
</script>

<style>
  .home-contain {
    padding: 20px;
  }

  .box-card {
    height: 130px;
    background-color: #f4f4f8;
    margin-bottom: 20px;
    border-radius: 10px;
  }

  .box-card .image {
    width: 130px;
    height: 130px;
  }

  .grid-content {
    min-height: 25px;
  }

  .box-card .chinese-name {
    margin-top: 30px;
    font-size: 17px;
    font-weight: bold;
    text-align: left;
    padding-left: 24px;
  }

  .box-card .eng-name {
    font-size: 10px;
    text-align: left;
    padding-left: 24px;
  }

  .box-card .grid-query {
    text-align: left;
    padding-left: 24px;
  }

  .box-card .query-btn {
    background-color: #4EB0D7;
    color: #fff;
  }
</style>
