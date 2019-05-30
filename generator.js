<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" session="false"%>

  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--
  - Author(s): mazj
- Date: 2018-03-07 16:02:26
- Description:
-->
<head>
<title>服务配置</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <%@include file="/dsp/header.jsp"%>
  <style>
  textarea{
  height:248px !important
}
.paint{
  width: 100%;
  height: 180px;
}
.jointType{
  width: 100%;
  margin: 10px auto;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.joinTit{
  height: 20px;
  line-height:20px;
  padding-left: 10px;
}
.joinContent{
  width: 60%;
  height: 60px;
  margin: 0 auto;
  border: 1px solid #ccc;
  display: flex;
  margin-bottom: 15px;
}
.joinContent .joincontBox{
  flex: 1;
  border: 1px solid #ccc;
  text-align: center;
}
.image{
  position: relative;
  margin-top: 5px;
  border: none;
}
.joinContent div p{
  margin-top: 30px;
}
.lf{
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 45%;
}
.rg{
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 45%;
}
.bgc{
  width:8px;
  height:23px;
  background: #2390ff;
  position: absolute;
  top: 80%;
  right: 46%;
  border-radius: 50%;
}
.activeBgc{
  background: rgba(225, 225, 225, 0.4);
}
#webdeploy .mini-textarea .mini-textbox-border{
  height: 248px;
}
</style>

</head>
<div id="webdeploy">
  <div class="mini-tabs" id="tabControl" activeIndex="1"
style="width: 100%; height: 650px;">
  <div title="实体表">
  <div class="mini-toolbar" style="border-bottom: 0; padding: 0px;">
  <table style="width: 100%;">
  <tr>
  <td style="width: 100%;"><a class="mini-button"
iconCls="icon-add" onclick="addTableRow()" plain="true"
tooltip="增加...">增加</a> <a class="mini-button"
iconCls="icon-remove" onclick="removeTableRow()" plain="true">删除</a>
  </td>
  </tr>
  </table>
  <div id="datagrid" class="nui-datagrid"
style="width: 100%; height: 500px;" url="" idField=""
allowResize="false" pageSize="5" dataField="SamParamExts2"
allowCellEdit="true" allowCellSelect="true" multiSelect="true"
showPager="false" editNextOnEnterKey="true" editNextRowCell="true">
  <div property="columns">
  <div type="comboboxcolumn" field="tableName" headerAlign="center"
allowSort="false" vtype="required">
  表名<input property="editor" class="nui-combobox" textField="text"
valueField="id" reruired="true" style="width: 100%;" onfocus="onfocusShowPoup" onvaluechanged="onValueChanged"
minWidth="150" />
  </div>

  <div type="comboboxcolumn" field="tableAlis" allowSort="false"
renderer="showText" vtype="required">
  表别名<input property="editor" class="nui-textbox" reruired="true" />
  </div>
  </div>
  </div>
  </div>
  <div class="modal-footer">
  <!-- <a class="nui-button nui-button-primary" onclick="generateSQL" id="generateSQL">生成SQL</a> -->
  <a class="nui-button nui-button-primary" onclick="next">下一步</a>
  </div>
  </div>

  <div title="表关系">
  <!-- gojs 流程 -->
<div class="paint" id='myDiagramDiv'></div>
  <!-- 表关联方式 -->
  <div class="jointType">
  <p class='joinTit'>连接方式：</p>
<div class='joinContent'>
  <div class='joinInline joincontBox'>
  <div class='image'>
  <span class='lf'></span>
  <span class='rg'></span>
  <span class='bgc'></span>
  </div>
  <p>内部</p>
  </div>
  <div class='joinLeft joincontBox'>
  <div class='image'>
  <span class='lf' ></span>
  <span class='rg' style="background:#2390ff"></span>
  </div>
  <p>左侧</p>
  </div>
  <div class='joinRight joincontBox'>
  <div class='image'>
  <span class='lf' style="background:#2390ff"></span>
  <span class='rg' ></span>
  </div>
  <p>右侧</p>
  </div>
  <div class='joinOutline joincontBox'>
  <div class='image'>
  <span class='lf' style="background:#2390ff"></span>
  <span class='rg' style="background:#2390ff"></span>
  </div>
  <p>完全外部</p>
  </div>
  </div>
  </div>
  <!-- 表名-字段-条件 -->
  <table style="width: 100%;">
  <tr>
  <td style="width: 100%;"><a class="mini-button"
iconCls="icon-add" onclick="addShipRow()" plain="true"
tooltip="增加...">增加</a> <a class="mini-button"
iconCls="icon-remove" onclick="removeShipRow()" plain="true">删除</a>
  </td>
  </tr>
  </table>
  <div id="datagridShip" class="nui-datagrid"
style="width: 100%; height: 200px;" url="" idField=""
allowResize="false" pageSize="5" dataField="SamParamExts2"
allowCellEdit="true" allowCellSelect="true" multiSelect="true"
showPager="false" editNextOnEnterKey="true" editNextRowCell="true">
  <div property="columns">

  <div type="comboboxcolumn" field="lTableNameUp"
headerAlign="center" allowSort="false" vtype="required">
  左表名<input property="editor" class="nui-combobox" id="lTableName"
textField="text" valueField="id" style="width: 100%;"
minWidth="150" />
  </div>

  <div type="comboboxcolumn" field="lTableFieldUp" allowSort="false"
