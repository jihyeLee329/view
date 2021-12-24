//swiper 
// var swiper = new Swiper(".container", {});


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

// for (m = 0; m < main_sliders.length; m++) {
    

    //save_container의 각각 save의 graph width 조정
    let grh_percents = document.querySelector('.save_container');
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



    //이체 버튼 클릭했을 때 addClass 'show'
    const target = document.querySelector(".transfer_container");
    document.querySelector('.transfer_btn').addEventListener('click', function () {
        
        
        let bottom = -100;
        target.classList.add('show');
        // function move() {
        //     bottom += 1;
        //     target.style.bottom = `${bottom}%`;

        //     if (bottom == 0) {
        //         cancelAnimationFrame(move())
        //     } else{
        //         requestAnimationFrame(move())
              
                
        //     }
        // }

        // window.requestAnimationFrame(move);


    });

    // 이체화면에서 취소 클릭햇을 때 removeClass'show'
    document.querySelector('.close_btn').addEventListener('click',function(){
        target.classList.remove('show')
    });

    const favorites = target.querySelectorAll('.transfer_list');
    for(let s=0; s < favorites.length; s ++){
        favorites[s].querySelector('.favorite_btn').addEventListener('click',function(){
           this.classList.toggle('chk');
        });
    }


    //kslider height 조정
    const kslider_btn = document.querySelector('.kslider_btn');
    const kslider = document.querySelector('.kslider');
    kslider_btn.addEventListener('click', function () {
        const Btn_on = kslider.classList.contains('click');
        kslider.classList.toggle('click');
    });

 
    //목표금액 range바 gradient 삽입
    const input_range = document.querySelector('#account_target');
    //처음 설정한 value 값 만큼 gradient 넣어주기
    const current_val = parseInt((Number(input_range.value)/Number(input_range.getAttribute('max')))*100);
    input_range.style.background = 'linear-gradient(to right, #FFDB4C 0%, #FFDB4C '+ current_val +'%, #d5d4d3 ' + current_val + '%, #d5d4d3 100%)';
    //range input 클릭했을 때, 실시간으로 value 값 가져와 max금액/value 값 계산하여 gradient 주기
    input_range.addEventListener('input', function(){
        
        const this_val = parseInt((Number(input_range.value)/Number(input_range.getAttribute('max')))*100);
        this.style.background = 'linear-gradient(to right, #FFDB4C 0%, #FFDB4C '+ this_val +'%, #d5d4d3 ' + this_val + '%, #d5d4d3 100%)';
    });


    // fetch('./account/json/bank.json')
    //     .then(res => res.json())
    //     .then(history_list => {
    //         get_history(history_list)
    //     });


    
    // function get_history(history_list) {
    //     const history_ul = document.querySelector('.history');
    //     const history_wrap = document.querySelector('.history_wrap');
       
    //     for (let h = 0; h < 100; h++) {
    //         const history_li_wrap = history_ul.querySelector('li');
    //         const history_name_wrap = history_li_wrap.querySelector('.name')
    //         const history_price_wrap = history_li_wrap.querySelector('price')

    //         const history_name = history_list[h].price;
           
    //         // console.log(history_list.bankList.length)

    //     }
    // }



    // 가격 합산 찍어주기
    //각각 day 마다 반복 실행
    // let days = document.querySelector('.history_wrap');
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


   

// } //main_ slider 반복문


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