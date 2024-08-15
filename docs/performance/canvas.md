# 合成
```javascript
async makePoster(width, height) {
  const canvas = document.createElement('canvas')
  const scale = window.devicePixelRatio
  canvas.width = this.mergeBox[0].width * scale
  canvas.height = this.mergeBox[0].height * scale
  const ctx = canvas.getContext('2d')
  // // 加入用户上传后的图片
  // const uploadImg = await loadImage(this.customImg)
  // const uploadScal = uploadImg.width / uploadImg.height
  // const { tMatrix, angle } = this.scaleObj
  // console.log('angle', tMatrix[5] * scale)
  // // ctx.rotate((-10 * Math.PI) / 180)
  // ctx.drawImage(uploadImg, tMatrix[4] * scale, tMatrix[5] * scale, this.mergeBox[0].width * scale, (this.mergeBox[0].width / uploadScal) * scale)
  // // ctx.rotate((10 * Math.PI) / 180)
  for (let i = 0; i < this.mergeBox.length; i++) {
    const imgObj = this.mergeBox[i]
    try {
      const img = await loadImage(imgObj.src)
      ctx.drawImage(img, imgObj.x * scale, imgObj.y * scale, imgObj.width * scale, imgObj.height * scale)
    } catch (error) {
      console.log(error)
    }
  }
  const dataURL = canvas.toDataURL(ctx)
  this.demoSrc = dataURL
}
function getBase64(img, ext = 'image/png') {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  const dataURL = canvas.toDataURL(ext)
  return dataURL
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      resolve(img)
    }
    img.error = (e) => {
      reject(e)
    }
  })
}
```