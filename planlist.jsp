  <%@page pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <!--
    - Author(s): yangbo
    - Date: 2015-09-07 16:01:05
    - Description:
    -->
    <head lang="zh">
    <meta charset="UTF-8">
    <title>计划设置</title>
    <%@include file="/dsp/header.jsp"%>
    </head>
    <body class="nui-admin-workarea">
    <div class="nui-splitter" style="width: 100%; height: 100%;">

    <div size="25%" showCollapseButton="true">
    <div class="nui-work-area">
    <ul id="plan-tree" class="nui-tree" style="width: 100%; height: 100%" showTreeIcon="true"></ul>
    </div>
    </div>
    <div>
    <div class="nui-work-area">
    <div id="main-layout" class="nui-layout" style="width: 100%; height: 100%;">

    <div title="查询" showSplit="false" splitSize="0" region="north" height="70">
    <form id="search-condition" class="nui-toolbar clearfix">
    <input name="criteria._expr[0].cPid" class="nui-hidden" value="ETLSCHEDULES_NODE"/>
    <input name="criteria._expr[1].cRestype" class="nui-hidden" value="ETLSCHEDULES_NODE"/>
    <input class="nui-textbox nui-form-small" emptyText="名称" name="criteria._or[0]._expr[1].cResname"/>
    <input class="nui-hidden" name="criteria._or[0]._expr[1]._op" value="like"/>
    <input class="nui-hidden" name="criteria._or[0]._expr[1]._likeRule" value="all"/>

    <input name="criteria._or[0]._expr[2].cResalias" class="nui-hidden"/>
    <input name="criteria._or[0]._expr[2]._op" value="like" class="nui-hidden"/>
    <input name="criteria._or[0]._expr[2]._likeRule" value="all" class="nui-hidden"/>

    <a id="find-bth" class="nui-button">查询</a>
    <a id="reset-bth" class="nui-button">重置</a>
    <div id="func-tool-bar" class="pull-right">
    <a class="nui-button-primary nui-menubutton " plain="false" menu="#popupMenu" s>增加</a>
    <ul id="popupMenu" class="nui-menu" style="display:none;">
    <li id="add-plan">计划</li>
    <li id="add-folder">目录</li>
    </ul>
    <a id="remove-plan" class="nui-button nui-button-danger" enabled="false">删除</a>

    <a id="resign-folder" class="nui-button" enabled="false">重新指定分类</a>
    </div>
    </form>
    <hr>
    </div>
    <div title="center" region="center">
    <div class="nui-fit">
    <div id="plan-grid" class="nui-datagrid" style="width:100%;height:100%;" multiSelect="true"
    sizeList="[10,50,100]" pageSize="10" >
    <div property="columns">
    <div type="checkcolumn" width="10"></div>
    <div field="cRestype" width="20" headerAlign="center" allowSort="false">类型</div>
    <div field="cResname" width="100" headerAlign="center" allowSort="false">名称</div>
    <div field="cResalias" width="100" headerAlign="center" allowSort="false">别名</div>
    <div field="cResdesc" headerAlign="center" allowSort="false">描述</div>
    <div field="_op" width="40" headerAlign="center" allowSort="false">操作</div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>

    </div>
    <script>
    require(["jquery", "base/resource-tree", "digov/common/condition-grid", "digov/const"], function ($, resTree, conditionGrid, IMG) {

    var contextPath = "<%=request.getContextPath() %>";

    var plantree = resTree("plan-tree", ["ETLSCHEDULES_NODE"]);
    var planGrid = nui.get("plan-grid");
    planGrid.setUrl("com.primeton.dams.base.resTree.query.biz.ext");
    planGrid.setIdField("cResid");
    planGrid.setDataField("resInfos");
    planGrid.on("drawcell", cellrender);
    planGrid.on("cellclick", cellaction);
    planGrid.on("selectionchanged", enableEditAndRemove);
    var condition = conditionGrid("search-condition", planGrid, "find-bth", "reset-bth");

    condition.form.regReset("reset-bth", function cancelTreeSelect(e) {
    plantree.source.deselect(plantree.source.getSelected());
    });

    var form = condition.form.formComponent;
    plantree.on("nodeclick", function (e) {
    form.getField("criteria._expr[0].cPid").setValue(e.node.cResid);
    form.getField("criteria._expr[1].cRestype").setValue("ETLSCHEDULE");
    condition.grid.load(form.getData(), function (e) {
    var selectnode = e.sender.getSelected();
    if (!selectnode) {
    enableEditAndRemove({selecteds: []});
    }
    });
    });

    toolbarButton();

    // 单元格内容渲染
    function cellrender(e) {
    var field = e.field;
    e.cellStyle = "text-align:center";
    if (field == "cRestype") {
    if (!IMG.RES_TYPE_IMGS[e.value]) {
    e.cellHtml = "";
    } else {
    e.cellHtml = IMG.getImg(contextPath, IMG.RES_TYPE_IMGS[e.value]);
    }
    } else if (field == "_op") {
    var a = "";
    a += "<a href='#edit' alt='修改'>" + "修改" + "</a>";
    a += "&nbsp;"
    a += "<a href='#delete' alt='删除'>" + "删除" + "</a>";
    e.cellHtml = a;
    }
    }

    // 表格行操作
    function cellaction(e) {
    if (e.field != "_op") {
    return;
    } else {
    var $eventTarget = $(e.htmlEvent.target);
    var event;
    if ($eventTarget.is("a")) {
    event = $eventTarget.attr("href");
    } else if ($eventTarget.is("img")) {
    event = $eventTarget.parent().attr("href");
    } else {
    event = null;
    }

    if (event == "#edit") {
    editRes(e.record);
    } else if (event == "#delete") {
    deleteRes([e.record], buildDeleteActionSuccessCall(e.source, plantree, [e.record]), function (e) {
    nui.alert(e, "异常");
    });
    }
    }
    }

    function enableEditAndRemove(e) {
    var removeBtn = nui.get("remove-plan");
    var resignBtn = nui.get("resign-folder");
    if (e.selecteds.length == 1) {
    resignBtn.setEnabled(true);
    removeBtn.setEnabled(true);
    } else if (e.selecteds.length == 0) {
    removeBtn.setEnabled(false);
    resignBtn.setEnabled(false);
    } else {
    resignBtn.setEnabled(false);
    removeBtn.setEnabled(true);
    }
    }

    function buildDeleteActionSuccessCall(e, t, r) {
    var removeBtn = nui.get("remove-plan");
    var resignBtn = nui.get("resign-folder");
    if (r[0].cRestype != "ETLSCHEDULES_NODE") {
    return function (d, t, xhr) {
    if (d.exception) {
    nui.alert("删除失败");
    } else if (d.oprResult == 1) {
    nui.alert("删除成功");
    removeBtn.setEnabled(false);
    resignBtn.setEnabled(false);
    e.reload();
    } else {
    nui.alert("删除失败！");
    }
    };
    } else {
    return function (d, type, xhr) {
    if (d.exception) {
    nui.alert("删除失败");
    } else if (d.failedRes.length == 0) {
    nui.alert("删除成功");
    removeBtn.setEnabled(false);
    resignBtn.setEnabled(false);
    t.reload();
    e.reload();
    } else if (d.oprResult == r.length) {
    nui.alert("删除失败!");
    } else {
    nui.alert("部分存在下属资源的目录没有删除!");
    removeBtn.setEnabled(false);
    resignBtn.setEnabled(false);
    e.reload();
    }
    };
    }
    }

    function deleteRes(d, s, e) {
    var folderSize = 0;
    var planSize = 0;
    for (var i = 0; i < d.length; i++) {
    if (d[i].cRestype == "ETLSCHEDULES_NODE") {
    folderSize++;
    } else {
    planSize++;
    }
    }
    if (folderSize >= 1 && planSize == 0) {
    nui.confirm("确定删除选中的项目？", "警告", function (e) {
    if (e == "ok") {
    nui.ajax({
    url: "com.primeton.dams.base.ResourceTree.removeResources.biz.ext",
    data: {restrees: d},
    success: s,
    error: e
    });
    }
    });
    } else if (folderSize == 0 && planSize >= 1) {
    nui.confirm("确定删除选中的项目？", "警告", function (e) {
    if (e == "ok") {

    nui.ajax({
    url: "com.primeton.dams.scheduler.plan.delPlan.biz.ext",
    data: {selectedObjects: d},
    success: s,
    error: e
    });
    }
    });
    } else {
    nui.alert("请选择一种类型删除，比如全是目录或全是计划", "警告");
    }

    }

    function toolbarButton() {
    var addPlanBtn = nui.get("add-plan");
    var addFolderBtn = nui.get("add-folder");
    var removePlanBtn = nui.get("remove-plan");
    var resignFolderBtn = nui.get("resign-folder");

    addPlanBtn.on('click', function (e) {
    addPlan(plantree.getSelected());
    });
    addFolderBtn.on('click', function (e) {
    var parentFolder = plantree.getSelected();
    if (!parentFolder) {
    addFolder({cResid: "ETLSCHEDULES_NODE", _parentname: "计划任务", cRestype: "ETLSCHEDULES_NODE"});
    } else {
    parentFolder._parentname = getSelectedFullPath(parentFolder);
    addFolder(nui.clone(parentFolder));
    }
    });
    resignFolderBtn.on("click", function (e) {
    resignFolder(planGrid.getSelected());
    })
    removePlanBtn.on('click', function (e) {
    deleteRes(planGrid.getSelecteds(), buildDeleteActionSuccessCall(planGrid, plantree, planGrid.getSelecteds()), function (e) {
    nui.alert(e, "异常");
    });
    });
    }

    function addPlan(e) {
    var cPid;
    if (!plantree.getSelected()) {
    cPid = "ETLSCHEDULES_NODE";
    } else {
    if (!plantree.getSelected().cResid) {
    cPid = "ETLSCHEDULES_NODE";
    } else {
    cPid = plantree.getSelected().cResid;
    }
    }
    location.replace("<%=request.getContextPath()%>/scheduler/create_plan.jsp?_source=" + location.pathname + "&cPid=" + cPid);
    }

    function editRes(e) {
    if (e.cRestype == "ETLSCHEDULES_NODE") {
    var parentFolder = plantree.getSelected();
    if (!parentFolder) {
    e._parentname = "计划任务";
    } else {
    e._parentname = getSelectedFullPath(parentFolder);
    }
    updateFolder(e);
    } else if (e.cRestype == "ETLSCHEDULE") {
    updatePlan(e);
    } else {
    return;
    }
    }

    function getSelectedFullPath(node) {
    if (!node) {
    node = plantree.getSelected();
    }
    if (!node) {
    return "计划任务";
    } else {
    var path = node.cResname;
    while (node != null) {
    node = plantree.getParentNode(node);
    if (node.cResname) {
    path = node.cResname + "\\" + path;
    } else {
    break;
    }
    }
    return path;
    }
    }

    function resignFolder(e) {
    nui.open({
    url: contextPath + "/base/select_resource.jsp",
    title: "重新指定",
    width: "300",
    height: "330",
    allowResize: false,
    onload: function () {
    var iframe = this.getIFrameEl();
    iframe.contentWindow.init(["ETLSCHEDULES_NODE"]);
    },
    ondestroy: function (d) {
    if (d.action == "cancel") {
    return;
    } else {
    var data = nui.clone(d.data);
    if (data.cResid == e.cResid) {
    nui.alert("源目录与目标目录相同，无法移动！", "警告");
    } else {
    nui.ajax({
    url: "com.primeton.dams.base.ResourceTree.moveResource.biz.ext",
    data: {restree: e, cPid: data.cResid},
    success: function (d, t, xhr) {
    if (d.exception) {
    nui.alert(d.exception.message);
    } else {
    if (d.oprResult == -1) {
    nui.alert("资源名称" + form.getData().restree.cResname + "已经存在!");
    } else if (d.oprResult == 1) {
    nui.alert("操作成功");
    enableEditAndRemove({selecteds: []});
    plantree.reload();
    condition.grid.load(form.getData());
    } else {
    nui.alert("保存失败");
    }
    }
    },
    error: function (e) {
    nui.alert("请求异常");
    }
    });
    }
    }
    }
    });

    }

    function updatePlan(e) {
    location.replace(contextPath + "/scheduler/update_plan.jsp?_source=" + location.pathname + "&cId=" + planGrid.getSelected().cResid);
    }

    function updateFolder(e) {
    nui.open({
    url: contextPath + "/base/modify_resfolder.jsp",
    title: "更新目录",
    width: "400",
    height: "400",
    allowResize: false,
    onload: function () {
    var iframe = this.getIFrameEl();
    iframe.contentWindow.init(e);
    },
    ondestroy: function (action) {
    if (action == "ok") {
    nui.alert("更新目录成功");
    plantree.reload();
    planGrid.reload();
    } else {
    return;
    }
    }
    });
    }

    function addFolder(e) {
    e.cPid = e.cResid;
    e.cResname = null;
    e.cResid = null;
    e.cResdesc = null;
    e.cResalias = null;
    e.cOrder = 0;
    nui.open({
    url: contextPath + "/base/create_resfolder.jsp",
    title: "创建目录",
    width: "400",
    height: "400",
    allowResize: false,
    onload: function () {
    var iframe = this.getIFrameEl();
    iframe.contentWindow.init(e);
    },
    ondestroy: function (action) {
    if (action == "ok") {
    nui.alert("创建目录成功");
    plantree.reload();
    planGrid.reload();
    } else {
    return;
    }
    }
    });
    }
    });
    </script>
    </body>
    </html>
    {field: 'loginname', header: '这个'},
    {field: 'name', header: '姓名'},
    {field: 'gender', header: '性别'},
    {field: 'salary', header: '年龄'}

    {loginname: 123, name: 'zhangsan', gender: '男', salary: '23'}
    {loginname: 123, name: 'zhangsan', gender: '男', salary: '23'}
    {loginname: 123, name: 'zhangsan', gender: '男', salary: '23'}
    {loginname: 123, name: 'zhangsan', gender: '男', salary: '23'}
    {loginname: 123, name: 'zhangsan', gender: '男', salary: '23'}






    {

    "sql":"select * from table",
    "rows":100,
    "fields":[
    {"name":"ID", "type":"varchar"},
    {"name":"age", "type":"int"}
    ],

    "dataset":[
    {"name":"zhaopx", "age":30},
    {"name":"liumx", "age":25}
    ]
    }













































