webpackJsonp([32],{Q16x:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Dd8w"),s=a.n(r),n=(a("gyMJ"),a("XOnc")),i=a("NYxO"),o=a("oAV5"),u=a.n(o),d={name:"applyFriend",data:function(){return{introduce:""}},computed:s()({},Object(i.c)(["user","Vchat"])),components:{vApheader:n.default},methods:{send:function(){var e=JSON.parse(localStorage.friend),t={name:this.user.name,mes:this.introduce,time:u.a.formatTime(new Date),avatar:this.user.photo,nickname:this.user.nickname,signature:this.user.signature,read:[],userM:this.user.id,userY:this.$route.params.id,userYname:e.userYname,userYphoto:e.userYphoto,userYloginName:e.userYloginName,friendRoom:this.user.id+"-"+this.$route.params.id,roomid:this.$route.params.id+"-"+this.Vchat.id.split("-")[1],state:"friend",type:"validate",status:"0"};this.$socket.emit("sendValidate",t),this.$router.push({name:"sendFriendValidate",query:{name:"searchFriend"}})}},mounted:function(){}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vchat-apply"},[a("v-apheader",{attrs:{title:"验证信息",back:"-1"}},[a("span",{on:{click:e.send}},[e._v("发送")])]),e._v(" "),a("el-form",{staticClass:"introduceForm",attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"个人介绍"}},[a("el-input",{attrs:{placeholder:"请输入不超过90个字",type:"textarea",aotusize:"",resize:"none",maxlength:90},model:{value:e.introduce,callback:function(t){e.introduce=t},expression:"introduce"}})],1)],1),e._v(" "),a("i",[e._v(e._s(e.introduce.length)+"/90")])],1)},staticRenderFns:[]};var l=a("VU/8")(d,c,!1,function(e){a("tzlA")},"data-v-148aa298",null);t.default=l.exports},tzlA:function(e,t){}});