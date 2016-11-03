function wipImageZoomDirective(e){return{restrict:"EA",template:'<div class="wip-image-zoom {{vm.options.style}}-style {{vm.options.thumbsPos}}-thumbs"\n     ng-class="{\n     \'active\':vm.zoomActive, \n     \'immersive-mode\':vm.immersiveModeActive,\n     \'immersive-mode-enabled\':vm.immersiveModeEnabled,\n     \'immersive-mode-disabled\':!vm.immersiveModeEnabled,\n     \'box-style\':vm.options.style == \'box\' ,\n     \'inner-style\':vm.options.style == \'inner\' || vm.immersiveModeEnabled}">\n\n    <div ng-if="vm.immersiveModeEnabled" class="disable-immersive-mode-button" ng-click="vm.disableImmersiveMode()">\n        &#10006;</div>\n\n    <div class="wip-image-zoom-content">\n\n        <wip-image-zoom-thumbs ng-if="vm.options.thumbsPos === \'top\' && vm.images.length > 1"></wip-image-zoom-thumbs>\n\n        <div class="main-image-wrapper">\n            <div class="image-zoom-tracker" wip-image-zoom-tracker></div>\n            <div class="image-zoom-lens" wip-image-zoom-lens></div>\n            <img class="main-image" ng-src="{{vm.mainImage.medium}}">\n            <div class="zoom-mask"\n                 ng-class="vm.options.style == \'box\' && !vm.immersiveModeEnabled? vm.options.boxPos:\'\'"\n                 wip-image-zoom-mask>\n                <img wip-image-zoom-image class="zoom-image main-image-large"\n                     ng-src="{{vm.mainImage.large}}" image-on-load="vm.initZoom()">\n            </div>\n        </div>\n\n        <wip-image-zoom-thumbs\n                ng-if="vm.options.thumbsPos === \'bottom\' && vm.images.length > 1"></wip-image-zoom-thumbs>\n    </div>\n</div>',replace:!0,scope:{selectedImage:"=",wipImageZoom:"="},controllerAs:"vm",link:function(e,o,t,i){i.el=o,i.init()},controller:["$scope","$document","$window",function(o,t,i){function m(){H.options=o.wipImageZoom?angular.extend(S,o.wipImageZoom):S,H.images=H.options.images,H.mainImage=H.images[H.options.defaultImage],o.selectedImage=H.mainImage}function n(){e(function(){p(function(){s(),I()})},0)}function s(){c(),H.zoomTracker.style.cursor=H.options.cursor,H.options.lens?H.zoomLens.style.display="block":H.zoomLens.style.display="none",l(),H.immersiveModeActive=H.options.immersiveMode&&H.options.immersiveMode>i.innerWidth,H.immersiveModeActive&&H.zoomTracker.addEventListener("mousedown",u),(!H.immersiveModeActive||H.immersiveModeEnabled)&&a()}function a(){H.zoomTracker.addEventListener("mousemove",x),H.zoomTracker.addEventListener("touchstart",x),H.zoomTracker.addEventListener("mouseleave",y),H.zoomTracker.addEventListener("touchend",y),H.zoomTracker.addEventListener("mousemove",h),H.zoomTracker.addEventListener("touchmove",h)}function l(){H.zoomTracker.removeEventListener("mousedown",u),H.zoomTracker.removeEventListener("mousemove",x),H.zoomTracker.removeEventListener("touchstart",x),H.zoomTracker.removeEventListener("mouseleave",y),H.zoomTracker.removeEventListener("touchend",y),H.zoomTracker.removeEventListener("mousemove",h),H.zoomTracker.removeEventListener("touchmove",h)}function r(){H.immersiveModeEnabled=!1,t.find("html").removeClass("wip-image-zoom-immersive-mode-enabled"),l(),n()}function u(e){e.preventDefault(),e.stopPropagation(),H.immersiveModeEnabled||o.$apply(function(){H.immersiveModeEnabled=!0,t.find("html").addClass("wip-image-zoom-immersive-mode-enabled"),n()})}function p(e){v(0),H.thumbsWrapperWidth=H.thumbsWrapper.clientWidth,H.thumbWidth=(H.thumbsWrapperWidth+H.options.thumbColPadding)/H.options.thumbCol,H.thumbsWidth=H.thumbWidth*H.images.length,o.$evalAsync(function(){H.thumbsPosX=0,"top"==H.options.thumbsPos?(H.thumbsEl.style.paddingBottom=H.options.thumbColPadding+"px",H.thumbsEl.style.paddingTop=0):(H.thumbsEl.style.paddingTop=H.options.thumbColPadding+"px",H.thumbsEl.style.paddingBottom=0);for(var o=0;o<H.thumbsEl.children.length;o++){var t=H.thumbsEl.children[o];t.style.width=H.thumbWidth+"px",t.style.paddingRight=H.options.thumbColPadding+"px"}return e?e():void 0})}function g(){H.thumbsPosX=H.thumbsPosX+H.thumbWidth,v(-1*H.thumbsPosX)}function d(){H.thumbsPosX=H.thumbsPosX-H.thumbWidth,v(-1*H.thumbsPosX)}function v(e,o){e=e||0,o=o||0,H.thumbsEl.style.transform="translate3d("+e+"px,"+o+"px, 0)"}function c(e){var o=H.zoomTracker.getBoundingClientRect();P=o.width,Z=o.height,M=o.left+window.scrollX,C=o.top+window.scrollY,"box"!=H.options.style||H.immersiveModeEnabled?(W=P,j=Z,H.zoomMaskEl.style.width="100%",H.zoomMaskEl.style.height="100%"):(W=H.options.boxW,j=H.options.boxH,H.zoomMaskEl.style.width=W+"px",H.zoomMaskEl.style.height=j+"px"),H.options.zoomLevel>1&&(H.zoomImageEl.style.width=P*H.options.zoomLevel+"px",H.zoomImageEl.style.height=Z*H.options.zoomLevel+"px"),B=H.zoomImageEl.offsetWidth,A=H.zoomImageEl.offsetHeight,z()}function h(e){e.preventDefault();var o="touchmove"==e.type&&e.touches&&e.touches[0];k=o&&o.pageX||e.pageX,L=o&&o.pageY||e.pageY,w(),"lens"===H.options.method?b():f()}function b(){var e=[(B-W+1*D/R)*[$/P]],o=[(A-j+1*O/R)*[X/Z]];H.zoomImageEl.style.transform="translate3d("+-1*e+"px,"+-1*o+"px,0)"}function f(){var e=[(B-W)*[(k-M)/P]],o=[(A-j)*[(L-C)/Z]];e=M>k?0:e,o=C>L?0:o,e=k>M+P?B-W:e,o=L>C+Z?A-j:o,H.zoomImageEl.style.transform="translate3d("+-1*e+"px,"+-1*o+"px,0)"}function z(){R=P/B,D=W*R,O=j*R,H.zoomLens.style.width=D+"px",H.zoomLens.style.height=O+"px"}function w(){$=k-M-.5*D,X=L-C-.5*O,$=$>P-D?P-D:$,$=0>$?0:$,X=X>Z-O?Z-O:X,X=0>X?0:X,H.zoomLens.style.transform="translate3d("+$+"px,"+X+"px,0)"}function I(){var e=E(),o=H.thumbsEl.children[e],t=H.thumbsPosX<=o.offsetLeft&&o.offsetLeft<H.thumbsPosX+H.thumbsWrapperWidth;t||(H.thumbsPosX=o.offsetLeft,H.thumbsWidth-H.thumbsPosX<=H.thumbsWrapperWidth&&(H.thumbsPosX=H.thumbWidth*(H.options.images.length-H.options.thumbCol)),v(-1*H.thumbsPosX))}function E(){for(var e=0;e<H.images.length;e++)if(H.images[e].medium===H.mainImage.medium)return e}function x(){o.$evalAsync(function(){H.zoomActive=!0})}function y(){o.$evalAsync(function(){H.zoomActive=!1})}function T(e){H.mainImage=e,o.selectedImage=H.mainImage}var k,L,P,Z,M,C,W,j,B,A,D,O,$,X,R,H=this,S={defaultImage:0,images:[],style:"inner",boxPos:"right-top",boxW:400,boxH:400,method:"lens",cursor:"crosshair",lens:!0,zoomLevel:3,immersiveMode:769,prevThumbButton:"&#9665;",nextThumbButton:"&#9655;",thumbsPos:"bottom",thumbCol:3,thumbColPadding:4};H.el,H.zoomTracker,H.zoomLens,H.zoomImageEl,H.thumbsWrapper,H.thumbsEl,H.mainImage,H.options,H.images=[],H.zoomActive=!1,H.prevThumbActive=!1,H.nextThumbActive=!1,H.thumbWidth,H.thumbsWrapperWidth,H.thumbsWidth,H.thumbsPosX,H.immersiveModeActive,H.immersiveModeEnabled,H.init=m,H.initZoom=s,H.initThumbs=p,H.updateMainImage=T,H.nextThumb=g,H.prevThumb=d,H.disableImmersiveMode=r,o.$watch("selectedImage",function(e,o){void 0!==e&&e!==o&&(H.mainImage=e,I())},!0),angular.element(window).on("resize",function(e){n()}),o.$watch(function(){return{left:H.zoomTracker.getBoundingClientRect().left,top:H.zoomTracker.getBoundingClientRect().top}},function(e,o){void 0!==e&&e!==o&&n()},!0),o.$watch("wipImageZoom",function(e,o){void 0!==e&&e!==o&&(m(),n())},!0)}]}}function wipImageZoomLensDirective(){return{restrict:"EA",require:"^wipImageZoom",link:function(e,o,t,i){i.zoomLens=o[0]}}}function wipImageZoomTrackerDirective(){return{restrict:"EA",require:"^wipImageZoom",link:function(e,o,t,i){i.zoomTracker=o[0]}}}function wipImageZoomMaskDirective(){return{restrict:"EA",require:"^wipImageZoom",link:function(e,o,t,i){i.zoomMaskEl=o[0]}}}function wipImageZoomImageDirective(){return{restrict:"EA",require:"^wipImageZoom",link:function(e,o,t,i){i.zoomImageEl=o[0]}}}function wipImageZoomThumbsDirective(){return{restrict:"EA",require:"^wipImageZoom",template:'<div class="thumbs-wrapper">\n    <div class="thumbs">\n        <div class="thumb-wrapper" ng-repeat="image in vm.images">\n            <img ng-src="{{image.thumb}}" ng-click="vm.updateMainImage(image)"\n                 ng-class="{\'selected\': vm.mainImage.thumb === image.thumb}">\n        </div>\n    </div>\n</div>\n<div class="prev-button" ng-if="vm.thumbsPosX !== 0"\n     ng-click="vm.prevThumb()"\n     ng-bind-html="vm.options.prevThumbButton">Prev\n</div>\n<div class="next-button"\n     ng-if="vm.thumbsPosX < vm.thumbWidth * (vm.options.images.length - vm.options.thumbCol)"\n     ng-click="vm.nextThumb()"\n     ng-bind-html="vm.options.nextThumbButton">Next\n</div>',link:function(e,o,t,i){i.thumbsWrapper=o[0].getElementsByClassName("thumbs-wrapper")[0],i.thumbsEl=o[0].getElementsByClassName("thumbs")[0],i.initThumbs()}}}function imageOnLoadDirective(){return{restrict:"A",link:function(e,o,t){o[0].addEventListener("load",function(){e.$apply(t.imageOnLoad)},!1),o[0].addEventListener("error",function(){console.warn("image could not be loaded")})}}}wipImageZoomDirective.$inject=["$timeout"],angular.module("wipImageZoom",["ngSanitize"]).directive("imageOnLoad",imageOnLoadDirective).directive("wipImageZoom",wipImageZoomDirective).directive("wipImageZoomTracker",wipImageZoomTrackerDirective).directive("wipImageZoomLens",wipImageZoomLensDirective).directive("wipImageZoomMask",wipImageZoomMaskDirective).directive("wipImageZoomImage",wipImageZoomImageDirective).directive("wipImageZoomThumbs",wipImageZoomThumbsDirective),function(){"use strict";function e(e,o){function t(){o.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),i.classAnimation=""}var i=this;i.showToastr=t,i.zoomOptions1={defaultImage:0,style:"box",boxPos:"right-top",boxW:400,boxH:400,method:"lens",cursor:"crosshair",lens:!0,zoomLevel:3,immersiveMode:769,prevThumbButton:"&#9665;",nextThumbButton:"&#9655;",thumbsPos:"bottom",thumbCol:4,thumbColPadding:4,images:[{thumb:"assets/images/1-thumb.jpg",medium:"assets/images/1-medium.jpg",large:"assets/images/1-large.jpg"},{thumb:"assets/images/2-thumb.jpg",medium:"assets/images/2-medium.jpg",large:"assets/images/2-large.jpg"},{thumb:"assets/images/3-thumb.jpg",medium:"assets/images/3-medium.jpg",large:"assets/images/3-large.jpg"},{thumb:"assets/images/4-thumb.jpg",medium:"assets/images/4-medium.jpg",large:"assets/images/4-large.jpg"},{thumb:"assets/images/5-thumb.jpg",medium:"assets/images/5-medium.jpg",large:"assets/images/5-large.jpg"},{thumb:"assets/images/6-thumb.jpg",medium:"assets/images/6-medium.jpg",large:"assets/images/6-large.jpg"},{thumb:"assets/images/7-thumb.jpg",medium:"assets/images/7-medium.jpg",large:"assets/images/7-large.jpg"}]}}e.$inject=["$timeout","toastr"],angular.module("wipImageZoom").controller("MainController",e)}(),function(){"use strict";angular.module("wipImageZoomDemo",["ui.router","toastr","wipImageZoom"])}(),function(){"use strict";function e(e){}e.$inject=["$log"],angular.module("wipImageZoomDemo").run(e)}(),function(){"use strict";function e(e,o){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"vm"}),o.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("wipImageZoomDemo").config(e)}(),function(){"use strict";angular.module("wipImageZoomDemo").constant("malarkey",malarkey).constant("moment",moment)}(),function(){"use strict";function e(e,o){e.debugEnabled(!0),o.allowHtml=!0,o.timeOut=3e3,o.positionClass="toast-top-right",o.preventDuplicates=!0,o.progressBar=!0}e.$inject=["$logProvider","toastrConfig"],angular.module("wipImageZoomDemo").config(e)}(),angular.module("wipImageZoom").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class=container><h1 class=page-title>wip-image-zoom</h1><div class=demo-preview><img src=assets/images/1-medium.jpg wip-image-zoom=vm.zoomOptions1 selected-image=vm.selected></div><section><div class=demo-settings><button ng-repeat="image in vm.zoomOptions1.images" ng-click="vm.selected = image">Image {{$index +1 }}</button><div class=setting><label>Style:</label><select ng-model=vm.zoomOptions1.style><option value=box>Box</option><option value=inner>Inner</option></select></div><div class=setting><label>Box Style Position:</label><select ng-model=vm.zoomOptions1.boxPos><option value=right-top>Right Top</option><option value=right-middle>Right Middle</option><option value=right-bottom>Right Bottom</option><option value=left-top>Left Top</option><option value=left-middle>Left Middle</option><option value=left-bottom>Left Bottom</option><option value=bottom-left>Bottom Left</option><option value=bottom-center>Bottom Center</option><option value=bottom-right>Bottom Right</option><option value=top-left>Top Left</option><option value=top-center>Top Center</option><option value=top-right>Top Right</option></select></div><div class=setting><label>Box Width:</label><input ng-model=vm.zoomOptions1.boxW type=number step=1 min=0></div><div class=setting><label>Box Height:</label><input ng-model=vm.zoomOptions1.boxH type=number step=1 min=0></div><div class=setting><label>Method:</label><select ng-model=vm.zoomOptions1.method><option value=lens>Lens</option><option value=pointer>Pointer</option></select></div><div class=setting><label>Cursor:</label><select ng-model=vm.zoomOptions1.cursor><option value=default>Default</option><option value=pointer>Pointer</option><option value=crosshair>Crosshair</option><option value=move>Move</option><option value=zoom-in>Zoom in</option><option value=none>None</option></select></div><div class=setting><label>Show Lens:</label><input ng-model=vm.zoomOptions1.lens type=checkbox></div><div class=setting><label>Zoom Level:</label><input ng-model=vm.zoomOptions1.zoomLevel type=number step=.5 min=0></div><div class=setting><label>Immersive Mode:</label><input ng-model=vm.zoomOptions1.immersiveMode type=number step=1 min=0><div class=detail>false or 0 for disable, max width(px) for trigger</div></div><div class=setting><label>Thumbs Position:</label><select ng-model=vm.zoomOptions1.thumbsPos><option value=top>top</option><option value=bottom>bottom</option></select></div><div class=setting><label>Previous Thumb Button:</label><input ng-model=vm.zoomOptions1.prevThumbButton type=text></div><div class=setting><label>Next Thumb Button:</label><input ng-model=vm.zoomOptions1.nextThumbButton type=text></div><div class=setting><label>Thumb Column Count:</label><input ng-model=vm.zoomOptions1.thumbCol type=number step=1 min=1></div><div class=setting><label>Thumb Column Padding (px):</label><input ng-model=vm.zoomOptions1.thumbColPadding type=number step=1 min=0></div></div><div class=demo-json><h4>Options</h4><pre>{{vm.zoomOptions1 | json}}</pre><h4>Selected</h4><pre>{{vm.selected | json}}</pre></div></section></div>')}]);
//# sourceMappingURL=../maps/scripts/app.js.map
