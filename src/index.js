// Autoadd all scss/css/ts files
import "../node_modules/modern-normalize/modern-normalize.css"

function importAll (r) {
    r.keys().forEach(r);
}
  
importAll(require.context('./', true, /\.scss|css|ts$/));