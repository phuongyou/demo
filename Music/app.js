


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playAudio = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const btnNext = $('.btn-next')
const btnBack = $('.btn-prev')
const btnRepeat = $('.btn-repeat')
const btnRandom = $('.btn-random')
const cdTHumb = $('.cd-thumb')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isLoop: false,
    isRandom: false,
    songs: [
        {
            name: "Number One",
            singer: "Mirana",
            path: "./music/M1.mp3",
            image: "./img/pic1.jpg"
        },
        {
            name: "Number Two",
            singer: "Tide Hunter",
            path: "./music/M2.mp3",
            image: "./img/pic2.jpg"
        },
        {
            name: "Number Three",
            singer: "Phantom Assasin",
            path: "./music/M3.mp3",
            image: "./img/pic3.jpg"
        },
        {
            name: "Number Four",
            singer: "Void Spirit",
            path: "./music/M4.mp3",
            image: "./img/pic4.jpg"
        },
        {
            name: "Number Five",
            singer: "Techine",
            path: "./music/M5.mp3",
            image: "./img/pic5.jpg"
        },
        {
            name: "Number Six",
            singer: "Nevermore",
            path: "./music/M6.mp3",
            image: "./img/pic6.jpg"
        },
        {
            name: "Number Seven",
            singer: "Undying",
            path: "./music/M7.mp3",
            image: "./img/pic7.jpg"
        },
        {
            name: "Number Eight",
            singer: "Spectree",
            path: "./music/M8.mp3",
            image: "./img/pic8.jpg"
        }
    ],
    render: function () {
        const html = this.songs.map((couse, index) => {

            return `
            <div class="song a${index}" idsong="${index}">
                <div class="thumb"
                    style="background-image: url(${couse.image})">
                </div>
                <div class="body">
                    <h3 class="title">${couse.name}</h3>
                    <p class="author">${couse.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })

        playlist.innerHTML = html.join('')

    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvent: function () {
        const _this = this


        // Xu73 Ly1 animation
        const cdThumbAnimation = cdTHumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 15000,
            iterations: Infinity
        }


        )
        cdThumbAnimation.pause()


        //xử lý cuộn 
        const cdWidth = cd.offsetWidth
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            if (cdWidth > scrollTop) {
                cd.style.width = newCdWidth + 'px'
            } else {
                cd.style.width = '0px'
            }
            cd.style.opacity = newCdWidth / cdWidth





        }


        //xử lý click PLay


        playAudio.onclick = () => {

            if (_this.isPlaying) {

                _this.isPlaying = false
                audio.pause()

            } else {

                _this.isPlaying = true
                audio.play()


            }


        }

        audio.onplay = () => {
            player.classList.add('playing')
            cdThumbAnimation.play()

        }

        audio.onpause = () => {
            player.classList.remove('playing')
            cdThumbAnimation.pause()
        }

        audio.ontimeupdate = () => {

            const progessPercent = Math.ceil(audio.currentTime / audio.duration * 100)

            if (progessPercent) {
                progress.value = progessPercent
            }


        }

        progress.onchange = (e) => {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        //Xử lý btnNext

        btnNext.onclick = () => {

            _this.songNext()
         
        }

        //Xử Lý btnBack 
        btnBack.onclick = () => {
            _this.songBack()
    
        }


        //Xử lý btnRepeat

        btnRepeat.onclick = () => {
            btnRepeat.classList.toggle('active')
            btnRandom.classList.remove('active')
            if (_this.isLoop == false) {

                audio.loop = true
                _this.isLoop = true

            } else {

                audio.loop = false
                _this.isLoop = false
            }

        }

        //Xử Lý btnRandom



        btnRandom.onclick = () => {
            btnRepeat.classList.remove('active')
            if (_this.isRandom == false) {
                btnRandom.classList.toggle('active')

                audio.onended = () => {
                    _this.songRandom()

                }

                _this.isRandom = true


            } else {
                btnRandom.classList.toggle('active')

                _this.isRandom = false

                audio.onended = () => {
                    audio.pause()
                }
            }

        }

        //Xử Lý chọn bài hát
 



    },


    songNext: function () {
        const songIndex = this.songs.length - 1
       
        this.currentIndex = this.currentIndex < songIndex ?this.currentIndex + 1 : 0

        console.log(this.currentIndex)

        this.loadCurrentSong()
  
        this.renderSong()
    },

    songBack: function () {
        const songIndex = this.songs.length - 1


        this.currentIndex = this.currentIndex == 0 ? songIndex : this.currentIndex - 1

        this.loadCurrentSong()
   
        this.renderSong()
    },

    songRandom: function () {

        this.currentIndex = Math.floor(Math.random() * this.songs.length)

        this.loadCurrentSong()

        this.renderSong()

    },

    clickSong: function () {
        const _this = this
        const songs = $$('.song')

        for(var song of songs){
            
           song.onclick = function () {
               const id = this.getAttribute('idsong')
                _this.currentIndex =  Number(id)
                _this.loadCurrentSong()
                _this.renderSong()
           }
          
        }

    },

    loadCurrentSong: function () {


        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        progress.value = 0
        audio.play()


    },
    renderSong: function () {

        // class="song" idsong="${index}
        const removeSong = document.querySelector('.song.active')
        if (removeSong) {
            removeSong.classList.remove('active')
        }

        const activeSong = document.querySelector('.song.a' + this.currentIndex)
        activeSong.classList.add('active')

  
    },

    start: function () {

        this.defineProperties()

        this.handleEvent()

        this.loadCurrentSong()

        this.render()

        this.renderSong()

        this.clickSong()
    }


}




app.start()


