<template>
  <div class="container">
    <div class="calendar-info"> 
      <div class="current-date">
        <div>{{selectedDate.year+"年"}}</div>
        <div>{{selectedDate.month+"月"}}</div>
        </div>
      <div class="calendar-button">
        <button class="next-month" @click="handleClickLast">上一个</button>
        <button class="last-month" @click="handleClickNext">下一个</button>
      </div>
    </div>
    <div class="weeks">
      <div class="weeks-item" v-for="item in weeks" :key="item">{{item}}</div>
    </div>
    <div class="slide-container">
      <div class="calendar">
        <div class="calendar-row" v-for="(row, index) in rows" :key="index">
          <div class="date-item" 
          v-for="(value, index) in row" 
          :key="index"
          :class="{'current-date-border': value.active, 
                  'selected-date-border': value.selectedActive, 
                  'others-month-color': value.othersShow}"
          @click="handleClickDate(value)">
            {{value.day}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const weekJson = {
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
    7: '星期日',
  };

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
      test: {
        ddd: 'aaa'
      },
      currentDate: { //不变的值
        year: '',
        month: '',
        day: '',
        week: '',
      },
      selectedDate: {
        year: '',
        month: '',
        day: '',
        days: '',
        week: '',
        active: false,
        selectedActive: false,
        firstDay: '',
        lastDay: '',
      },
      rows: {
        type: Object
      },
      nextRows: {
        type: Object
      },
      currentMonth: {
        year: 0,
        day: 0,
        week: 0,
        active: true
      },
      nextMonth: {
        year: 0,
        day: 0,
        week: 0,
        active: false
      },
      lastMonth: {
        year: 0,
        day: 0,
        week: 0,
        active: false
      },
    }
  },
  
  methods: {
    deepCopy(obj) {
      var result = Array.isArray(obj) ? [] : {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            result[key] = this.deepCopy(obj[key])   //递归复制
          } else {
            result[key] = obj[key]
          }
        }
      }
      return result;
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
    initCurrentDate() {
      let result = {}
      let date = new Date()
      this.currentDate = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        week: date.getDay()
      }
      this.selectedDate = this.currentDate
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
    monthAddOne(year,month) {
      let result = {year: year, month: month}
      if(month === 12) {
        result.month = 1
        result.year = year + 1
      }else{
        result.month = month + 1
      }
      return result
    },
    monthReduceOne(year,month) {
      let result = {year: year, month: month}
      if(month === 1) {
        result.month = 12
        result.year = year - 1
      }else{
        result.month = month - 1
      }
      return result
    },
    showNextMonth(year, month) {
      let result = this.monthAddOne(year,month)
      this.rows = this.showCurrentMonth(result.year, result.month)
      return result
    },
    showLastMonth(year, month) {
      let result = this.monthReduceOne(year,month)
      this.rows = this.showCurrentMonth(result.year, result.month)
      return result
    },
    //日历排列代码 
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
      let lastMonth = this.monthReduceOne(year, month)
      return {
        active: false,
        othersShow: true,
        day: 1,
        year: lastMonth.year,
        month: lastMonth.month,
        lastDay: this.getLastDay(lastMonth.year, lastMonth.month),//获取上月最后一天是星期几
        days: this.getMonthDays(lastMonth.year, lastMonth.month),//获取上个月的天数
      }
    },
    currentMonthInfo(year, month) {
      return {
        active: true,
        othersShow: false,
        day: 1,
        year: year,
        month: month,
        days: this.getMonthDays(year,month), //获取当前月天数
        firstDay: this.getFirstDay(year,month), //计算当前月第一天是星期几
        lastDay: this.getLastDay(year,month) //计算当前月最后一天是星期几
      }
    },
    nextMonthInfo(year, month) {
      let nextMonth = this.monthAddOne(year, month)
      return {
        active: false,
        othersShow: true,
        day: 1,
        year: nextMonth.year,
        month: nextMonth.month,
        lastDay: this.getLastDay(nextMonth.year, nextMonth.month),//获取下月最后一天是星期几
        days: this.getMonthDays(nextMonth.year, nextMonth.month),//获取下个月的天数
      }
    },
    
    showCurrentMonth(year,month) {
      let [row, rows] = [[], []]
      this.currentMonth = this.currentMonthInfo(year,month)
      this.lastMonth = this.lastMonthInfo(year, month)
      this.nextMonth = this.nextMonthInfo(year, month)
      // const rowsLength = this.getRowsLength(this.currentMonth.firstDay, this.currentMonth.days) //计算当前月几行排列
      this.lastMonth.day = (this.lastMonth.lastDay === 7) ? 
                            this.lastMonth.days + 1 : 
                           (this.lastMonth.days - this.lastMonth.lastDay) + 1
      for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 7; j++) {
          if(this.lastMonth.day - this.lastMonth.days > 0 && this.currentMonth.day <= this.currentMonth.days){
            this.currentDateStyle(this.currentMonth)
            this.currentMonth.week = j + 1
            row[j] = this.deepCopy(this.currentMonth)
            this.currentMonth.day++
            
          }else if(this.currentMonth.day > this.currentMonth.days){
            this.currentDateStyle(this.nextMonth)
            this.nextMonth.week = j + 1
            row[j] = this.deepCopy(this.nextMonth)
            this.nextMonth.day++
          } else {
            this.currentDateStyle(this.lastMonth)
            this.lastMonth.week = j + 1
            row[j] = this.deepCopy(this.lastMonth)
            this.lastMonth.day++
          }
        }
        let deep = this.deepCopy(row)//深拷贝
        rows[i] = deep
      }
      return rows
    },

    currentDateStyle(date) {
      if(date.year === this.currentDate.year&&
      date.month === this.currentDate.month&&
      date.day === this.currentDate.day) {
        date.active = true
      }else{
        date.active = false
      }
    },
    //
    handleClickNext() {
      this.nextRows = this.deepCopy(this.rows)

      this.selectedDate = this.showNextMonth(this.currentMonth.year ,this.currentMonth.month)
    },
    handleClickLast() {
      this.selectedDate = this.showLastMonth(this.currentMonth.year ,this.currentMonth.month)
    },

    handleClickDate(date) {
      this.selectedDate.selectedActive = false
      this.selectedDate = date
      this.selectedDate.selectedActive = true
      this.$emit('select', date)
    },
  }, 
  
  mounted() {
    this.initCurrentDate()
    this.rows = this.showCurrentMonth(this.currentDate.year ,this.currentDate.month)
  },
}
</script>

