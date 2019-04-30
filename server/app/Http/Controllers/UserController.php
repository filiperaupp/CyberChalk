<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return json_encode($users);
    }

    public function destroy($id){
        $user = User::find($id);
        if (isset($user)) {
            $user->delete();
            return response()->json([
                'res' => 'ok'
            ]);
        }
        return response('Not found', 404);
    }

    public function updateType(Request $request, $id){
        $array = ['adm','student','invited'];
        $user = User::find($id);
        if (isset($user)) {
            if(in_array($request->type,$array)) {
                $user->type = $request->type;
                $user->save();
                return response()->json([
                    'res' => 'Ok'
                ], 200);
            }
            return response()->json([
                'res' => 'Type not found'
            ], 400);
        }
        return response()->json([
            'res' => 'Invalid Id'
        ], 400);
    }

    
}
