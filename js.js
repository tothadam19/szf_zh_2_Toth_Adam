let originalJson;

function jsonInit() {

            $.get( "./dbaccess.php?init_sql_json", function( data ) {
                let table = "";
                data = JSON.parse(data)
                console.log(data)
                originalJson = data;
                table+='<thead><tr>' +
                    '<th><select onchange="filterselect(this)" id="1s"><option value="-1" selected></option></select></th>' +
                    '<th><select onchange="filterselect(this);console.log(`AAA`)" id="2s"><option value="-1" selected></option></select></th>' +
                    '<th><select onchange="filterselect(this);console.log(`AAA`)" id="3s"><option value="-1" selected></option></select></th>' +
                    '<th><select onchange="filterselect(this);console.log(`AAA`)" id="4s"><option value="-1" selected></option></select></th>' +
                    '<th><select onchange="filterselect(this);console.log(`AAA`)" id="5s"><option value="-1" selected></option></select></th>' +
                    '<th><select onchange="filterselect(this);console.log(`AAA`)" id="6s"><option value="-1" selected></option></select></th>' +
                    '<th><select onchange="filterselect(this);console.log(`AAA`)" id="7s"><option value="-1" selected></option></select></th>' +
                    '<th><select onchange="filterselect(this);console.log(`AAA`)" id="8s"><option value="-1" selected></option></select></th>' +
                    '<th><select onchange="filterselect(this);console.log(`AAA`)" id="9s"><option value="-1" selected></option></select></th>' +
                    '</th></thead><tbody>'
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
                table+='</tbody>'

                $("#box table").html(table);
                let idopt = ''
                for(let i =0;i<data.length;i++){
                    idopt += '<option value="'+(i+1)+'">'+(i+1)+'</option>'
                }
                console.log(table)
                 $('#1s').html(idopt)
                $.get( "./dbaccess.php?query=Select distinct gender from People", function( data ) {
                    data = JSON.parse(data)

                    let opt ='';
                    for(let d of data){
                        opt+='<option value="'+d[0]+'">'+d[0]+'</option>';
                    }
                    $("#2s").html(opt)
                });
                $.get( "./dbaccess.php?query=Select distinct ethnicity from People", function( data ) {
                    data = JSON.parse(data)

                    let opt ='';
                    for(let d of data){
                        opt+='<option value="'+d[0]+'">'+d[0]+'</option>';
                    }
                    $("#3s").html(opt)
                });
                $.get( "./dbaccess.php?query=Select distinct edu from People", function( data ) {
                    data = JSON.parse(data)

                    let opt ='';
                    for(let d of data){
                        opt+='<option value="'+d[0]+'">'+d[0]+'</option>';
                    }
                    $("#4s").html(opt)
                });
                $.get( "./dbaccess.php?query=Select distinct prep from People", function( data ) {
                    data = JSON.parse(data)

                    let opt ='';
                    for(let d of data){
                        opt+='<option value="'+d[0]+'">'+d[0]+'</option>';
                    }
                    $("#5s").html(opt)
                });
                $.get( "./dbaccess.php?query=Select distinct lunch from People", function( data ) {
                    data = JSON.parse(data)

                    let opt ='';
                    for(let d of data){
                        opt+='<option value="'+d[0]+'">'+d[0]+'</option>';
                    }
                    $("#6s").html(opt)
                });
                $.get( "./dbaccess.php?query=Select distinct math_score from People", function( data ) {
                    data = JSON.parse(data)

                    let opt ='';
                    for(let d of data){
                        opt+='<option value="'+d[0]+'">'+d[0]+'</option>';
                    }
                    $("#7s").html(opt)
                });
                $.get( "./dbaccess.php?query=Select distinct read_score from People", function( data ) {
                    data = JSON.parse(data)

                    let opt ='';
                    for(let d of data){
                        opt+='<option value="'+d[0]+'">'+d[0]+'</option>';
                    }
                    $("#8s").html(opt)
                });
                $.get( "./dbaccess.php?query=Select distinct write_score from People", function( data ) {
                    data = JSON.parse(data)


                    let opt ='';
                    for(let d of data){
                        opt+='<option value="'+d[0]+'">'+d[0]+'</option>';
                    }
                    $("#9s").html(opt)
                });



            });


}
function filterselect(that){
    let newJ = [];
    let val =$(that).val();
    let ii = Number(that.id.slice(0,-1))-1
        console.log(ii)
    newJ = originalJson.filter(el=>el[ii] =val);

    let table =''
    for(let i =0;i<newJ.length;i++){

        table+="<tr>" +
            "<td>"+newJ[i][0]+"</td>" +
            "<td>"+newJ[i][1]+"</td>" +
            "<td>"+newJ[i][2]+"</td>" +
            "<td>"+newJ[i][3]+"</td>" +
            "<td>"+newJ[i][4]+"</td>" +
            "<td>"+newJ[i][5]+"</td>" +
            "<td>"+newJ[i][6]+"</td>" +
            "<td>"+newJ[i][7]+"</td>" +
            "<td>"+newJ[i][8]+"</td>" +
            "</tr>"
    }
    $("#box table tbody").empty()
    $("#box table tbody").html(table);
    $("#box table thead select").val('-1')
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
            "<td>"+newJson[i][0]+"</td>" +
            "<td>"+newJson[i][1]+"</td>" +
            "<td>"+newJson[i][2]+"</td>" +
            "<td>"+newJson[i][3]+"</td>" +
            "<td>"+newJson[i][4]+"</td>" +
            "<td>"+newJson[i][5]+"</td>" +
            "<td>"+newJson[i][6]+"</td>" +
            "<td>"+newJson[i][7]+"</td>" +
            "<td>"+newJson[i][8]+"</td>" +
            "</tr>"
    })
    $("#box table tbody").empty();
    $("#box table tbody").html(table);
    }else{
       clearT();
    }
}
function clearT(){
    let table ="";
    $('#search').val("");
    originalJson.forEach((e,i)=>{
        table+="<tr>" +
            "<td>"+originalJson[i][0]+"</td>" +
            "<td>"+originalJson[i][1]+"</td>" +
            "<td>"+originalJson[i][2]+"</td>" +
            "<td>"+originalJson[i][3]+"</td>" +
            "<td>"+originalJson[i][4]+"</td>" +
            "<td>"+originalJson[i][5]+"</td>" +
            "<td>"+originalJson[i][6]+"</td>" +
            "<td>"+originalJson[i][7]+"</td>" +
            "<td>"+originalJson[i][8]+"</td>" +
            "</tr>"
    })
    $("#box table tbody").empty();
    $("#box table tbody").html(table);
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