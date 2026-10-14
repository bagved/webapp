// Run the SDK in a separate, form-free document. It does not load on the page
// containing customer input. Only explicit, whitelisted events cross the bridge.
let frame: HTMLIFrameElement | undefined;
let ready = false;
let pending: unknown[][] = [];
let listening = false;
function send(message: unknown[]) {
 if (ready && frame?.contentWindow) frame.contentWindow.postMessage({channel:'bagved-pixel',message},location.origin);
 else pending.push(message);
}
export function startPixel(pixelId:string,debug:boolean) {
 if(frame)return;
 ready=false;pending=[];
 if(!listening){
  window.addEventListener('message',event=>{
   if(event.origin!==location.origin || event.source!==frame?.contentWindow || event.data?.channel!=='bagved-pixel-ready')return;
   ready=true;for(const message of pending)send(message);pending=[];
  });listening=true;
 }
 frame=document.createElement('iframe');frame.title='Conversion measurement';frame.hidden=true;frame.setAttribute('aria-hidden','true');
 const url=new URL('/analytics/openai-pixel.html',location.origin);
 url.searchParams.set('pixel',pixelId);if(debug)url.searchParams.set('debug','1');
 const oppref=new URL(location.href).searchParams.get('oppref');
 if(oppref && oppref.length<=2048)url.searchParams.set('oppref',oppref);
 frame.src=url.toString();document.body.appendChild(frame);
 send(['consent',true]);
}
export function pixelEvent(event:string,data:unknown,options:unknown){send(['measure',event,data,options]);}
export function stopPixel(){
 if(ready)send(['consent',false]);
 frame?.remove();frame=undefined;ready=false;pending=[];
}
