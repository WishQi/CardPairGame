/**
 * Created by limaoqi on 22/05/2017.
 */

$(
    function () {

        var opendCard = null
        var images = [
            'buluke',
            'furank',
            'hankuke',
            'luo',
            'luobin',
            'namei',
            'shanzhi',
            'suolong',
            'weiwei',
            'xiangkesi'
        ]
        var cards = images.concat(images.slice(0))

        var appendTens = document.getElementById("tens")
        var appendSeconds = document.getElementById("seconds")
        var seconds = 0
        var tens = 0

        // 是否完成
        var completed = 0

        // 倒计时计时器
        var countDownTimer = null
        // 游戏时间计时器
        var timer = null

        var countDownTime = 10

        function startCountDown() {
            $('body').append('<div id="modalShade"></div>')
            $('#modalShade').css('opacity', 0.7).fadeIn()

            let countdownNode = document.createElement('div')
            countdownNode.setAttribute('id', 'count-down-part')
            countdownNode.innerHTML = [
                '<div class="cross"></div>',
                '<div countdown-number>',
                '   <div class="full-width-height center">',
                '       <div class="countdownContainer">',
                '           <p class="countdownNumber">10</p>',
                '       </div>',
                '   </div>',
                '   <div class="full-width-height center">',
                '       <svg class="circular" height="100" width="100">',
                '           <circle class="path" cx="100" cy="100" r="93px" fill="none" stroke-width="7" stroke-miterlimit="10" />',
                '       </svg>',
                '   </div>',
                '</div>'
            ].join('')
            $('#content').append(countdownNode)
        }

        function reset() {
            seconds = 0;
            tens = 0;
            appendSeconds.innerHTML = '00'
            appendTens.innerHTML = '00'
            clearInterval(timer)
            clearInterval(countDownTimer)
            countDownTime = 10
        }

        // 点击开始按钮触发的事件——游戏开始
        $('#start-btn').click(function() {
            reset()
            startCountDown()
            $('.card').each(function(index, ele) {
                $(ele).click(function() {
                    let classes = $(this).attr('class').split(' ')
                    if (classes.indexOf('front-card') >= 0) {
                        console.log('front-back')
                        reverseToBack($(this))
                        opendCard = null
                    } else {
                        console.log('back-front')
                        reverseToFront($(this), cards[index])
                        console.log(index)
                        compare($(this))
                    }
                })
            })
            shuffle(cards)
            $('.card').each(function(index, ele) {
                reverseToFront($(ele), cards[index])
            })
            countDownTimer = setInterval(function() {
                if (countDownTime < 0) {
                    clearInterval(countDownTimer)
                }
                --countDownTime;
                $('.countdownNumber')[0].innerHTML = countDownTime
            }, 1000)
            setTimeout(function () {
                $('.card').each(function(index, ele) {
                    reverseToBack($(ele))
                })
                timer = setInterval(startTimer, 10)
                $('#count-down-part').remove()
                $('#modalShade').remove()
            }, 10000)
        })

        $('.card').each(function(index, ele) {
            $(ele).addClass('back-card')
        })

        // 判断两张图片是否一样
        function isSame(card) {
            if (card.attr('id') == opendCard.attr('id')) {
                completed += 2
                handleCompleted()
                return true
            }
            return false
        }

        // 完成游戏
        function handleCompleted() {
            if (completed == 20) {
                clearInterval(timer)
            }
        }

        // 比较翻转的两张图片
        function compare(card) {
            console.log(opendCard)
            if (opendCard == null) {
                opendCard = card
            } else {
                if (isSame(card)) {
                    console.log('same')
                    card.addClass('correct-card')
                    opendCard.addClass('correct-card')
                    card.unbind()
                    opendCard.unbind()
                    opendCard = null
                } else {
                    setTimeout(function () {
                        reverseToBack(opendCard)
                        reverseToBack(card)
                        opendCard = null
                    }, 550)
                }
            }
        }

        // 翻转到正面
        function reverseToFront(card, image) {
            card.removeClass('back-card')
            card.addClass('front-card')
            card.attr('id', image)
            card.css('background-image', 'url(../resources/' + image + '.jpg')
        }

        // 翻转到反面
        function reverseToBack(card) {
            card.removeClass('front-card')
            card.addClass('back-card')
            card.attr('id', '')
            card.css('background-image', 'url(../resources/img2.png)')
            console.log("reverse to back")
        }

        // 随机排列图片的位置
        function shuffle(o) {
            for (var j, x, i = o.length; i > 0; ) {
                j = Math.floor(Math.random() * i)
                x = o[--i]
                o[i] = o[j]
                o[j] = x;
            }
            // for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        // 计时器开始计时
        function startTimer () {
            tens++;
            if(tens < 9){
                appendTens.innerHTML = "0" + tens;
            }
            if (tens > 9){
                appendTens.innerHTML = tens;
            }
            if (tens > 99) {
                seconds++;
                appendSeconds.innerHTML = "0" + seconds;
                tens = 0;
                appendTens.innerHTML = "0" + 0;
            }
            if (seconds > 9){
                appendSeconds.innerHTML = seconds;
            }
        }

    }
)
