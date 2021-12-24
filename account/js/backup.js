//swiper 
var swiper = new Swiper(".container", {});


// 네비게이션 메뉴 클릭시, on 클래스 추가
const nav_lis = document.querySelectorAll('nav li');
for (n = 0; n < nav_lis.length; n++) {
    nav_lis[n].querySelector('a').addEventListener('click', function () {
        for (j = 0; j < nav_lis.length; j++) {
            nav_lis[j].classList.remove('on');
        }
        this.parentNode.classList.add('on');
    });
}


const main_sliders = document.querySelectorAll('.main_slider');

for (m = 0; m < main_sliders.length; m++) {


    // graph width 조정
    let grh_percents = main_sliders[m].querySelector('.save_container');
    grh_percents = grh_percents.querySelectorAll('.save')
    for (p = 0; p < grh_percents.length; p++) {
        const grph_percent = grh_percents[p].querySelector('.save_graph');
        let grph_percent_data = Number(grph_percent.dataset.percent);

        let grph_percent_plt = parseInt(grph_percent_data / 20);

        switch (grph_percent_plt) {
            case 0:
                grph_percent.style.background = "#FF5F00";
                break;
            case 1:
                grph_percent.style.background = "#FEB700";
                break;
            case 2:
                grph_percent.style.background = "#55ACEE";
                break;
            case 3:
                grph_percent.style.background = "#0A73C3";
                break;
            default:
                grph_percent.style.background = "#005F59";
        }

        grph_percent.style.width = `${grph_percent_data}%`;
    }



    //이체 버튼 클릭했을 때

    main_sliders[m].querySelector('.transfer_btn').addEventListener('click', function () {
        console.log(main_sliders[m])
        var target = document.querySelector(".transfer_container");
        let bottom = -100;

        function move(time) {
            bottom++;
            target.style.bottom = `${bottom}%`;

            if (bottom >= -100) {
                requestAnimationFrame(move(2000))
            } else if (bottom == 0) {

                cancelAnimationFrame(move(2000))
                target.style.bottom = `0%`;
            }
        }

        // window.requestAnimationFrame(move);


    });



    //kslider height 조정
    const kslider_btn = main_sliders[m].querySelector('.kslider_btn');
    const kslider = main_sliders[m].querySelector('.kslider');
    kslider_btn.addEventListener('click', function () {
        const Btn_on = kslider.classList.contains('click');
        kslider.classList.toggle('click');

    });







    // // 가격 합산 찍어주기
    // //각각 day 마다 반복 실행
    // let days = main_sliders[m].querySelector('.history_wrap');
    // days = days.querySelectorAll('.day');
    // for (let i = 0; i < days.length; i++) {

    //     //각각 day 의 지출내역 반복 실행

    //     let day_total = days[i].querySelector('.history');
    //     day_total = day_total.querySelector('li')
    //     let total_price = 0;
    //     for (let t = 0; t < day_total.length; t++) {
    //         //각각 day 의 지출에서 출금만 선택  
    //         const withdraw_leng = day_total[t].querySelector('.withdraw')
    //         let withdraw_price = unComma(withdraw_leng.textContent);
    //         console.log(withdraw_price)

    //         //출금 가격 합계 
    //         total_price += Number(withdraw_price);
    //         //각각 day의 total에 text 찍어주기
    //         days[i].querySelector('.total').textContent = comma(total_price);
    //     }
    // }

} //main_ slider 반복문




// 계좌 영역 차트 js
//차트 데이터 속성 설정
// const chartdata = {
//     labels: [
//       'January',
//       'February',
//       'March',
//       'April'
//     ],
//     datasets: [{
//       type: 'bar',
//       label: 'Bar Dataset',
//       data: [10, 20, 30, 40],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.2)'
//     }, {
//       type: 'line',
//       label: 'Line Dataset',
//       data: [50, 50, 50, 50],
//       fill: false,
//       borderColor: 'rgb(54, 162, 235)'
//     }]
//   };

// //차트 옵션 설정(X,Y축)
// var chartOptions = {
//     scales: {
//         xAxes: [
//             {
//                 ticks: {
//                     beginAtZero: true
//                 },
//                 scaleLabel: {
//                     display: true,
//                     labelString: "x축 텍스트",
//                     fontColor: "red"
//                 },
//                 stacked: true
//             }
//         ],
//         yAxes: [
//             {
//                 scaleLabel: {
//                     display: true,
//                     labelString: "y축 텍스트",
//                     fontColor: "green"
//                 },
//                 ticks: {
//                     // max: 7000,
//                     min: 0,
//                     // stepSize: 1000,
//                     autoSkip: true
//                 },
//                 stacked: true
//             }
//         ]
//     },
//     responsive: true
// };

