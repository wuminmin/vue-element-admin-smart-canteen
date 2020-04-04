<template>
  <div class="app-container">
<div class="block">
    <span class="demonstration">开始日期</span>
    <el-date-picker
      v-model="value_start"
      type="date"
       value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>

    <span class="demonstration">结束日期</span>
    <el-date-picker
      v-model="value_end"
      type="date"
       value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>

    <el-button  
    type="primary"
    v-on:click="fetchData"
    >查询</el-button>
  </div>
    <el-input
      v-model="filename"
      placeholder="请输入保存的文件名，默认名(default excel-list)"
      style="width:350px;"
      prefix-icon="el-icon-document"
    />
    <el-button
      :loading="downloadLoading"
      style="margin-bottom:20px"
      type="primary"
      icon="el-icon-document"
      @click="handleDownload"
    >导出选中的行</el-button>
    <!-- <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
      <el-tag type="info">Documentation</el-tag>
    </a>-->
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="手机号"  align="center">
        <template slot-scope="scope">{{ scope.row.手机号 }}</template>
      </el-table-column>
      <el-table-column label="充值金额 元"  align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.充值金额/100 }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="充值时间"  align="center">
        <template slot-scope="scope">{{ scope.row.充值时间 }}</template>
      </el-table-column>
       <el-table-column label="充值成功标识"  align="center">
        <template slot-scope="scope">{{ scope.row.充值成功标识 }}</template>
      </el-table-column>
       <el-table-column label="备注"  align="center">
        <template slot-scope="scope">{{ scope.row.备注 }}</template>
      </el-table-column>
      <!-- <el-table-column align="center" label="PDate" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import { export_canteen_data } from "@/api/export_excel";
import { mapGetters } from "vuex";
export default {
  name: "SelectExcel",
  data() {
    return {
      list: null,
      listLoading: false,
      multipleSelection: [],
      downloadLoading: false,
      filename: '',
      value_start:'',
      value_end:'',
    };
  },
  created() {
    // this.fetchData();
  },
  computed: {
        ...mapGetters([
      'token',
    ])
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      
      let p = { token: this.token, key: "导出充值清单",value_start:this.value_start,value_end:this.value_end };
      console.log(p,'--------------fetchData')
      export_canteen_data(p).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = ["手机号", "充值金额", "充值时间", "充值成功标识", "备注"];
          const filterVal = [
            "手机号",
            "充值金额",
            "充值时间",
            "充值成功标识",
            "备注"
          ];
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          });
          this.$refs.multipleTable.clearSelection();
          this.downloadLoading = false;
        });
      } else {
        this.$message({
          message: "至少选择一行数据",
          type: "warning"
        });
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>
