// pour ajouter la population : 
// lien : https://pkgstore.datahub.io/JohnSnowLabs/population-figures-by-country/population-figures-by-country-csv_json/data/2159fad77778c3b584f3d396593e0af6/population-figures-by-country-csv_json.json
// pour la liste des codes des pays : 
// https://pkgstore.datahub.io/core/country-codes/country-codes_json/data/616b1fb83cbfd4eb6d9e7d52924bb00a/country-codes_json.json


var app = new Vue({
    el: '#app',
    data: function() {
        return {
            index : 0,
            randArray: [],
            countries : listePays,
            country1 : undefined,
            country2 : undefined,
            streak : 0,
            button: "Go next",
            highestStreak : 0,
            choiceMade : 0
        }
    },
    
    created: function() {
        this.initRandomArray()
        this.initCountry()
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    },

    methods: {
        changeBackgroundImage: function(countryClicked, otherCountry, event) {
            if(choiceMade < 1){
                if (parseInt(countryClicked.elevation) > parseInt(otherCountry.elevation)){
                    $('#app #main').css("background-color","green")
                    this.button = "Go next"
                    this.streak++
                    if(this.streak > this.highestStreak){
                        this.highestStreak = this.streak
                    }   
                }
                else {
                    this.streak = 0
                    this.button = "Restart"
                    $('#app #main').css("background-color","red")
                }
                this.choiceMade++
            }
            $('#' + event.target.id).toggleClass('opacity')
            this.toggleStatus()
        },

        getRandomCountry: function() {
            var country = this.countries[this.randArray[this.index]]
            this.index++
            country.path = encodeURI("img/" + country.name + ".jpg")
            return country
        },
        initRandomArray: function() {
            var i = 0
            while(i < this.countries.length){
                var r = Math.floor(Math.random() * this.countries.length) + 1;
                if(this.randArray.indexOf(r) === -1) {
                    this.randArray.push(r);
                    i++
                }
            }
        },
        nextRound: function() {
            this.toggleStatus()
            $('#gauche').removeClass('opacity')
            $('#droite').removeClass('opacity')
            $('#app #main').css("background-color","rgba(0, 0, 0, 1)")
            this.choiceMade=0
            this.initCountry()
        },
        toggleStatus: function() {
            $('#divButton').toggle()
            $('#main h1').toggle()
            $('#main h3').toggle()
            $('#gauche').toggleClass('hover')
            $('#droite').toggleClass('hover')
        },
        initCountry: function() {
            this.country1 = this.getRandomCountry()
            this.country2 = this.getRandomCountry()
        },
        getFlagSVG: function(code) {
            if (code == undefined){
                code = "noFlag"
            }
            return `https://flagcdn.com/${code.toLowerCase()}.svg`
        },
        handleResize: function() {
            if (window.innerWidth/window.innerHeight < 1.35){
                $('#app #main').addClass('flex-column')
            }
            else {
                $('#app #main').removeClass('flex-column')
            }
        }
    }
})

