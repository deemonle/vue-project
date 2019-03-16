<template>
  <div class="container">
    <div class="current-date">
      <div>{{currentDate}}</div>
      <button class="next-month" @click="handleClickLast">上一个</button>
      <button class="last-month" @click="handleClickNext">下一个</button>
    </div>
    <div class="calendar">
      <div class="calendar-row" v-for="(row, index) in rows" :key="index">
        <div class="date-item" v-for="(value, index) in row" :key="index">
          {{value}}
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
    minDate: {
      type: String,
      default: '2000-01'
    },
    maxDate: {
      type: String,
      default: '2020-12'
    },
  },

  data () {
    return {
      currentDate: {
        type: Object
      },
      rows: {},
    }
  },

  methods: {
    deepCopy(obj) {
      let result = Array.isArray(obj) ? [] : {}
      for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
          if(obj[key]&&typeof obj[key] === 'object') {
            result[key] = deepClone(obj[key]);
          }else{
            result[key] = obj[key]
          }
        }
      }
      return result
    },
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
      let date = new Date(),
          year = date.getFullYear() + "年",
          month = date.getMonth() + 1 + "月",
          day = date.getDate() + "日",
          week = "星期" + this.numToChinese(date.getDay())
      return year + month + day + " " + week
    },
    initCurrentDate() {
      let result = {}
      let date = new Date()
      result = {
        year: date.getFullYear(),
        month: date.getMonth() + 1
      }
      return result
    },
    splitDate(date) {
      let result = {}
      const splitValue = date.split("-")
      try{
        if(!splitValue || splitValue.length < 2) {
          throw new Error('时间格式不正确');
      }
        result = {
          year: Number(splitValue[0]),
          month: Number(splitValue[1]),
        }
      }catch(error){
        console.log(error)
      }
      return result
    },
    getMinDate() {
      return {
        year: this.minDate
      }
    },
    showNextMonth(year, month) {
      let result = {year: year, month: month}
      if(month === 12) {
        result.month = 1
        result.year = year + 1
      }else{
        result.month = month + 1
      }
      this.showCurrentMonth(result.year, result.month)
      return result
    },
    showLastMonth(year, month) {
      let result = {year: year, month: month}
      if(month === 1) {
        result.month = 12
        result.year = year - 1
      }else{
        result.month = month - 1
      }
      this.showCurrentMonth(result.year, result.month)
      return result
    },
    //日历排列核心代码 
    getMonthDays(year,month) { //真实的月份
      let date = new Date(year, month, 0)//month, not month - 1
      return date.getDate()
    },
    getFirstDay(year,month) { //真实的月份
      let date = new Date(year, month - 1, 1)
      return this.numChange(date.getDay())
    },
    getLastDay(year,month) { //真实的月份
      let daysNumber = this.getMonthDays(year, month)
      let date = new Date(year, month - 1, daysNumber)
      return this.numChange(date.getDay())
    },
    getRowsLength(firstDay, days) {
      return Math.ceil((firstDay + days - 1)/7)
    },
    lastMonthInfo(year, month) {//显示的上个月的信息
      let lastMonth
      let currentYear
      if(month === 1) {
        lastMonth = 12
        currentYear = year - 1
      }else{
        lastMonth = month - 1
        currentYear = year
      }
      return {
        date: this.getLastDay(currentYear, lastMonth),//获取上月最后一天是星期几
        days: this.getMonthDays(currentYear, lastMonth),//获取上个月的天数
      }
    },
    currentMonthInfo(year, month) {
      return {
        days: this.getMonthDays(year,month), //获取当前月天数
        firstDay: this.getFirstDay(year,month), //计算当前月第一天是星期几
        lastDay: this.getLastDay(year,month) //计算当前月最后一天是星期几
      }
    },
    showCurrentMonth(year,month) {
      const currentMonth = this.currentMonthInfo(year,month),
            lastMonth = this.lastMonthInfo(year, month)
      const rowsLength = this.getRowsLength(currentMonth.firstDay, currentMonth.days) //计算当前月几行排列
      let [row, rows] = [[], []]
      let [currentMonthDate, nextMonthDate] = [1, 1]
      let lastMonthStart = (lastMonth.date === 7) ? lastMonth.days + 1 : (lastMonth.days - lastMonth.date) + 1
      let lastMonthEnd = lastMonth.days
      for(let i = 0; i < rowsLength; i++) {
        for(let j = 0; j < 7; j++) {
          if(lastMonthStart - lastMonthEnd > 0 && currentMonthDate <= currentMonth.days){
            row[j] = currentMonthDate
            currentMonthDate++
          }else if(currentMonthDate > currentMonth.days){
            row[j] = nextMonthDate
            nextMonthDate++
          } else {
            row[j] = lastMonthStart
            lastMonthStart++
          }
        }
        let deep = this.deepCopy(row)//深拷贝
        rows[i] = deep
      }
      this.rows = rows
    },

    //
    handleClickNext() {
      this.currentDate = this.showNextMonth(this.currentDate.year ,this.currentDate.month)
    },
    handleClickLast() {
      this.currentDate = this.showLastMonth(this.currentDate.year ,this.currentDate.month)
    }
  }, 

  computed: {
  },

  mounted() {
    // console.log(this.getLastDay(2019,3))
    // console.log(this.getLastDay(2019,2))
    // console.log(this.getLastDay(2019,12))
    this.currentDate = this.initCurrentDate()
    this.showCurrentMonth(this.currentDate.year ,this.currentDate.month)
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
