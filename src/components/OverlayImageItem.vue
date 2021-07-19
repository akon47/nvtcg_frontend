<template>
  <div class="overlay-image-container" @click.stop="click">
    <img :src="imageSrc" />
    <span> {{ data.title }} </span>
    <div class="buttons">
      <div class="icon" @click.stop="editClick">
        <font-awesome-icon :icon="['fas', 'edit']" />
      </div>
      <div class="icon" @click.stop="deleteClick">
        <font-awesome-icon :icon="['fas', 'trash']" />
      </div>
    </div>
  </div>
</template>

<script>
import { getBaseApiUrl } from "../api/index";

export default {
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  computed: {
    imageSrc() {
      return `${getBaseApiUrl()}files/overlay/${this.data.id}`;
    },
  },
  methods: {
    click() {
      this.$emit("click", this.data);
    },
    deleteClick() {
      this.$emit("deleteClick", this.data);
    },
    editClick() {
      this.$emit("editClick", this.data);
    },
  },
};
</script>

<style scoped>
.icon {
  display: inline;
  color: #b9bbbe;
  font-size: 12pt;
  transition: 0.2s;
  cursor: pointer;
}
.icon:hover {
  color: #dcddde;
}

.overlay-image-container img {
  width: 80px;
  height: 45px;
  border: 1px solid black;
  flex-grow: 0;
  flex-shrink: 0;
}

.overlay-image-container {
  display: flex;
  background: #36393f;
  -webkit-box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  padding: 3px;
  font-size: 12pt;
  color: white;
  background: transparent;
  border: 1px solid rgb(43, 45, 49);
  margin: 3px;
  align-items: center;
}

.overlay-image-container:hover {
  background: #ffffff10;
  cursor: pointer;
}

.overlay-image-container span {
  flex-grow: 1;
  flex-shrink: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0px 5px;
}

.overlay-image-container .buttons {
  flex-grow: 0;
}
</style>