const data_path="./resources/samples.json";

let data= d3.json(data_path).then((results)=>{
   
    
    d3.select("#selDataset").append("option").attr("value", "").text("select an id");
        let r =results.samples;
        let m=results.metadata;
        let etnicity="";
        let gender="";
        let age="";
        let location="";
        let bbtype="";
        let wfreq="";


        r.forEach((v)=>{
            let xval=d3.select("#selDataset").append("option").attr("value", v.id).text(v.id);
        });
        d3.select("#selDataset").on("change", (s)=>{
            let subject =d3.select("#selDataset").node().value;
            console.log(subject);
            m.forEach((sel)=>{
                if(sel.id === parseInt(subject)){
                    ethnicity=sel.ethnicity;
                    gender=sel.gender;
                    age=sel.age;
                    location=sel.location;
                    bbtype=sel.bbtype;
                    wfreq=sel.wfreq;  
                    console.log(`hello: ${etnicity}`); 
                }  
            });

            
        meta=d3.select(".meta");
        meta.remove();        
        d3.select("#sample-metadata").append("div").attr("class","meta");
        d3.select(".meta").append("p").text(`id: ${subject}`);
        d3.select(".meta").append("p").text(`id: ${ethnicity}`);
        d3.select(".meta").append("p").text(`id: ${age}`);
        d3.select(".meta").append("p").text(`id: ${location}`);
        d3.select(".meta").append("p").text(`id: ${bbtype}`);
        d3.select(".meta").append("p").text(`id: ${wfreq}`);
        });



});


