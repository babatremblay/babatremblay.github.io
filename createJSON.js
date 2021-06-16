const app = Vue.createApp({
    data() {
        return {
            searchUrl : 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=',
            imageUrl : 'https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=',
            images : [],
            countries : []
        }
    },
    created: function() {
        
        $.getJSON('liste_pays.json', data => {
            this.countries = data;
            data.forEach(country => this.searchImage(country));
        })
        
    },
    methods: {
        searchImage: function(country) {
            let searchTerm = country.Highest_point.replace(/\s+/g, '_'); 
            if(searchTerm.includes("_on_")){
                searchTerm = searchTerm.split('_on_')[0]
            } 
            if(!searchTerm.includes("Unnamed")){
                let url = this.searchUrl + searchTerm;
                
                $.getJSON(url, data => {
                    let titre = data[1][0];
                    if(titre === undefined){
                        console.log("pays : " + country.Country + " montagne : " + searchTerm)
                    }
                    titre = titre.replace(/\s+/g, '_'); 
                    let url = this.imageUrl + titre;
                    $.getJSON(url, data => {
                        if(data.query.pages[0].original === undefined){
                            console.log(country)
                        }
                        let source = data.query.pages[0].original.source;
                        
                        let image = {
                            lien: source,
                            pays: country.Country
                        }
                        this.images.push(image)
                    })
                });
            }
        },
        test: function() {
            this.images.forEach(image => {
                var result = this.countries.find(country => country.Country == image.pays)
                if(result != undefined){
                    image = image.lien
                    result.image = image
                }
            })
            console.log(JSON.stringify(this.countries))
        }
    }
})

app.mount('#app')
