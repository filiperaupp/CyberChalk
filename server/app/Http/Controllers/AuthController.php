<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\UserSolicitation;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|',
            'cgu' => 'required|string',
            'type' => 'required|string',
            'idSolicitation' => 'required'
        ]);
        $idSolicitation = $request->idSolicitation;
        $solicitation = UserSolicitation::find($idSolicitation);
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $solicitation->password,       
            'cgu' => $request->cgu,
            'type' => $request->type,
        ]);
        $user->save();
        return response()->json([
            'res' => "Register Successful"
        ], 201);
    }


    public function login(Request $request) {
        $request->validate([
            'email' => 'required|string|',
            'password' => 'required|string|'
        ]);
        $credencials = [
            'email' => $request->email,
            'password' => $request->password
        ];
        if (!Auth::attempt($credencials))
            return response()->json([
                'res' => "Login Fail"
            ], 401);
        
        $user = $request->user();
        $token = $user->createToken('Access token')->accessToken;

        $userData = User::where('email',$request->email)->get();

        return response()->json([
            'name' => $user->name,
            'cgu' => $user->cgu,
            'type' => $user->type,
            'email' => $request->email,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request) {
        $request->user()->token()->revoke();
        return response()->json([
            'res' => "Exit successful"
        ]);
    }
}
