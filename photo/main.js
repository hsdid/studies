

const fileinput = document.getElementById('fileinput')


const canvas = document.getElementById('canvas')


const ctx = canvas.getContext('2d')


const red = document.getElementById('red')
const green = document.getElementById('green')
const blue = document.getElementById('blue')
const brightness = document.getElementById('brightness')
const grayscale = document.getElementById('grayscale')
const contrast = document.getElementById('contrast')
const negative = document.getElementById('negative');


red.onchange = runPipeline
green.onchange = runPipeline
blue.onchange = runPipeline
brightness.onchange = runPipeline
grayscale.onchange = runPipeline
contrast.onchange = runPipeline
negative.onchange = runPipeline



const srcImage = new Image()

let imgData = null
let originalPixels = null
let currentPixels = null



fileinput.onchange = function (e) {

  if (e.target.files && e.target.files.item(0)) {
    srcImage.src = URL.createObjectURL(e.target.files[0])
  }
}

srcImage.onload = function () {

 
  canvas.width = srcImage.width
  canvas.height = srcImage.height

  ctx.drawImage(srcImage, 0, 0, srcImage.width, srcImage.height)

  imgData = ctx.getImageData(0, 0, srcImage.width, srcImage.height)

  originalPixels = imgData.data.slice()
}




function commitChanges() {
  
  for (let i = 0; i < imgData.data.length; i++) {
    imgData.data[i] = currentPixels[i]
  }

  ctx.putImageData(imgData, 0, 0, 0, 0, srcImage.width, srcImage.height)
}

function runPipeline() {


  currentPixels = originalPixels.slice()
  const brightnessFilter = Number(brightness.value)
  const contrastFilter = Number(contrast.value)
  const redFilter = Number(red.value)
  const greenFilter = Number(green.value)
  const blueFilter = Number(blue.value)

  const grayscaleFilter = grayscale.checked
  const negativeFilter = negative.checked
  for (let i = 0; i < srcImage.height; i++) {
    for (let j = 0; j < srcImage.width; j++) {
      
   

      if (grayscaleFilter) {
        setGrayscale(j, i)
      }

      if (negative) {

      }

      addBrightness(j, i, brightnessFilter)
      addContrast(j, i, contrastFilter)

      if (!grayscaleFilter) {
        addRed(j, i, redFilter)
        addGreen(j, i, greenFilter)
        addBlue(j, i, blueFilter)
      }
    }
  }

  commitChanges()
}


const R_OFFSET = 0
const G_OFFSET = 1
const B_OFFSET = 2

function addRed(x, y, value) {
  const index = getIndex(x, y) + R_OFFSET
  const currentValue = currentPixels[index]
  currentPixels[index] = clamp(currentValue + value)
}

function addGreen(x, y, value) {
  const index = getIndex(x, y) + G_OFFSET
  const currentValue = currentPixels[index]
  currentPixels[index] = clamp(currentValue + value)
}

function addBlue(x, y, value) {
  const index = getIndex(x, y) + B_OFFSET
  const currentValue = currentPixels[index]
  currentPixels[index] = clamp(currentValue + value)
}

function addBrightness(x, y, value) {
  addRed(x, y, value)
  addGreen(x, y, value)
  addBlue(x, y, value)
}

function setGrayscale(x, y) {
  const redIndex = getIndex(x, y) + R_OFFSET
  const greenIndex = getIndex(x, y) + G_OFFSET
  const blueIndex = getIndex(x, y) + B_OFFSET

  const redValue = currentPixels[redIndex]
  const greenValue = currentPixels[greenIndex]
  const blueValue = currentPixels[blueIndex]

  const mean = (redValue + greenValue + blueValue) / 3

  currentPixels[redIndex] = clamp(mean)
  currentPixels[greenIndex] = clamp(mean)
  currentPixels[blueIndex] = clamp(mean)
}

function setNegative(x, y) {
    
}

function addContrast(x, y, value) {
  const redIndex = getIndex(x, y) + R_OFFSET
  const greenIndex = getIndex(x, y) + G_OFFSET
  const blueIndex = getIndex(x, y) + B_OFFSET

  const redValue = currentPixels[redIndex]
  const greenValue = currentPixels[greenIndex]
  const blueValue = currentPixels[blueIndex]

  
  const alpha = (value + 255) / 255 

  const nextRed = alpha * (redValue - 128) + 128
  const nextGreen = alpha * (greenValue - 128) + 128
  const nextBlue = alpha * (blueValue - 128) + 128

  currentPixels[redIndex] = clamp(nextRed)
  currentPixels[greenIndex] = clamp(nextGreen)
  currentPixels[blueIndex] = clamp(nextBlue)
}


function getIndex(x, y) {
  return (x + y * srcImage.width) * 4
}

function clamp(value) {
  return Math.max(0, Math.min(Math.floor(value), 255))
}