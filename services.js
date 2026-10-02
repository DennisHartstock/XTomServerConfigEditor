/*
 * XTom Studio service contracts.
 *
 * The browser build uses local adapters so it remains usable from file:// and
 * from a static web server. Each adapter has the same small boundary that can
 * later be replaced by an HTTP/gRPC client without changing the editor.
 */
const StudioServices=(()=>{
  const status={configuration:'local',schema:'offline',validation:'local',export:'local'};
  const clone=value=>value===undefined?undefined:JSON.parse(JSON.stringify(value));
  const config={
    load(value,name){return {value:clone(value),name:name||'DeviceConfig.json',revision:0};},
    replace(value,name,revision=0){return {value:clone(value),name:name||'DeviceConfig.json',revision};},
    create(){return {value:null,name:'DeviceConfig.json',revision:0};}
  };
  const schema={
    async load(url){
      const response=await fetch(url);
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const root=await response.json();
      const enums={};
      const collect=node=>{
        if(!node||typeof node!=='object')return;
        if(node.properties)Object.entries(node.properties).forEach(([name,definition])=>{
          if(Array.isArray(definition.enum))enums[name]=definition.enum;
          collect(definition);
        });
        if(node.items)collect(node.items);
      };
      collect(root);
      return {root,enums};
    }
  };
  const validation={run(configValue,root){return {config:clone(configValue),schema:clone(root),errors:[]};}};
  const exporter={
    download(value,name){
      const blob=new Blob([JSON.stringify(value,null,2)+'\n'],{type:'application/json'});
      const link=document.createElement('a');
      link.href=URL.createObjectURL(blob);
      link.download=name||'DeviceConfig.json';
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };
  return {status,config,schema,validation,exporter};
})();
