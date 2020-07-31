const pickdate = Vue.component("pickdate", {
    template: `     <div class="pickdate" style="height: 100%;">
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
          class="timepick"
          style="
            height: 1.2rem;
            width: 5.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          @click="datechange"
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
            />
            <span> {{timeValue}}</span>
            <img
              src="./pic/arrow.png"
              style="
                height: 0.24rem;
                transform: rotate(180deg);
                position: absolute;
                right: 0.4rem;
              "
              alt=""
            />
          </p>
        </div>
        <!-- <van-datetime-picker
        @confirm="confirmdate"
        @cancel="datechange"
        v-show="datepick"
        v-model="currentDate"
        type="date"
        title=""
        :min-date="minDate"
        :max-date="maxDate"
      ></van-datetime-picker> -->
      </div>
      <van-calendar
        v-model="datepick"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmdate"
      />
    </header>
    <div style="margin-bottom: 0.25rem;">
      <img
        src="./pic/banner.png"
        style="width: 100%; height: 0.42rem;"
        alt=""
      />
    </div>
    <ul style="margin: 0 auto; width: 5.3rem; margin-bottom: 0.7rem;">
      <li
        v-for="(item,idx) in timeline"
        :key="idx"
        @click="pickPeriod(item.book_status,item.set_id)"
        class="timeperiod"
        :class="{grey:item.book_status}"
      >
        <p>
          <span>{{item.time_start}}</span>
          <span>-</span>
          <span>{{item.time_end}}</span>
        </p>
      </li>
    </ul>
    <p
      style="
        margin: 0 auto;
        width: 5.7rem;
        border-bottom: 1px solid #bcbcbc;
      "
    ></p>
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
    <!-- <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="choose"
    :min-date="minDate"
    :max-date="maxDate"
  ></van-datetime-picker> -->
  </div>`,
    data: function () {
      return {
        datepick: false,
        timeValue: null,
        minDate: new Date(2020, 07, 05),
        maxDate: new Date(2020, 07, 11),
        timeline: [],
        // currentDate: new Date(),
      };
    },
    created() {
      let datestart = new Date("2020/08/05");
      let datename = dayList[datestart.getDay()];
      this.timeValue = `${datename},2020-08-05`;
      this.initdata("2020-08-05");
    },
    methods: {
      initdata(val) {
        axios
          .post(
            `${baseurl}?route=rob/book/getDaySetting`,
            Qs.stringify({ change_day: val }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((res) => {
            this.timeline = res.data.data;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          })
          .catch((err) => {
            // console.log(err);
          });
      },
      pickPeriod(isok, idx) {
        // console.log(isok);
        if (!isok) {
          this.$router.push({
            name: "FillOutForm",
            query: { set_id: idx },
          });
        } else {
        }
      },
      datechange() {
        this.datepick = !this.datepick;
      },
      confirmdate(val) {
        this.datepick = false;
        let year = val.getFullYear();
        let month = val.getMonth() + 1;
        let day = val.getDate();
        let date = dayList[val.getDay()];
        if (month >= 1 && month <= 9) {
          month = `0${month}`;
        }
        if (day >= 1 && day <= 9) {
          day = `0${day}`;
        }
        this.timeValue = `${date},${year}-${month}-${day}`;
        let dat = `${year}-${month}-${day}`;

        this.initdata(dat);
      },
    },
  });

