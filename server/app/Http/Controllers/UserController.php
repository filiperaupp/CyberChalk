<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function updateUser(Request $request){
        $authUser = Auth::user();
        $user = User::find($authUser->id);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return json_encode('ok');
    }

    public function changeProfilePhoto(Request $request) {
        $idUser = Auth::user()->id;

        $user = User::find($idUser);
        if (isset($request->profile_photo)) {
            $photo = $request->profile_photo;
            $user->profile_photo = $photo->store('profile_photos','public');
            $user->save();
            return json_encode($user->profile_photo);
        }
    }

    
}
