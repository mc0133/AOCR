import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.pdf':'application/pdf','.json':'application/json'};
http.createServer((req,res)=>{
 try {
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end('Not found');}
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});
  fs.createReadStream(file).pipe(res);
 }catch{res.writeHead(400);res.end('Bad request');}
}).listen(4173,'127.0.0.1',()=>console.log('AOCR Archive review: http://127.0.0.1:4173 — Ctrl+C to stop'));
