/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== experience MODAL ===============*/
const   modalViews = document.querySelectorAll('.experience__modal'),
        modalBtns = document.querySelectorAll('.experience__button'),
        modalClose = document.querySelectorAll('.experience__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((mb, i) =>{
    mb.addEventListener('click', () =>{
        modal(i)
    })
})

modalClose.forEach((mc) =>{
    mc.addEventListener('click', () =>{
        modalViews.forEach((mv) =>{
            mv.classList.remove('active-modal')
        })
    })
})

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */ 
const linkWork = document.querySelectorAll('.work__item')

function activeWork(){
    linkWork.forEach(l=> l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(l=> l.addEventListener('click', activeWork))


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== LIGHT DARK THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== ACCENT COLOR ===============*/
const colorButton = document.getElementById('color-button')
const colorPicker = document.querySelector('.color-picker')
const colorSwatches = document.querySelectorAll('.color-swatch')
const customColor = document.getElementById('custom-color')
const defaultColor = '#c96b6b'
const selectedColor = localStorage.getItem('selected-color') || defaultColor

const setAccentColor = (color) => {
    const red = Number.parseInt(color.slice(1, 3), 16) / 255
    const green = Number.parseInt(color.slice(3, 5), 16) / 255
    const blue = Number.parseInt(color.slice(5, 7), 16) / 255
    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue)
    const lightness = (max + min) / 2
    const difference = max - min
    let hue = 0
    let saturation = 0

    if (difference !== 0) {
        saturation = difference / (1 - Math.abs(2 * lightness - 1))
        if (max === red) hue = 60 * (((green - blue) / difference) % 6)
        if (max === green) hue = 60 * ((blue - red) / difference + 2)
        if (max === blue) hue = 60 * ((red - green) / difference + 4)
    }

    if (hue < 0) hue += 360
    document.documentElement.style.setProperty('--first-hue', hue)
    document.documentElement.style.setProperty('--sat', `${saturation * 100}%`)
    document.documentElement.style.setProperty('--lig', `${lightness * 100}%`)
}

customColor.value = selectedColor
setAccentColor(selectedColor)

const selectColor = (color) => {
    setAccentColor(color)
    customColor.value = color
    localStorage.setItem('selected-color', color)
    colorPicker.classList.remove('is-open')
    colorButton.setAttribute('aria-expanded', 'false')
}

colorButton.addEventListener('click', () => {
    const isOpen = colorPicker.classList.toggle('is-open')
    colorButton.setAttribute('aria-expanded', isOpen)
})

colorSwatches.forEach((swatch) => {
    swatch.addEventListener('click', () => selectColor(swatch.dataset.color))
})

customColor.addEventListener('input', () => {
    setAccentColor(customColor.value)
    localStorage.setItem('selected-color', customColor.value)
})

document.addEventListener('click', (event) => {
    if (!colorPicker.contains(event.target)) {
        colorPicker.classList.remove('is-open')
        colorButton.setAttribute('aria-expanded', 'false')
    }
})

/*=============== AMBIENT MUSIC ===============*/
const musicButton = document.getElementById('music-button')
const musicStatus = document.getElementById('music-status')
const musicTitle = document.querySelector('.music-info__title')
const musicInfo = document.querySelector('.music-info')
const musicFileInput = document.getElementById('music-file-input')
const musicLibrary = document.getElementById('music-library')
const musicPlay = document.getElementById('music-play')
const musicPrevious = document.getElementById('music-previous')
const musicNext = document.getElementById('music-next')
const musicStop = document.getElementById('music-stop')
const audioPlayer = new Audio()
let audioContext
let musicGain
let musicOscillators
let musicTimer
let musicPlaying = false
let bundledTracks = []
let playlist = []
let currentTrackIndex = -1

const startAmbientMusic = () => {
    audioContext = new AudioContext()
    musicGain = audioContext.createGain()
    musicGain.gain.value = 0.035
    musicGain.connect(audioContext.destination)

    musicOscillators = [220, 277.18, 329.63].map((frequency, index) => {
        const oscillator = audioContext.createOscillator()
        oscillator.type = index === 0 ? 'sine' : 'triangle'
        oscillator.frequency.value = frequency
        oscillator.connect(musicGain)
        oscillator.start()
        return oscillator
    })

    const notes = [220, 246.94, 277.18, 329.63, 369.99]
    let noteIndex = 0
    musicTimer = setInterval(() => {
        noteIndex = (noteIndex + 1) % notes.length
        musicOscillators[0].frequency.setTargetAtTime(notes[noteIndex], audioContext.currentTime, 0.25)
    }, 1400)
}

const stopAmbientMusic = () => {
    clearInterval(musicTimer)
    musicOscillators.forEach((oscillator) => oscillator.stop())
    audioContext.close()
}

const updateMusicButton = (playing) => {
    musicPlaying = playing
    musicButton.innerHTML = `<i class="bx bx-${playing ? 'pause' : 'play'}"></i>`
    musicPlay.innerHTML = `<i class="bx bx-${playing ? 'pause' : 'play'}"></i>`
    musicButton.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} music`)
    musicButton.setAttribute('title', `${playing ? 'Pause' : 'Play'} music`)
    musicStatus.textContent = playing ? 'Playing' : 'Paused'
    musicInfo.classList.toggle('is-visible', playing)
}

const selectTrack = (trackIndex) => {
    currentTrackIndex = trackIndex
    audioPlayer.src = playlist[trackIndex].url
    musicTitle.textContent = playlist[trackIndex].name
    musicStatus.textContent = 'Ready'
    document.querySelectorAll('.music-track').forEach((track, index) => {
        track.classList.toggle('active-track', index === trackIndex)
    })
}

const renderPlaylist = () => {
    musicLibrary.innerHTML = ''
    playlist.forEach((track, index) => {
        const trackButton = document.createElement('button')
        trackButton.type = 'button'
        trackButton.className = 'music-track'
        trackButton.textContent = track.name
        trackButton.title = track.name
        trackButton.addEventListener('click', () => selectTrack(index))
        musicLibrary.appendChild(trackButton)
    })
    musicLibrary.classList.toggle('has-tracks', playlist.length > 0)
}

const loadMusicManifest = async () => {
    const response = await fetch('assets/music/music.json')
    bundledTracks = await response.json()
    playlist = [...bundledTracks]
    renderPlaylist()
}

loadMusicManifest().catch(() => {
    musicStatus.textContent = 'Add music'
})

musicFileInput.addEventListener('change', () => {
    playlist.filter((track) => track.isLocal).forEach((track) => URL.revokeObjectURL(track.url))
    const uploadedTracks = Array.from(musicFileInput.files).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        isLocal: true
    }))
    playlist = [...bundledTracks, ...uploadedTracks]
    renderPlaylist()
    if (playlist.length > 0) selectTrack(0)
})

musicButton.addEventListener('click', () => {
    if (musicPlaying) {
        if (currentTrackIndex >= 0) audioPlayer.pause()
        else stopAmbientMusic()
        updateMusicButton(false)
        return
    }

    if (currentTrackIndex >= 0) {
        audioPlayer.play()
        updateMusicButton(true)
    } else {
        startAmbientMusic()
        updateMusicButton(true)
    }
})

musicPlay.addEventListener('click', () => musicButton.click())

musicPrevious.addEventListener('click', () => {
    if (playlist.length === 0) return
    selectTrack((currentTrackIndex - 1 + playlist.length) % playlist.length)
})

musicNext.addEventListener('click', () => {
    if (playlist.length === 0) return
    selectTrack((currentTrackIndex + 1) % playlist.length)
})

musicStop.addEventListener('click', () => {
    if (currentTrackIndex >= 0) audioPlayer.pause()
    else if (musicPlaying) stopAmbientMusic()
    updateMusicButton(false)
    musicStatus.textContent = 'Stopped'
})

audioPlayer.addEventListener('ended', () => {
    if (currentTrackIndex < playlist.length - 1) {
        selectTrack(currentTrackIndex + 1)
        audioPlayer.play()
    } else {
        updateMusicButton(false)
    }
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal('.home__data')
sr.reveal('.home__handle', {delay: 700})
sr.reveal('.home__social, .home__scroll', {delay: 900, origin:'bottom'})
