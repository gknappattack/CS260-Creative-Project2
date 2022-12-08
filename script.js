// Global storage for current items pulled up


// Stone II = 1675
//XIVAPI key: 23b3f13051dd43319eaf30c85e4bdbb1060b5c5137cd4978a518193acd01d1ea
document.getElementById("itemSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("itemInput").value;
    if (value === "") {
        return;
    }
    
    var e = document.getElementById("collectableType");
    var val = e.value;
    var text = e.options[e.selectedIndex].text.toLowerCase();
    
    console.log(val)
    console.log(text)
        
    console.log("User entered: " + value);
    
    const url = "https://ffxivcollect.com/api/" + text + "?" + "name_en_cont=" + value
    
    console.log("Full query: ", url);

    fetch(url, {mode: 'cors'})
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            
            document.getElementById("results").innerHTML = ""
            let results = ""
            results += "<h2>Query Results</h2>"
            
            //const items = document.createElement("ul");
            
            if (json.results.length == 0) {
                results += "<h2>No matches found for your query</h2>";
                results += "<h2>Please Try again!</h2>";
            }
            else {
            
                for (let i = 0; i < 10; i++) {
                    results += "<div class=\'result\'>";
                    results += "<img class=\'icon\' src=\'" + json.results[i].icon + "\'/>";
                    results += "<strong><p>" + json.results[i].name + "</p></strong>";
                    
                    if (json.results[i].tooltip) {
                        results += "<em><p>" + json.results[i].tooltip + "</em></p>";
                    }
                    

                    
                    if (json.results[i].sources){
                        //Get sources
                        results += "<p>Acquired from: </p>";
                        
                        results += "<ul>"
                    
                        for (let j = 0; j < json.results[i].sources.length; j++) {
                            results += "<li>" + json.results[i].sources[j].text + "</li>";
                        }
                    }
                    
                    results += "</ul>"
                    
                    results += "</div>";
                    results += "<hr>";
                    //const item = document.createElement("li");
                    //let itemname = json.results[i].name;
                    
                    //item.appendChild(document.createTextNode(itemname));
                    //items.appendChild(item);
                }
            }
                
            document.getElementById("results").innerHTML = results;
             
        });
})