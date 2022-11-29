function tagSatisfying(tags,element){return element.nodeType==Node.ELEMENT_NODE&&tags.indexOf(element.nodeName.toLowerCase())!=-1}const typographicRules=[[/ +/g," "],[/'/g,"’"],[/ ([?!%€$»:;])/g," $1"],[/« /g,"« "],[/\.\.\./g,"…"],[/([0-9]) ?([%€$£])/g,"$1 $2"],[/([0-9]{1,3})[ .]([0-9]{3})[ .]([0-9]{3})/g,"$1$2$3"],[/([0-9]{1,3}) ([0-9]{3})/g,"$1$2"]];function applyTypography(str){for([regex,replacement]of typographicRules){str=str.replace(regex,replacement)}return str}const MAX_WIDTH=600;const MAX_HEIGHT=850;function cleanTags(fragment){if(isBadTag(fragment))return document.createDocumentFragment();let cleaned;if(isUsefulTag(fragment)){cleaned=document.createElement(fragment.nodeName);for(const attribute of fragment.attributes){if(!isUsefulAttribute(attribute))continue;cleaned.setAttributeNode(attribute.cloneNode())}if(isAnImage(fragment)){convertImage(fragment.getAttribute("src"),(src,width,height)=>{if(width>height){if(width>MAX_WIDTH){height=(MAX_WIDTH*height/width).toPrecision(5);width=MAX_WIDTH}}else{if(height>MAX_HEIGHT){width=(MAX_HEIGHT*width/height).toPrecision(5);height=MAX_HEIGHT}}cleaned.setAttribute("width",width);cleaned.setAttribute("height",height);cleaned.setAttribute("src",src)})}else if(isALink(fragment)){cleaned.setAttribute("href",new URL(fragment.getAttribute("href"),fragment.baseURI).href);if(fragment.innerText==""&&fragment.getAttribute("title")!=""){cleaned.innerText=fragment.getAttribute("title")}}}else if(fragment.nodeType==Node.TEXT_NODE){cleaned=document.createTextNode(applyTypography(fragment.data))}else if(shouldBeReplaced(fragment)){cleaned=document.createElement(replaceTagBys[fragment.nodeName.toLowerCase()])}else{cleaned=document.createDocumentFragment()}for(const child of fragment.childNodes){cleaned.appendChild(cleanTags(child))}if(isEmptyButShouldNot(cleaned))return document.createDocumentFragment();return cleaned}function convertImage(src,callback){const image=new Image;image.crossOrigin="Anonymous";image.onload=function(){const canvas=document.createElement("canvas");const context=canvas.getContext("2d");canvas.width=this.naturalWidth;canvas.height=this.naturalHeight;context.drawImage(this,0,0);const dataURL=canvas.toDataURL("image/png");callback(dataURL,this.naturalWidth,this.naturalHeight)};image.src=src}function createPopup(fragment){const copyTab=window.open("","_blank","popup").document;copyTab.title="CleanHTML";copyTab.body.appendChild(fragment);copyTab.close()}const isALink=element=>{return tagSatisfying(["a"],element)&&element.hasAttribute("href")};const isAnImage=element=>tagSatisfying(["img"],element);const badTags=["script","noscript","style","base","head","link","title","source"];const isBadTag=element=>tagSatisfying(badTags,element);const shouldNotBeEmpty=["ul","ol","li"];const isEmptyButShouldNot=element=>{return tagSatisfying(shouldNotBeEmpty,element)&&element.innerText==""};const usefulAttributes=["href","src","alt"];function isUsefulAttribute(attribute){return usefulAttributes.indexOf(attribute.name.toLowerCase())!=-1}const usefulTags=["p","h1","h2","h3","h4","h5","h6","strong","em","ul","ol","li","sup","sub","a","img","pre","blockquote","cite","address","dd","dl","dt","hr"];const isUsefulTag=element=>tagSatisfying(usefulTags,element);const replaceTagBys={figcaption:"p",div:"p"};function shouldBeReplaced(element){return element.nodeType==Node.ELEMENT_NODE&&element.nodeName.toLowerCase()in replaceTagBys}const selection=window.getSelection();if(selection.rangeCount>=1){const elements=document.createDocumentFragment();for(let i=0;i<selection.rangeCount;i++){elements.appendChild(window.getSelection().getRangeAt(i).cloneContents())}createPopup(cleanTags(elements))}