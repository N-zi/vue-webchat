webpackJsonp([21],{enCS:function(t,e){},lvFO:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"videoGallery",data:function(){return{activeName:"1",activeMenu:0,loading:!1,currVideo:"http://ivi.bupt.edu.cn/hls/zjhd.m3u8",videoList:[{name:"CCTV-6",url:"http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8"},{name:"CCTV-5",url:"http://ivi.bupt.edu.cn/hls/cctv5hd.m3u8"},{name:"CCTV-1",url:"http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8"},{name:"CCTV-3",url:"http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8"},{name:"CCTV-8",url:"http://ivi.bupt.edu.cn/hls/cctv8hd.m3u8"},{name:"北京卫视",url:"http://ivi.bupt.edu.cn/hls/btv1hd.m3u8"},{name:"湖南卫视",url:"http://ivi.bupt.edu.cn/hls/hunanhd.m3u8"},{name:"浙江卫视",url:"http://ivi.bupt.edu.cn/hls/zjhd.m3u8"},{name:"江苏卫视",url:"http://ivi.bupt.edu.cn/hls/jshd.m3u8"},{name:"东方卫视",url:"http://ivi.bupt.edu.cn/hls/dfhd.m3u8"},{name:"辽宁卫视",url:"http://ivi.bupt.edu.cn/hls/lnhd.m3u8"}]}},computed:{videoInfo:function(){return{src:this.videoList[this.activeMenu].url,type:"hls",autoplay:!0}}},methods:{handleClick:function(){},selectMenu:function(t){this.activeMenu=Number(t)}},components:{dplayer:a("EDzG").default}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"vchat-videoGallery vchat-application"},[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"电视频道",name:"1"}})],1),t._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"videoGallery-content"},[a("el-row",{staticClass:"tac"},[a("el-col",{staticClass:"tac",attrs:{span:3}},[a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"0","background-color":"#545c64","text-color":"#fff","active-text-color":"#27c2bf"},on:{select:t.selectMenu}},t._l(t.videoList,function(e,n){return a("el-menu-item",{key:n,attrs:{index:n+""}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.name))])])}),1)],1),t._v(" "),a("el-col",{attrs:{span:15}},[a("div",{staticClass:"video-container"},[a("dplayer",{attrs:{videoInfo:t.videoInfo}})],1)])],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(n,i,!1,function(t){a("enCS")},"data-v-765de752",null);e.default=l.exports}});