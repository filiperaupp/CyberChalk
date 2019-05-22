<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\File;

class FileController extends Controller
{
    
    public function index()
    {
        //
    }

    public function download($id){
        $theFile = File::find($id);
        if (isset($theFile)) {
            $path = \Storage::disk('public')->getDriver()->getAdapter()->applyPathPrefix($theFile->path);
            return response()->download($path, $theFile->file_name, array('content-type' => $theFile->mimeType));
        }
    }

    public function getByContentSolicitationId($id){
        $filesByContentSolicitation = File::where('content_solicitation_id',$id)->get();

        return json_encode($filesByContentSolicitation);
        
    }
    public function store($idContent, $fileName, $filePath, $fileType)
    {
        $newFile = new File();
        $newFile->file_name = $fileName;
        $newFile->path = $filePath;
        $newFile->mimeType = $fileType;
        $newFile->content_solicitation_id = $idContent;

        $newFile->save();
    }

    public function update(Request $request, $id)
    {
        //
    }
    public function destroy($id)
    {
        //
    }

    public function destroyByContentSolicitationId($idContentSolicitation){
        $theFiles = File::where('content_solicitation_id',$idContentSolicitation)->get();

        if (isset($theFiles)) {
            foreach ($theFiles as $file) {
                $file->delete();
            }
        }
    }
}