vtype="required">
  左表字段<input property="editor" id="lTableField" class="nui-combobox" />
  </div>

  <div type="comboboxcolumn" field="operatorUp" allowSort="false"
vtype="required" style="width: 5%;">
  操作<input property="editor" id="operator" class="nui-combobox"
style="width: 5%;" />
  </div>


  <div type="comboboxcolumn" field="rTableNameUp" allowSort="false"
vtype="required">
  右表名<input property="editor" id="rTableName" class="nui-combobox" />
  </div>

  <div type="comboboxcolumn" field="rTableFieldUp" allowSort="false"
vtype="required">
  右表字段<input property="editor" id="rTablefield" class="nui-combobox"/>
  </div>

  <div type="comboboxcolumn" field="numbValueUp" allowSort="false"
renderer="showText" vtype="required">
  数值框<input property="editor" class="nui-textbox" reruired="true" id='numbValueUp'/>
  </div>

  <div type="comboboxcolumn" field="withOrUp" allowSort="false"
vtype="required" style="width: 5%;">
  与/或<input property="editor" id="withOr" class="nui-combobox"
style="width: 5%;" />
  </div>

  <!-- <div type="comboboxcolumn" field="isOrNotUp" allowSort="false"
vtype="required" style="width: 5%;">
  是/否<input property="editor" id="isOrNot" class="nui-combobox"
style="width: 5%;" />
  </div>  -->
  </div>
  </div>
  <div class="modal-footer">
  <!-- <a class="nui-button nui-button-primary" onclick="generateSQL" id="generateSQL">生成SQL</a> -->
  <a class="nui-button nui-button-primary" onclick="last">上一步</a> <a
class="nui-button nui-button-primary" onclick="next">下一步</a>
  </div>
  </div>

  <div title="查询字段">
  <div class="mini-toolbar" style="border-bottom: 0; padding: 0px;">
  <table style="width: 100%;">
  <tr>
  <td style="width: 100%;"><a class="mini-button"
iconCls="icon-add" onclick="addSelectRow()" plain="true"
tooltip="增加...">增加</a> <a class="mini-button"
iconCls="icon-remove" onclick="removeSelectRow()" plain="true">删除</a>
  </td>
  </tr>
  </table>
  <div id="datagridSelect" class="nui-datagrid"
style="width: 100%; height: 500px;" idField="elementId"
textField="" allowResize="elementName" pageSize="5"
dataField="tables" allowCellEdit="true" allowCellSelect="true"
multiSelect="true" showPager="false" editNextOnEnterKey="true"
editNextRowCell="true">
  <div property="columns">

  <div type="comboboxcolumn" field="tableNameUp"
headerAlign="center" allowSort="false" vtype="required">
  表名<input property="editor" id="tableName" class="nui-combobox"
style="width: 100%;" minWidth="150" />
  </div>

  <div type="comboboxcolumn" field="fieldNameUp" allowSort="false"
vtype="required">
  字段名<input property="editor" id="fieldName" class="nui-combobox"
textField="text" valueField="id" />
  </div>

  <div type="comboboxcolumn" field="fieldAlisUp" allowSort="false"
renderer="showText" vtype="required">
  别名<input property="editor" class="nui-textbox" id="fieldAlis" />
  </div>
  </div>
  </div>

  </div>
  <div class="modal-footer">
  <!-- <a class="nui-button nui-button-primary" onclick="generateSQL" id="generateSQL">生成SQL</a> -->
  <a class="nui-button nui-button-primary" onclick="last">上一步</a> <a
class="nui-button nui-button-primary" onclick="next">下一步</a>
  </div>
  </div>

  <div title="SQL">
  <input property="editor" allowInput="false" id="SQLArea"
class="nui-textarea" style="width: 100%; height: 250px; "
minHeight="250"  />


  <div class='previewFrom' style="width: 100%; height: 300px;" minHeight="300" >
  <div id="datagrid1" class="mini-datagrid" style="width:100%;height:250px;"
idField="id" allowResize="false"
sizeList="[20,30,50,100]" pageSize="20"
showHeader="false"
onmouseup="return datagrid1_onmouseup()">
  <div property="columns">
  <div type="indexcolumn" ></div>
  <!--  <div field="loginname" width="120" headerAlign="center" allowSort="true">员工帐号</div>
  <div field="name" width="120" headerAlign="center" allowSort="true">姓名</div>
  <div field="gender" width="100" renderer="onGenderRenderer" align="center" headerAlign="center">性别</div>
  <div field="salary" numberFormat="¥#,0.00" align="right" width="100" allowSort="true">薪资</div>
  <div field="age" width="100" allowSort="true" decimalPlaces="2" dataType="float">年龄</div>    -->
  </div>
  </div>
  </div>


  <div class="modal-footer">
  <a class="nui-button nui-button-primary" onclick="last">上一步</a> <a
class="nui-button nui-button-primary" onclick="generateSQL"
id="generateSQL">生成SQL</a> <a class="nui-button nui-button-primary"
onclick="save">保存</a> <a class="nui-button nui-button-primary"
onclick="preview">预览</a>
  </div>
  </div>
  </div>
  </div>
  <div id="nodedeploy" style="display: none">
  <div class="input-label-form" style="padding-top: 10px">
  <table id="pubServiceForm">
  <tr>
  <td class="nui-form-label"><label>所属节点名称：</label></td>
