<template>
  <div>
    <dropdown class="dropdown">
      <button class="button">下拉菜单</button>
      <dropdown-menu>
        <dropdown-item>
          1
        </dropdown-item>
        <dropdown-item>
          2
        </dropdown-item>
        <dropdown-item>
          3
        </dropdown-item>
      </dropdown-menu>
    </dropdown>
  </div>
</template>

<script>
import Dropdown from "./dropdown.vue"
import DropdownItem from "./dropdown-item.vue"
import DropdownMenu from "./dropdown-menu.vue"
export default {
  name: '',

  components: {
    Dropdown,
    DropdownItem,
    DropdownMenu
  },

  props: {
  },

  data () {
    return {
    }
  },

  methods: {
  },

  computed: {
  },

}
</script>

<style scoped>

  .dropdown{
    width: 100px
  }
  .button{
    padding: 10px;
    border-radius: 6px;
    border-color: #eeeeee;
    background: white;
    min-height: 25px;
    width: 100px;
  }
  .button:hover{
    border-color: #2d8cf0
  }
</style>
