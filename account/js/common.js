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
});


// 이체화면에서 취소 클릭햇을 때 removeClass'show'
document.querySelector('.close_btn').addEventListener('click', function () {
    target.classList.remove('show')
});

// 즐겨찾기 체크, 해제
const favorites = target.querySelectorAll('.transfer_list');
for (let s = 0; s < favorites.length; s++) {
    favorites[s].querySelector('.favorite_btn').addEventListener('click', function () {
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
const current_val = parseInt((Number(input_range.value) / Number(input_range.getAttribute('max'))) * 100);
input_range.style.background = 'linear-gradient(to right, #FFDB4C 0%, #FFDB4C ' + current_val + '%, #d5d4d3 ' + current_val + '%, #d5d4d3 100%)';
//range input 클릭했을 때, 실시간으로 value 값 가져와 max금액/value 값 계산하여 gradient 주기
input_range.addEventListener('input', function () {

    const this_val = parseInt((Number(input_range.value) / Number(input_range.getAttribute('max'))) * 100);
    this.style.background = 'linear-gradient(to right, #FFDB4C 0%, #FFDB4C ' + this_val + '%, #d5d4d3 ' + this_val + '%, #d5d4d3 100%)';
});


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