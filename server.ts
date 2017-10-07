

import * as express from "express";
import { Server, Path, GET, PathParam, Return, POST, FileParam, FormParam, QueryParam } from "typescript-rest";
import * as fs from 'fs';

const port:string = process.argv[2] || process.env.PORT || '3000';
const filesDir:string = process.argv[3] || process.env.DIR || __dirname;
const serverUrl:string = process.argv[4] || process.env.SERVER || 'http://localhost';
const instructions:string='curl -F file=@myFile.ext '+serverUrl+':'+port;
@Path("/")  
class FileService {

  @GET
  home( ): any {
    return {'instruction':instructions};
  }

  @POST  
  async uploadFile( @FileParam("file") file: Express.Multer.File) : Promise<any> {
    
    const fileName = file.originalname;
    await fs.writeFile(filesDir + '/' +fileName,file.buffer,  function(err) {
        if (err) {
            return console.error(err);
        }       
    });

    const urlFile = serverUrl+':'+port+'/file?file='+fileName;
    return {
        downloadLink :  urlFile,
        curl : 'curl '+urlFile+' > '+ fileName
    };
  }

  @GET
  @Path("file")
  downloadFile(@QueryParam("file") file:string): Return.DownloadResource {
    return new Return.DownloadResource(filesDir +'/' + file, file);
  }
}
 
let app: express.Application = express();
Server.buildServices(app);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
    console.log('use commande : ' + instructions);
});

