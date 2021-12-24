
//bank.json 파일에서 데이터 가져오기
fetch('https://jihyelee329.github.io/view/account/json/bank.json')
    .then(res => res.json())
    .then(history_list => {
        get_history(history_list)
    });

//데이터에 대한 함수 실행
function get_history(history_list) {

    //데이터 배열 값 가져오기
    const history_bank = history_list.bankList;
    //데이터 날짜별로 내림차순 정렬
    history_bank.sort((a, b) => {
        a = new Date(a.date);
        b = new Date(b.date);
        return a > b ? -1 : a < b ? 1 : 0;
    });

    // console.log(history_bank)
    const nDate = new Date('2021/10/4'); //오늘 날짜 임의로 설정
    const nDate_time = nDate.getTime(); //오늘 날짜를 시간으로 변경


    //필요한 정보를 구조화 한 빈 객체 선언
    let account_list = {
        day: '', // 오늘,어제,n일 전 객체
        date: '', // 날짜 객체
        list: [], // 각각 날짜에 대한 info 객체
        total: '' // 사용한 금액
    };

    let obj_num = 0; // 객체개수 개념 값. 


    //데이터의 수 만큼 반복 실행 
    for (h = 0; h < history_bank.length; h++) {

        //1. 현재 날짜가 account_list.date 중에 있어 ? 
        // 없어! == > account_list 구조랑 똑같은 객체를 만들어줘 
        // account_list 현재 date, 랑 현재 info 넣어주면 돼 
        // 있어! ==> 있으면, date 냅두고 info만 추가해줘 . 
        let numTrue = false; //임의의 false 값 할당
        let current_num = -1; //임의의 -1 값 할당

        //현재 들어온 history_bank[h] 가 이전에 들어온 history_bank[h]의 date와 같은 것이 있는지 확인하기 위한 반복문 

        //obj_num이 지금까지 만든 객체의 개수. 
        //현재 들어온 데이터랑 지금까지 만들어진 데이터랑 모두 비교해봐야해. 

        for (a = 0; a < obj_num; a++) {
            if (account_list[a].date == history_bank[h].date) {
                //현재 데이터의 date와 이미 지나간 데이터의 date와 일치하는 값이 있다. 
                current_num = a; //current_num 은 -1 에서 현재 a 값으로 변경
                numTrue = true; //numTrue true 값으로 변경, 단지 확인용 boolean 데이터
                break;
            } else {
                //현재 데이터의 date와 이미 지나간 데이터의 date 가 일치하는 값이 없다.
                numTrue = false;
            }
        }

        //만약 현재 date 와 지난 date 가 같다면, 
        if (numTrue) {
            //이미 만들어진 객체 account_list[n]번째의 list란 key 에 현재 반복 실행중에 들어온 history_bank[h] 값 넣기
            account_list[current_num].list.push(history_bank[h]);

        } else {

            // 번째 만들어주고,
            // account_list[arr_num]의 date에 내 현재 데이터 history_bank[h].date 넣어주고, info 넣어준다.
            account_list[obj_num] = {}; //빈 객체 선언.

            //현재 들어온 데이터의 date 값이 새롭다! 그럼 새 객체 만들어 주기. ==> account_list[obj_num] . 여기서 obj_num은 반복 돌때마다 증가

            account_list[obj_num].date = history_bank[h].date;
            account_list[obj_num].list = [history_bank[h]]


            obj_num++; //현재 생성된 객체의 개수.  
        }



        //    console.log( reHistory_list[hitoryList.date].date)
        // console.log(reHistory_list[hitoryList.date])
        // console.log(`${days_ago}일 전`)
        // const history_name = history_bank[h].price;
        // console.log(history_date)
    } //for문 끝


    // console.log(account_list[obj_num])

    // console.log(account_list)
    for (let al = 0; al < obj_num; al++) {


        
    //dom 생성
    const history_wrap = document.querySelector('.history_wrap');
    const day_elm = document.createElement('div');
    day_elm.className = 'day';
    const date_elm = document.createElement('p');
    date_elm.className = 'date';
    const date_total = document.createElement('span');
    date_total.className = 'total';
    const ul_elm = document.createElement('ul');
    ul_elm.className = 'history';
  


        //각각 새로 만든 날짜 n일 전인지 계산해주기
        let history_date = account_list[al].date
        history_date = new Date(history_date)
        history_date = history_date.getTime();
       
        let days_ago = nDate_time - history_date; //오늘 날짜의 시간 - 데이터[h] 번째의 날짜 시간
        days_ago = days_ago / 1000 / 60 / 60 / 24 //시간을 다시 날짜로 변경
        days_ago = Math.abs(Number.parseInt(days_ago)); //절대값만 반환

        let day = 0;
        switch (days_ago) {
            case 0:
                day = '오늘'
                break;
            case 1:
                day = '어제'
                break;
            default:
                day = `${days_ago}일 전`
        }
        account_list[al].day = day


        //각각 n일 전 데이터 삽입
        date_elm.textContent = account_list[al].day;
        day_elm.append(date_elm);
        history_wrap.append(day_elm);

        let total_add = 0;
        //각각 li에 대한 for문
        let list_len = account_list[al].list; 
        for (let db = 0; db < list_len.length; db ++) {
           const history_name = list_len[db].history;
           const history_price =  Number(list_len[db].price);
         console.log(history_price)
           const history_income =  list_len[db].income;
           const li_elm = document.createElement('li');

           const name_elm = document.createElement('span');
           name_elm.className ='name'
           const price_elm = document.createElement('span');
           price_elm.className ='price'


            if(history_income == 'in'){
                price_elm.classList.add('desposit');
             
               
            }else{
                price_elm.classList.add('withdraw');
                total_add += history_price
            }

           
            // total_add += history_price;
           name_elm.textContent = history_name;
           price_elm.textContent = comma(history_price);
           li_elm.append(name_elm);
           li_elm.append(price_elm);
           ul_elm.append(li_elm);
         
        }
        day_elm.append(ul_elm);
        date_total.append(comma(total_add));
        date_elm.append(date_total)
         
    }



    

}