<td><input class="nui-combobox nui-form-small" id="nodename" textField="name" valueField="id" dataField="code" showNullItem="false" enabled="false"
reruired="true" name="samservice.appName"/></td>
  <td class="nui-form-label"><label>所属系统名称：</label></td>
<td><input class="nui-combobox nui-form-small" id="sysname"
textField="name" valueField="id" dataField="code" reruired="true"
onitemclick="onSysClick" name="samservice.appCode" /></td>
  </tr>
  <tr>
  <td class="nui-form-label"><label>服务名称：</label></td>
<td><input class="nui-textbox nui-form-small" id="serviceName" required="true"
name="samservice.serviceName" /></td>
  <td class="nui-form-label"><label>服务编码：</label></td>
<td><input id="serviceCode" class="nui-textbox nui-form-small" required="true"
onvaluechanged="onServiceClick" name="samservice.serviceCode" /></td>
  </tr>
  <tr>
  <td class="nui-form-label"><label>操作名称：</label></td>
<td><input id="opName" class="nui-textbox nui-form-small" required="true"
name="samservice.operationName" /></td>
  <td class="nui-form-label"><label>操作编码：</label></td>
<td><input id="opCode" class="nui-textbox nui-form-small" required="true"
name="samservice.operationCode" /></td>
  </tr>
  </table>
  <!-- <table>
  <tr>
  <td class="nui-form-label"><label>服务协议类型：</label></td>
<td>
<input name="parentnodename" class="nui-textbox nui-form-small" />
  </td>
  <td class="nui-form-label"><label>服务类型：</label></td>
<td>
<input name="parentnodecode" class="nui-textbox nui-form-small" />
  </td>
  </tr>
  <tr>
  <td class="nui-form-label"><label>服务器：</label></td>
<td>
<input name="resourcetree.resourceName" class="nui-textbox nui-form-small"  />
  </td>
  <td class="nui-form-label"><label>代理URL:</label></td>
<td>
<input name="resourcetree.resourceCode" class="nui-textbox nui-form-small" />
  </td>
  </tr>
  <tr>
  <td class="nui-form-label"><label>业务URL:</label></td>
<td>
<input name="resourcetree.resourceName" class="nui-textbox nui-form-small"  />
  </td>
  <td class="nui-form-label"><label>发布URL:</label></td>
<td>
<input name="resourcetree.resourceCode" class="nui-textbox nui-form-small" />
  </td>
  </tr>
  </table> -->
  <div class="modal-footer">
  <a class="nui-button nui-button-primary" onclick="publishService"
id="publishService">发布服务</a> <a
class="nui-button nui-button-primary" onclick="lastStep"
id="lastStep">上一步</a> <a class="nui-button nui-button-primary"
onclick="nextStep">下一步</a>
  </div>
  </div>
  </div>
  <div id="servicedeploy" style="display: none">
  <div class="input-label-form" style="padding-top: 10px">
  <table id="servicePub" style="height:590px">
  <tr>
  <td class="nui-form-label"><label>服务访问地址：</label></td>
<td><input id="serviceUrl" name="samservice.serviceUri"
class="nui-textbox nui-form-large" enabled="false" /> <a
class="nui-button nui-button-primary" onclick="copyUrl">复制地址</a></td>

</tr>
<tr>
<td class="nui-form-label"><label>服务访问类型：</label></td>
<td><input  value="get" class="nui-textbox nui-form-large"
enabled="false" /></td>

  </tr>
  <tr>
  <td class="nui-form-label"><label>请求参数说明：</label></td>
<td><input id="paramid" name="samservice.serviceParamDesc"
class="nui-textarea nui-form-large" style="height:80px"/></td>

  </tr>
  <tr>
  <td class="nui-form-label"><label>请求参数详细格式：</label></td>
<td><input id="paramdetail"  name="samservice.serviceParamFormat" style="height:80px"
class="nui-textarea nui-form-large" /></td>

  </tr>
  <tr>
  <td class="nui-form-label"><label>返回值说明：</label></td>
<td><input id="returnid" name="samservice.serviceReturnValueDesc" style="height:80px"
class="nui-textarea nui-form-large"/></td>

  </tr>
  <tr>
  <td class="nui-form-label"><label>返回值详细格式：</label></td>
<td><input id="returndetail" name="samservice.serviceReturnValueFormat" style="height:80px"
class="nui-textarea nui-form-large" /></td>

  </tr>
  <tr>
  <td class="nui-form-label"><label>服务描述：</label></td>
<td><input name="samservice.serviceDesc"
class="nui-textarea nui-form-large" style="height:80px"/></td>

  </tr>
  </table>
  <div class="modal-footer">
  <a class="nui-button nui-button-primary" onclick="complete">完成</a>
  </div>
  </div>

  </div>
  <body>
  <script type="text/javascript">

var publishResult = false;
nui.parse();
var pageParams = {};
$("#nodedeploy").hide();
var tab = nui.get("tabControl");



var grid = nui.get("datagrid");
var gridShip = nui.get("datagridShip");
var gridSelect = nui.get("datagridSelect");
var SQLArea=nui.get("SQLArea");
var appCodeItem;
function addTableRow() {
  var newRow = { name: "New Row" };
  grid.addRow(newRow, 0);
  grid.beginEditCell(newRow, "LoginName");
}
function removeTableRow() {
  var rows = grid.getSelecteds();
  if (rows.length > 0) {
    grid.removeRows(rows, true);
  }
}


