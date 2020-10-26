"use strict";var APP=window.APP||{};APP.Dev=APP.Dev||{},APP.Browser=APP.Browser||{},APP.Plugins=APP.Plugins||{},APP.Components=APP.Components||{},window.onbeforeunload=function(){window.scrollTo(0,0)};var _window=$(window),_document=$(document),easingSwing=[.02,.01,.47,1];function normalize(i,t,e,n,a){var o=(i-t)/(e-t)*(a-n)+n;return a<o?a:o<n?n:o}function getWindowWidth(){return window.innerWidth}function triggerBody(){$(window).scroll(),$(window).resize()}function formatNumberWithSpaces(i){return i.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function hasCrossedBreakpoint(i,t,e){return e<=t&&i<=e||t<=e&&e<=i}function Plurize(i,t,e,n){var a=Math.abs(i);return 5<=(a%=100)&&a<=20?n:1===(a%=10)?t:2<=a&&a<=4?e:n}function rgba(i,t){var e=parseInt(i.slice(1,3),16),n=parseInt(i.slice(3,5),16),a=parseInt(i.slice(5,7),16);return t?"rgba("+e+", "+n+", "+a+", "+t+")":"rgb("+e+", "+n+", "+a+")"}function mediaCondition(i){var t,e=i.substring(1),n=i.substring(0,1);return"<"===n?t=getWindowWidth()<e:">"===n&&(t=getWindowWidth()>e),t}function width(i){return parseFloat(getComputedStyle(i,null).width.replace("px",""))}function height(i){return parseFloat(getComputedStyle(i,null).height.replace("px",""))}function outerWidth(i){var t=i.offsetWidth,e=getComputedStyle(i);return t+=parseInt(e.marginLeft)+parseInt(e.marginRight)}!function(i,t){t.Initilizer=function(){var i={init:function(){i.initGlobalPlugins(),i.initPlugins(),i.initComponents()},onLoadTrigger:function(){},refresh:function(){t.Plugins.Sharer.refresh(),t.Plugins.Sliders.reinit(),i.initPlugins(!0),i.initComponents(!0)},destroy:function(){},newPageReady:function(){i.refresh()},transitionCompleted:function(){t.Plugins.AOS.refresh(),i.onLoadTrigger()},initGlobalPlugins:function(){t.Dev.Credentials.logCredentials(),t.Dev.Breakpoint.listenResize(),t.Browser().methods.setBodyTags(),t.Plugins.LegacySupport.init(),t.Plugins.ScrollBlock.listenScroll(),t.Plugins.Clicks.init(),t.Plugins.AOS.init(),t.Plugins.Barba.init()},initPlugins:function(i){t.Plugins.Teleport.init(),t.Plugins.Sliders.init(i),t.Plugins.Modals.init(),t.Plugins.Masks.init(),t.Plugins.Selectric.init(),t.Plugins.LazyLoadImages.init(),t.Plugins.TextareaAutoExpand.init(),t.Plugins.Validations.init(),t.Plugins.LegacySupport.fixImages(),t.Plugins.LAYOUT.init()},initComponents:function(i){t.Components.Header.init(i)}};return i},i(function(){t.Initilizer().init()}),i(window).on("load",function(){i.ready.then(function(){t.Initilizer().onLoadTrigger()})})}(jQuery,window.APP),function(t){window.APP.Browser=function(){var i={isRetinaDisplay:function(){if(window.matchMedia){var i=window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");return i&&i.matches||1<window.devicePixelRatio}},isMobile:function(){return!!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},isIosDevice:function(){return!(!/iPad|iPhone|iPod/.test(navigator.userAgent)||window.MSStream)},msieversion:function(){return!!(0<window.navigator.userAgent.indexOf("MSIE ")||navigator.userAgent.match(/Trident.*rv:11\./))},setBodyTags:function(){t("body").addClass("is-ready"),i.msieversion()&&t("body").addClass("is-ie"),i.isMobile()&&t("body").addClass("is-mobile"),i.isIosDevice()&&t("html").addClass("is-ios")}};return{data:{isIe:i.msieversion(),isMobile:i.isMobile(),isIosDevice:i.isIosDevice(),isRetinaDisplay:i.isRetinaDisplay()},methods:i}}}(jQuery),function(s){window.APP.Plugins.Clicks={init:function(){s(document).on("click",'[href="#"]',function(i){i.preventDefault()}).on("click","[js-link]",function(i){var t=s(this).data("href");t&&"#"!==t&&(i.preventDefault(),i.stopPropagation(),Barba.Pjax.goTo(t))}).on("click","a, [js-link]",function(i){var t=s(this).data("href")||s(this).attr("href"),e=window.location.pathname;t===e.slice(1,e.length)&&(i.preventDefault(),i.stopPropagation())}).on("click",'a[href^="#section"]',function(){var i=s(this).attr("href"),t=s(i).offset().top;return TweenLite.to(window,1,{scrollTo:{y:t,autoKill:!1},ease:easingSwing}),!1}).on("click","[js-show-grid]",function(){s(this).toggleClass("is-active"),s(".demo-grid").fadeToggle()}).on("click",".js-tabs-trigger a",function(){var i=s(this),t=s(".js-tabs-trigger a"),e=i.closest(".js-tabs"),n=i.data("tab"),a=e.find(".tab"),o=e.find('.tab[data-tab="'+n+'"]');t.removeClass("is-active"),i.addClass("is-active"),a.hide(),o.fadeIn()})},destroy:function(){}}}(jQuery),Number.prototype.pad=function(i){for(var t=String(this);t.length<(i||2);)t="0"+t;return t},function(h){h.Plugins.LAYOUT={data:{stickToWindow:void 0,containerAlign:void 0},init:function(){this.getData(),this.applyLayout(),this.listenResize()},getData:function(){this.data.stickToWindow=$(".js-stick-to-window"),this.data.containerAlign=$(".js-container-align")},listenResize:function(){window.addEventListener("resize",debounce(this.applyLayout.bind(this),100))},applyLayout:function(){this.data.stickToWindow&&[].forEach.call(this.data.stickToWindow,function(i){var t,e,n=i.getAttribute("data-position"),a=i.getAttribute("data-stop")?mediaCondition(i.getAttribute("data-stop")):null,o=0;null!==a&&a?i.setAttribute("style",""):(i.style.margin=0,t=i.getBoundingClientRect().left,e=i.getAttribute("data-keep-container"),"left"===n?(o=-1*t,i.style.marginLeft="".concat(o,"px"),e&&(i.style.paddingLeft="".concat(-1*o,"px"))):"right"===n&&(o=-1*(window.innerWidth-t-(width(i)-Math.abs(parseInt(i.style.marginLeft)))),i.style.marginRight="".concat(o,"px"),e&&(i.style.paddingRight="".concat(-1*o,"px"))))}),this.data.containerAlign&&[].forEach.call(this.data.containerAlign,function(i){var t,e,n,a,o,s,r,l=i.getAttribute("data-stop")?mediaCondition(i.getAttribute("data-stop")):null,d=i.getAttribute("data-type"),c=i.getAttribute("data-position"),u=i.getAttribute("data-selector");null!==l&&l?i.setAttribute("style",""):(t=$(".container--narrow"),u&&(t=$(u)),e=window.innerWidth,n=t[0].getBoundingClientRect(),a=window.innerWidth<768?20:32,"right"===c?(i.setAttribute("style",""),o=i.getBoundingClientRect(),s=e-(n.left+n.width)-(e-(o.left+o.width)),d&&"padding"===d?i.style.paddingRight="".concat(s+a,"px"):i.style.marginRight="".concat(s,"px")):d&&"padding"===d?i.style.paddingLeft="".concat(n.left+a,"px"):d&&"slider"===d?((r=i.closest(".swiper-container")).setAttribute("data-offset-before",n.left+a),r&&r.swiper&&(r.swiper.params.slidesOffsetBefore=n.left+a,h.Plugins.Sliders.update())):i.style.marginLeft="".concat(n.left,"px"))})}}}(window.APP),function(i){i.Plugins.LegacySupport={init:function(){svg4everybody(),i.Browser().data.isIe||window.viewportUnitsBuggyfill.init({force:!1,refreshDebounceWait:150,appendToBody:!0})},fixImages:function(){i.Browser().data.isIe&&(picturefill(),objectFitImages())}}}((jQuery,window.APP)),function(e,a){a.Plugins.Barba={getData:function(){return this.data},init:function(){Barba.Pjax.Dom.containerClass="page",this.data=this.data||{},this.data.transitionInitElement="",this.getTransition(),Barba.Prefetch.init(),Barba.Pjax.start(),this.listenEvents()},getTransition:function(){var i=this;Barba.Pjax.getTransition=function(){return i.transitions.FadeTransition}},transitions:{HideShowTransition:Barba.BaseTransition.extend({start:function(){this.newContainerLoading.then(this.finish.bind(this))},finish:function(){document.body.scrollTop=0,this.done()}}),FadeTransition:Barba.BaseTransition.extend({start:function(){Promise.all([this.newContainerLoading,this.fadeOut()]).then(this.fadeIn.bind(this))},fadeOut:function(){var i=e(this.oldContainer),t=(e(this.newContainer),Barba.Utils.deferred());return TweenLite.to(i,.5,{opacity:0,ease:Power1.easeIn,onComplete:function(){t.resolve()}}),t.promise},fadeIn:function(){var i=this,t=(e(this.oldContainer),e(this.newContainer));e(this.oldContainer).hide(),t.css({visibility:"visible",opacity:0}),TweenLite.to(window,.15,{scrollTo:{y:0,autoKill:!1},ease:easingSwing}),TweenLite.to(t,.5,{opacity:1,ease:Power1.easeOut,onComplete:function(){i.done()}})}})},listenEvents:function(){var t=this;Barba.Dispatcher.on("linkClicked",function(i){t.data.transitionInitElement=i instanceof jQuery?i:e(i)}),Barba.Dispatcher.on("newPageReady",function(i,t,e,n){a.Initilizer().newPageReady()}),Barba.Dispatcher.on("transitionCompleted",function(i,t){a.Initilizer().transitionCompleted()})}}}(jQuery,window.APP),function(t,e){e.Plugins.ScrollBlock={data:{y:_window.scrollTop(),blocked:!1,direction:void 0,lastForScrollDir:0,lastForBodyLock:0,fillGapMethod:"padding",scrolllDisabled:!1},getData:function(){return this.data},fillScrollbarGap:function(){this.fillGapTarget(t(".header").get(0)),this.fillGapTarget(document.body)},unfillScrollbarGap:function(){this.unfillGapTarget(t(".header").get(0)),this.unfillGapTarget(document.body)},disableScroll:function(){var i;t("body").is(".body-lock")||t("body").is(".body-m-lock")||this.data.scrolllDisabled||(e.Browser().data.isMobile?0<(i=t(".blocker, .mobile-navi__panel")).length&&(i.each(function(i,t){disablePageScroll(t)}),this.data.scrolllDisabled=!0,this.data.blocked=!0,t("body").addClass("body-m-lock")):(this.data.lastForBodyLock=_window.scrollTop(),this.data.blocked=!0,t(".page__content").css({"margin-top":"-"+this.data.lastForBodyLock+"px"}),this.fillScrollbarGap(),t("body").addClass("body-lock")))},enableScroll:function(){t(".blocker").length||(e.Browser().data.isMobile?(clearQueueScrollLocks(),enablePageScroll(),this.data.scrolllDisabled=!1,this.data.blocked=!1,this.data.direction="up",t("body").removeClass("body-m-lock")):(this.data.blocked=!1,this.data.direction="up",t(".page__content").css({"margin-top":"-0px"}),this.unfillScrollbarGap(),t("body").removeClass("body-lock"),_window.scrollTop(this.data.lastForBodyLock)))},getWindowScroll:function(){var i;this.data.blocked||(i=_window.scrollTop(),this.data.y=i,this.data.direction=i>this.data.lastForScrollDir?"down":"up",this.data.lastForScrollDir=i<=0?0:i,this.data.lastForBodyLock=i)},listenScroll:function(){_window.on("scroll",this.getWindowScroll.bind(this))},fillGapTarget:function(i){var t,e,n,a,o;i instanceof Node&&(t=this.getScrollBarWidth(i,!0),e=window.getComputedStyle(i),"margin"===(n=this.data.fillGapMethod)?(a=parseFloat(e.marginRight),i.style.marginRight="".concat(a+t,"px")):"width"===n?i.style.width="calc(100% - ".concat(t,"px)"):"max-width"===n?i.style.maxWidth="calc(100% - ".concat(t,"px)"):"padding"===n&&(o=parseFloat(e.paddingRight),i.style.paddingRight="".concat(o+t,"px")))},unfillGapTarget:function(i){var t;i instanceof Node&&("margin"===(t=this.data.fillGapMethod)?i.style.marginRight="":"width"===t?i.style.width="":"max-width"===t?i.style.maxWidth="":"padding"===t&&(i.style.paddingRight=""))},getScrollBarWidth:function(i){if(i instanceof Node){var t=document.documentElement.clientWidth;return window.innerWidth-t}return 0}}}(jQuery,window.APP),function(r){window.APP.Plugins.Teleport={data:{teleports:[]},init:function(){this.getElements(),this.teleport(),this.listenResize()},getElements:function(){var s=this,i=r(".page").last().find(".js-teleport");s.data.teleports=[],0!==i.length&&i.each(function(i,t){var e=r(t),n=r("[data-teleport-target="+e.data("teleport-to")+"]"),a=e.data("teleport-condition").substring(1),o=e.data("teleport-condition").substring(0,1);s.data.teleports.push({el:e,html:e.html(),target:n,conditionMedia:a,conditionPosition:o})})},listenResize:function(){_window.on("resize",debounce(this.teleport.bind(this),100))},teleport:function(){0!==this.data.teleports.length&&r.each(this.data.teleports,function(i,t){var e;t.target&&t.html&&t.conditionPosition&&("<"===t.conditionPosition?e=window.innerWidth<=t.conditionMedia:">"===t.conditionPosition&&(e=window.innerWidth>=t.conditionMedia),e?(t.target.html(t.html),t.el.html("")):(t.el.html(t.html),t.target.html("")))})}}}(jQuery),function(e){window.APP.Dev.Breakpoint={setBreakpoint:function(){var i,t=window.location.host.toLowerCase();(0<=t.indexOf("localhost")||0<=t.indexOf("surge")||0<=t.indexOf("netlify"))&&(i="<div class='dev-bp-debug'>"+window.innerWidth+" x "+_window.height()+"</div>",e(".page").append(i),setTimeout(function(){e(".dev-bp-debug").fadeOut()},1e3),setTimeout(function(){e(".dev-bp-debug").remove()},1500))},listenResize:function(){e(window).on("resize",debounce(this.setBreakpoint,200))}}}(jQuery),jQuery,window.APP.Dev.Credentials={logCredentials:function(){console.log("👨‍💻 MADE WITH LOVE BY <> KHMELEVSKOY & ASSOCIATES </> https://khmelevskoy.co")}},function(n){window.APP.Dev.LogOnScreen={showLog:function(i){var t,e=window.location.host.toLowerCase();(0<=e.indexOf("localhost")||0<=e.indexOf("surge")||0<=e.indexOf("netlify"))&&(t="<div class='dev-bp-debug'>"+i+"</div>",n(".page").append(t),setTimeout(function(){n(".dev-bp-debug").fadeOut()},1e3),setTimeout(function(){n(".dev-bp-debug").remove()},1500))}}}(jQuery),jQuery,window.APP.Plugins.AOS={init:function(){AOS.init({offset:120,delay:0,duration:400,easing:"ease-in",once:!0,mirror:!1,anchorPlacement:"top-bottom"})},refresh:function(){AOS.refreshHard()}},function(e,n){n.Plugins.LazyLoadImages={init:function(){var i=_document.find("[js-lazy]:not(.is-loaded)");0!==i.length?this.initLazy(i):n.Plugins.LegacySupport.fixImages()},load:function(i){var t=e(i);this.initLazy(t)},initLazy:function(i){var t=this;i.Lazy({threshold:n.Browser().data.isMobile?500:800,enableThrottle:!0,throttle:100,scrollDirection:"vertical",onError:function(i){console.log("error loading "+i.data("src"));try{i.attr("src",i.data("src"))}catch(i){console.log("eroor appending src",i)}},beforeLoad:function(){},afterLoad:function(i){n.Plugins.LegacySupport.fixImages(),t.animateLazy(i)}}),triggerBody()},animateLazy:function(i){var t=i.closest(".scaler");t.addClass("is-loaded"),0===t.length&&e(i).addClass("is-loaded"),t.is(".no-bg-onload")&&setTimeout(function(){t.addClass("is-bg-hidden")},250)}}}(jQuery,window.APP),function(t){window.APP.Plugins.Modals={init:function(){var i=0;t("[js-popup]").magnificPopup({type:"inline",fixedContentPos:!0,fixedBgPos:!0,overflowY:"auto",closeBtnInside:!0,preloader:!1,midClick:!0,removalDelay:300,mainClass:"popup-buble",callbacks:{beforeOpen:function(){i=_window.scrollTop()},close:function(){_window.scrollTop(i)}}}),t("[js-popup-gallery]").magnificPopup({delegate:"a",type:"image",tLoading:"Загрузка #%curr%...",mainClass:"popup-buble",gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]},image:{tError:'<a href="%url%">The image #%curr%</a> could not be loaded.'}})},destroy:function(){}}}(jQuery),function(a){window.APP.Plugins.Sliders={data:{swipers:[],responsiveSwipers:{productsSwiper:{instances:[],enableOn:991}}},init:function(i){i||(this.initSwipers(),this.initSwiperDataTree(),this.initResponsiveSwipers(),this.listenResize())},reinit:function(){this.initSwipers(),this.initSwiperDataTree(),this.initResponsiveSwipers()},update:function(i){var t=a(i?"".concat(i,".swiper-container-initialized"):".swiper-container-initialized");0<t.length&&t.each(function(i,t){a(t)[0].swiper.update()})},listenResize:function(){_window.on("resize",debounce(this.initResponsiveSwipers.bind(this),200))},initSwipers:function(){var n=a(".page").last(),i=0<n.find(".js-pdpGallery-thumbs").length,t=0<n.find(".js-pdpGallery-main").length;i&&t&&n.find(".js-pdpGallery-thumbs:not(.swiper-container-initialized)").each(function(i,t){var e=a(t).data("swiper-group-id");new Swiper(t,{slideToClickedSlide:!1,preventClicks:!1,preventClicksPropagation:!1,watchOverflow:!0,setWrapperSize:!1,spaceBetween:5,slidesPerView:"auto",normalizeSlideIndex:!0,direction:"vertical",on:{init:function(){var i,t;i=this,t='.js-pdpGallery-main[data-swiper-group-id="'.concat(e,'"]'),0<n.find(t).length&&new Swiper(t,{loop:!0,watchOverflow:!0,setWrapperSize:!1,initialSlide:0,spaceBetween:5,centeredSlides:!0,slidesPerView:"auto",normalizeSlideIndex:!1,freeMode:!1,pagination:{el:".swiper-pagination",type:"bullets",clickable:!0},thumbs:{swiper:i}})}}})})},initSwiperDataTree:function(){var i=".js-products-swiper";0<a(i).length&&this.initSwiperTree(i,"productsSwiper")},initResponsiveSwipers:function(){var i=".js-products-swiper";0<a(i).length&&this.responsiveSwiperConstructor(i,"productsSwiper",{watchOverflow:!0,setWrapperSize:!1,spaceBetween:0,slidesPerView:"auto",freeMode:!0,freeModeSticky:!0})},initSwiperTree:function(i,e){var n=this;n.data.responsiveSwipers[e].instances=[],a(i).each(function(i,t){n.data.responsiveSwipers[e].instances.push(void 0)})},responsiveSwiperConstructor:function(i,t,e){var n=this.data.responsiveSwipers[t];a(i).each(function(i,t){window.innerWidth<=n.enableOn?void 0===n.instances[i]&&(n.instances[i]=new Swiper(t,e)):void 0!==n.instances[i]&&(n.instances[i].destroy(!0,!0),n.instances[i]=void 0)}),this.data.responsiveSwipers[t]=n},destroy:function(){}}}(jQuery),function($,APP){APP.Plugins.Validations={init:function(){this.localize(),this.customMethods(),this.validateFormsConstructor(),this.validateFormsCustom()},data:{validateErrorPlacement:function(i,t){i.addClass("ui-input__validation"),t.is("select")?i.appendTo(t.closest(".selectric-wrapper")):t.is('input[type="radio"]')||t.is('input[type="checkbox"]')?i.appendTo(t.closest(".ui-group")):i.appendTo(t.parent("div"))},validateHighlight:function(i){var t=$(i);t.is("select")?t.closest(".selectric-wrapper").addClass("has-error"):$(i).addClass("has-error")},validateUnhighlight:function(i){var t=$(i);t.is("select")?t.closest(".selectric-wrapper").removeClass("has-error"):$(i).removeClass("has-error")},validateSubmitHandler:function validateSubmitHandler(form){$(form).addClass("loading");var formData=$(form).serialize(),sucessFunction=$(form).data("success-function"),x;void 0!==sucessFunction&&(x=eval(sucessFunction),"function"==typeof x&&x(formData))},masks:{phone:{required:!0,normalizer:function(i){return i&&"+X (XXX) XXX-XXXX"!==i?i.replace(/[^\d]/g,""):i},minlength:11,digits:!0}}},customMethods:function(){$.validator.addMethod("laxEmail",function(i,t){return this.optional(t)||/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(i)},"Email format must be like name@site.com")},localize:function(){$.extend($.validator.messages,{required:"Это поле необходимо заполнить.",remote:"Пожалуйста, введите правильное значение.",email:"Пожалуйста, введите корректный адрес электронной почты.",url:"Пожалуйста, введите корректный URL.",date:"Пожалуйста, введите корректную дату.",dateISO:"Пожалуйста, введите корректную дату в формате ISO.",number:"Пожалуйста, введите число.",digits:"Пожалуйста, вводите только цифры.",creditcard:"Пожалуйста, введите правильный номер кредитной карты.",equalTo:"Пожалуйста, введите такое же значение ещё раз.",extension:"Пожалуйста, выберите файл с правильным расширением.",maxlength:$.validator.format("Пожалуйста, введите не больше {0} символов."),minlength:$.validator.format("Пожалуйста, введите не меньше {0} символов."),rangelength:$.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),range:$.validator.format("Пожалуйста, введите число от {0} до {1}."),max:$.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),min:$.validator.format("Пожалуйста, введите число, большее или равное {0}.")})},validateFormsConstructor:function(){var a=this,i=$(".js-validate-form:not(.is-validation-attached)");0!==i.length&&i.each(function(i,t){var e=$(t),n={errorPlacement:a.data.validateErrorPlacement,highlight:a.data.validateHighlight,unhighlight:a.data.validateUnhighlight,submitHandler:a.data.validateSubmitHandler,rules:{email:{required:!0,email:!0,laxEmail:!0},phone:a.data.masks.phone},messages:{email:{required:"Please enter email",email:"Email format must be like name@site.com"},phone:{minlength:"Phome form is invalid"}}};e.validate(n),e.addClass("is-validation-attached")})},validateFormsCustom:function(){var i=this,t={errorPlacement:i.data.validateErrorPlacement,highlight:i.data.validateHighlight,unhighlight:i.data.validateUnhighlight,submitHandler:i.data.validateSubmitHandler,rules:{phone:i.data.masks.phone},messages:{phone:{required:"Заполните это поле",minlength:"Введите корректный телефон"}}};$("[js-validate-request]").validate(t)}}}(jQuery,window.APP),function(i){window.APP.Plugins.Masks={init:function(){i("[js-dateMask]").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"}),i("input[type='tel']").mask("+7 (000) 000-0000",{placeholder:"+7 (___) ___-____"})}}}(jQuery),function(a){window.APP.Plugins.Selectric={init:function(){var i=a("[js-select]");0!==i.length&&i.selectric({maxHeight:300,disableOnMobile:!1,nativeOnMobile:!0,arrowButtonMarkup:'<b class="button"><svg class="ico ico-select-down"><use xlink:href="img/sprite.svg#ico-select-down"></use></svg></b>',onInit:function(i,t){var e=a(i);e.closest("."+t.classes.wrapper).find(".label").html(e.attr("placeholder"))},onBeforeOpen:function(i,t){var e=a(i),n=e.closest("."+t.classes.wrapper);n.find(".label").data("value",n.find(".label").html()).html(e.attr("placeholder"))},onBeforeClose:function(i,t){var e=a(i).closest("."+t.classes.wrapper);e.find(".label").html(e.find(".label").data("value"))}})}}}(jQuery),jQuery,window.APP.Plugins.TextareaAutoExpand={init:function(){_document.one("focus.autoExpand",".ui-group textarea",function(){var i=this.value;this.value="",this.baseScrollHeight=this.scrollHeight,this.value=i}).on("input.autoExpand",".ui-group textarea",function(){var i,t=0|this.getAttribute("data-min-rows");this.rows=t,i=Math.ceil((this.scrollHeight-this.baseScrollHeight)/17),this.rows=t+i})}},function(e,n){n.Components.Header={data:{classes:{fixedClass:"is-fixed",visibleClass:"is-fixed-visible",bodyFixedVisible:"is-header-fixed-visible"},header:{container:void 0,bottomPoint:void 0}},init:function(i){i||(this.getHeaderParams(),this.hamburgerClickListener(),this.listenScroll(),this.listenResize()),this.closeMobileMenu(),this.setMenuClass(),this.controlHeaderClass()},getHeaderParams:function(){var i=e(".header"),t=i.outerHeight()+0;this.data.header={container:i,bottomPoint:t}},closeMobileMenu:function(){e("[js-hamburger]").removeClass("is-active"),e(".mobile-navi").removeClass("is-active"),n.Plugins.ScrollBlock.enableScroll()},hamburgerClickListener:function(){var i=this;_document.on("click","[js-hamburger]",function(){e(this).toggleClass("is-active"),e(".mobile-navi").toggleClass("is-active"),e(this).is(".is-active")?n.Plugins.ScrollBlock.disableScroll():n.Plugins.ScrollBlock.enableScroll()}).on("click",".mobile-navi__background",function(){i.closeMobileMenu()})},listenScroll:function(){_window.on("scroll",this.scrollHeader.bind(this)),_window.on("scroll",debounce(this.scrollHeaderDebouce.bind(this),1250,{trailing:!0}))},listenResize:function(){_window.on("resize",debounce(this.getHeaderParams.bind(this),100))},makeHeaderVisible:function(){this.data.header.container.addClass(this.data.classes.visibleClass),e("body").addClass(this.data.classes.bodyFixedVisible),this.data.header.isFixedVisible=!0},makeHeaderHidden:function(){this.data.header.container.removeClass(this.data.classes.visibleClass),e("body").removeClass(this.data.classes.bodyFixedVisible),this.data.header.isFixedVisible=!1},scrollHeaderDebouce:function(){void 0!==this.data.header.container&&this.makeHeaderVisible()},scrollHeader:function(){if(void 0!==this.data.header.container){var i,t="is-fixed",e=n.Plugins.ScrollBlock.getData();if(e.blocked)return;e.y>this.data.header.bottomPoint?(this.data.header.container.addClass(t),e.y>2*this.data.header.bottomPoint&&"up"===e.direction?this.makeHeaderVisible():this.makeHeaderHidden()):(i=-1*(100-Math.floor(normalize(e.y,this.data.header.bottomPoint,0,0,100))),i*=1.2,this.data.header.container.css({transform:"translate3d(0,"+i+"%,0)"}),this.data.header.container.removeClass(t))}},setMenuClass:function(){var i=e(".header__menu li");0!==i.length&&i.each(function(i,t){e(t).find("a").attr("href")===window.location.pathname.split("/").pop()?e(t).addClass("is-active"):e(t).removeClass("is-active")})},controlHeaderClass:function(){this.data.header.container.attr("data-modifier",!1);var i=e(".page").last().find("[js-header-class]");0<i.length&&this.data.header.container.attr("data-modifier",i.data("class"))}}}(jQuery,window.APP);