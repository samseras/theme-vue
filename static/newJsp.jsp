<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" session="false" %>
	
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!-- 
  - Author(s): liumx
  - Date: 2019-02-20 18:39:44
  - Description:
-->
  <head lang="zh">
    <meta charset="UTF-8">
    <title>作业管理</title>
    <%@include file="/dsp/header.jsp"%>
    <%@ taglib uri="http://eos.primeton.com/tags/bean" prefix="b"%>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/datacommon/menu.css">
   
</head>
<body class="nui-admin-workarea">
<div class="nui-splitter" style="width: 100%; height: 100%;">
    <div size="20%" showCollapseButton="false">
        <div class="nui-work-area">
            <ul id="job-tree" class="nui-tree" style="width: 100%; height: 100%" showTreeIcon="true"></ul>
        </div>
    </div>
    <div>
        <div class="nui-work-area">
        	<div class="paint" id='myDiagramDiv'>
        		画图
        	</div>
            <div id="main-layout" class="nui-layout" style="width: 100%; height: calc(100% - 250px);">
                <div title="查询" showSplit="false" splitSize="0" region="north" height="70" showCollapseButton="false">
                    <form id="search-condition" class="nui-toolbar">
                        <input name="job.cResid" class="nui-hidden"/>
                        <input name="job.cRestype" class="nui-hidden"/>
                        <input class="nui-textbox nui-form-small" name="criteria._or[0]._expr[0].cResname" emptyText="名称或别名"/>
                        <input class="nui-hidden" name="criteria._or[0]._expr[0]._op" value="like"/>
                        <input class="nui-hidden" name="criteria._or[0]._expr[0]._likeRule" value="all"/>
                        <input name="criteria._or[0]._expr[1].cResalias" class="nui-hidden"/>
                        <input name="criteria._or[0]._expr[1]._op" value="like" class="nui-hidden"/>
                        <input name="criteria._or[0]._expr[1]._likeRule" value="all" class="nui-hidden"/>
                        <a id="find-bth" class="nui-button">查询</a>
                        <div id="func-tool-bar" class="pull-right">
		                    <a class="nui-button-primary nui-menubutton " plain="false" menu="#popupMenu"s>增加</a>
		                    <ul id="popupMenu" class="nui-menu" style="display:none;">
		                        <li id="add-job">在线作业</li>
		                        <li id="add-offline-job">增加离线作业</li>
		                        <li id="add-jobflow">增加作业流</li>
		                        <li id="add-folder">增加目录</li>
		                    </ul>
		                    <a id="remove-job" class="nui-button nui-button-danger" enabled="false">删除</a>
		                    <a id="copy-job" class="nui-button" enabled="false" style="display:none">复制</a>
		                    <a id="resign-folder" class="nui-button" 
		                       enabled="false">重新指定目录</a>
		                     <a id="add-job-excel" class="nui-button" style="display:none">excel导入</a>
                        </div>
                    </form>
					<hr>
                </div>
                <div title="center" region="center">
                    <div class="nui-fit">
                        <div id="job-grid" class="nui-datagrid" style="width:100%;height:100%;" multiSelect="true"
                             pageField="page" totalField="page.count" sizeList="[20,50,100]" pageSize="20">
                            <div property="columns">
                                <div type="checkcolumn" width="15" align="left"></div>
                                <div field="cRestype" width="50" headerAlign="left" align="left"  allowSort="false">作业类型</div>
                                <div field="cResname" width="100" headerAlign="left" align="left"  allowSort="false">作业名称</div>
                                <div field="cResalias" width="100" headerAlign="left" align="left"  allowSort="false">作业别名</div>
                                <div field="cResJobType" width="50" headerAlign="left" align="left"  allowSort="true">作业属性</div>
                                <div field="cResdesc" headerAlign="left" align="left"  allowSort="false">描述</div>
                                <div field="cCreated" headerAlign="left" align="left"  allowSort="true" dateFormat="yyyy-MM-dd HH:mm:ss">创建时间
                                </div>
                                <div field="_op" width="50" headerAlign="left" align="left"  allowSort="false">操作</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<form action="com.primeton.digov.online.common.flow?_eosFlowAction=stepIntoOnlineJob" method="post">
    <input type="hidden" name="cPid" class="nui-hidden"/>