var operators=[{id:"=",text:"="},{id:">",text:">"},{id:"<",text:"<"},{id:"<=",text:"<="},{id:">=",text:">="},{id:"<>",text:"<>"}];

// 表关系新增while 查询条件

var isOrNots=[{id: '0', text: '是'}, {id: '1', text: '否'}]; // 是否
var withOrs =[{id: '0', text: '与'}, {id: '1', text: '或'}]; // 与或

//缓存实体/后台传来的所有的表数据/后台传来的所有字段数据
var entity=null;
var entityId;
var tablesQueryed=null;
var fieldsQueryed=null;
var tabControl=nui.get("tabControl");

//下拉框表数据
var tablesQueryedOutter=null;
//表id->表名称缓存
var tablesMap=null;
//表id->表别名缓存
var tablesAliasMap=null;
//下拉框的字段缓存
var fieldsQueryedOutter=null;
//字段id—>字段名称缓存
var fieldsMap=null;

var nodeId;

//将要传往后台进行存储的数据
var willSavedRefTables=null;
var willSavedRefFields=null;
var willSavedFields=null;

var finalFieldsOutter=null;

var serviceUrl = null;

function next() {
  var tabIndex  = tab.getActiveTab()._id;
  tab.activeTab(tabIndex++)
}

function last() {
  var tabIndex  = tab.getActiveTab()._id;
  console.log(tabIndex)
  tab.activeTab(tabIndex-2)
}

function lastStep() {
  $("#webdeploy").show();
  $("#nodedeploy").hide();
  $("#servicedeploy").hide();
}
function nextStep() {
  if(publishResult) {
    $("#webdeploy").hide();
    $("#servicedeploy").show();
    $("#nodedeploy").hide();
    nui.get('#paramid').setValue("authparam<消费方认证参数>，以header方式传输 \ncondparam<过滤数据参数>，以header方式传输 \npageparam<分页参数>，以header方式传输\nfieldparam<字段参数>，以header方式传输");
    nui.get('#returnid').setValue("返回response\nResponseCode:\n200：成功，并返回详细信息，详见返回值详细格式\n400：请求失败，并返回失败原因格式{\"errormsg\":\"异常原因\"}");
    nui.get('#paramdetail').setValue("authparam:<消费方认证参数,{\"user\":\"消费方用户名\",\"password\":\"密码[加密]\",\"X-Forwarded-For\":\"消费方IP\"，\"ClientId\":\"消费方系统标识\",\"OperationCode\":\"请求操作编码\"}>\ncondparam:<过滤数据参数，{\"字段1\":\"字段1值\",\"字段1_ope\":\"字段1操作符\",\"字段2\":\"字段2值\",\"字段2_ope\":\"字段2操作符\" ,……}>\npageparam:<分页参数，{\"page\":\"页数\",\"rows\":\"行数\"}>\nfieldparam:<字段参数，字段1,字段2,字段3,字段4>");
    nui.get('#returndetail').setValue("{\n\"data\":[{\n\"字段1别名\": \"<字段1值>\",\n\"字段2别名\":\"<字段2值>\",\n\"字段3别名\": \"<字段3值>\",\n\"字段4别名\": \"<字段4值>\",\n……\n},{\n\"字段1别名\": \"<字段1值>\",\n\"字段2别名\":\"<字段2值>\",\n\"字段3别名\": \"<字段3值>\",\n\"字段4别名\": \"<字段4值>\",\n……\n},{\n\"字段1别名\": \"<字段1值>\",\n\"字段2别名\":\"<字段2值>\",\n\"字段3别名\": \"<字段3值>\",\n\"字段4别名\": \"<字段4值>\",\n……\n},\n……] ,\n\"count\":\"<总条数>\",\n\"page\":\"<页数>\",\n\"rows\":\"<每页条数>\"\n}");
    console.log(window.parent.document.getElementById("publishWeb"))
  } else{
    nui.alert('请先发布服务！')
  }

}
function lastStep1() {
  $("#webdeploy").hide();
  $("#servicedeploy").hide();
  $("#nodedeploy").show();
}

