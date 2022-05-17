let originalJson;

function jsonInit() {

            $.get( "./dbaccess.php?init_sql_json", function( data ) {
                let table = "";
                data = JSON.parse(data)
                console.log(data)
                originalJson = data;
                for(let i =0;i<data.length;i++){
                    table+="<tr>" +
                        "<td>"+data[i][0]+"</td>" +
                        "<td>"+data[i][1]+"</td>" +
                        "<td>"+data[i][2]+"</td>" +
                        "<td>"+data[i][3]+"</td>" +
                        "<td>"+data[i][4]+"</td>" +
                        "<td>"+data[i][5]+"</td>" +
                        "<td>"+data[i][6]+"</td>" +
                        "<td>"+data[i][7]+"</td>" +
                        "<td>"+data[i][8]+"</td>" +
                        "</tr>"
                }

                $("#box table").html(table);


            });


}
function filter(){
    let search = originalJson;
    let newJson = [];
    let term = $("#search").val();
    if(term!=""){
    search.forEach((e,i)=>{

        for (let i = 0;i<=5;i++){
            console.log(e[i])
            let str = e[i]+"";
            if(str.includes(term) ){

                newJson.push(e);
                break;
            }
        }
        //     if(ee == term){
        //             newJson.push({e});
        //     }
        // })
    })

    let table ="";
    console.log(newJson)
    newJson.forEach((e,i)=>{
        table+="<tr>" +
            "<td>"+newJson[i].id+"</td>" +
            "<td>"+newJson[i].title+"</td>" +
            "<td>"+newJson[i].degrees+"</td>" +
            "<td>"+newJson[i].funds+"</td>" +
            "<td>"+newJson[i].date+"</td>" +
            "<td>"+newJson[i].location+"</td>" +
            "</tr>"
    })
    $("#box table").empty();
    $("#box table").html(table);
    }else{
       clearT();
    }
}
function clearT(){
    let table ="";
    $('#search').val("");
    originalJson.forEach((e,i)=>{
        table+="<tr>" +
            "<td>"+originalJson[i].id+"</td>" +
            "<td>"+originalJson[i].title+"</td>" +
            "<td>"+originalJson[i].degrees+"</td>" +
            "<td>"+originalJson[i].funds+"</td>" +
            "<td>"+originalJson[i].date+"</td>" +
            "<td>"+originalJson[i].location+"</td>" +
            "</tr>"
    })
    $("#box table").empty();
    $("#box table").html(table);
}

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            }
        }
    },
};
const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const labels = Utils.months({count: 7});
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: Utils.numbers(NUMBER_CFG),
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        },
        {
            label: 'Dataset 2',
            data: Utils.numbers(NUMBER_CFG),
            borderColor: Utils.CHART_COLORS.blue,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        }
    ]
};