</form>

<script>
    require(["jquery", "job/jobtree", "digov/common/condition-grid", "job/const"], function ($, getJobTree, conditionGrid, IMG) {
        var contextPath = "<%=request.getContextPath() %>";

        // 加载作业目录树
        var jobtree = getJobTree("job-tree");

        // 加载作业/作业流数据
        var jobGrid = nui.get("job-grid");
        jobGrid.setUrl("com.primeton.dams.job.Query.queryJobs.biz.ext");
        jobGrid.setIdField("cResid");
        jobGrid.setDataField("resinfos");
        jobGrid.on("drawcell", cellrender);
        jobGrid.on("cellclick", cellaction);
        jobGrid.on("selectionchanged", enableEditAndRemove);
        var condition = conditionGrid("search-condition", jobGrid, "find-bth", "reset-bth", cancelTreeSelect);
        // 设置作业类型
        var form = condition.form.formComponent;

        jobtree.on("nodeclick", function (e) {
        console.log(e, 'dianji');
        drawCanvas(e.record)
            form.getField("job.cResid").setValue(e.node.cResid);
            form.getField("job.cRestype").setValue(e.node.cRestype);
            condition.grid.load(form.getData(), function (e) {
                if (!e.sender.getSelected()) {
                    enableEditAndRemove({selecteds: []});
                }
            });
        });

        toolbarButton();

        $("#copy-job").hide();
        $("#add-job-excel").hide();

        // 清除作业目录树选项
        function cancelTreeSelect(e) {
            form.getField("job.cResid").setValue("DEFAULT_JOBNODE");
            form.getField("job.cRestype").setValue("DEFAULT_JOBNODE");
            jobtree.source.deselect(jobtree.source.getSelected());
        }


        // 单元格内容渲染
        function cellrender(e) {
            var field = e.field;

            if (field == "cResJobType") {
                e.cellStyle = "text-align:center";
                e.cellHtml = nui.getDictText("DI_C_JOB_TYPE", e.row.cResJobType);
                if (e.row.cRestype == "JOB_FLOW") {
                	e.cellHtml = "作业流";
                }
                return;
            }
            if (field == "cResname") {
                e.cellStyle = "text-align:center";
            }
            if (field == "cRestype") {
                if (!IMG.JOB_TYPE_IMGS[e.value]) {
                    return "";
                } else {
                    e.cellStyle = "text-align:center";
                    e.cellHtml = IMG.getImg(contextPath, IMG.JOB_TYPE_IMGS[e.value]);
                }
            } else if (field == "_op") {
                e.cellStyle = "text-align:center";
                var a = "";
                a += '<a style="margin-right:5px" href="#edit">修改</a>';
                a += '<a style="margin-right:5px" href="#delete">删除</a>';

                // 只有作业流不具备复制功能
                /* if(e.record.cRestype != "JOB_FLOW" && e.record.cRestype != "DEFAULT_JOBNODE") {
                    a += "<a href='#copy' alt='复制'>" + IMG.getImg(contextPath, IMG.OPERATION_IMGS["COPY"]) + "</a>";
                } */
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
                    editJob(e.record);
                } else if (event == "#delete") {
                    deleteJobs([e.record], buildDeleteActionSuccessCall(e.source, jobtree, [e.record]), function () {
                        nui.alert("请求异常");
                    });
                } else if (event == "#copy") {
                    copyJob(e.record);
                }
            }
        }

        function enableEditAndRemove(e) {
            var editBtn = nui.get("edit-job");
            var removeBtn = nui.get("remove-job");
            var resignBtn = nui.get("resign-folder");
            var copyBtn = nui.get("copy-job");

            if (e.selecteds.length == 1) {
                if (e.selecteds[0].cRestype == "JOB") {
                    copyBtn.setEnabled(true);
                } else {
                    copyBtn.setEnabled(false)
                }
                resignBtn.setEnabled(true);
                removeBtn.setEnabled(true);
            } else if (e.selecteds.length == 0) {
                copyBtn.setEnabled(false)
                removeBtn.setEnabled(false);
                resignBtn.setEnabled(false);
            } else {
                copyBtn.setEnabled(false);
                resignBtn.setEnabled(false);
                removeBtn.setEnabled(true);
            }
        }

        function buildDeleteActionSuccessCall(e, t, r) {
            var l = [];
            for (var i = 0; i < r.length; i++) {
                if (r[i].cRestype != "DEFAULT_JOBNODE") {
                    continue;
                } else {
                    l.push(r[i]);
                }
            }
            var editBtn = nui.get("edit-job");
            var removeBtn = nui.get("remove-job");
            var resignBtn = nui.get("resign-folder");
            var copyBtn = nui.get("copy-job");
            if (l.length == 0) {
                return function (d, t, xhr) {
                    if (d.exception) {
                        nui.alert("删除失败");
                    }else if(d.oprResult == -2){
                    	nui.alert("删除失败！所选作业被计划引用！");
                    } else {
                        removeBtn.setEnabled(false);
                        resignBtn.setEnabled(false);
                        copyBtn.setEnabled(false);
                        e.reload();
                    }
                };
            } else {
                return function (d, type, xhr) {
                    if (d.exception) {
                        nui.alert("删除失败");
                    } else if (d.oprResult == 0) {
                        nui.alert("删除成功");
                        removeBtn.setEnabled(false);
                        resignBtn.setEnabled(false);
                        copyBtn.setEnabled(false);
                        t.load();
                        e.reload();
                    } else if (d.oprResult == 1) {
                        nui.alert("部分目录下存在资源，没有删除!");
                        removeBtn.setEnabled(false);
                        resignBtn.setEnabled(false);
                        copyBtn.setEnabled(false);
                        e.load();
                    } else if (d.oprResult == -1) {
                        nui.alert("删除失败!");
                    }else {
                        nui.alert("未知状态!");
                    }
                };
            }
        }

        function deleteJobs(d, s, e) {
            nui.confirm("确定删除选中的项目？", "警告", function (e) {
                if (e == "ok") {
                    nui.ajax({
                        url: "com.primeton.dams.job.Job.delRecord.biz.ext",
                        data: {selectedObjects: d},
                        success: s,
                        error: e
                    });
                }
            })
        }

        function toolbarButton() {
            var addJobExcelBtn = nui.get("add-job-excel");
            var addJobBtn = nui.get("add-job");
            var addJobFlowBtn = nui.get("add-jobflow");
            var addFolderBtn = nui.get("add-folder");
            var removeJobBtn = nui.get("remove-job");
            var resignFolderBtn = nui.get("resign-folder");
            var copyBtn = nui.get("copy-job");

            var addOfflineJobBtn = nui.get("add-offline-job");

            addOfflineJobBtn.on('click', function (e) {
                addOfflineJob(jobtree.getSelected());
            });


            addJobExcelBtn.on('click', function (e) {
                addOnlineJobExcel(jobtree.getSelected());
            });


            addJobBtn.on('click', function (e) {
                addJob(jobtree.getSelected());
            });

            addJobFlowBtn.on('click', function (e) {
                addJobFlow(jobtree.getSelected());
            });
            addFolderBtn.on('click', function (e) {
                var parentFolder = jobtree.getSelected();
                if (!parentFolder) {
                    addFolder({cResid: "DEFAULT_JOBNODE", _parentname: "作业|作业流", cRestype: "DEFAULT_JOBNODE"});
                } else {
                    parentFolder._parentname = jobtree.getSelectedFullPath(parentFolder);
                    addFolder(nui.clone(parentFolder));
                }
            });
            resignFolderBtn.on("click", function (e) {
                resignFolder(jobGrid.getSelected());
            })
            removeJobBtn.on('click', function (e) {
                deleteJobs(jobGrid.getSelecteds(), buildDeleteActionSuccessCall(jobGrid, jobtree, jobGrid.getSelecteds()), function (e) {
                    nui.alert("请求异常");
                });
            });
            copyBtn.on("click", function (e) {
                copyJob(jobGrid.getSelected());
            });
        }

        function addJob(e) {
            var cPid;
            if (!jobtree.getSelected()) {
                cPid = "DEFAULT_JOBNODE";
            } else {
                if (!jobtree.getSelected().cResid) {
                    cPid = "DEFAULT_JOBNODE";
                } else {
                    cPid = jobtree.getSelected().cResid;
                }
            }
            nui.getbyName("cPid").setValue(nui.encode(cPid));
            document.forms[1].submit();
        }

        function addOnlineJobExcel() {
            var cPid;
            if (!jobtree.getSelected()) {
                cPid = "DEFAULT_JOBNODE";
            } else {
                if (!jobtree.getSelected().cResid) {
                    cPid = "DEFAULT_JOBNODE";
                } else {
                    cPid = jobtree.getSelected().cResid;
                }
            }
            //location.replace("<%=request.getContextPath()%>/job/createOfflineJob.jsp?_source=" + location.pathname + "&cPid=" + cPid);
            location.replace("<%=request.getContextPath()%>/online/onlineJobExcel.jsp?_source=" + location.pathname + "&cPid=" + cPid);

        }

        // 离线作业
        function addOfflineJob(e) {
            var cPid;
            if (!jobtree.getSelected()) {
                cPid = "DEFAULT_JOBNODE";
            } else {
                if (!jobtree.getSelected().cResid) {
                    cPid = "DEFAULT_JOBNODE";
                } else {
                    cPid = jobtree.getSelected().cResid;
                }
            }
            location.replace("<%=request.getContextPath()%>/job/createOfflineJob.jsp?_source=" + location.pathname + "&cPid=" + cPid);
        }


        function addJobFlow(e) {
            var cPid;
            if (!jobtree.getSelected()) {
                cPid = "DEFAULT_JOBNODE";
            } else {
                if (!jobtree.getSelected().cResid) {
                    cPid = "DEFAULT_JOBNODE";
                } else {
                    cPid = jobtree.getSelected().cResid;
                }
            }
            location.replace("<%=request.getContextPath()%>/job/create_jobflow.jsp?_source=" + location.pathname + "&cPid=" + cPid);
        }

        function editJob(e) {
            if (e.cRestype == "DEFAULT_JOBNODE") {
                var parentFolder = jobtree.getSelected();
                if (!parentFolder) {
                    e._parentname = "作业|作业流";
                } else {
                    e._parentname = jobtree.getSelectedFullPath(parentFolder);
                }
                updateFolder(e);
            } else if (e.cRestype == "JOB") {
                updateJob(e);
            } else if (e.cRestype == "JOB_FLOW") {
                updateJobFlow(e);
            } else {
                return;
            }
        }

        function copyJob(e) {
            nui.open({
                url: "<%=request.getContextPath()%>/base/select_resource.jsp",
                title: "复制到",
                width: "300",
                height: "330",
                allowResize: false,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.init(["DEFAULT_JOBNODE"]);
                },
                ondestroy: function (action) {
                    var data = nui.clone(action);
                    if (data.action == "ok") {
                        location.replace("<%=request.getContextPath() %>/job/copy_job.jsp?_source=" + location.pathname + "&jobId=" + e.cResid + "&cPid=" + data.data.cResid);
                    } else {
                        return;
                    }
                }
            });
        }

        function resignFolder(e) {
            nui.open({
                url: "<%=request.getContextPath()%>/base/select_resource.jsp",
                title: "重新指定",
                width: "300",
                height: "330",
                allowResize: false,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.init(["DEFAULT_JOBNODE"]);
                },
                ondestroy: function (action) {
                    var data = nui.clone(action);
                    if (data.action == "cancel") {
                        return;
                    }else if(data == "close"){
                    	return;
                    } else if (data.data.cResid == e.cResid) {
                        nui.alert("源目录与目标目录相同，无法移动！", "警告");
                    } else {
                        nui.ajax({
                            url: "com.primeton.dams.base.resTree.modiRestreeParent.biz.ext",
                            data: {restree: e, cPid: data.data.cResid},
                            success: function (d, t, xhr) {
                                if (d.exception) {
                                    nui.alert(d.exception.message);
                                } else {
                                    if (d.oprResult == -1) {
                                        nui.alert("资源名称" + form.getData().restree.cResname + "已经存在!");
                                    } else if (d.oprResult == 1) {
                                        nui.alert("操作成功");
                                        jobtree.load();
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
            });
        }

        function updateJob(e) {

            // 离线作业
            if (e.cResJobType === "0") {
                location.replace("<%=request.getContextPath()%>/job/updateOfflineJob.jsp?_source=" + location.pathname + "&jobId=" + jobGrid.getSelected().cResid);
            } else if (e.cResJobType === "1") {
                // 在线作业
                //var temp=e.cResid;
                
                location.replace("<%=request.getContextPath()%>/online/onlineJob.jsp?_source=" + location.pathname + "&cId=" + e.cResid);
            } else if (e.cResJobType === "2") {

                // excel导入生成作业
                location.replace("<%=request.getContextPath()%>/online/onlineJobExcel.jsp?_source=" + location.pathname + "&cId=" + jobGrid.getSelected().cResid);
            }
        }

        function updateJobFlow(e) {
            location.replace("<%=request.getContextPath()%>/job/update_jobflow.jsp?_source=" + location.pathname + "&flowId=" + jobGrid.getSelected().cResid);

        }

        function updateFolder(e) {
            nui.open({
                url: "<%=request.getContextPath()%>/base/modify_resfolder.jsp",
                title: "更新目录",
                width: "400",
                height: "420",
                allowResize: false,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.init(e);
                },
                ondestroy: function (action) {
                    if (action == "ok") {
                        nui.alert("更新目录成功");
                        jobtree.load();
                        jobGrid.reload();
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
                url: "<%=request.getContextPath()%>/base/create_resfolder.jsp",
                title: "创建目录",
                width: 400,
                height: 430,
                allowResize: false,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.init(e);
                },
                ondestroy: function (action) {
                    if (action == "ok") {
                        nui.alert("创建目录成功");
                        jobtree.load();
                        jobGrid.reload();
                    } else {
                        return;
                    }
                }
            });
        }
        
        
        
        // gojs  
        
        var G = go.GraphObject.make;
        function gojsInit (fn) {
        console.log(8888888)
        var me = this;
        // if (me.myDiagram !== null) return;
        myDiagram = G(go.Diagram, "myDiagramDiv", {
            initialContentAlignment: go.Spot.Left, // center Diagram contents
            layout: G(go.TreeLayout, {
                angle: 0,
                nodeSpacing: 20,
                layerSpacing: 100
            }),
            "draggingTool.dragsLink": true,
            "draggingTool.isGridSnapEnabled": true,
            "linkingTool.isUnconnectedLinkValid": false, // 单个对象是否拉出线条
            "relinkingTool.isUnconnectedLinkValid": true,
           	"undoManager.isEnabled": false
        });
        myDiagram.nodeTemplate = G(go.Node, "Horizontal", // auto Horizontal
            {
                desiredSize: new go.Size(180, 30),// 节点的宽高
                selectable: true,// 是否可以选择节点
                background: "#DFDFDF",
                selectionAdorned: false //选中时不显示蓝色的边框
            }, G(go.Shape, 'Rectangle', { 
                name: "SHAPE",
                width: 5,
                height: 30,
                stroke: null,
                strokeWidth: 0
            }, new go.Binding("fill", "color")),
            // // stroke: null, strokeWidth:0 可以去掉边框
            G(go.TextBlock, "Default Text", {
                textAlign: 'left',
                margin: new go.Margin(0, 0, 0, 6),
                stroke: "black",
                font: "12px sans-serif",
                width: 160,
                wrap: go.TextBlock.None,
                isMultiline: false
            }, new go.Binding("text", "name"))
        );
        myDiagram.linkTemplate = G(go.Link, // the whole link panel
            {
                layerName: "Foreground",
                routing: go.Link.AvoidsNodes,
                corner: 5, // 线条转弯的弧度，越小越呈现直角
                curve: go.Link.JumpOver,
                selectable: true
            },
            G(go.Shape, // the link
                {
                    stroke: "#777",
                    strokeWidth: 1
                }), G(go.Picture, {
                width: 30,
                height: 30,
                segmentIndex: 3,
                segmentFraction: 0.5,
                cursor: "pointer"
            }, new go.Binding("source", "linkType", me.setLinkImageByType))
        );
       myDiagram.nodeTemplate.contextMenu =
            G(go.Adornment, "Vertical",
                G("ContextMenuButton",  //每一个对应一个button,多个btn多个menubtn
                    G(go.TextBlock, "删除",{
                        textAlign: "center",
                        width: 40,
                        height: 20,
                        background:'#fff',
                        font: "12px sans-serif",
                        verticalAlignment: go.Spot.Center
                    }), {
                        margin: 0,
                        alignment: go.Spot.Right,
                        'ButtonBorder.fill':'#fff',
                        mouseEnter:function (e,obj) {
                          menu = e.targetObject;
                          if(menu){
                              menu.fill = '#fff';
                          }
                        },
                        click: function (e, obj) {
                            var data = obj.part.adornedPart.data;

                            //找到当前节点的所有子节点nodeArr
                            var linkArr = myDiagram.model.linkDataArray;
                            var nodeArr = myDiagram.model.nodeDataArray;

                            if(data.key == nodeArr[0].key){
                                // 当删除根节点的情况,删除所有数据，并且count改为0。
                                count=0;
                                tableList=[];
                                myDiagram.model.nodeDataArray=[];
                                myDiagram.model.linkDataArray=[];
                                myDiagram.rebuildParts();
                                e.diagram.currentTool.stopTool();
                                //setGridColumnsAndData([],[]);
                            }else{ //删除非根节点及其子节点
                                var list = tableList;
                                var relationNode = me.getRelationNode(linkArr,data.key);
                                // count = count - relationNode.length;
                                // 从tableList中删除businessname等于relation中to的项, 不更改node的index
                                for(var a= 0,len=relationNode.length; a < len; a++){
                                    for(var b= 0; b < list.length; b++){
                                        if(relationNode[a].to === list[b].businessName){
                                            list.splice(b,1);
                                        }else{
                                            if(list[b].relationColumns.length > 0){
                                                for(var d = 0; d < list[b].relationColumns.length; d++){
                                                    if(list[b].relationColumns[d].fromBusinessName == relationNode[a].to){
                                                        list[b].relationColumns.splice(d,1);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                e.diagram.commandHandler.deletesTree = true; //同时删除子树
                                e.diagram.commandHandler.deleteSelection();
                                e.diagram.currentTool.stopTool();
                            }

                        }
                    })
            );

        // me.myDiagram.nodeTemplate.contextMenu =
        //     G("ContextMenuButton",
        //         G(go.TextBlock, "Delete", {
        //             click: function (e, obj) {
        //                 console.log(obj);
        //                 // e.diagram.commandHandler.deleteSelection();
        //             }
        //         }));


        // 单击事件
        myDiagram.addDiagramListener("ObjectSingleClicked", function (e) {
            Select_Port = e.subject.part;
            // Select_Port 包含了点击的点或者线的所有属性，可直接读
            var data = Select_Port.part.data;
            if (Select_Port instanceof go.Link) {
            	console.log(data, 'data')
                //me.openRelationWin(data);
                showDialog()
            } else if (Select_Port instanceof go.Node) {
                // node 类型
            }
            //myDiagram.rebuildParts();
        });
        //myDiagram.model = G(go.GraphLinksModel);

        //if(fn) fn();
    }
    var myDiagram = null;
    var tableList = [];
    var tableName = '';
    var count = 0;
    var name = ''; //工作薄名称，
    var description = '';//工作薄描述
    var tableId = null; //工作薄表id
    var projectId = null; //工作薄id
    var pageSize = 100;
    var type = '0';
    var borderColor = ['#6699cc', '#fcd209', '#ec5d4e', '#cccc99', '#28ff28', '#ae57a4', '#003399'];
    // 类对应上面的颜色，修改颜色时同步修改样式
    var gridHeaderCls = ['one','two','three','four','five','six','seven'];
    function drawCanvas (selectObj) {
			//绘制拖拽表格
			// mask();
			var me = this,
   			id = selectObj.cPid,
   			name = selectObj.cResname,
    		linkObj = {};
		//var myDiagram = this.myDiagram,
    	nodeData = myDiagram.model.nodeDataArray;
		if (selectObj.children) {
    		console.log('拖拽失败');
    		//unmask();
    		return;
		}
		var linkType = 0, relation = [];
		if (nodeData.length > 0) {
    	// 默认与第一张表关联，如果与第一张表有code相同的字段，则关联起来，没有，则打开弹框自行选择
    	//var relationArr = me.getSameCodeColumns(selectObj);
    	var relationArr = [];
    	// 如果有多个，选择其中一个作为关联
    	if (relationArr.length > 0) {
        	linkType = 1;
        	//relation[0] = me.getSpecItem(relationArr, 'ZJHM') || me.getSpecItem(relationArr, 'XM')
            	// || me.getSpecItem(relationArr, 'LXDH') || relationArr[0];
    	} else {
        	linkType = 0;
        	relation = [];
    	}
    	linkObj = {
        	from: nodeData[0].key,
        	to: selectObj.cResname,
        	linkType: linkType
	    	}
		} else {
    		linkObj = {
        		linkType: 0
    		};
	    	//me.setDiscoveryName(selectObj.cResname);
		}
		selectObj.relationType = linkType;
		selectObj.relationColumns = relation;
		var _selectObj = selectObj;
		var list = tableList;
		list.push(selectObj);
		var num = count % borderColor.length;
    		myDiagram.model.addNodeData({
        		key: selectObj.cResname,
        		id: id,
        		name: selectObj.cResname,
        		color: borderColor[num]
    		});
    		count++;
    		tableList.push(_selectObj);	
		}
		$(function () {
		console.log(77777)
			gojsInit()
		})
		
		
		
		
		 var nodeSelectionAdornmentTemplate =
        G(go.Adornment, "Auto",
          G(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] }),
          G(go.Placeholder)
        );
		
		var nodeResizeAdornmentTemplate =
        G(go.Adornment, "Spot",
          //{ locationSpot: go.Spot.Right },
          G(go.Placeholder),
          G(go.Shape, { alignment: go.Spot.TopLeft, cursor: "nw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          G(go.Shape, { alignment: go.Spot.Top, cursor: "n-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          G(go.Shape, { alignment: go.Spot.TopRight, cursor: "ne-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

          G(go.Shape, { alignment: go.Spot.Left, cursor: "w-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          G(go.Shape, { alignment: go.Spot.Right, cursor: "e-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

          G(go.Shape, { alignment: go.Spot.BottomLeft, cursor: "se-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          G(go.Shape, { alignment: go.Spot.Bottom, cursor: "s-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          G(go.Shape, { alignment: go.Spot.BottomRight, cursor: "sw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" })
        );

      var nodeRotateAdornmentTemplate =
        G(go.Adornment,
          { locationSpot: go.Spot.Center, locationObjectName: "CIRCLE" },
          G(go.Shape, "Circle", { name: "CIRCLE", cursor: "pointer", desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
          G(go.Shape, { geometryString: "M3.5 7 L3.5 30", isGeometryPositioned: true, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] })
        );

      myDiagram.nodeTemplate =
        G(go.Node, "Horizontal",
          { locationSpot: go.Spot.Center },
          {
          	desiredSize: new go.Size(82, 30),
            background: "#DFDFDF",
          },// 节点的宽高,
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
          { resizable: true, resizeObjectName: "PANEL", resizeAdornmentTemplate: nodeResizeAdornmentTemplate }, // 对象拉伸
          { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },  // 旋转
          new go.Binding("angle").makeTwoWay(),
          // the main object is a Panel that surrounds a TextBlock with a Shape
          G(go.Panel, "Auto",
            { name: "PANEL" },
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            
            G(go.Shape, "Rectangle",  // default figure
              {
                portId: "", // the default port: if no spot on link data, use closest side
                fromLinkable: true, toLinkable: true, cursor: "pointer",
                fill: "white",  // default color
                strokeWidth: 2,
                 name: "SHAPE",
                width: 80,
                height: 30
              },
              new go.Binding("fill", "color"),
              new go.Binding("figure"),
              new go.Binding("fill")),
            G(go.TextBlock,
              {
                maxSize: new go.Size(160, NaN),
                editable: false,
                textAlign: 'center',
                margin: new go.Margin(0, 0, 0, 6),
                stroke: "black",
                font: "12px sans-serif",
                width: 160,
                wrap: go.TextBlock.None,
                isMultiline: false
              },
              new go.Binding("text", "name"),
              new go.Binding("text").makeTwoWay())
          ),
          // four small named ports, one on each side:
          //makePort("T", go.Spot.Top, false, true),
          //makePort("L", go.Spot.Left, true, true),
          //makePort("R", go.Spot.Right, true, true),
          //makePort("B", go.Spot.Bottom, true, false),
          { // handle mouse enter/leave events to show/hide the ports
            mouseEnter: function(e, node) { showSmallPorts(node, true); },
            mouseLeave: function(e, node) { showSmallPorts(node, false); }
          }
        );

      function showSmallPorts(node, show) {
        node.ports.each(function(port) {
          if (port.portId !== "") {  // don't change the default port, which is the big shape
            port.fill = show ? "rgba(0,0,0,.3)" : null; // 显示隐藏对象的内部连接点
          }
        });
      }
		

		
		
		
   })
</script>
</body>
</html>

{
    "tables": [
    {
        "id": "abcd",
        "tableName" : "HELLO",
        "alias":"A",
        "fields":["ID", "NAME", "AGE"]
    },
    {
        "id": "abcd",
        "tableName" : "WORLD",
        "alias":"B",
        "fields":["ID", "ADDRESS", "WORK"]
    }],
   
   "joins" : [
       {"left":"HELLO", "leftField":"ID","joinType":"INNER_JOIN", "right":"WORLD", "rightField":"ID"}
   ],
   "conds":[
   {
       "tableName":"",
       "fieldName":"",
       "type":"string", 
       "opera":"=",
       "value":"",
       "cond":"and"
   },
   {
    "tableName":"",
    "fieldName":"",
    "type":"string", 
    "opera":"=",
    "value":"",
    "cond":"and"
    }
   ]
}


nui.open({
    url: nui.contextPath + "/resfolder/webpublish/generator.jsp",
    title:"发布web服务配置",
    width: 750, height: 710 ,
    allowResize: false,
    id: "publishWeb",
    onload:function() {
        var iframe = this.getIFrameEl();
        iframe.contentWindow.setData(params);
    }
})




nui.ajax({
    url:"com.primeton.dsp.adapter.di.queryColumnsByTableId.biz.ext",
    data:{tableId:item2.instanceId},
    async: false,
    success:function(data){
        //toColumns=data.columns;	
        //columnMapping.toColumns=toColumns;
        listbox2.addRows(data.columns);
    }
});