webpackJsonp([8,33],{NiqC:function(e,t){},QZ3w:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"newsItem",props:["item"],data:function(){return{}},methods:{clickNews:function(){this.item.skipURL?sessionStorage.detailSrc=this.item.skipURL:sessionStorage.detailSrc=this.item.url,this.$router.push({name:"newsDetail"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vchat-news-item"},[e.item.imgextra?e._e():a("div",{staticClass:"news-detail-1",on:{click:e.clickNews}},[a("a",[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.item.imgsrc,expression:"item.imgsrc"}],attrs:{alt:""}})]),e._v(" "),a("div",{staticClass:"info"},[a("p",{staticClass:"title vchat-line2"},[e._v(e._s(e.item.title))]),e._v(" "),a("p",{staticClass:"mark"},[a("span",{staticClass:"source"},[e._v(e._s(e.item.source))]),e._v(" "),a("span",{staticClass:"ptime"},[e._v(e._s(e.item.ptime))])])])]),e._v(" "),e.item.imgextra&&e.item.imgextra.length>1?a("div",{staticClass:"news-detail-2",on:{click:e.clickNews}},[a("p",{staticClass:"title vchat-line2"},[e._v(e._s(e.item.title))]),e._v(" "),a("div",{staticClass:"imgtra"},e._l(e.item.imgextra,function(e,t){return a("a",{key:t},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.imgsrc,expression:"v.imgsrc"}],attrs:{alt:""}})])}),0),e._v(" "),a("p",{staticClass:"mark"},[a("span",{staticClass:"source"},[e._v(e._s(e.item.source))]),e._v(" "),a("span",{staticClass:"ptime"},[e._v(e._s(e.item.ptime))])])]):e._e()])},staticRenderFns:[]};var n=a("VU/8")(i,s,!1,function(e){a("tzCt")},"data-v-1474befa",null);t.default=n.exports},eq1Q:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("gyMJ"),s={name:"news",data:function(){return{activeName:"BD2A86BEwangning",newsType:[{name:"BD2A86BEwangning",label:"电视"},{name:"BD2A9LEIwangning",label:"电影"},{name:"BD2AB5L9wangning",label:"明星"},{name:"BD2AC4LMwangning",label:"音乐"},{name:"BA8E6OEOwangning",label:"体育"},{name:"BA8EE5GMwangning",label:"财经"},{name:"BAI67OGGwangning",label:"军事"}],loading:!1,loadMoreFlag:!1,page:0,newsList:[],scroll:null,nodata:!1}},components:{newsItem:a("QZ3w").default},computed:{limit:function(){return 10*this.page+"-"+10*(this.page+1)}},methods:{handleClick:function(){this.page=0,this.getHotNews()},loadMore:function(){this.page++,this.loadMoreFlag=!0,this.getHotNews(!0)},getHotNews:function(e){var t=this;e||(this.loading=!0),i.a.getHotNews(this.activeName,this.limit).then(function(a){var i=JSON.parse(a.slice(a.indexOf("(")+1,a.lastIndexOf(")")));t.newsList=e?t.newsList.concat(i[t.activeName]):i[t.activeName],t.nodata=0===i[t.activeName].length,t.loading=!1,t.loadMoreFlag=!1})}},mounted:function(){this.getHotNews()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vchat-news vchat-application"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},e._l(e.newsType,function(e,t){return a("el-tab-pane",{key:t,attrs:{label:e.label,name:e.name}})}),1),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"news-content"},[a("b-scroll",{attrs:{data:e.newsList}},[a("div",{staticClass:"content"},[e._l(e.newsList,function(e,t){return a("news-item",{key:t,attrs:{item:e}})}),e._v(" "),e.nodata?a("p",[e._v("没有更多数据了")]):a("el-button",{staticClass:"loadmore",attrs:{type:"info",size:"medium",loading:e.loadMoreFlag},on:{click:e.loadMore}},[e._v(e._s(e.loadMoreFlag?"加载中":"加载更多"))])],2)])],1)],1)},staticRenderFns:[]};var l=a("VU/8")(s,n,!1,function(e){a("NiqC")},"data-v-6dd1d6d1",null);t.default=l.exports},tzCt:function(e,t){}});