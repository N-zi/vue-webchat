webpackJsonp([26],{VoEw:function(e,t){},ele8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("mvHQ"),s=n.n(a),i=n("gyMJ"),o={name:"photoWall",data:function(){return{IMG_URL:"",coverList:[]}},components:{vApheader:n("XOnc").default},methods:{getCover:function(){var e=this,t={id:this.$route.params.id};i.a.getUserInfo(t).then(function(t){0===t.code&&(e.coverList=t.data.cover)})},fileChange:function(){var e=this,t=this.$refs.imgFile.files[0];if(!(t.size/1024/1024<1))return this.$message.error("图片大小不能超过 1MB!"),void(this.$refs.wallpaperFile.value="");var n=new FormData;n.append("f",t),i.a.uploadFile(n).then(function(t){if(0===t.code){var n=JSON.parse(s()(e.coverList));n.push(t.data),i.a.upUserInfo({cover:n}).then(function(n){0===n.code?(e.coverList.push(t.data),e.$message({message:"上传成功",type:"success"})):e.$message({message:"上传失败",type:"warning"})})}else e.$message({message:"上传失败",type:"warning"})}),this.$refs.imgFile.value=""},del:function(e){var t=this;this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n=t.coverList.filter(function(t){return t!==e});i.a.upUserInfo({cover:n,unlink:e}).then(function(e){0===e.code?(t.coverList=n,t.$message({type:"success",message:"删除成功!"})):t.$message({type:"warning",message:"删除失败!"})})}).catch(function(){})}},mounted:function(){this.getCover()}},r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vchat-photoWall"},[n("v-apheader",{attrs:{title:"照片墙",back:"-1"}}),e._v(" "),n("ul",{staticClass:"photoWall-ul"},[e._l(e.coverList,function(t,a){return n("li",{key:a,style:{backgroundImage:"url("+e.IMG_URL+t+")"}},[n("i",{staticClass:"el-icon-circle-close-outline icon",on:{click:function(n){return e.del(t)}}})])}),e._v(" "),e.coverList.length<6?n("li",{staticClass:"upload-li"},[n("i",{staticClass:"el-icon-plus"}),e._v(" "),n("input",{ref:"imgFile",attrs:{type:"file",accept:"image/png, image/jpeg, image/gif, image/jpg"},on:{change:e.fileChange}})]):e._e()],2),e._v(" "),n("span",[e._v("最多可设置6张")])],1)},staticRenderFns:[]};var c=n("VU/8")(o,r,!1,function(e){n("VoEw")},"data-v-33f534a7",null);t.default=c.exports}});