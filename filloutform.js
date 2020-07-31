const FillOutForm = Vue.component("FillOutForm", {
  template: `<div class="FillOutForm">
  <header style="position: relative;">
    <div
      style="
        position: absolute;
        width: 5.3rem;
        top: 3.3rem;
        box-shadow: 0px 0px 0.1rem #b4bccc;
        left: 50%;
        transform: translateX(-50%);
        background: white;
      "
    >
      <div
        v-show="!successful"
        class="timepick"
        style="
          height: 1.2rem;
          width: 5.3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <p
          style="
            color: #e32b31;
            width: 100%;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          "
        >
          <img
            src="./pic/arrow.png"
            style="height: 0.24rem; position: absolute; left: 0.4rem;"
            alt=""
            @click="goback"
          />
          <span>BOOKING DETAILS</span>
        </p>
      </div>
    </div>
  </header>
  <div
    style="
      margin: 0 auto;
      width: 5.7rem;
      height: 1px;
      background: rgb(188, 188, 188);
    "
  ></div>
  <div
    v-show="!successful"
    style="margin: 0 auto; margin-top: 0.16rem; width: 5.3rem;"
  >
    <el-form
      :model="formdata"
      :rules="rules"
      ref="formdata"
      class="demo-ruleForm"
    >
      <el-form-item prop="name">
        <el-input v-model="formdata.name"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="formdata.email"></el-input>
      </el-form-item>
      <el-form-item prop="tel">
        <el-input v-model="formdata.tel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formdata')"
          >立即创建</el-button
        >
      </el-form-item>
    </el-form>
    <!-- <van-form ref="checkbox" @submit="onSubmit">
      <van-field
        v-model="formdata.name"
        label="Name"
        name="name"
        placeholder="Enter your name"
        :rules="[{ required: true, message: 'Please enter' }]"
      ></van-field>
      <van-field
        v-model="formdata.email"
        label="E-mail"
        name="email"
        placeholder="Enter your E-mail"
        :rules="[{ validator, message:reminder}]"
      ></van-field>
      <van-field
        v-model="formdata.tel"
        type="tel"
        name="tel"
        label="phone number"
        placeholder="Enter your phone number"
        :rules="[{ required: true, message: 'Please enter'   }]"
      ></van-field>
      <p
        style="
          height: 0.3rem;
          line-height: 0.3rem;
          padding: 0 0.16rem;
          box-sizing: border-box;
          width: 5.3rem;
          color: #e32b31;
          font-size: 0.26rem;
        "
      >
        {{errorMsg}}
      </p>
      <div style="margin: 0.16rem;">
        <van-button round block type="info" native-type="submit">
          Submit
        </van-button>
      </div>
    </van-form> -->
  </div>
  <div
    v-show="successful"
    style="
      margin: 0 auto;
      margin-top: 0.16rem;
      width: 5.3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <img
      style="width: 1.58rem; height: 1.58rem; margin-bottom: 0.2rem;"
      src="./pic/successful.png"
      alt=""
    />
    <p style="font-size: 0.3rem; color: #6b6b6b; margin-bottom: 0.8rem;">
      successful appointment!
    </p>
    <a
      style="display: block; width: 100%;"
      href="http://www.mzjj.co.kr/privatesale/book.html#/homepage"
    >
      <van-button round block type="info">
        Confirm
      </van-button>
    </a>
  </div>

  <p
    style="
      margin: 0 auto;
      padding: 0.7rem 0;
      width: 5.3rem;
      color: #e32b31;
      font-size: 0.22rem;
      line-height: 0.28rem;
    "
  >
    * Offers are subject to change at the discretion of Tomato Beans
    Creations Limited. without prior notice. Tomato Beans Creations
    Limited reserve the right of final decision when dispute arise
  </p>
</div>
`,
  data: function () {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      successful: false,
      formdata: {
        name: "",
        tel: "",
        email: "",
      },
      rules: {
        name: [{ required: true, message: "请选择活动区域", trigger: "blur" }],
        email: [{ validator: validatePass, trigger: "blur" }],
        tel: [{ required: true, message: "请选择活动区域", trigger: "blur" }],
      },
      errArray: [],
      validator1: {},
      errorMsg: "",
      set_id: null,
    };
  },
  created() {
    // console.log(validator1);

    this.set_id = parseInt(this.$route.query.set_id) || null;
  },
  mounted() {
    this.validator1 = new Validator(
      "example_form",
      [
        {
          //name 字段
          name: "name",
          display: "不能为空",
          // 验证条件
          rules: "required",
          // rules: 'valid_email|required|max_length(12)|min_length(2)'
        },
        {
          name: "email",
          display: "不能为空|格式不对",
          regexp_email: emailreg,
          rules: "required|regexp_email",
        },
        {
          name: "tel",
          display: "不能为空",
          rules: "required",
        },
      ],
      function (obj, evt) {
        if (obj.errors) {
          // 判断是否错误
          this.errArray = obj.errors.map((item) => {
            return item.message;
          });

          // console.log(obj.errors);
          // console.log(obj.errors);
        }
      }
    );
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    gohome() {
      // window.location.href="http://www.mzjj.co.kr/vueHtml/vuehtml.html#/homepage";
    },
    reminder(value, rule) {
      if (!value) {
        return "Please enter";
      } else return "Email Format is incorrect";
    },
    validator(val) {
      this.errorMsg = "";
      if (!val) {
        return false;
      } else if (val) {
        return emailreg.test(val);
      }
    },
    goback() {
      this.$router.push({
        name: "pickdate",
        // query: obj
      });
    },
    secSumbit(values) {
      let obj = Object.assign({ set_id: this.set_id }, values);
      axios
        .post(`${baseurl}?route=rob/book/addBook`, Qs.stringify(obj))
        .then((res) => {
          if (res.data.ret === 0) {
            this.successful = true;
          } else {
            this.errorMsg = res.data.msg;
          }
        });
    },
    onSubmit() {
      this.errorMsg = "";
      // console.log(values);
      let a = this.validator1.validate();
      console.log(a);

      if (a.errors.length < 1) {
        axios
          .post(
            `${baseurl}?route=rob/book/checkTel`,
            Qs.stringify({ tel: this.formdata.tel })
          )
          .then((res) => {
            if (res.data.ret === 1) {
              this.errorMsg = "*Invalid VIP number,please re-enter";
              return;
            } else if (res.data.ret === 0) {
              this.secSumbit(this.formdata);
            }
          });
      }
    },
  },
});
