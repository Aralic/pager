# pager

### arguments:

    /**
     *  pContainer:   {Element|String}    // 参数：分页组件容器或其选择器(必选)。
     *  conTotalCount {Number}         // 参数：页面内容条目总数量，用于计算页码(必选)
     *  onIndexChange {Function}       // 参数：页码切换回调函数(必选）被调用时携带参数：(构造好的页签数据对象，事件)。
     *  conPerPage {Number}            // 参数：每页内容条目数量，用于计算页码(可选，默认为页面内容条目总数量)。
     *  pMaxCount {Number}             // 参数：要显示页签的最大数量(可选，默认显示全部页签；请参阅下文附加说明)。
     *  curIndex {Number}              // 参数：默认设置为“当前页”的页码值(可选，默认为1)。
     *  @return {Object}               // 返回：基础分页组件对象。
     */

### example:

    var pager = new Pager({
        pContainer: '#pager',
        conTotalCount: pCount,
        onIndexChange: function (curIndex) {
            location.href = '/?page=' + curIndex;
        },
        conPerPage: 5,
        pMaxCount: 11,
        curIndex: 1
    });


### demo:

[预览]('./demo.png')



    
