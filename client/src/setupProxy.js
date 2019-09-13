const proxy=require('http-proxy-middleware');

module.exports=(app)=>{
    app.use(proxy(['/marker'],{target:"http://localhost:3006"}));
}