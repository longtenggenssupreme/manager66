<template>
<el-card>
    <my-bread class="mybread" level1="信息发布查看" level2="公告管理"></my-bread>
    <!-- <el-alert title="公告管理" type="success" effect="dark"> </el-alert>-->
    <h1>公告管理</h1>
    <h2>公告管理</h2>
    <el-row class="searchRow">
        <el-col :span=20>
            <el-input placeholder="请输入内容" @clear="searchClear" clearable v-model="query" class="inputSearch">
                <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" @click="showAddNotice">添加</el-button>
        </el-col>
        <el-col :span=4>
            <el-button type="success">退出</el-button>
        </el-col>
    </el-row>
    <el-table :data="noticeList" style="width: 100%">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="noticetitle" label="公告标题" width="80">
        </el-table-column>
        <!-- <el-table-column prop="create_time" label="创建时间">
        </el-table-column> -->
        <el-table-column prop="noticetime" label="创建时间">
            <template slot-scope="scope">
                {{scope.row.noticetime | fmtdatetime}}
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="showEditNotice(scope.row)" circle></el-button>
                <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="deleteNotice(scope.row)" circle></el-button>
                <!-- <el-button type="success" size="mini" plain icon="el-icon-check" @click="shownoticeRole(scope.row)" circle></el-button> -->
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog title="添加公告" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
            <el-form-item label="标题" label-width="100px">
                <el-input v-model="form.noticetitle" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="正文" label-width="100px">
                <el-input v-model="form.noticecontent" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="addNotice">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="编辑公告" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
            <el-form-item label="标题" label-width="100px">
                <el-input v-model="form.noticetitle" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="正文" label-width="100px">
                <el-input v-model="form.noticecontent" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="editNotice">确 定</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      noticeList: [],
      // 分页
      pagenum: 1,
      pagesize: 2,
      total: -1,
      // 新建，编辑
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      form: {
        noticetime: '',
        noticetitle: '',
        noticecontent: '',
        noticestatus: -1
      }
    }
  },
  created () {
    this.getNoticeList()
  },
  methods: {
    search () {
      this.getLikeNoticeList()
    },
    searchClear () {
      this.getNoticeList()
    },
    // 新增
    showAddNotice () {
      this.form = {}
      this.dialogFormVisibleAdd = true
    },
    async addNotice () {
      const res = await this.$http.post(`noticedatas`, this.form)
      if (res.status === 201) {
        this.form = {}
        this.$message.success('新增数据成功')
        this.getNoticeList()
      } else {
        this.$message.warning('新增数据失败')
      }
      this.dialogFormVisibleAdd = false
    },
    async showEditNotice (notice) {
      this.form = notice
      this.dialogFormVisibleEdit = true
    },
    async editNotice () {
      this.dialogFormVisibleEdit = false
      const res = await this.$http.put(`noticedatas/${this.form.id}`, this.form)
      if (res.status === 200) {
        this.form = {}
        this.$message.success('编辑数据成功')
        this.getNoticeList()
      } else {
        this.$message.warning('编辑数据失败')
      }
    },
    // 删除数据
    deleteNotice (notice) {
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`noticedatas/${notice.id}`)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getNoticeList()
        } else {
          this.$message({
            type: 'warning',
            message: '删除失败!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getNoticeList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getNoticeList()
    },
    async getLikeNoticeList () {
      console.log(this.query)
      const { data, status } = await this.$http.get(`noticedatas?noticetitle_like=${this.query}`)
      if (status === 200) {
        this.$message.success('获取数据成功')
        this.noticeList = data
        this.total = data.length
      } else {
        this.$message.warning('获取数据失败')
      }
    },
    async getAllNoticeList () {
      const { data, status } = await this.$http.get(`noticedatas`)
      if (status === 200) {
        this.$message.success('获取数据成功')
        this.noticeList = data
        // this.total = data.length
      } else {
        this.$message.warning('获取数据失败')
      }
    },
    // 获取数据
    async getNoticeList () {
      const { data, status } = await this.$http.get(`noticedatas?_page=${this.pagenum}&_limit=${this.pagesize}`)
      // console.log(data)
      if (status === 200) {
        this.$message.success('获取数据成功')
        this.noticeList = data
        this.total = 20
        // console.log(data.length)
      } else {
        this.$message.warning('获取数据失败')
      }
    }
  }
}
</script>

<style>
.mybread {
    margin-bottom: 10px;
}

.searchRow {
    height: 100%;
    margin-top: 10px;
    /* padding: 10px; */
}

.inputSearch {
    width: 300px;
}
</style>
