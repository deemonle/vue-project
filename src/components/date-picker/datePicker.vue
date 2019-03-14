<template>
  <div class="container">
    <div class="current-date">
      {{currentDate}}
    </div>
    <div class="calendar">
      <div class="calendar-row" v-for="row in rows" :key="row">
        <div class="date-item" v-for="item in 7" :key="item">
          {{(row - 1)*7 + item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoDatePicker',

  props: {
    weeks: {
      type: Array,
      default() {
        return ['一','二','三','四','五','六','日']
      }
    },
    years: {
      type: Array,
      default() {
        return ['2010','2020']
      }
    }
  },

  data () {
    return {
      currentDate: {
        type: String
      },
      rows: 0,
      dateArray: [0, 1]
    }
  },

  methods: {
    numToChinese(num) {
      let arr = ['一','二','三','四','五','六','日']
      for(let i = 0; i < arr.length; i++){
        if(i === num - 1 && num > 0){
          return arr[i]
        }else if(num === 0){
          return arr[6]
        }
      }
    },
    numChange(num) {
      if(num === 0) {
        return 7
      }else {
        return num
      }
    },
    initDate() {
      let today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth()
    },
    getCurrentDate() {
      let date = new Date(),
          year = date.getFullYear() + "年",
          month = date.getMonth() + 1 + "月",
          day = date.getDate() + "日",
          week = "星期" + this.numToChinese(date.getDay())
      return year + month + day + " " + week
    },
    getMonthDays(year,month) {
      let date = new Date(year, month, 0)//month, not month - 1
      return date.getDate()
    },
    getFirstDay(year,month) {
      let date = new Date(year, month - 1, 1)
      return this.numChange(date.getDay())
    },
    getLastDay(year,month) {
      let daysNumber = this.getMonthDays(year, month - 1)
      let date = new Date(year, month, daysNumber)
      return this.numChange(date.getDay())
    },
    getrows(year,month) {
      let days = this.getMonthDays(year,month)
      console.log(days)
      let firstDay = this.getFirstDay(year,month)
      console.log(firstDay)
      let rows =  Math.ceil((firstDay + days - 1)/7)
      return rows
    }
  }, 

  computed: {
  },

  mounted() {
    // console.log(this.getFirstDay(2019,3))
    // console.log(this.getLastDay(2019,3))
    // console.log(this.getMonthDays(2019,12))
    console.log(this.getrows(2019,3))
    this.rows = this.getrows(2019,3)
    this.currentDate = this.getCurrentDate()
  },
}
</script>

<style scoped lang="stylus">
  .container
    width 100%
    color white
    background-color #334a4a
    .current-date
      height 40px
      padding 20px 20px 0 20px
      border-bottom 1px solid red
    .calendar
      display flex
      flex-direction column
      .calendar-row
        height 30px
        display flex
        .date-item
          width 40px



</style>
