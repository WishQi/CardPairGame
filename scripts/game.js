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

        $('.card').each(function(index, ele) {
            $(ele).addClass('back-card').click(function() {
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

        function isSame(card) {
            if (card.attr('id') == opendCard.attr('id')) {
                return true
            }
            return false
        }

        function compare(card) {
            console.log(opendCard)
            if (opendCard == null) {
                opendCard = card
            } else {
                if (isSame(card)) {
                    console.log('same')
                    card.unbind()
                    opendCard.unbind()
                    opendCard = null
                } else {
                    setTimeout(function () {
                        reverseToBack(opendCard)
                        reverseToBack(card)
                        opendCard = null
                    }, 500)
                }
            }
        }

        function reverseToFront(card, image) {
            card.removeClass('back-card')
            card.addClass('front-card')
            card.attr('id', image)
            card.css('background-image', 'url(../resources/' + image + '.jpg')
        }

        function reverseToBack(card) {
            card.removeClass('front-card')
            card.addClass('back-card')
            card.attr('id', '')
            card.css('background-image', 'url(../resources/img2.png)')
            console.log("reverse to back")
        }

        function shuffle(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        $('#start-btn').click(function() {
            shuffle(cards)
            $('.card').each(function(index, ele) {
                reverseToFront($(ele), cards[index])
            })
            setTimeout(function () {
                $('.card').each(function(index, ele) {
                    reverseToBack($(ele))
                })
                // $(this).disabled = true
            }, 2000)
        })
    }
)
