/**********************
*treeNode类    treeNode的拖动，更改图层的显示顺序
*****************
*/
var Corner={};
/*
*为全局变量Rrteam添加一个 NodeDrag属性
*/
Corner.NodeDrag = OpenLayers.Class({

    //总的父容器 
    $parentContainer: null,

    //移动目标项
    $dragTargetItem: null,

    //有效的最近级 父容器
    $validitiableContainer: null,

    $dragCloneContainer: null,  //当前移动的项目 的克隆结果

    isMoving:false,  //当前是否在拖动

    $biaoGan:$('<li id="biaogan"></li>'),  // 移到位置的 标杆
        
    /*
    *构造函数
    */
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initEvent();
    },

    /*
    *注册事件
    */
    initEvent: function () {
        var that = this;

        /*
        *拖动节点
        */
        this.$dragTargetItem.mousedown(function (e) {
            var et = e.target || e.srcElement;

            var $_target = $(et).closest('li');                        //鼠标按下的对象
            var $_targetParent = $_target.parent();         //鼠标按下的叶子所在的div

            var isMove;

            //开始 拖动
            that.$parentContainer.mousemove(function (ev) {
                //isMove = temp.createBiaogan.call(that, ev, tempNode, divElement, etNode, biaogan);
                that.dragMoveLogical.call(that, ev, $_target);
            });

            //完成 拖动
            that.$parentContainer.mouseup(function (ev) {
                if (isMove) {
                    temp.nodeDragStop(divElement, biaogan);
                    isMove = false;
                }
                that.$dragCloneContainer.empty();
                that.$parentContainer.unbind('mousemove');   //解除target的move事件
                that.$parentContainer.unbind('mouseup');    //解除target的move事件
            });
        });

        //节点的hover
        $(".nodeText").hover(function (e) {
            $(this).addClass("nodeTextHover");
        }, function () {
            $(this).removeClass("nodeTextHover");
        });
    },

    /*
    *移动的逻辑控制
    *包括：目标的位置的合法性、目标的位置标杆建立、移动过程中目标的克隆
    */
    dragMoveLogical: function (evt, $target) {
        var $currentParents;
        this.showCloneTarget.call(this, evt, $target);  //克隆目标 并控制位置
        this.isValiditiableContainer();
    },

    //克隆目标，并控制位置
    showCloneTarget: function (evt, $target) {
        this.$dragCloneContainer.html($target.clone());         //克隆一个移动对象，产生移动效果
        var x = evt.pageX;
        var y = evt.pageY;
        var currentMouseP = this.getMousePositon(evt);   //获取鼠标的位置
        //$target.css({ "left": currentMouseP.x - 5 + "px", "top": currentMouseP.y - 8 + "px" });
        this.$dragCloneContainer.css({ "left": currentMouseP.x - 5 + "px", "top": currentMouseP.y - 8 + "px" });
    },

    //有效位置的判断
    isValiditiableContainer: function () {
        var that=this;
        this.$validitiableContainer.on('mouseenter mouseout', function (evt) {
            if (that.isMoving) {
                if (evt.type == 'mouseenter') {
                    var $lis = $(evt.srcElement).parents('.secondLevelUl').find('li');
                    var currentMouseP = that.getMousePositon(evt);   //获取鼠标的位置
                    //that.controlBiaoganPos($lis, currentMouseP);  //todo 标杆的位置！！！！
                }else{
                    $(this).find('#biaogan').remove();
                }
            }
        });
    },

    //标杆的具体位置
    controlBiaoganPos: function ($lis, currentMouseP) {
        //获得当前鼠标位置在 目标容器中的位置
        var list = this.getNodePositon($lis);

        //用鼠标的位置 判断标杆插入点
        for (var i = 0; i < list.length; i++) {
            //如果在节点的 头部到1/2 之间
            if (currentMouseP.x > list[i][0]['x'] && currentMouseP.x < list[i][0]['x'] + list[i][1]['width'] && currentMouseP.y > list[i][0]['y'] && currentMouseP.y < list[i][0]['y'] + list[i][1]['height'] / 2) {
                if (etNodeId != list[i].id) {
                    biaogan.show();
                    biaogan.insertBefore(list[i])
                    return true;
                }
            }
                //如果在节点的 1/2到1底部 之间
            else if (currentMouseP.x > list[i][0]['x'] && currentMouseP.x < list[i][0]['x'] + list[i][1]['width'] && currentMouseP.y > list[i][0]['y'] + list[i][1]['height'] / 2 && currentMouseP.y < list[i][0]['y'] + list[i][1]['height']) {
                if (etNodeId != list[i].id) {
                    biaogan.show();
                    var afd = $(list[i]).next();
                    biaogan.insertAfter(list[i]);
                    return true;
                }
            }
        }
    },

    /*
    *获取鼠标的当前位置
    */
    getMousePositon: function (e) {
        return {
            x: e.pageX || e.clientX + document.body.srollLeft,
            y: e.pageY || e.clientY + document.body.scrollTop
        }
    },

    /*
    *获取元素位置
    */
    getElementPosition: function (el) {
        return {
            x: el.offsetParent ? el.offsetLeft + arguments.callee(el.offsetParent)['x'] : el.offsetLeft,
            y: el.offsetParent ? el.offsetTop + arguments.callee(el.offsetParent)['y'] : el.offsetTop
        }
    },

    //获取元素尺寸 
    getElementSize: function (el) {
        return {
            width: el.offsetWidth,
            height: el.offsetHeight
        }
    },

    /*
    * 判断标杆插入点并创建标杆  费劲
    */
    createBiaogan1: function (ev, tempNode, divElement, etNode, biaogan) {
        var list = this.getNodePositon();
      
        var biaoganL = biaogan.length;
        //用鼠标的位置 判断标杆插入点
        for (var i = 0; i < list.length; i++) {
            //如果在节点的 头部到1/2 之间
            if (currentMouseP.x > list[i][0]['x'] && currentMouseP.x < list[i][0]['x'] + list[i][1]['width'] && currentMouseP.y > list[i][0]['y'] && currentMouseP.y < list[i][0]['y'] + list[i][1]['height'] / 2) {
                if (etNodeId != list[i].id) {
                    biaogan.show();
                    biaogan.insertBefore(list[i])
                    return true;
                }
            }
                //如果在节点的 1/2到1底部 之间
            else if (currentMouseP.x > list[i][0]['x'] && currentMouseP.x < list[i][0]['x'] + list[i][1]['width'] && currentMouseP.y > list[i][0]['y'] + list[i][1]['height'] / 2 && currentMouseP.y < list[i][0]['y'] + list[i][1]['height']) {
                if (etNodeId != list[i].id) {
                    biaogan.show();
                    var afd = $(list[i]).next();
                    biaogan.insertAfter(list[i]);
                    return true;
                }
            }
        }
    },

    /*
   *获取Node顺序
   */
    getNodePositon: function (nodeList) {
        for (var i = 0; i < nodeList.length; i++) {
            nodeList[i][0] = this.getElementPosition(nodeList[i]);
            nodeList[i][1] = this.getElementSize(nodeList[i]);
        }
        return nodeList;
    },

    /*
    *获取Node顺序
    */
    //getNodePositon: function (nodeList) {
    //    var nodeList = $("#" + this.parentId + "-layers").find("." + this.parentId + "-node");
    //    for (var i = 0; i < nodeList.length; i++) {
    //        nodeList[i][0] = this.getElementPosition(nodeList[i]);
    //        nodeList[i][1] = this.getElementSize(nodeList[i]);
    //    }
    //    return nodeList;
    //},

    /*
    *完成拖动
    */
    nodeDragStop: function (obj1, obj2) {
        $("#" + this.parentId + "-layers").append("<div id='" + this.parentId + "-tempDiv1'></div><div id='" + this.parentId + "-tempDiv2'></div>");
        var $obj1 = $(obj1);
        var $obj2 = $(obj2);
        var temp1 = $("#" + this.parentId + "-tempDiv1");
        var temp2 = $("#" + this.parentId + "-tempDiv2");
        temp1.insertAfter($obj1);
        temp2.insertAfter($obj2);
        $obj2.insertBefore(temp1);
        $obj1.insertBefore(temp2);
        temp1.remove();
        temp2.remove();
    },

    CLASS_NAME: "Corner.NodeDrag"
})