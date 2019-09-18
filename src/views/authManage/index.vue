<template>
  <div class="main-container">
    <div class="search-bar">
      <div class="item-input">
        <span class="label">权限名称</span>
        <el-input
          placeholder="请输入"
          v-model="auth">
        </el-input>
      </div>
      <div class="item-input">
        <el-button type="primary" icon="el-icon-search" :loading="isSearching" @click="search()">搜索</el-button>
      </div>
      <el-button
        class="fr"
        type="primary"
        icon="el-icon-plus"
        v-permission="'system:authManage:create'"
        @click="createAuth()">新建权限</el-button>
    </div>
    <div class="result-list">
      <el-table
        :data="list"
        stripe
        style="width: 100%"
        size="small">
        <el-table-column
          prop="name"
          label="权限名称">
        </el-table-column>
        <el-table-column
          prop="authSign"
          label="权限标识">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-permission="'system:authManage:detail'"
              @click="getDetail(scope.row.id)">查看详情</el-button>
            <el-button
              type="text"
              size="small"
              v-permission="'system:authManage:edit'"
              @click="updateAuth(scope.row.id)">编辑</el-button>
            <!-- <el-button type="text" size="small" @click="deleteAuth(scope.row.id)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isSearching: false,
      auth: '',
      pageSize: 10,
      currentPage: 1
    }
  },
  created () {
    this.getInitData()
  },
  computed: {
    ...mapGetters('init', [
      'authTypes',
      'authTypeMap'
    ]),
    ...mapGetters('auth', [
      'list',
      'totalCount'
    ])
  },
  methods: {
    getInitData () {
      this.$store.dispatch('auth/getList', {
        perPage: this.pageSize,
        page: this.currentPage
      })
    },
    search () {
      this.isSearching = true
      this.$store.dispatch('auth/getList', {
        perPage: this.pageSize,
        page: this.currentPage,
        keyword: this.auth
      }).then(() => {
        this.isSearching = false
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.search()
    },
    createAuth () {
      this.$router.push({path: '/authManage/create'})
    },
    getDetail (authId) {
      this.$router.push({path: '/authManage/detail/' + authId})
    },
    updateAuth (authId) {
      this.$router.push({path: '/authManage/edit/' + authId})
    },
    deleteAuth (authId) {
      this.$confirm('确定删除该权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('auth/deleteAuth', {
          id: authId
        }).then(() => {
          this.search()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/less/main.less';
</style>
