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
    
        // Fetching for plot values
        console.log(subject);
        s.forEach((v)=>{
            if(subject === v.id){
                sampleValues=[];
                otuIds=[];
                otuLabels=[];
                console.log(v.id)
                sampleValues.push(v.sample_values);
                otuIds.push(v.otu_ids);
                otuLabels.push(v.otu_labels);
            }
        });
        
        //selecting top ten values
        values = sampleValues[0].slice(0, 10);
        ids = otuIds[0].slice(0, 10);
        labels = otuLabels[0].slice(0, 10);
        
        

        let otu_id=[];

        //adding the string 'otu' to id value in order to plot correctly
        ids.forEach((x)=>{
            otu_id.push(`otu ${x}`);
        });

        // sorting values for plot
        otu_id.sort(function compareFunction(first, second) {
            return first - second;
          });
        values.sort(function compareFunction(first, second) {
        return first - second;
        });


        // bar plot
        
        var trace = {
            x: values,
            y: otu_id,
            type: "bar",
            orientation:'h',
            text: labels
        };
        var data = [trace];

        var layout = {
            title: "10 most present microbial species",
            xaxis: { title: ""},
            yaxis: { title: ""}
        };
        
        Plotly.react("bar", data, layout, {displayModeBar: false});

        // bubble chart
        var trace1 = {
            x: otuIds[0],
            y: sampleValues[0],
            mode: 'markers',
            marker:{
                size: sampleValues[0],
                color: otuIds[0],
                colorscale: 'Portland',
            }
        };
        var data1 = [trace1];


        var layout1 = {
            title: "",
            xaxis: { title: ""},
            yaxis: { title: ""}
        };
        
        Plotly.react("bubble", data1, layout1,{displayModeBar: false});

        //gauge chart
        var trace2 = 
            {
              type: "indicator",
              mode: "gauge",
              value: 3,
              title: { text: "Belly Button Washing Frequency", font: { size: 24 }},
            
              gauge: {
                
                axis: { range: [null, 9], tickwidth: 5, tickcolor: "darkblue"},
                bar: { color: "darkblue", thickness: 0 },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps:   
                [
                  { range: [0, 1 ], color:'#8983'},
                  { range: [1, 2 ], color:'#8984'},
                  { range: [2, 3 ], color:'#7975'},
                  { range: [3, 4 ], color:'#6976'},
                  { range: [4, 5 ], color:'#5967'},
                  { range: [5, 6 ], color:'#4968'},
                  { range: [6, 7 ], color:'#3948'},
                  { range: [7, 8 ], color:'#2928'},
                  { range: [8, 9 ], color:'#1919'},
                   
                ],
                
            }
                

              }
            

        var data2 =[trace2]

          var layout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 35, l: 35, b: 25},
            
           
            font: { color: "darkblue", family: "Arial" }
          };
          
         Plotly.newPlot('gauge', data2, layout);



          
        
       
    });

    
    
      
});    
        