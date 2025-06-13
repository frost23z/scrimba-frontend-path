import { catsData, getEmotionIcon } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

document.addEventListener('click', function(e) {
    if (e.target === memeModal) {
        closeModal()
    }
})

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderCat() {
    const catsArray = getMatchingCatsArray()
    
    if (!catsArray || catsArray.length === 0) {
        memeModalInner.innerHTML = `<p>No matching cats found. Please select an emotion.</p>`
        memeModal.style.display = 'flex'
        return
    }
    
    let galleryHtml = `<div class="gallery">`
    
    for (let cat of catsArray) {
        galleryHtml += `
            <div class="gallery-item">
                <img 
                    class="gallery-img" 
                    src="./images/${cat.image}"
                    alt="${cat.alt}"
                >
            </div>
        `
    }
    
    galleryHtml += `</div>`
    memeModalInner.innerHTML = galleryHtml
    memeModal.style.display = 'flex'
    
    const galleryImgs = document.querySelectorAll('.gallery-img')
    galleryImgs.forEach(img => {
        img.addEventListener('click', function() {
            const imgSrc = this.src
            const imgAlt = this.alt
            showFullSizeImage(imgSrc, imgAlt)
        })
    })
}

function showFullSizeImage(imgSrc, imgAlt) {
    memeModalInner.innerHTML = `
        <div class="single-image-container">
            <img 
                class="cat-img" 
                src="${imgSrc}"
                alt="${imgAlt}"
            >
            <button class="back-to-gallery-btn" id="back-to-gallery-btn">Back to Gallery</button>
        </div>
    `
    
    document.getElementById('back-to-gallery-btn').addEventListener('click', renderCat)
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        const icon = getEmotionIcon(emotion)
        radioItems += `
        <div class="radio">
            <label for="${emotion}">
                <div class="emotion-icon">${icon}</div>
                ${emotion}
            </label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)