// //차트 추가
// var ctx = document.getElementsByClassName("myChart");
// JsChartBar = new Chart(ctx, {
//     type: 'bar',
//     data: chartdata,
//     options: chartOptions
// });







//천자리마다 콤마 찍어주기
function comma(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//콤마 제거
function unComma(pStr) {
    var strCheck = /\,/g;
    pStr = pStr.replace(strCheck, '');
    return pStr;
}





//bank.json 파일에서 데이터 가져오기
fetch('../json/bank.json')
    .then(res => res.json())
    .then(history_list => {
        get_history(history_list)
    });

//데이터에 대한 함수 실행
function get_history(history_list) {

    //데이터 배열 값 가져오기
    const history_bank = history_list.bankList;
    
    
 
    history_bank.sort((a, b) => {
        a= new Date(a.date);
        b= new Date(b.date);
        return a> b? -1: a<b ? 1:0;
    });
  
    // console.log(history_bank)
    // const nDate = new Date('2021/10/3'); //오늘 날짜 임의로 설정
    // const nDate_time = nDate.getTime(); //오늘 날짜를 시간으로 변경


    let account_list = {
        date : '',
        list : []
    };

    let obj_num = 0; // 객체개수 개념 값. 


    //데이터의 수 만큼 반복 실행 
    for (h = 0; h < history_bank.length; h++) {
       
        //1. 현재 날짜가 account_list.date 중에 있어 ? 
        // 없어! == > account_list 구조랑 똑같은 객체를 만들어줘 
        // account_list 현재 date, 랑 현재 info 넣어주면 돼 
        // 있어! ==> 있으면, date 냅두고 info만 추가해줘 . 
        let numTrue = false;
        let current_num = -1;
        for (a = 0; a < obj_num; a++) {
            if (account_list[a].date == history_bank[h].date) {
                //있따     
                current_num = a;
                numTrue = true;
                break;
            } else {
                //없다
                numTrue = false;
            }
        }

        if (numTrue) {
            //true
            account_list[current_num].list.push(history_bank[h]);
        } else {

            // 번째 만들어주고,
            // account_list[arr_num]의 date에 내 현재 데이터 history_bank[h].date 넣어주고, info 넣어준다.
            account_list[obj_num] = {};
          
            //false
            account_list[obj_num].date = history_bank[h].date; 
            account_list[obj_num].list = [history_bank[h]]
            obj_num ++;
        }
        
        //account_list 몇갠지 파악해야해. 
        // account_list 갯수만큼. 비교를해줘 







        //    account_list[hitoryList.date].list.push(hitoryList);
        //    account_list[hitoryList.date].date.push(hitoryList.date);
        //  account_list[hitoryList.date].date = hitoryList.date
        //    console.log(account_list[hitoryList.date])


        //    const arrlist_leng = account_list[hitoryList.date].list;
        //    for(let arr = 0; arr < arrlist_leng.length; arr ++ ){

        //         console.log(arrlist_leng[arr].date  + 'arrlist_leng')
        //         console.log(account_list[hitoryList.date].date + 'account_list')
        //     if( arrlist_leng[arr].date == account_list[hitoryList.date].date){
        //        // console.log('rkx')
        //     }else {
        //         // console.log('ㄴㄴ')
        //     }
        //    }
        //    console.log( account_list[hitoryList.date].list.length)
        //    console.log(account_list[hitoryList.date].list.date)







        //    console.log( reHistory_list[hitoryList.date].date)
        // console.log(reHistory_list[hitoryList.date])
        // console.log(`${days_ago}일 전`)
        // const history_name = history_bank[h].price;
        // console.log(history_date)
    } //for문 끝

    // console.log(account_list)
    //날짜 같은 것 끼리 한 객체에 넣어주기.
    //    account_list[hitoryList.date].list.push(hitoryList)
    //    console.log(account_list[hitoryList.date])

    // let history_wrap = document.createElement('div');

    // //데이터[h] 번째의 date value 값 가져와서 날짜로 변경해주고, 시간으로 변경
    // let history_date = hitoryList.date;
    // history_date = new Date(history_date)
    // history_date = history_date.getTime();

    // // 오늘 날짜로부터 n일 전 계산하기 
    // let days_ago = nDate_time - history_date; //오늘 날짜의 시간 - 데이터[h] 번째의 날짜 시간
    // days_ago = days_ago/1000/60/60/24 //시간을 다시 날짜로 변경
    // days_ago = Math.abs(Number.parseInt(days_ago)); //절대값만 반환

    // let date = 0;
    // switch(days_ago){
    //     case 0 : 
    //         date = '오늘'
    //         // reHistory_arr.push(history_bank[h])
    //         // console.log(reHistory_arr)
    //         break;
    //     case 1 : 
    //         date = '어제'
    //         break;
    //     default : 
    //         date = `${days_ago}일 전`
    // }



}