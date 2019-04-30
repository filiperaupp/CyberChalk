<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserSolicitation;

class UserSolicitationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $solicitations = UserSolicitation::where('status','pending')->get();
        return json_encode($solicitations);
    }

    public function getAll(){
        $solicitations = UserSolicitation::all();
        return json_encode($solicitations);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newSolicitation = new UserSolicitation();
        $newSolicitation->name = $request->name;
        $newSolicitation->email = $request->email;
        $newSolicitation->cgu = $request->cgu;
        $newSolicitation->password = bcrypt($request->password);
        $newSolicitation->status = 'pending';
        $newSolicitation->save();

        return response()->json([
            'res' => 'Ok.'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'idSolicitation' => 'required',
            'status' => 'required|string'
        ]);

        $solicitation = UserSolicitation::find($id);

        if ($solicitation) {
            if ($request->status == "accepted") 
                $solicitation -> status = 'accepted';
            else if ($request->status == "rejected")
                $solicitation -> status = 'rejected';
            else 
                return response()->json([
                    'res' => "Invalid status."
                ], 400);
        }
        $solicitation->save();
        return response()->json([], 200);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
