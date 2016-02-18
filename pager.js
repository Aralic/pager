/**
 * @author aralic@163.com
 * @date 2016-02-14
 */

/**
 *  pContainer:   {Element|String}    // 参数：分页组件容器或其选择器(必选)。
 *  conTotalCount {Number}         // 参数：页面内容条目总数量，用于计算页码(必选)。
 *  onIndexChange {Function}       // 参数：页码切换回调函数(必选)，被调用时携带参数：(构造好的页签数据对象，事件)。
 *  conPerPage {Number}            // 参数：每页内容条目数量，用于计算页码(可选，默认为页面内容条目总数量)。
 *  pMaxCount {Number}             // 参数：要显示页签的最大数量(可选，默认显示全部页签；请参阅下文附加说明)。
 *  curIndex {Number}              // 参数：默认设置为“当前页”的页码值(可选，默认为1)。
 *  @return {Object}               // 返回：基础分页组件对象。
 */
function Pager(args) {
    this.args = args;
    this.init(args);
}

Pager.prototype.init = function (args) {
    this.pagerTotalCount = Math.ceil(args.conTotalCount / (args.conPerPage ? args.conPerPage : args.conTotalCount));
    if (this.pagerTotalCount > 1) {
        this.createData();
        this.bindEvent();
    }
    else {
        console.log('分页不足2页，不显示');
    }
};

Pager.prototype.createData = function () {
    var curIndex = this.args.curIndex;
    console.log(curIndex)
    var pagerTotalCount = this.pagerTotalCount;
    var pMaxCount = this.args.pMaxCount ? this.args.pMaxCount : 7;
    pMaxCount = pMaxCount > pagerTotalCount ? pagerTotalCount : pMaxCount;
    var data = [];

    function addData(pageId) {
        if (pageId === curIndex) {
            data.push({
                index: pageId,
                active: true,
                con: pageId
            });
        }
        else {
            data.push({
                index: pageId,
                con: pageId
            });
        }
    }
    // active 左中右
    // 左
    if (curIndex < (Math.floor(pMaxCount/2)+1)) {
        for (var i = 0; i < pMaxCount; i++) {
            var pageId = i + 1;
            addData(pageId);
        }
    }
    // 右
    else if(curIndex > (pagerTotalCount - pMaxCount/2)) {
        for (var i = 0; i < pMaxCount; i++) {
            var pageId = pagerTotalCount - pMaxCount+ i + 1;
            addData(pageId);
        }
    }
    // 中
    else {
        for (var i = 0; i < pMaxCount; i++) {
            var pageId = curIndex - Math.floor(pMaxCount/2) + i;
            addData(pageId);
        }
    }

    if (curIndex !== 1) {
        data.unshift({
            index: curIndex-1,
            con: '上一页'
        });
    }
    if (curIndex !== pagerTotalCount) {
        data.push({
            index: curIndex+1,
            con: '下一页'
        });
    }

    this.createHtml(data);
};

Pager.prototype.createHtml = function (data) {
    var str = '';
    var className = '';
    for (var i = 0; i < data.length; i++) {
        className = data[i].active ? 'active' : '';
        str += '<li class="'+className+'"><a data-page="'+data[i].index+'">'+data[i].con+'</a></li>'
    }
    var html = '<ul class="pagination">'+str+'</ul>';
    var pContainer = this.args.pContainer;

    this.container = typeof pContainer === 'Object' ? pContainer[0] : document.querySelector(pContainer);
    this.container.innerHTML = html;
};

Pager.prototype.bindEvent = function () {
    var _this = this;
    this.container.addEventListener('click', function (ev) {
        var curIndex = parseInt(ev.target.dataset.page);
        if (ev.target.nodeName.toLowerCase() === 'a' && ev.target.parentNode.className !== 'active') {
            _this.args.onIndexChange(curIndex, ev.target.parentNode);
            _this.args.curIndex = curIndex;
            _this.createData();
        }

    }, false);
};

/**
 * 返回当前页码
 * @returns {Number|*}
 */
Pager.prototype.getCurIndex = function() {
    return this.args.curIndex;
};

/**
 * 返回页码总数
 * @returns {number|*}
 */
Pager.prototype.getPTotalCount = function() {
    return this.pagerTotalCount;
};






