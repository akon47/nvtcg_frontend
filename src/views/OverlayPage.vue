<template>
  <div class="contents">
    <loading-spinner v-if="isLoading"></loading-spinner>
    <div v-else class="form-wrapper form-wrapper-sm">
      <form class="form" :class="{ mobile: $isMobile() }">
        <div class="overlay-container">
          <label>Overlay Image</label>
          <div class="image-container">
            <a :href="overlayImageSrc" target="_blank">
              <img :src="overlayImageSrc" />
            </a>
          </div>
        </div>
        <div class="images-container">
          <label>Images</label>
          <div class="images">
            <overlay-image-item
              v-for="overlayImage in overlayImages"
              :key="overlayImage.id"
              :data="overlayImage"
              @click="selectOverlayImage"
              @deleteClick="deleteOverlayImage"
              @editClick="editOverlayImage"
            >
            </overlay-image-item>
          </div>
          <div class="filebox">
            <label for="attachment">Upload</label>
            <input
              @change="handleFileChange"
              id="attachment"
              class="attachment-file"
              type="file"
              accept=".png"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  uploadOverlayImage,
  getOverlayImages,
  setOverlayImage,
  deleteOverlayImage,
  updateOverlayImage,
} from "../api/overlay";
import { getBaseApiUrl } from "../api/index";
import OverlayImageItem from "../components/OverlayImageItem.vue";
import LoadingSpinner from "../components/common/LoadingSpinner.vue";

export default {
  components: {
    OverlayImageItem,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      overlayImageUpdateTime: new Date().getTime().toString(),
      overlayImages: [],
    };
  },
  computed: {
    overlayImageSrc() {
      return `${getBaseApiUrl()}files/overlay?t=${this.overlayImageUpdateTime}`;
    },
  },
  methods: {
    updateOverlayImageSrc() {
      this.overlayImageUpdateTime = new Date().getTime().toString();
    },
    async handleFileChange(e) {
      const file = e.target.files[0];

      this.isLoading = true;
      try {
        if (file) {
          const { data } = await uploadOverlayImage(file);
          this.overlayImages.push(data);
        }
      } catch (error) {
        alert(error.response.statusText);
      } finally {
        this.isLoading = false;
      }
    },
    async selectOverlayImage(overlayData) {
      this.isLoading = true;
      try {
        await setOverlayImage(overlayData.id);
        this.updateOverlayImageSrc();
      } catch (error) {
        alert(error.response.statusText);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteOverlayImage(overlayData) {
      this.isLoading = true;
      try {
        const { data } = await deleteOverlayImage(overlayData.id);
        this.overlayImages = data;
      } catch (error) {
        alert(error.response.statusText);
      } finally {
        this.isLoading = false;
      }
    },
    async editOverlayImage(overlayData) {
      try {
        const newTitle = prompt("Rename", overlayData.title);
        if (newTitle) {
          this.isLoading = true;
          const { data } = await updateOverlayImage(overlayData.id, {
            title: newTitle,
          });
          this.overlayImages = data;
        }
      } catch (error) {
        alert(error.response.statusText);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async created() {
    this.isLoading = true;
    try {
      const { data } = await getOverlayImages();
      this.overlayImages = data;
    } catch (error) {
      alert(error.response.statusText);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
.contents {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;

  max-width: 1020px;
  margin: 0 auto;
  padding: 0 5px;
  width: 100%;
  height: 100%;
}

.contents form {
  flex-grow: 1;
}

.images {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #36393f;
  -webkit-box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  padding: 5px;
  border: 2px solid rgb(43, 45, 49);
  overflow: auto;
  overflow-x: hidden;
  min-height: 140px;
  height: calc(100vh - 600px);
}

img {
  width: 458px;
  height: 257px;
}

.image-container {
  background-image: linear-gradient(45deg, #808080 25%, transparent 25%),
    linear-gradient(-45deg, #808080 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #808080 75%),
    linear-gradient(-45deg, transparent 75%, #808080 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  border: 1px solid black;
}
</style>