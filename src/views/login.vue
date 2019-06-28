<template>
    <el-row type="flex" class="row-bg" justify="center"  align="middle">
        <el-col :span="6" :xs="14" :xm="10" :md="8" :lg="6" >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

    

</template>

<script>
import axios from "axios"
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
                url:"http://localhost:8888/api/private/v1/login",
                method:'post',
                data:this.ruleForm
            }).then(({data:{data,meta}})=>{
                if(meta.status==200){
                    localStorage.setItem("token",data.token)
                    this.$router.push("/home")
                }

            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
    .row-bg{
        height: 100%;
        background-color: #2d434c;
    }
    .demo-ruleForm{
        background-color: #fff;
        padding: 40px 20px
    }
</style>
