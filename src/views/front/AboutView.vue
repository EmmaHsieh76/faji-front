<template>
  <v-container class="mt-1">
    <v-row >
      <v-col cols="3" class="d-flex justify-center">
        <v-card
          min-width="250"
        >
          <v-list>
            <v-list-subheader class="font-weight-bold">關於發記</v-list-subheader>
            <v-divider></v-divider>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              color="third"
              rounded="xl"
              hover
            >
            <v-list-item-title class="ps-5 font-weight-bold" @click="handleClick(item)">{{item.text}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9" v-if="selectedItem === '品牌故事'" class="d-flex flex-column justify-center">
            <h1 class="text-center third">發記故事</h1>
            <v-divider class="mb-3"></v-divider>
            <v-img
            width="auto"
            height="400"
            src="@/assets/story.jpg"
            cover
            rounded="lg"
            ></v-img>
            <div class="mt-10 text-center">
              <p>民國54年，一位堅強的女人為了維持生計，開始在路邊賣起了剉冰，從那時起，就開啟了三代傳承的美味旅程。女人堅毅的眼神和熱情的笑容，總是迎接著街坊鄰里，讓每一位來店的人都感受到家的溫馨。她的拿手功夫是手工製作的粉粿，每一塊都充滿女士的心血，Q彈的口感讓人回味無窮。</p>
              <p>隨著時光流轉，女士養大了兒子們抱得孫子成了阿嬤，她的剉冰店漸漸成為當地的代表性小吃店，更是家人朋友聚會的首選。孩子們在這裡長大，阿嬤的粉粿成了他們童年的味道，伴隨著歲月的變遷，傳統的味道卻始終保持著不變。時至今日，傳承至第三代的剉冰店仍然秉持著阿嬤的初衷，每一樣品項都堅持純手工製作。</p>
              <p>這裡的剉冰不僅是食物，更是一段家族的歷史。每一次品嚐，都是對三代傳承的尊敬，是對阿嬤辛勤付出的致敬。這家古早味剉冰店不僅提供美味的食物，更是一個凝聚情感和回憶的地方，讓顧客們感受到濃厚的人情味和時光的靜好。</p>
              <p>在這個現代快節奏的社會中，這家三代傳承的剉冰店彷彿是一座穩固的歷史堡壘，將濃濃的古早味情懷傳承給每一位品嚐的人，讓這份美味與回憶在時光中永恆流轉。
              這家古早味剉冰攤雖然不起眼，但卻是一個見證時光流轉的見證者。每一位品嚐這裡剉冰的人，都彷彿走進了一段濃厚的家鄉回憶，感受到那份簡單、真摯的美好。</p>
              <p>直到今日，這家古早味剉冰攤仍然靜靜地存在於街頭，等待著每一位走過的人，分享著這份家族的美味與故事。</p>
            </div>
      </v-col>
      <v-col cols="9" v-else-if="selectedItem === '媒體報導'">
          <v-row>
            <v-col cols="6">
              <v-card>
              <v-card-title>感謝 先吃再說 Eat First 推薦</v-card-title>
              <iframe  width="100%" height="350" src="https://www.youtube.com/embed/rHcDyhV0TUw?si=gPtn56f7ecR19xyg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card>
              <v-card-title>感謝 感謝全民認真花 推薦</v-card-title>
              <iframe width="100%" height="350" src="https://www.youtube.com/embed/eKpi0A3BwV0?si=LFQjRkGjwbCYvJtN&amp;start=180" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </v-card>
            </v-col>
            <v-col cols="6">
              <v-card>
              <v-card-title>感謝 高點電視 推薦</v-card-title>
              <iframe width="100%" height="350" src="https://www.youtube.com/embed/2Q7AbuAz3Jc?si=S-d4RVSr_SE3yarO&amp;start=500" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </v-card>
            </v-col>
            <v-col cols="6">
              <v-card>
              <v-card-title>感謝 厭世奶爸出走日記 推薦</v-card-title>
              <iframe width="100%" height="350" src="https://www.youtube.com/embed/Wm3ZMy9csSY?si=G6yamBLwEIsETg_3&amp;start=546" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </v-card>
            </v-col>
            <v-col cols="6">
              <v-card>
              <v-card-title>感謝 千千進食中 推薦</v-card-title>
              <iframe width="100%" height="350" src="https://www.youtube.com/embed/0pskDDN-eYM?si=CcXqZAkNYwJl2Rbm&amp;start=726" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </v-card>
            </v-col>
            <v-col cols="6">
              <v-card>
              <v-card-title>感謝 野人七號部落 介紹</v-card-title>
              <iframe width="100%" height="350" src="https://www.youtube.com/embed/kcW5cHLVZ8I?si=1LXw8uQ8mMmUWuET&amp;start=353" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </v-card>
            </v-col>
          </v-row>
      </v-col>
      <v-col cols="9" v-else-if="selectedItem === '安心證書'">
        <v-row>
          <v-col cols="6">
            <v-card
            width="400"
            height="700"
            >
              <v-img
              width="100%"
              src="@/assets/safe1.png"
              cover
              ></v-img>
              <v-card-title>安心證書</v-card-title>
              <v-card-text>
                本店已通過HACCP食品安全管理系統認證，確保產品的安全與品質。
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card
            width="400"
            height="700"
            >
              <v-img
              width="100%"
              src="@/assets/safe2.jpg"
              ></v-img>
              <v-card-title>安心證書</v-card-title>
              <v-card-text>
                本店已通過TQF台灣食品優良驗證方案檢驗認證，確保產品的安全與品質。
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { text: '品牌故事' },
  { text: '媒體報導' },
  { text: '安心證書' }
])

const selectedItem = ref('品牌故事')

function handleClick (item) {
  selectedItem.value = item.text
}
</script>

<style scoped>
.third {
  color: #F9C80E;
}

</style>