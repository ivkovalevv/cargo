document.addEventListener('DOMContentLoaded', function(){

    /* BURGER MENU */

    let burgerBtn = document.getElementById('burger');
    let burgerMenu = document.getElementById('burgerMenu');

    burgerBtn.addEventListener('click', function(){
        burgerMenu.classList.toggle('burger__content-open');
        burgerBtn.classList.toggle('burger__closed');
    });

    /* REQUEST BURGER BTN */

    let requestBurgerBtn = document.querySelector('.burger__btn');

    requestBurgerBtn.addEventListener('click', function(){
        requestForm.style.display = 'block';
        overlay.style.display = 'block';
    })

    /* REQUEST FORM */
    let headerBtn = document.querySelector('.header__btn');
    let escBtn = document.getElementById('esc');
    let requestForm = document.querySelector('.request-form-container')
    let overlay = document.querySelector('.overlay');

    headerBtn.addEventListener('click', function(){
        requestForm.style.display = 'block';
        overlay.style.display = 'block';
    });

    escBtn.addEventListener('click', function(){
        requestForm.style.display = 'none';
        overlay.style.display = 'none';
    })

    let requestBtn = document.getElementById('request-btn');
    let requestName = document.getElementById('request-name');
    let requestTel = document.getElementById('request-tel');
    let requestEmail = document.getElementById('request-email');
    let requestComment = document.getElementById('request-comment');

    /* Message Master Tao - TG */
    const TOKEN = "5865834376:AAE6Y7X8z0G5bE5HJHSHqW0Y616R82o9Psk";
    const CHAT_ID = "-1001831251519";
    const URI_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;

    requestBtn.addEventListener('click', function (e){
        e.preventDefault();

        let message = `<b>Заявка с сайта</b>\n`;
            message += `<b>Имя: </b> ${ requestName.value }\n`;
            message += `<b>Номер телефона: </b> ${ requestTel.value }\n`;
            message += `<b>Email: </b> ${ requestEmail.value }\n`;
            message += `<b>Примечание: </b> ${ requestComment.value }`;

        if (requestName.value == ""){
            document.querySelector('.request-name__valid').style.display = 'block';
            requestName.style.outline = '2px solid red';
        } 
        if (requestTel.value == ""){
            document.querySelector('.request-tel__valid').style.display = 'block';
            requestTel.style.outline = '2px solid red';
        } 
        if (requestEmail.value == ""){
            document.querySelector('.request-email__valid').style.display = 'block';
            requestEmail.style.outline = '2px solid red';
        } if (requestComment.value == ""){
            document.querySelector('.request-comment__valid').style.display = 'block';
            requestComment.style.outline = '2px solid red';
        } else{
            axios.post(URI_API, {
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: message 
            })
            .then((res) => {
                requestForm.style.display = 'none';
                overlay.style.display = 'none';

                requestName.value = "";
                document.querySelector('.request-name__valid').style.display = 'none';
                requestName.style.outline = '0px solid red';
                requestTel.value = "";
                document.querySelector('.request-tel__valid').style.display = 'none';
                requestTel.style.outline = '0px solid red';
                requestEmail.value = "";
                document.querySelector('.request-email__valid').style.display = 'none';
                requestEmail.style.outline = '0px solid red';
                requestComment.value = "";
                document.querySelector('.request-comment__valid').style.display = 'none';
                requestComment.style.outline = '0px solid red'; 
            })
            .catch((err) => {
                console.warn(err);
            })
            .finally(() => {
                console.log('Конец');
            })

            requestForm.style.display = 'none';
            overlay.style.display = 'none';

            requestName.value = "";
            document.querySelector('.request-name__valid').style.display = 'none';
            requestName.style.outline = '0px solid red';
            requestTel.value = "";
            document.querySelector('.request-tel__valid').style.display = 'none';
            requestTel.style.outline = '0px solid red';
            requestEmail.value = "";
            document.querySelector('.request-email__valid').style.display = 'none';
            requestEmail.style.outline = '0px solid red';
            requestComment.value = "";
            document.querySelector('.request-comment__valid').style.display = 'none';
            requestComment.style.outline = '0px solid red'; 
        };
    });

    /*  SLIDER HERO */
    let offset = 0; // смещение отлевого края
    const sliderTrack = document.querySelector('.section-hero__slider-track');
    const dot1 = document.querySelector('.dot-one');
    const dot2 = document.querySelector('.dot-two');
    const dot3 = document.querySelector('.dot-three');
    const dot4 = document.querySelector('.dot-four');
    let sliderWidth = sliderTrack.clientWidth;

    dot1.classList.add('active');

    document.querySelector('.section-hero__btn-next').addEventListener('click', function(next){
        offset += sliderWidth;
        if (offset > sliderWidth * 3) {
            offset = 0;
        }
        sliderTrack.style.left = -offset + 'px';

        if(offset >= sliderWidth){
            dot2.classList.add('active');
            dot1.classList.remove('active');
        }
        if(offset >= sliderWidth * 2){
            dot3.classList.add('active');
            dot2.classList.remove('active');
        }
        if(offset >= sliderWidth * 3){
            dot4.classList.add('active');
            dot3.classList.remove('active');
        }
        if(offset <= 0){
            dot1.classList.add('active');
            dot4.classList.remove('active');
        }
    })

    document.querySelector('.section-hero__btn-prev').addEventListener('click', function(prev){
        offset -= sliderWidth;
        if (offset < 0) {
            offset = sliderWidth * 3;
        }
        sliderTrack.style.left = -offset + 'px';

        if(offset >= sliderWidth){
            dot2.classList.add('active');
            dot1.classList.remove('active');
            dot3.classList.remove('active');
            dot4.classList.remove('active');
        }
        if(offset >= sliderWidth * 2){
            dot3.classList.add('active');
            dot2.classList.remove('active');
            dot1.classList.remove('active');
            dot4.classList.remove('active');
        }
        if(offset >= sliderWidth * 3){
            dot4.classList.add('active');
            dot3.classList.remove('active');
            dot2.classList.remove('active');
            dot1.classList.remove('active');
        }
        if(offset <= 0){
            dot1.classList.add('active');
            dot4.classList.remove('active');
            dot3.classList.remove('active');
            dot2.classList.remove('active');
        }

    })

    /* SLIDER HERO SWIPE */

    sliderTrack.addEventListener('touchstart', handleTouchStart, false);
    sliderTrack.addEventListener('touchmove', handleTouchMove, false);

    let x1 = null;
    let y1 = null;

    function handleTouchStart(event){
        const firstTouch = event.touches[0];

        x1 = firstTouch.clientX;
        y1 = firstTouch.clientY;

    }

    function handleTouchMove(event){
        if(!x1 || !y1){
            return false
        }

        let x2 = event.touches[0].clientX;
        let y2 = event.touches[0].clientY;

        let xDiff = x2 - x1;
        let yDiff = y2 - y1;

        if(Math.abs(xDiff) > Math.abs(yDiff)){
            if(xDiff > 0){
                offset -= sliderWidth;
                if (offset < 0) {
                    offset = sliderWidth * 3;
                }
                sliderTrack.style.left = -offset + 'px';

                if(offset >= sliderWidth){
                    dot2.classList.add('active');
                    dot1.classList.remove('active');
                    dot3.classList.remove('active');
                    dot4.classList.remove('active');
                }
                if(offset >= sliderWidth * 2){
                    dot3.classList.add('active');
                    dot2.classList.remove('active');
                    dot1.classList.remove('active');
                    dot4.classList.remove('active');
                }
                if(offset >= sliderWidth * 3){
                    dot4.classList.add('active');
                    dot3.classList.remove('active');
                    dot2.classList.remove('active');
                    dot1.classList.remove('active');
                }
                if(offset <= 0){
                    dot1.classList.add('active');
                    dot4.classList.remove('active');
                    dot3.classList.remove('active');
                    dot2.classList.remove('active');
                }

            } else{
                offset += sliderWidth;
                if (offset > sliderWidth * 3) {
                    offset = 0;
                }
                sliderTrack.style.left = -offset + 'px';

                if(offset >= sliderWidth){
                    dot2.classList.add('active');
                    dot1.classList.remove('active');
                }
                if(offset >= sliderWidth * 2){
                    dot3.classList.add('active');
                    dot2.classList.remove('active');
                }
                if(offset >= sliderWidth * 3){
                    dot4.classList.add('active');
                    dot3.classList.remove('active');
                }
                if(offset <= 0){
                    dot1.classList.add('active');
                    dot4.classList.remove('active');
                }
            }
        } else{
            if(yDiff > 0){
                console.log('down')
            } else{
                console.log('top')
            }
        }

        x1 = null;
        y1 = null;
    }

    /* FORM */

    let btnNext = document.getElementById('form-btn-next');
    let btnPrev = document.getElementById('form-btn-prev');
    let submit = document.getElementById('submit');
    let formContainer = document.querySelector('.section-calculation__content-container');
    let formSlider = document.querySelector('.section-calculation__content-container-items');
    let stepNumTwo= document.querySelector('.step-two');
    let stepThree = document.querySelector('.section-calculation__content-step-3');


    let form = document.getElementById('form');
    let category = document.getElementById('category');
    let price = document.getElementById('price');
    let weight = document.getElementById('weight');
    let volume = document.getElementById('volume');
    let code = document.getElementById('code');
    let photo = document.getElementById('form-input-file');
    let name = document.getElementById('name');
    let tel = document.getElementById('tel');
    let email = document.getElementById('email');
    let comment = document.getElementById('comment');

    let step = document.querySelector('.section-calculation__form-step-1');
    let stepWidthValue = step.clientWidth;
    let marginRightValue = window.getComputedStyle(step).marginRight;
    let sliderOffsetValue = parseInt(stepWidthValue) + parseInt(marginRightValue);

    btnNext.addEventListener('click', function(){
        if (form.category.value == ""){
            document.querySelector('.category-valid').style.display = 'block';
            category.style.outline = '2px solid red';
        } 
        if(form.price.value == ""){
            document.querySelector('.price-valid').style.display = 'block';
            price.style.outline = '2px solid red';
        }
        if(form.weight.value == ""){
            document.querySelector('.weight-valid').style.display = 'block';
            weight.style.outline = '2px solid red';
        } 
        if(form.volume.value == ""){
            document.querySelector('.volume-valid').style.display = 'block';
            volume.style.outline = '2px solid red';
        } 
        if(form.code.value == ""){
            document.querySelector('.code-valid').style.display = 'block';
            code.style.outline = '2px solid red';
        } else{
            formSlider.style.left = -sliderOffsetValue + 'px';
            stepNumTwo.classList.add('step-two-active');
        };
    });

    btnPrev.addEventListener('click', function(){
        formSlider.style.left = 0 + 'px';
        stepNumTwo.classList.remove('step-two-active');
    });

    submit.addEventListener('click', function(e){
        e.preventDefault();

        let insurance,
            clearance;

        let insuranceID = document.getElementById('checkbox-insurance');
        let clearanceID = document.getElementById('checkbox-clearance');

        function checkCheckbox(name, id){
            if(id.checked){
                name = 'Требуется';
            } else{
                name = 'Не требуется';
            };

            return name; 
        };

        let message1 = `<b>Заявка на расчет стоимости груза</b>\n`;
            message1 += `<b>Категория товара: </b> ${ category.value }\n`;
            message1 += `<b>Стоимость груза: </b> ${ price.value }\n`;
            message1 += `<b>Вес груза (кг): </b> ${ weight.value }\n`;
            message1 += `<b>Объем груза (м3): </b> ${ volume.value }\n`;
            message1 += `<b>Страховка: </b> ${ checkCheckbox(insurance, insuranceID) }\n`;
            message1 += `<b>Таможенное оформление: </b> ${ checkCheckbox(clearance, clearanceID) }\n`;
            message1 += `<b>Код ТН ВЭД: </b> ${ code.value }\n`;
            message1 += `<b>Фото товара: </b> ${ photo.value }\n`;
            message1 += `<b>Имя: </b> ${ name.value }\n`;
            message1 += `<b>Номер телефона: </b> ${ tel.value }\n`;
            message1 += `<b>Email: </b> ${ email.value }\n`;
            message1 += `<b>Комментарий: </b> ${ comment.value }`;

        if (form.name.value == ""){
            document.querySelector('.name-valid').style.display = 'block';
            name.style.outline = '2px solid red';
        } 
        if (form.tel.value == ""){
            document.querySelector('.tel-valid').style.display = 'block';
            tel.style.outline = '2px solid red';
        } 
        if (form.email.value == ""){
            document.querySelector('.email-valid').style.display = 'block';
            email.style.outline = '2px solid red';
        } else{
            axios.post(URI_API, {
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: message1 
            })
            .then((res) => {
                formContainer.style.display = 'none';
                stepThree.style.display = 'block';
            })
            .catch((err) => {
                console.warn(err);
            })
            .finally(() => {
                console.log('Конец');
            })
        };
    });

    /* SLIDER SWIPE US (width: 576px) */

    let offsetUs = 0; // смещение отлевого края
    const sliderItemUs = document.querySelector('.section-us__item');
    const sliderTrackUs = document.querySelector('.section-us__list');
    let sliderUsWidth = sliderItemUs.clientWidth;

    let usDot1 = document.querySelector('.us_dot-one');
    let usDot2 = document.querySelector('.us_dot-two');
    let usDot3 = document.querySelector('.us_dot-three');
    let usDot4 = document.querySelector('.us_dot-four');
    let usDot5 = document.querySelector('.us_dot-five');
    let usDot6 = document.querySelector('.us_dot-six');
    let usDot7 = document.querySelector('.us_dot-seven');
    let usDot8 = document.querySelector('.us_dot-eight');

    usDot1.classList.add('dot-active');

    sliderTrackUs.addEventListener('touchstart', handleTouchStartUs, false);
    sliderTrackUs.addEventListener('touchmove', handleTouchMoveUs, false);

    let x1Us = null;
    let y1Us = null;

    function handleTouchStartUs(event){
        const firstTouchUs = event.touches[0];

        x1Us = firstTouchUs.clientX;
        y1Us = firstTouchUs.clientY;

    }

    function handleTouchMoveUs(event){
        if(!x1Us || !y1Us){
            return false
        }

        let x2Us = event.touches[0].clientX;
        let y2Us = event.touches[0].clientY;

        let xDiffUs = x2Us - x1Us;
        let yDiffUs = y2Us - y1Us;

        if(Math.abs(xDiffUs) > Math.abs(yDiffUs)){
            if(xDiffUs > 0){
                offsetUs -= sliderUsWidth;
                if (offsetUs < 0) {
                    offsetUs = sliderUsWidth * 7;
                }
                sliderTrackUs.style.left = -offsetUs + 'px';

                if(offsetUs >= sliderUsWidth){
                    usDot2.classList.add('dot-active');
                    usDot3.classList.remove('dot-active');
                    usDot4.classList.remove('dot-active');
                    usDot5.classList.remove('dot-active');
                    usDot6.classList.remove('dot-active');
                    usDot7.classList.remove('dot-active');
                    usDot8.classList.remove('dot-active');
                    usDot1.classList.remove('dot-active');
                }
                if(offsetUs >= sliderUsWidth * 2){
                    usDot3.classList.add('dot-active');
                    usDot4.classList.remove('dot-active');
                    usDot5.classList.remove('dot-active');
                    usDot6.classList.remove('dot-active');
                    usDot7.classList.remove('dot-active');
                    usDot8.classList.remove('dot-active');
                    usDot1.classList.remove('dot-active');
                    usDot2.classList.remove('dot-active');
                }
                if(offsetUs >= sliderUsWidth * 3){
                    usDot4.classList.add('dot-active');
                    usDot5.classList.remove('dot-active');
                    usDot6.classList.remove('dot-active');
                    usDot7.classList.remove('dot-active');
                    usDot8.classList.remove('dot-active');
                    usDot1.classList.remove('dot-active');
                    usDot2.classList.remove('dot-active');
                    usDot3.classList.remove('dot-active');
                }
                if(offsetUs >= sliderUsWidth * 4){
                    usDot5.classList.add('dot-active');
                    usDot6.classList.remove('dot-active');
                    usDot7.classList.remove('dot-active');
                    usDot8.classList.remove('dot-active');
                    usDot1.classList.remove('dot-active');
                    usDot2.classList.remove('dot-active');
                    usDot3.classList.remove('dot-active');
                    usDot4.classList.remove('dot-active');
                }
                if(offsetUs >= sliderUsWidth * 5){
                    usDot6.classList.add('dot-active');
                    usDot7.classList.remove('dot-active');
                    usDot8.classList.remove('dot-active');
                    usDot1.classList.remove('dot-active');
                    usDot2.classList.remove('dot-active');
                    usDot3.classList.remove('dot-active');
                    usDot4.classList.remove('dot-active');
                    usDot5.classList.remove('dot-active');
                }
                if(offsetUs >= sliderUsWidth * 6){
                    usDot7.classList.add('dot-active');
                    usDot8.classList.remove('dot-active');
                    usDot1.classList.remove('dot-active');
                    usDot2.classList.remove('dot-active');
                    usDot3.classList.remove('dot-active');
                    usDot4.classList.remove('dot-active');
                    usDot5.classList.remove('dot-active');
                    usDot6.classList.remove('dot-active');
                }
                if(offsetUs >= sliderUsWidth * 7){
                    usDot8.classList.add('dot-active');
                    usDot1.classList.remove('dot-active');
                    usDot2.classList.remove('dot-active');
                    usDot3.classList.remove('dot-active');
                    usDot4.classList.remove('dot-active');
                    usDot5.classList.remove('dot-active');
                    usDot6.classList.remove('dot-active');
                    usDot7.classList.remove('dot-active');
                }
                if(offsetUs <= 0){
                    usDot1.classList.add('dot-active');
                    usDot2.classList.remove('dot-active');
                    usDot3.classList.remove('dot-active');
                    usDot4.classList.remove('dot-active');
                    usDot5.classList.remove('dot-active');
                    usDot6.classList.remove('dot-active');
                    usDot7.classList.remove('dot-active');
                    usDot8.classList.remove('dot-active');
                }

            } else{
                offsetUs += sliderUsWidth;
                if (offsetUs > sliderUsWidth * 7) {
                    offsetUs = 0;
                }
                sliderTrackUs.style.left = -offsetUs + 'px';

                if(offsetUs >= sliderUsWidth){
                    usDot2.classList.add('dot-active');
                    usDot1.classList.remove('dot-active');
                }
                if(offsetUs >= sliderUsWidth * 2){
                    usDot3.classList.add('dot-active');
                    usDot2.classList.remove('dot-active');
                }
                if(offsetUs >= sliderUsWidth * 3){
                    usDot4.classList.add('dot-active');
                    usDot3.classList.remove('dot-active');
                }
                if(offsetUs >= sliderUsWidth * 4){
                    usDot5.classList.add('dot-active');
                    usDot4.classList.remove('dot-active');
                }
                if(offsetUs >= sliderUsWidth * 5){
                    usDot6.classList.add('dot-active');
                    usDot5.classList.remove('dot-active');
                }
                if(offsetUs >= sliderUsWidth * 6){
                    usDot7.classList.add('dot-active');
                    usDot6.classList.remove('dot-active');
                }
                if(offsetUs >= sliderUsWidth * 7){
                    usDot8.classList.add('dot-active');
                    usDot7.classList.remove('dot-active');
                }
                if(offsetUs <= 0){
                    usDot1.classList.add('dot-active');
                    usDot8.classList.remove('dot-active');
                }
            }
        } else{
            if(yDiffUs > 0){
                console.log('down')
            } else{
                console.log('top')
            }
        }

        x1Us = null;
        y1Us = null;
    }

    /* SLIDER DELIVERY */

    let position = 0;
    const track = document.querySelector('.slider-track');
    const sliderBtnPrev = document.querySelector('.slider-btn-prev');
    const sliderBtnNext = document.querySelector('.slider-btn-next');

    let item = document.querySelector('.slider-item');
    let itemWidthValue = item.clientWidth;
    let itemMarginRightValue = window.getComputedStyle(item).marginRight;
    let trackOffsetValue = parseInt(itemWidthValue) + parseInt(itemMarginRightValue);

    sliderBtnNext.addEventListener('click', function(){
        position += trackOffsetValue; // 390px
        if (position >= trackOffsetValue * 2) {
            sliderBtnNext.style.display = 'none';
        }
        track.style.left = -position + 'px';
        sliderBtnPrev.style.display = 'block';
    });

    sliderBtnPrev.addEventListener('click', function(prev){
        position -= trackOffsetValue;
        if (position <= 0) {
            sliderBtnPrev.style.display = 'none';
        }
        track.style.left = -position + 'px';
        sliderBtnNext.style.display = 'block';
    });

    let btnRequest = document.querySelectorAll('.item-content__btn-request');

    for (var i = 0; i < btnRequest.length; i++) {
        btnRequest[i].onclick = function(){
            requestForm.style.display = 'block';
            overlay.style.display = 'block';
        };
      };

    let btnCooperation = document.querySelector('.section-cooperation__btn');

    btnCooperation.addEventListener('click', function(){
        requestForm.style.display = 'block';
        overlay.style.display = 'block';
    })

    /* SLIDER SWIPE DELIVERY (width: 576px) */

    let offsetDel = 0; // смещение отлевого края
    const sliderItemDel = document.querySelector('.section-delivery__slider-item');
    const sliderContainerDel = document.querySelector('.section-delivery__content');
    const sliderTrackDel = document.querySelector('.section-delivery__slider-track');
    let sliderDelWidth = sliderItemDel.clientWidth;
    let marginRightValueDel = window.getComputedStyle(sliderItemDel).marginRight;
    let sliderOffsetValueDel = parseInt(sliderDelWidth) + parseInt(marginRightValueDel);

    let delDot1 = document.querySelector('.delivery_dot-one');
    let delDot2 = document.querySelector('.delivery_dot-two');
    let delDot3 = document.querySelector('.delivery_dot-three');
    let delDot4 = document.querySelector('.delivery_dot-four');
    let delDot5 = document.querySelector('.delivery_dot-five');

    delDot1.classList.add('dot-active');

    sliderContainerDel.addEventListener('touchstart', handleTouchStartDel, false);
    sliderContainerDel.addEventListener('touchmove', handleTouchMoveDel, false);

    let x1Del = null;
    let y1Del = null;

    function handleTouchStartDel(event){
        const firstTouchDel = event.touches[0];

        x1Del = firstTouchDel.clientX;
        y1Del = firstTouchDel.clientY;

    }

    function handleTouchMoveDel(event){
        if(!x1Del || !y1Del){
            return false
        }

        let x2Del = event.touches[0].clientX;
        let y2Del = event.touches[0].clientY;

        let xDiffDel = x2Del - x1Del;
        let yDiffDel = y2Del - y1Del;

        if(Math.abs(xDiffDel) > Math.abs(yDiffDel)){
            if(xDiffDel > 0){
                offsetDel -= sliderOffsetValueDel;
                if (offsetDel < 0) {
                    offsetDel = sliderOffsetValueDel * 4;
                }
                sliderTrackDel.style.left = -offsetDel + 'px';

                if(offsetDel >= sliderOffsetValueDel){
                    delDot2.classList.add('dot-active');
                    delDot3.classList.remove('dot-active');
                    delDot4.classList.remove('dot-active');
                    delDot5.classList.remove('dot-active');
                    delDot1.classList.remove('dot-active');
                }
                if(offsetDel >= sliderOffsetValueDel * 2){
                    delDot3.classList.add('dot-active');
                    delDot4.classList.remove('dot-active');
                    delDot5.classList.remove('dot-active');
                    delDot1.classList.remove('dot-active');
                    delDot2.classList.remove('dot-active');
                }
                if(offsetDel >= sliderOffsetValueDel * 3){
                    delDot4.classList.add('dot-active');
                    delDot5.classList.remove('dot-active');
                    delDot1.classList.remove('dot-active');
                    delDot2.classList.remove('dot-active');
                    delDot3.classList.remove('dot-active');
                }
                if(offsetDel >= sliderOffsetValueDel * 4){
                    delDot5.classList.add('dot-active');
                    delDot1.classList.remove('dot-active');
                    delDot2.classList.remove('dot-active');
                    delDot3.classList.remove('dot-active');
                    delDot4.classList.remove('dot-active');
                }
                if(offsetDel <= 0){
                    delDot1.classList.add('dot-active');
                    delDot2.classList.remove('dot-active');
                    delDot3.classList.remove('dot-active');
                    delDot4.classList.remove('dot-active');
                    delDot5.classList.remove('dot-active');
                }

            } else{
                offsetDel += sliderOffsetValueDel;
                if (offsetDel > sliderOffsetValueDel * 4) {
                    offsetDel = 0;
                }
                sliderTrackDel.style.left = -offsetDel + 'px';

                if(offsetDel >= sliderOffsetValueDel){
                    delDot2.classList.add('dot-active');
                    delDot1.classList.remove('dot-active');
                }
                if(offsetDel >= sliderOffsetValueDel * 2){
                    delDot3.classList.add('dot-active');
                    delDot2.classList.remove('dot-active');
                }
                if(offsetDel >= sliderOffsetValueDel * 3){
                    delDot4.classList.add('dot-active');
                    delDot3.classList.remove('dot-active');
                }
                if(offsetDel >= sliderOffsetValueDel * 4){
                    delDot5.classList.add('dot-active');
                    delDot4.classList.remove('dot-active');
                }
                if(offsetDel <= 0){
                    delDot1.classList.add('dot-active');
                    delDot5.classList.remove('dot-active');
                }

            }
        } else{
            if(yDiffDel > 0){
                console.log('down')
            } else{
                console.log('top')
            }
        }

        x1Del = null;
        y1Del = null;
    }

    /* SLIDER SERVICES */

    let servicesPosition = 0;
    const servicesTrack = document.querySelector('.section-services__slider-track');
    const servicesBtnPrev = document.querySelector('.section-services__slider-btn-prev');
    const servicesBtnNext = document.querySelector('.section-services__slider-btn-next');

    let servicesItem = document.querySelector('.slider-item');
    let servicesItemWidthValue = servicesItem.clientWidth;
    let servicesItemMarginRightValue = window.getComputedStyle(servicesItem).marginRight;
    let servicesTrackOffsetValue = parseInt(servicesItemWidthValue) + parseInt(servicesItemMarginRightValue);

    servicesBtnNext.addEventListener('click', function(){
        servicesPosition += servicesTrackOffsetValue;
        if (servicesPosition >= servicesTrackOffsetValue) {
            servicesBtnNext.style.display = 'none';
        }
        servicesTrack.style.left = -servicesPosition + 'px';
        servicesBtnPrev.style.display = 'block';
    });

    servicesBtnPrev.addEventListener('click', function(prev){
        servicesPosition -= servicesTrackOffsetValue;
        if (servicesPosition <= 0) {
            servicesBtnPrev.style.display = 'none';
        }
        servicesTrack.style.left = -servicesPosition + 'px';
        servicesBtnNext.style.display = 'block';
    });

    /* SLIDER SWIPE SERVICES (width: 576px) */

    let offsetSer = 0; // смещение отлевого края
    const sliderItemSer = document.querySelector('.section-services__slider-item');
    const sliderContainerSer = document.querySelector('.section-services__content');
    const sliderTrackSer = document.querySelector('.section-services__slider-track');
    let sliderSerWidth = sliderItemSer.clientWidth;
    let marginRightValueSer = window.getComputedStyle(sliderItemSer).marginRight;
    let sliderOffsetValueSer = parseInt(sliderSerWidth) + parseInt(marginRightValueSer);

    let serDot1 = document.querySelector('.services_dot-one');
    let serDot2 = document.querySelector('.services_dot-two');
    let serDot3 = document.querySelector('.services_dot-three');
    let serDot4 = document.querySelector('.services_dot-four');

    serDot1.classList.add('dot-active');

    sliderContainerSer.addEventListener('touchstart', handleTouchStartSer, false);
    sliderContainerSer.addEventListener('touchmove', handleTouchMoveSer, false);

    let x1Ser = null;
    let y1Ser = null;

    function handleTouchStartSer(event){
        const firstTouchSer = event.touches[0];

        x1Ser = firstTouchSer.clientX;
        y1Ser = firstTouchSer.clientY;

    }

    function handleTouchMoveSer(event){
        if(!x1Ser || !y1Ser){
            return false
        }

        let x2Ser = event.touches[0].clientX;
        let y2Ser = event.touches[0].clientY;

        let xDiffSer = x2Ser - x1Ser;
        let yDiffSer = y2Ser - y1Ser;

        if(Math.abs(xDiffSer) > Math.abs(yDiffSer)){
            if(xDiffSer > 0){
                offsetSer -= sliderOffsetValueSer;
                if (offsetSer < 0) {
                    offsetSer = sliderOffsetValueSer * 3;
                }
                sliderTrackSer.style.left = -offsetSer + 'px';

                if(offsetSer >= sliderOffsetValueSer){
                    serDot2.classList.add('dot-active');
                    serDot3.classList.remove('dot-active');
                    serDot4.classList.remove('dot-active');
                    serDot1.classList.remove('dot-active');
                }
                if(offsetSer >= sliderOffsetValueSer * 2){
                    serDot3.classList.add('dot-active');
                    serDot4.classList.remove('dot-active');
                    serDot1.classList.remove('dot-active');
                    serDot2.classList.remove('dot-active');
                }
                if(offsetSer >= sliderOffsetValueSer * 3){
                    serDot4.classList.add('dot-active');
                    serDot1.classList.remove('dot-active');
                    serDot2.classList.remove('dot-active');
                    serDot3.classList.remove('dot-active');
                }
                if(offsetSer <= 0){
                    serDot1.classList.add('dot-active');
                    serDot2.classList.remove('dot-active');
                    serDot3.classList.remove('dot-active');
                    serDot4.classList.remove('dot-active');
                }

            } else{
                offsetSer += sliderOffsetValueSer;
                if (offsetSer > sliderOffsetValueSer * 3) {
                    offsetSer = 0;
                }
                sliderTrackSer.style.left = -offsetSer + 'px';

                if(offsetSer >= sliderOffsetValueSer){
                    serDot2.classList.add('dot-active');
                    serDot1.classList.remove('dot-active');
                }
                if(offsetSer >= sliderOffsetValueSer * 2){
                    serDot3.classList.add('dot-active');
                    serDot2.classList.remove('dot-active');
                }
                if(offsetSer >= sliderOffsetValueSer * 3){
                    serDot4.classList.add('dot-active');
                    serDot3.classList.remove('dot-active');
                }
                if(offsetSer <= 0){
                    serDot1.classList.add('dot-active');
                    serDot4.classList.remove('dot-active');
                }

            }
        } else{
            if(yDiffSer > 0){
                console.log('down')
            } else{
                console.log('top')
            }
        }

        x1Ser = null;
        y1Ser = null;
    }

    /* FAQ */

    let summary = document.querySelectorAll('.summary');
    let details = document.querySelectorAll('.details');

    let detailsFour = document.getElementById('details-four');

    detailsFour.open = true;

    for (var i = 0; i < summary.length; i++) {
        summary[i].onclick = function(){
            for (let i = 0; i < details.length; i++){
                details[i].open = false;
            };
        };
      };
});