<template>
<VContainer>
  <VRow class="mt-7">
    <VCol cols="12" md="6" class="d-flex justify-center align-center">
      <VImg
      max-width="100%"
      height="auto"
      contain
      src="@/assets/contentUs.png"
      position="left top"
      rounded="lg"
      >
      </VImg>
    </VCol>
    <VCol cols="12" md="6">
        <h1 class="seventh">發記粉粿冰</h1>
        <VDivider></VDivider>
        <br>
        <p>(04)777-9277</p>
        <p>505彰化縣鹿港鎮民族路186號</p>
        <p>營業時間:</p>
        <p>週一到週日08:00~17:30</p>
        <p>週三公休</p>
        <VChip prepend-icon="mdi-silverware-spoon" color="forth"  variant="outlined" class="me-2">內用</VChip>
        <VChip prepend-icon="mdi-shopping-outline" color="forth"  variant="outlined">外帶</VChip>
        <p>
          始於1965年的發記粉粿冰，是一家位於彰化鹿港的老字號冰店，
        </p>
        <p>
          自從創辦人為了養家活口，開始切起粉粿，不知不覺孩子都養大也成家立業，到現在傳承至第三代，卻還是堅持品項每日純手工製作。
        </p>
    </VCol>
    <VCol cols="12">
      <VCard>
        <VCardTitle class="ninth">
          <VIcon class="seventh">mdi-map-marker</VIcon>&nbsp;
          交通方式
        </VCardTitle>
        <VCardItem>
          <div class="ms-3">
            <p>1.開車：走國道一號（中山高）或國道三號（二高）轉東西快速道路76號往鹿港方向走。</p>
            <p>2.搭高鐵:到<strong>台中站</strong> - 轉搭台灣好行巴士或彰化客運到鹿港，在 <strong>市場前站</strong> 下車，步行約2分鐘。</p>
            <p>3.搭火車：到<strong>彰化站</strong> - 轉搭彰化客運往鹿港，在 <strong>市場前站</strong>下車，步行約2分鐘。</p>
            <p>4.中鹿客運9018：台中後火車站、朝馬站或台灣大道站牌搭乘往鹿港方向，在<strong>鹿港鎮公所站</strong>下車，步行約6分鐘。</p>
          </div>
        </VCardItem>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.3365883049264!2d120.43209391744386!3d24.054448800000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346945fd0ae743f7%3A0xb6a1ac900176717c!2z55m86KiY57KJ57K_5Yaw!5e0!3m2!1szh-TW!2stw!4v1708153714674!5m2!1szh-TW!2stw"  height="450" style="border:0;"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </VCard>
    </VCol>
  </VRow>
</VContainer>
</template>

<style scoped>
.seventh{
  color: #D92323;
  font-size: 2rem;
}
.ninth{
  color: #31312D;
  font-size: 1.7rem;
  display: flex;
  align-items: center;
  font-weight: bold;
}

p,.VChip{
  margin-bottom: 10px;
  font-size: 1.2rem;
}
iframe{
  width: 100%;
}
</style>
