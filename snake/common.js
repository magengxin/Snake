/**
 * Created by 2018.7.11
 * author magengxin
 */


/**
 * 根据传入的值，返回对应的标签元素
 * @param element 便签元素的类型，string格式
 * @returns {*}
 */
function my$(element) {
    if (typeof element !== 'string') {
        console.log('请输入字符串格式');
    } else if (element.slice(0, 1) == ".") {
        element = element.slice(1)
        return document.getElementsByClassName(element)[0]
    } else if (element.slice(0, 1) == '#') {
        element = element.slice(1)
        return document.getElementById(element)
    } else {
        return document.getElementsByTagName(element)
    } 
}


/**
 * 设置任意标签中间的任意文本内容
 * @param element 标签元素
 * @param text 文本内容 string or number
 */
function setInnerText(element, text) {
    if (typeof element.textContent == 'undefined') {
        //不支持
        element.innerText = text
    } else {
        // 支持
        element.textContent = text
    }
}

/**
 * 获取任意标签中的文本内容
 * @param element 标签元素
 * @returns {*}
 */
function getInnerText(element) {
    if (typeof element.textContent == 'undefined') {
        // 不支持
        console.log("innerText");
        return element.innerText
    } else {
        // 支持
        return element.textContent
    }
}


/**
 * 获取任意一个父级元素的第一个子级元素
 * @param element 任意父级元素
 * @returns {*}
 */
//
function setFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild
    } else {
        var node = element.firstChild // 第一个子节点
        while (node && node.nodeType != 1) {
            node = node.nextSibling
        }
        return node
    }
}

/**
 * 获取任意一个父级元素的最后一个子级元素
 * @param element 任意父级元素
 * @returns {*}
 */
function setLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild
    } else {
        var node = element.lastChild // 第一个子节点
        while (node && node.nodeType != 1) {
            node = node.previousSibling
        }
        return node
    }
}

/**
 * 获取任意一个子级元素的前一个子级元素
 * @param element 任意子级元素
 * @returns {*}
 */
function setPrevElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling
    } else {
        var node = element.previousSibling
        while (node && node.nodeType != 1) {
            node = node.previousSibling
        }
        return node
    }
}

/**
 * 获取任意一个子级元素的后一个子级元素
 * @param element 任意子级元素
 * @returns {*}
 */
function setNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling
    } else {
        var node = element.nextSibling
        while (node && node.nodeType != 1) {
            node = node.nextSibling
        }
        return node
    }
}


/**
 * 为任意元素绑定任意事件
 * @param element 任意元素
 * @param type 绑定事件类型
 * @param fn 绑定事件函数，最好使用命名函数，为了以后解绑方便
 * @returns {*}
 */
function addEventListener(element, type, fn) {
    if (element.addEventListener) {
        element.addEventListener(type, fn, false)
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, fn)
    } else {
        element['on' + type] = fn
    }
}

/**
 * 为任意元素解绑任意事件
 * @param element 任意元素
 * @param type 解绑事件类型
 * @param fnName 解绑事件函数，必须是命名函数
 * @returns {*}
 */
function removeEventListener(element, type, fnName) {
    if (element.addEventListener) {
        element.removeEventListener(type, fnName, false)
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, fnName)
    } else {
        element['on' + type] = null
    }
}

/*==============================================return的函数不能写在公共模块里面====不一定==============================*/
/**
 * 获取页面中的sroll值
 * @returns {{top: number, left: number}}
 */
function getScroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    }
}

/**
 * 获取任意元素的任意样式属性
 * @param element 任意元素
 * @param attr 任意样式属性
 * @returns {string}
 */
function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0
}

/**
 * 为任意元素改变任意样式属性并设置回调函数
 * @param element 任意元素
 * @param json 样式属性 对象
 * @param fn 回调函数
 */
function animate(element, json, fn) {
    /*清理定时器*/
    clearInterval(element.timeId)
    element.timeId = setInterval(function () {
        var flag = true; // 默认，假设，全部达到目标
        for (var attr in json) {
            if (attr == 'zIndex') {
                /*zIndex判断*/
                element.style[attr] = json[attr]
            } else if (attr == 'opacity') {
                /*cpacity判断  小数 * 100 */
                var current = getStyle(element, attr) * 100
                /*设置每次移动距离*/
                var target = json[attr] * 100
                var step = (target - current) / 10
                /*判断是否大于0，大于向上取整，小于向下取整*/
                step = step > 0 ? Math.ceil(step) : Math.floor(step)
                current += step
                element.style[attr] = current / 100
            } else {
                /*普通样式值的判断*/
                /*获取元素初始位置*/
                var current = parseInt(getStyle(element, attr))
                /*设置每次移动距离*/
                var target = json[attr]
                var step = (target - current) / 10
                /*判断是否大于0，大于向上取整，小于向下取整*/
                step = step > 0 ? Math.ceil(step) : Math.floor(step)
                current += step
                element.style[attr] = current + 'px'
            }

            if (current != target) {
                flag = false
            }
        }
        if (flag) {
            /*清理定时器*/
            clearInterval(element.timeId)
            /*判断当前动画全部执行完毕，调用回调函数*/
            if (fn) {
                fn()
            }
        }
        // 测试代码
        console.log("当前位置：" + current + "，目标位置：" + target + "，每次移动距离：" + step);
        /*默认当一个样式值达到目标位置时清理定时器，这样结果是其他未达到目标位置也停止了*/
    }, 20)
}


/**
 * 获取页面中的 pageX 与 pageY
 * 处理兼容之后的代码
 * @type {{getEvt: (function(*): (Event | undefined | *)), getClientX: (function(*=): number), getClientY: (function(*=): number), getScrollLeft: (function(): number), getScrollTop: (function(): number), getPageX: (function(*=): *), getPageY: (function(*=): *)}}
 */
var evt = {
    /*window.event 和 事件参数e的兼容*/
    getEvt: function (evt) {
        return window.event || evt
    },
    /*可视区域的横坐标兼容代码*/
    getClientX: function (e) {
        return this.getEvt(e).clientX
    },
    /*可视区域的纵坐标兼容代码*/
    getClientY: function (e) {
        return this.getEvt(e).clientY
    },
    /*向左卷曲出去的距离*/
    getScrollLeft: function () {
        return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0
    },
    /*向上卷曲出去的距离*/
    getScrollTop: function () {
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0
    },
    /*相当于页面的横坐标--pageX===clientX+scrollLeft*/
    getPageX: function (e) {
        return this.getEvt(e).pageX ? this.getEvt(e).pageX : this.getClientX(e) + this.getScrollLeft()
    },
    /*相当于页面的纵坐标--pageY===clientY+scrollTop*/
    getPageY: function (e) {
        return this.getEvt(e).pageY ? this.getEvt(e).pageY : this.getClientY(e) + this.getScrollTop()
    }
}