function publishService() {
  console.log(appCodeItem);
  var pubForm = new nui.Form("#pubServiceForm");
  var pubFormData = pubForm.getData(false, true);
  console.log(nui.get("sysname").getData());
  pubFormData.samservice.appName = nui.get("nodename").getText();
  pubFormData.samservice.appCode = appCodeItem.code;
  pubFormData.samservice.parentId = appCodeItem.id;
  pubFormData.samservice.serviceCode = nui.get("serviceCode").getValue();
  pubFormData.samservice.serviceType = "2";
  pubFormData.samservice.sourceType = "5";
  pubFormData.samservice.classification = "3";
  pubFormData.resourceId = nodeId;
  pubFormData.entityInputId = entity.entityId;
  var formData = {samoperation:{}};
  formData.samoperation.classification = pubFormData.samservice.classification;
  formData.samoperation.domainCode = nui.get("nodename").getData()[0].code;
  formData.samoperation.operationCode = nui.get("opCode").getValue();
  formData.samoperation.operationName = nui.get("opName").getValue();
  formData.samoperation.operationDesc = "";
  formData.samoperation.samServiceCode = pubFormData.samservice.serviceCode;
  formData.samoperation.samServiceName = pubFormData.samservice.serviceName;
  formData.samoperation.service_versions = "";
  /**
   classification: "3"
   domainCode: "ServicePublish"
   operationCode: "ServicePublish.mysql.mysqlSingle.ss"
   operationDesc: ""
   operationName: "操作超时"
   parentId: "141"
   samServiceCode: "ServicePublish.mysql.mysqlSingle"
   samServiceName: "mysql单表"
   service_versions: ""
   */
  nui.ajax({
    url : "com.primeton.dsp.resfolder.serviceconfig.impl.serviceconfig.addServiceBeforePublish.biz.ext",
    cache : false,
    data : pubFormData,
    async : false,
    success : function (text){
      if(text.retErrorMsg) {
        nui.alert(text.retErrorMsg)
      }else{
        nui.ajax({
          url: "com.primeton.esb.sam.operation.samoperationtree.addOperation.biz.ext",
          cache : false,
          data : formData,
          success : function(d){
            e.source.setEnabled(true);
            e.source.setIconCls(icon);
            if(-1 == d.iRtn){
              showMessage("插入失败");
              return;
            }else if (0 == d.iRtn){
              showMessage("插入成功");
              return;
            }
          },
          error: function() {
            e.source.setEnabled(true);
            e.source.setIconCls(icon);
          }
        });
        nui.alert("服务发布成功");
        serviceUrl = text.retUrl;
        nui.get("serviceUrl").setValue(serviceUrl)
        publishResult = true;
        nui.get("publishService").hide();
        nui.get("lastStep").hide();
      }
    },
    error: function() {
      nui.alert('增加服务失败')
    }
  });
}
function copyUrl() {

  var content = nui.get("serviceUrl").getValue();
  var input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', content);
  input.select();

  if (document.execCommand('copy')) {
    document.execCommand('copy');
    nui.alert("复制服务访问地址成功！")
  }
  document.body.removeChild(input);

}

function complete() {
  var servicePub = new nui.Form("#servicePub");
  var servicePubData = servicePub.getData(false, true);
  servicePubData.samservice.serviceCode = nui.get("serviceCode").getValue();
  nui.ajax({
    url : "com.primeton.dsp.resfolder.controller.WebResourceBiz.updateServiceDetail.biz.ext",
    cache : false,
    data : servicePubData,
    async : false,
    success : function (text){
      if(text.retErrorMsg) {
        nui.alert(text.retErrorMsg)
      }else{
        window.CloseOwnerWindow();
      }
    },
    error: function() {
      nui.alert('增加服务失败')
    }
  });
}

grid.on("cellbeginedit", function(e) {
  if(e.editor.type=='combobox'){
    e.editor.setData(tablesQueryedOutter);
  }
});

gridShip.on("cellbeginedit", function(e) {
  console.log(e, '什么时间触发')
  if(e.editor.type=='combobox'){
    if(e.editor.id=='lTableField'){
      var record=e.record;
      if(record.lTableNameUp){
        var tableId=record.lTableNameUp;
        e.editor.setData(getFields(tableId));
      }
    }else if(e.editor.id=='operator'){
      e.editor.setData(operators);
    }else if(e.editor.id=='rTablefield'){
      var record=e.record;
      if(record.rTableNameUp){
        var tableId=record.rTableNameUp;
        e.editor.setData(getFields(tableId));
      }
    } else if (e.editor.id=='isOrNot') {
      e.editor.setData(isOrNots);
    } else if (e.editor.id=='withOr') {
      e.editor.setData(withOrs);
    } else{
      e.editor.setData(tablesQueryedOutter);
    }
  }
});

gridSelect.on("cellbeginedit", function(e) {
  if(e.editor.type=='combobox'){
    if(e.editor.id=='tableName'){
      e.editor.setData(tablesQueryedOutter);
    }else if(e.editor.id=='fieldName'){
      var record=e.record;
      if(record.tableNameUp){
        var tableId=record.tableNameUp;
        e.editor.setData(getFields(tableId));
      }
    }
  }
});
function setData(data){
  entity = data;
  console.log(entity)
  selectServiceType(data);
  getEntityInfo(data)
}

function selectServiceType(data) {
  setTimeout(function () { console.log(data.serviceType) }, 3000)
  if (!data.serviceType) {
    $("#webdeploy").hide();
    $("#nodedeploy").show();
    $("#servicedeploy").hide();
    $("#lastStep").hide();
  } else {
    $("#webdeploy").show();
    $("#nodedeploy").hide();
    $("#servicedeploy").hide();
    // gojs 初始化
    gojsInit()
  }
  nui.ajax({
    url: "com.primeton.dsp.resfolder.controller.WebResourceBiz.queryDomainCode4Entity.biz.ext",
    data: { entity: { parentEntityId: entity.entityId } },
    cache: false,
    success: function (data) {
      console.log(data)
      var nodename = nui.get('nodename');
      var comboxData = [];

      if (data.domain) {
        comboxData.push({ name: data.domain.domainName, id: data.domain.domainId, code: data.domain.domainCode })

        nodename.load(comboxData)
        nodename.setValue(data.domain.domainId)
        nodeId = data.domain.domainId;
        var sysnameCombo = nui.get('sysname');
        nui.ajax({
          url: "com.primeton.dsp.resfolder.controller.ResourceTreeViewBiz.queryChildren.biz.ext",
          data: { id: nodeId, others: { dbCategory: true }, parent: { id: nodeId, type: "3", dataArea: "3" } },
          cache: false,
          success: function (data) {
            var comboxData = [];
            console.log(data);
            data.result.data.map(function (value) {
              comboxData.push({ name: value.name, id: value.id, code: value.code })
            })
            sysnameCombo.load(comboxData)
          },
          error: function (e) {
            nui.alert(e);
          }
        });
      }else{
        nui.alert("请先分配资源!","成功",window.CloseOwnerWindow);

      }

    },
    error: function (e) {
      nui.alert(e);
    }
  });
}