<style scoped lang="stylus">
  $background-color = #1867c0
  $date-color = #fff
  $other-date-color = #888
  $current-date-border-color = #aaaaaa
  $current-selected-border-color = #542516
  .container
    width 100%
    color $date-color
    background-color $background-color
    .calendar-info
      display flex
      justify-content space-between
      height 50px
      // border-bottom 1px solid red
      .current-date
        display flex
        height 50px
        padding-left 20px
        align-items center
        justify-content center
      .calendar-button
        display flex
        align-items: center
        padding-right 20px
        .next-button
          height 50px
    .weeks
      display flex
      padding 0 20px 0 20px
      justify-content space-between
      height 30px
      .weeks-item
        width 30px
        text-align center
    .slide-container
      .next-calendar
        display flex
        padding 0 20px 20px 20px
        flex-direction column
        .next-calendar-row
          height 40px
          display flex
          justify-content space-between
          .next-date-item
            height 36px
            width 36px
            display flex
            border 2px solid $background-color
            align-items center
            justify-content center
            &:hover 
              border 2px solid $current-selected-border-color !important
      .calendar
        display flex
        padding 0 20px 20px 20px
        flex-direction column
        .calendar-row
          height 40px
          display flex
          justify-content space-between
          .date-item
            height 36px
            width 36px
            display flex
            border 2px solid $background-color
            align-items center
            justify-content center
            &:hover 
              border 2px solid $current-selected-border-color !important
    .selected-date
      padding-left 30px

  .current-date-border 
    border: 2px solid $current-date-border-color !important
    // background-color #dddd
  .selected-date-border
    border: 2px solid $current-selected-border-color !important
  .others-month-color
    color $other-date-color
</style>
