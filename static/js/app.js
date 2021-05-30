const data_path="./resources/samples.json";

let data= d3.json(data_path).then((results)=>{
   
    //getting values for dropdown 
    d3.select("#selDataset").append("option").attr("value", "").text("select an id");
    let s =results.samples;
    let m=results.metadata;
    let ethnicity="";
    let gender="";
    let age="";
    let location="";
    let bbtype="";
    let wfreq="";
    let sampleValues=[];
    let otuIds=[];
    let otuLabels=[];

    //inserting values on dropdown menu
    s.forEach((v)=>{
        let dropDownVal=d3.select("#selDataset").append("option").attr("value", v.id).text(v.id);
    });

    //identifying change on dropdown, get selection value and generate visualizations with selection
    d3.select("#selDataset").on("change", (d)=>{
        let subject =d3.select("#selDataset").node().value;
        
        
        //fetching demographic information for select edsubject id
        m.forEach((sel)=>{
            if(sel.id === parseInt(subject)){
                ethnicity=sel.ethnicity;
                gender=sel.gender;
                age=sel.age;
                location=sel.location;
                bbtype=sel.bbtype;
                wfreq=sel.wfreq;  
            }  
        });

        //adding demographic info
        meta=d3.select(".meta");
        meta.remove();        
        d3.select("#sample-metadata").append("div").attr("class","meta");
        d3.select(".meta").append("p").text(`id: ${subject}`);
        d3.select(".meta").append("p").text(`id: ${ethnicity}`);
        d3.select(".meta").append("p").text(`id: ${age}`);
        d3.select(".meta").append("p").text(`id: ${location}`);
        d3.select(".meta").append("p").text(`id: ${bbtype}`);
        d3.select(".meta").append("p").text(`id: ${wfreq}`);
    
        s.forEach((v)=>{
            if(subject === v.id){
                sampleValues.push(v.sample_values);
                otuIds.push(v.otu_ids);
                otuLabels.push(v.otu_labels);
            }
        });
           
        values = sampleValues[0].slice(0, 10);
        ids = otuIds[0].slice(0, 10);
        labels = otuLabels[0].slice(0, 10);
        let otu_id=[];

        ids.forEach((x)=>{
            otu_id.push(`otu ${x}`);
        })

        otu_id.sort(function compareFunction(first, second) {
            return first - second;
          });
        values.sort(function compareFunction(first, second) {
        return first - second;
        });

        console.log(values);
        console.log(ids);

        var trace1 = {
            x: values,
            y: otu_id,
            type: "bar",
            orientation:'h',
        };
        var gdata = [trace1];

        var layout = {
            title: "",
            xaxis: { title: ""},
            yaxis: { title: ""}
        };
        
        Plotly.newPlot("bar", gdata, layout)

    });
    
      
       
        
        
        
   


       
        





    
    
   

   


});