function onNodeChanged(e) {
  nui.parse();

  var nodenameCombo = nui.get('nodename');
  var sysnameCombo = nui.get('sysname');
  nodeId = nodenameCombo.getValue();
  console.log(nodeId)
  nui.ajax({
    url: "com.primeton.dsp.resfolder.controller.ResourceTreeViewBiz.queryChildren.biz.ext",
    data: {id:nodeId,others:{dbCategory:true},parent:{id:nodeId,type:"3",dataArea:"3"}},
    cache: false,
    success: function (data) {
      var comboxData = [];
      console.log(data);
      data.result.data.map(function(value){
        comboxData.push({name:value.name,id:value.id,code:value.code})
      })
      sysnameCombo.load(comboxData)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      nui.alert("数据实体关系保存失败！");
    }
  });
  nui.get("serviceCode").setValue("")
}

function onSysClick(e) {
  appCodeItem = {};
  appCodeItem = e.item;
  nui.get("serviceCode").setValue(e.item.code+'.');
}
function onServiceClick(e){
  nui.parse();
  var code = nui.get("serviceCode");
  console.log(e);
  nui.get("opCode").setValue(code.getValue() +'.');
}
function getFields(tableId){
  console.log(fieldsQueryedOutter,'jkjkjkk', tableId)
  return fieldsQueryedOutter.get(tableId);
}
function getAllFields(){
  return finalFieldsOutter;
}
//解析查询到的数据 进行结构化缓存
function buildControls(){
  var tablesQueryedIn=[];
  var tablesMapIn=new Map();
  var fieldsMapIn=new Map();
  var fieldsQueryedIn=new Map();
  var finalFieldsIn=[];
  console.log(tablesQueryed, '00000000');
  for(var i=0;i<tablesQueryed.length;i++){
    var fieldsArr=[];
    tablesQueryedIn.push({id:tablesQueryed[i].elementId,text:tablesQueryed[i].instanceCode});
    tablesMapIn.set(tablesQueryed[i].elementId,tablesQueryed[i].instanceCode);
    fieldsArr=fieldsQueryed[tablesQueryed[i].elementId];
    var fieldsTemp=[];
    console.log(fieldsArr, '元数据')
    for(var j=0;j<fieldsArr.length;j++){
      var newField={id:fieldsArr[j].instanceId,text:fieldsArr[j].instanceName};
      fieldsMapIn.set(fieldsArr[j].instanceId,fieldsArr[j].instanceName);
      fieldsTemp.push(newField);
      finalFieldsIn.push(newField);
    }
    fieldsQueryedIn.set(tablesQueryed[i].elementId,fieldsTemp);
  }
  tablesQueryedOutter=tablesQueryedIn;
  fieldsQueryedOutter=fieldsQueryedIn;
  tablesMap=tablesMapIn;
  fieldsMap=fieldsMapIn;
  finalFieldsOutter=finalFieldsIn;
}





function addShipRow() {
  var newRow = { name: "New Row" };
  gridShip.addRow(newRow, 0);
  gridShip.beginEditCell(newRow, "LoginName");
}
function removeShipRow() {
  var rows = gridShip.getSelecteds();
  if (rows.length > 0) {
    gridShip.removeRows(rows, true);
  }
}

function addSelectRow() {
  var newRow = { name: "New Row"};
  gridSelect.addRow(newRow, 0);
  gridSelect.beginEditCell(newRow, "LoginName");
}
function checkData(){
  var rowDatas = gridSelect.getData(false, true);
  if(rowDatas.length > 0){
    for(var i=0;i<rowDatas.length;i++){
      if("" == rowDatas[i].fieldAlisUp || "" == rowDatas[i].fieldNameUp || "" == rowDatas[i].tableNameUp ||
        null == rowDatas[i].fieldAlisUp || null == rowDatas[i].fieldNameUp || null == rowDatas[i].tableNameUp){
        nui.alert("请检查已增加单元格表名、字段名、别名数据完整性！");
        return '1';
      }
    }
  }
}
function addSelectRow(i) {
  var t = checkData();
  if('1' == t) return;
  var name="NewRow"+i;
  var newRow = {name:name};
  gridSelect.addRow(newRow, 0);
  gridSelect.beginEditCell(newRow, "LoginName");
  return newRow;
}
function removeSelectRow() {
  var rows = gridSelect.getSelecteds();
  if (rows.length > 0) {
    gridSelect.removeRows(rows, true);
  }
}

function cancel(e) {
  if (window.CloseOwnerWindow) {
    return window.CloseOwnerWindow("ok");
  } else {
    window.close();
  }
}

function getEntityInfo(entity){
  console.log(1111111)
  nui.ajax({
    url: "com.primeton.dsp.resfolder.serviceconfig.impl.serviceconfig.queryEntityInfo.biz.ext",
    data: {entity:entity },
    cache: false,
    success: function (data) {
      console.log(data, 'ajax')
      if(data.entityInfo.fields ){
        fieldsQueryed=data.entityInfo.fields;
      }
      if(data.entityInfo.tables){
        tablesQueryed=data.entityInfo.tables;
      }
      buildControls();
      if(data.refTables){
        renderRefTables(data);
      }
      if(data.refFields){
        //renderRefField(data); // 首次加载默认数据
      }
      if(data.fields){
        renderFields(data);
      }
      if(data.entityRes){
        if(data.entityRes[0].entitySql){
          SQLArea.setValue(data.entityRes[0].entitySql);
          tabControl.activeTab(3);
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
}
function renderRefTables(data){
  var waitRender=[];
  var datas=data.refTables;
  for(var i=0;i<datas.length;i++){
    addTableRow();
    var editor=grid.getCellEditor(0,i+1);
    editor.setData(tablesQueryedOutter);
    var indexVar=datas[i];
    var a={tableName:indexVar.tableid,tableAlis:indexVar.aliasname};
    waitRender.push(a);
  }
  grid.setData(waitRender);
}
function renderRefField(data){
  var waitRender=[];
  var datas=data.refFields;
  for(var i=0;i<datas.length;i++){
    addShipRow();
    var indexVar=datas[i];
    if(i==0){
      var editor=gridShip.getCellEditor(0,i);
      editor.setData(tablesQueryedOutter);
      var editor1=gridShip.getCellEditor(3,i);
      editor1.setData(tablesQueryedOutter);
      var editor2=gridShip.getCellEditor(1,i);
      editor2.setData(getAllFields());
      var editor3=gridShip.getCellEditor(4,i);
      editor3.setData(getAllFields());
      var editor4=gridShip.getCellEditor(2,i);
      editor4.setData(operators);
    }
    console.log(indexVar)
    var a={lTableNameUp:indexVar.ltableid,lTableFieldUp:indexVar.lfieldid,operatorUp:indexVar.oper,rTableNameUp:indexVar.rtableid,rTableFieldUp:indexVar.rfieldid};
    waitRender.push(a);
  }
  gridShip.setData(waitRender);
}
function renderFields(data){
  var waitRender=[];
  var datas=data.fields;
  for(var i=0;i<datas.length;i++){
    var indexVar=datas[i];
    if(i==0){
      var editor=gridSelect.getCellEditor(0,0);
      editor.setData(tablesQueryedOutter);
      var editor1=gridSelect.getCellEditor(1,0);
      var tDatas=getAllFields();
      editor1.setData(tDatas);
    }
    var a={tableNameUp:indexVar.tableid,fieldNameUp:indexVar.fieldid,fieldAlisUp:indexVar.aliasname};
    waitRender.push(a);
  }
  gridSelect.setData(waitRender);
}

function generateSQL(){
  grid.selectAll();
  gridShip.selectAll();
  gridSelect.selectAll();
  var allTables=grid.getSelecteds(); // 实体表
  var allShows=gridSelect.getSelecteds(); // 查询字段
  var allConditions=gridShip.getSelecteds(); // 表关系
  console.log(allTables, allShows, allConditions, 'kkkkkkk');
  //删除模式
  if(allTables.length==0 && allShows.length==0 && allConditions.length==0 ){
    entity.entitySql="";
    SQLArea.setValue(entity.entitySql);
    tabControl.activeTab(3);
    nui.alert("请检查表单完整性！");
    return true;
  }
  var tables=buildTables(allTables);
  var shows=buildShows(allShows);
  var condition=buildCondition(allConditions);
  if(!tables || !shows || !condition){
    SQLArea.setValue("");
    nui.alert("请检查表单完整性！");
    return false;
  }
  tabControl.activeTab(3);
  var SQL="SELECT  \n  "+shows+"  \n  FROM  \n "+tables+"  \n  WHERE \n "+condition;
  entity.entitySql=SQL;
  SQLArea.setValue(SQL);
  return true;
}

//生成refTables数组数据对象
function buildTables(datas){
  var tablesAliasMapIn=new Map();
  var willSavedRefTablesIn=[];
  var res="";
  for(var i=0;i<datas.length;i++){
    var tableId=datas[i].tableName;
    var alias=datas[i].tableAlis;
    if(!tableId || !alias){
      return null;
    }
    tablesAliasMapIn.set(tableId,alias);
    willSavedRefTablesIn.push({parentEntityId:entity.entityId,tableid:tableId,aliasname:alias});
    if(i!=datas.length-1){
      res+="     "+tablesMap.get(tableId)+"    "+alias+",  \n ";
    }else{
      res+="     "+tablesMap.get(tableId)+"    "+alias+"  \n ";
    }
  }
  tablesAliasMap=tablesAliasMapIn;
  willSavedRefTables=willSavedRefTablesIn;
  return res;
}


function buildShows(datas){
  var willSavedFieldsIn=[];
  var res="";
  for(var i=0;i<datas.length;i++){
    var item=datas[i];
    if(!item.tableNameUp || !item.fieldNameUp || !item.fieldAlisUp){
      return null;
    }
    willSavedFieldsIn.push({parentEntityId:entity.entityId,tableid:item.tableNameUp,fieldid:item.fieldNameUp,fieldname:fieldsMap.get(item.fieldNameUp),aliasname:item.fieldAlisUp});
    if(i!=datas.length-1){
      res+="     "+tablesAliasMap.get(item.tableNameUp)+"."+fieldsMap.get(item.fieldNameUp)+"   AS   "+item.fieldAlisUp+",  \n ";
    }else{
      res+="      "+tablesAliasMap.get(item.tableNameUp)+"."+fieldsMap.get(item.fieldNameUp)+"   AS   "+item.fieldAlisUp+"  \n ";
    }
  }
  willSavedFields=willSavedFieldsIn;
  return res;
}

function buildCondition(datas){
  var willSavedRefFieldIn=[];
  var res="";
  for(var i=0;i<datas.length;i++){
    var item=datas[i];
    var ltField=item.lTableFieldUp;
    var ltID=item.lTableNameUp;
    var operator=item.operatorUp;
    var rtID=item.rTableNameUp;
    var rtField=item.rTableFieldUp;
    if(!ltField || !ltID || !operator || !rtID || !rtField){
      return null;
    }
    var lAlias=tablesAliasMap.get(ltID);
    var rAlias=tablesAliasMap.get(rtID);
    willSavedRefFieldIn.push({parentEntityId:entity.entityId,ltableid:ltID,laliasname:lAlias,lfieldid:ltField,oper:operator,rtableid:rtID,raliasname:rAlias,rfieldid:rtField});
    if(i==0){
      res+="      "+tablesAliasMap.get(ltID)+ "." +fieldsMap.get(ltField)+" "+ operator +" "+ tablesAliasMap.get(rtID) +"."+ fieldsMap.get(rtField) +"  \n  ";
    }else{
      res+="       AND  "+tablesAliasMap.get(ltID)+ "." +fieldsMap.get(ltField)+" "+ operator +" "+ tablesAliasMap.get(rtID) +"."+ fieldsMap.get(rtField) +" \n ";
    }
  }
  willSavedRefFields=willSavedRefFieldIn;
  return res;
}

function save(){
  if(!generateSQL()){
    return;
  }
  nui.ajax({
    url: "com.primeton.dsp.resfolder.serviceconfig.impl.serviceconfig.saveServiceConfig.biz.ext",
    data: {entity:entity,entityRefTables:willSavedRefTables,entityRefFields:willSavedRefFields,entityFields:willSavedFields},
    cache: false,
    success: function (data) {
      if(data.success){
        nui.alert("数据实体关系保存成功！");
        $("#webdeploy").hide();
        $("#nodedeploy").show();
        $("#servicedeploy").hide();

      }else{
        nui.alert("数据实体关系保存失败！");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      nui.alert("数据实体关系保存失败！");
    }
  });
}
var selectFromId = [];
function onValueChanged (e) {
  console.log(e, 'xiala')
  console.log($('#myDiagramDiv'))
  //if (!selectFromId.inclouds(e.selected.id)) {
  var obj = {
    id: e.selected.id,
    text: e.selected.text
  }
  drawCanvas(obj)
  //}

}

function onfocusShowPoup (e) {
  console.log(e, 'fouce')

}

// gojs
var myDiagram = null;
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
  console.log(myDiagram, 'myDiagram')
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
  myDiagram.model = G(go.GraphLinksModel);

  //if(fn) fn();
}
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
    id = selectObj.id,
    name = selectObj.text,
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
      to: selectObj.text,
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
    key: selectObj.text,
    id: id,
    name: selectObj.text,
    color: borderColor[num]
  });
  count++;
  tableList.push(_selectObj);
}




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

function showSmallPorts(node, show) {
  node.ports.each(function(port) {
    if (port.portId !== "") {  // don't change the default port, which is the big shape
      port.fill = show ? "rgba(0,0,0,.3)" : null; // 显示隐藏对象的内部连接点
    }
  });
}

var joinType = 'inner_join';
$('.joinContent div').click(function () {
  console.log($(this).index())
  var activeIndex = $(this).index()
  switch (activeIndex) {
    case 0:
      joinType = 'inner_join'
      break;
    case 1:
      joinType = 'left_join'
      break;
    case 2:
      joinType = 'right_join'
      break;
    case 3:
      joinType = 'full_out_join'
      break;
  }
  $(this).addClass('activeBgc').siblings().removeClass('activeBgc')
})









"SELECT usersate_201902.REMARK, usersate_201902.TELNUM, usersate_201902.USRSCORE, usersate_201902.USRSTATE, userprod_201902.PRODBRAND, userprod_201902.REMARK, userprod_201902.TELNUM FROM USERSATE_201902 AS usersate_201902 INNER JOIN USERPROD_201902 AS userprod_201902 ON usersate_201902.TELNUM = userprod_201902.TELNUM WHERE userprod_201902.PRODBRAND = 'sfer'"



























// 预览回调
function preview () {
  console.log('预览表格')
  var previewGrid = nui.get("datagrid1");
  var columns = [
    {field: 'loginname', header: '这个'},
    {field: 'name', header: '姓名'},
    {field: 'gender', header: '性别'},
    {field: 'salary', header: '年龄'}
  ];
  var data = [
    {loginname: 123, name: 'zhangsan', gender: '男', salary: '23'},
    {loginname: 123, name: 'zhangsan', gender: '男', salary: '23'},
    {loginname: 123, name: 'zhangsan', gender: '男', salary: '23'},
    {loginname: 123, name: 'zhangsan', gender: '男', salary: '23'},
    {loginname: 123, name: 'zhangsan', gender: '男', salary: '23'}
  ];
  previewGrid.setColumns(columns);
  previewGrid.setData(data);
}

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
  }
]
}










